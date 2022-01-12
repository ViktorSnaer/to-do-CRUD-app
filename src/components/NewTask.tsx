import React, { useRef } from "react";

type NewTaskProps = {
  onAddTask: (taskText: string) => void;
};

const NewTask: React.FC<NewTaskProps> = ({ onAddTask }) => {
  const taskTextRef = useRef<HTMLInputElement>(null);

  const taskSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = taskTextRef.current!.value;
    onAddTask(enteredText);
  };

  return (
    <form onSubmit={taskSubmitHandler}>
      <div>
        <label htmlFor="task-text">Task Text</label>
        <input type="text" id="task-text" ref={taskTextRef} />
      </div>
      <button type="submit">ADD TASK</button>
    </form>
  );
};

export default NewTask;
