import { useState } from "react";
import { useForm } from "react-hook-form";
import CategorySelect from "./CategorySelect";
import { useNavigate } from "react-router";

export default function CustomForm() {
  // useForm definition
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [category, setCategory] = useState("0");
  const [difficulty, setDifficulty] = useState(null);

  // Difficulty table
  const difficultyList = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const onSubmit = () => {
    // Redirect to the Quiz page with the selected parameters
    navigate("/quiz", {
      state: {
        category: category,
        difficulty: difficulty,
      },
    });
  };

  return (
    <>
      <h1>Quiz Maker</h1>
      <form id="form" name="form" onSubmit={handleSubmit(onSubmit)}>
        <CategorySelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select
          id="difficultySelect"
          name="difficultySelect"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option key="dif" value="">
            -- Sélectionnez une difficulté --
          </option>
          {difficultyList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button id="createBtn" name="createBtn" type="submit">
          Create
        </button>
      </form>
    </>
  );
}
