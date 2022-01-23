import React, { useState } from "react";
import styled from "styled-components";

type NewTaskProps = {
  onAddTask: (taskText: string, priority: string) => void;
};

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  margin: 1rem 0;
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
`;

const SubmitButton = styled.button`
  background-color: #f5eedc;
  height: 2rem;
  font-size: 1.2rem;
  border-radius: 5px;
  margin: 1rem 0;
`;

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
        <SubmitButton type="submit">ADD TASK</SubmitButton>
      </TaskContainer>
    </form>
  );
};

export default NewTask;
