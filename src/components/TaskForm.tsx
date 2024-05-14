import React from "react";
import { useAddTaskMutation } from "../api/apiSlice";

export default function TaskForm() {
  const [addTask] = useAddTaskMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const description = e.target.elements.description.value.trim();
    const completed = e.target.elements.completed.checked;

    console.log(name, description, completed);
    addTask({
      name,
      description,
      completed,
    });
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="name" />
        <input type="text" name="description" />
        <input type="checkbox" name="completed" />
        <button>Add task</button>
      </form>
    </>
  );
}
