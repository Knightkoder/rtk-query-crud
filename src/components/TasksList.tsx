import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../api/apiSlice";
import { Task } from "../types/Task";

export default function TasksList() {
  const { data: tasksList, isError, isLoading, error } = useGetTasksQuery({});
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleTaskDelete = (id) => {
    deleteTask(id);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }
  if (!tasksList) {
    return <p>No tasks found</p>;
  }

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    task: Task
  ) => {
    console.log(e.target.checked);
    //e.target.checked ? (e.target.checked = false) : (e.target.checked = true);

    updateTask({
      ...task,
      completed: e.target.checked,
    });
  };

  return (
    <>
      <h1>Task lists</h1>
      <ul>
        {tasksList.map((task: Task) => (
          <li key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              Delete
            </button>

            <input
              type="checkbox"
              id={task.id}
              onChange={(e) => {
                handleOnchange(e, task);
              }}
              checked={ task.completed ? true : false}
              name={task.name}
              
            />
            <label htmlFor={task.id}>Completed</label>
          </li>
        ))}
      </ul>
    </>
  );
}
