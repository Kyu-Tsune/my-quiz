import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import he from "he";

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty } = location.state;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [nbAnswers, setNbAnswers] = useState(0);

  // Executed once at the start of the Component
  useEffect(() => {
    let ignore = false;
    fetchQuestions(ignore);

    return () => {
      ignore = true;
    };
  }, []);

  const fetchQuestions = async (ignore) => {
    setIsLoading(true);
    setError(null);
    try {
      const requestUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
      const response = await fetch(requestUrl);
      const data = await response.json();

      const formattedQuestions = data.results?.map((q, index) => {
        const allAnswers = [...q.incorrect_answers, q.correct_answer];
        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

        return {
          id: index,
          question: he.decode(q.question),
          answers: shuffledAnswers.map((a) => he.decode(a)),
          correctAnswer: he.decode(q.correct_answer),
        };
      });

      if (!ignore && data.response_code === 0) {
        setQuestions(formattedQuestions);
      }
    } catch (error) {
      console.error("Error fetching questions");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = useCallback(
    (questionId, answer) => {
      if (selectedAnswers[questionId]) return;
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answer,
      });
      setNbAnswers(nbAnswers + 1);
    },
    [selectedAnswers, nbAnswers]
  );

  // Condition to display submit button
  const allQuestionsAnswered = nbAnswers === 5;

  // Display if loading
  if (isLoading) return <h2>Un instant, nous construisons votre quiz...</h2>;
  // Display if error
  if (error) return <h2>Erreur lors du chargement: {error.message}</h2>;

  return (
    <>
      <h1>Quiz</h1>
      {questions?.map((q) => (
        <div key={q.id} style={{ marginBottom: "30px" }}>
          <h3>{q.question}</h3>

          <div>
            {q.answers?.map((answer, index) => {
              const isSelected = selectedAnswers[q.id] === answer;
              const isDisabled = selectedAnswers[q.id] && !isSelected;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(q.id, answer)}
                  disabled={isDisabled}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    margin: "5px 0",
                    textAlign: "left",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: isSelected ? "#aec5f0ff" : "white",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div>
        {allQuestionsAnswered && (
          <button
            key="resultButton"
            type="button"
            onClick={() => {
              navigate("/results", {
                state: {
                  selectedAnswers: selectedAnswers,
                  questions: questions,
                },
              });
            }}
          >
            Validate
          </button>
        )}
      </div>
    </>
  );
}
