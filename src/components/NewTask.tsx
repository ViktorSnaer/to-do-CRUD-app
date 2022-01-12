import React, { useState } from "react";

type NewTaskProps = {
  onAddTask: (taskText: string, priority: string) => void;
};

const NewTask: React.FC<NewTaskProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("3");

  const taskSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onAddTask(taskText, priorityLevel);
    setTaskText("");
  };

  const onTypeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    let typedText = event.currentTarget.value;
    setTaskText(typedText);
  };

  const onPriorityHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let prioritySelected = event.currentTarget.value;
    setPriorityLevel(prioritySelected);
  };

  return (
    <form onSubmit={taskSubmitHandler}>
      <div>
        <label htmlFor="task-text">Task Text</label>
        <input
          type="text"
          id="task-text"
          onChange={onTypeHandler}
          value={taskText}
        />
        <label htmlFor="priority">Priority</label>
        <select name="priority" id="priority" onChange={onPriorityHandler}>
          <option value="3">Important</option>
          <option value="2">middle</option>
          <option value="1">not that important</option>
        </select>
      </div>
      <button type="submit">ADD TASK</button>
    </form>
  );
};

export default NewTask;
