import React, { useState } from "react";

type NewTaskProps = {
  onAddTask: (taskText: string) => void;
};

const NewTask: React.FC<NewTaskProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");

  const taskSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onAddTask(taskText);
    setTaskText("");
  };

  const onTypeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    let typedText = event.currentTarget.value;
    setTaskText(typedText);
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
      </div>
      <button type="submit">ADD TASK</button>
    </form>
  );
};

export default NewTask;
