import React, { useState } from "react";
import styled from "styled-components";
import Button from "./shared/Button";

type NewTaskProps = {
  onAddTask: (taskText: string, priority: string) => void;
};

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskInput = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  margin: 1rem 0;
  background-color: transparent;
  font-size: 1.4rem;
  &:focus {
    outline: none;
  }
`;

const DropDown = styled.select`
  margin: 1rem 0;
  font-size: 1.2rem;
  border-radius: 5px;
  height: 2rem;
  background-color: transparent;
`;

const NewTask: React.FC<NewTaskProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("3");

  const taskSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskText.length > 0) {
      onAddTask(taskText, priorityLevel);
    } else {
      alert("Nothing inserted. Please insert a task");
    }
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
      <TaskContainer>
        <TaskInput
          autoComplete="off"
          placeholder="Write down a task..."
          type="text"
          id="task-text"
          onChange={onTypeHandler}
          value={taskText}
        />
        <DropDown name="priority" id="priority" onChange={onPriorityHandler}>
          <option value={"3"}>Set Priority</option>
          <option value={"3"}>High</option>
          <option value={"2"}>Medium</option>
          <option value={"1"}>Low</option>
        </DropDown>
        <Button text={"ADD NEW TASK"} onClick={() => ""} />
      </TaskContainer>
    </form>
  );
};

export default NewTask;
