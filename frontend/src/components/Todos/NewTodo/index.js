import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../../store/todo";

const NewTodo = ({ listId, addTodo, setAddTodo }) => {
  const dispatch = useDispatch();

  const creatorId = useSelector((state) => state.session.user.id);

  const [task, setTask] = useState("");
  const [due, setDue] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!task?.length) errors.push("Task must not be blank.");
    if (!due?.length) errors.push("Provide a due date.");
    setErrors(errors);
  }, [task, due]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      task,
      listId,
      creatorId,
      completed: false,
      due,
    };
    dispatch(createTodo(todo));
    setAddTodo(false);
  };

  return (
    <>
      <button onClick={() => setAddTodo(!addTodo)}>
        <i className="fas fa-times"></i>
      </button>
      <form onSubmit={handleSubmit} className="edit_list_form">
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}

        <label htmlFor="new_task" className="hidden">
          Task
        </label>
        <input
          id="new_task"
          placeholder="Task"
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          spellCheck={true}
        ></input>

        <label htmlFor="new_due_date" className="hidden">
          Due Date
        </label>
        <input
          id="new_due_date"
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        ></input>

        <div>
          <button type="submit" disabled={errors.length > 0}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTodo;
