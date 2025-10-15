import { useLocation, useNavigate } from "react-router";
export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  let nbCorrectAnswers = 0;
  const { selectedAnswers, questions } = location.state;

  function finalResultBackgroundColor() {
    if (nbCorrectAnswers <= 1) return "red";
    if (nbCorrectAnswers >= 4) return "green";
    return "yellow";
  }

  return (
    <>
      <h1>Results</h1>
      {questions?.map((q) => (
        <div key={q.id} style={{ marginBottom: "30px" }}>
          <h3>{q.question}</h3>

          <div>
            {q.answers?.map((answer, index) => {
              const isSelected = selectedAnswers[q.id] === answer;
              const isCorrectAnswer = answer === q.correctAnswer;
              const isIncorrectSelection = isSelected && !isCorrectAnswer;
              if (isSelected && isCorrectAnswer) nbCorrectAnswers++;
              return (
                <button
                  key={index}
                  disabled={true}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    margin: "5px 0",
                    textAlign: "left",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: isCorrectAnswer
                      ? "#aef0b3ff" // Vert pour la bonne réponse
                      : isIncorrectSelection
                      ? "#f0aeb1ff" // Rouge pour la mauvaise sélection
                      : "white", // Blanc sinon
                    opacity: isCorrectAnswer || isIncorrectSelection ? 1 : 0.7,
                  }}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ backgroundColor: finalResultBackgroundColor() }}>
        Vous avez sélectionné {nbCorrectAnswers}/5 bonnes réponses
      </div>
      <div>
        <button
          key="resetButton"
          type="button"
          onClick={() => {
            navigate("/my-quiz");
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}
