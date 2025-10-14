import { useState } from "react";
import { useForm } from "react-hook-form";
import CategorySelect from "./CategorySelect";

export default function CustomForm() {
  // useForm definition
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState("0");
  const [difficulty, setDifficulty] = useState(null);

  // Difficulty table
  const difficultyList = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  function onSubmit(data) {
    // TODO
  }

  return (
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
        <option value="">-- Sélectionnez une difficulté --</option>
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
  );
}
