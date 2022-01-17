import React from "react";
import styled from "styled-components";

const TaskList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TaskContainer = styled.li`
  font-size: 1.4rem;
  border: solid black 1px;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
`;

const Text = styled.p`
  width: 90%;
  padding: 0;
  margin: 0;
  display: inline-block;
`;

const CheckBox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  background-color: white;
  border-radius: 20%;
  vertical-align: middle;
  border: 1px solid black;
  appearance: none;
  outline: none;
  cursor: pointer;
  float: right;
`;

interface ToDoListProps {
  items: { id: string; text: string; priority: string }[];
  onDeleteTask: (id: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ items, onDeleteTask }) => {
  const sortedItems = items.sort((a, b) => {
    if (a.priority > b.priority) {
      return -1;
    }
    if (a.priority < b.priority) {
      return 1;
    }
    return 0;
  });

  return (
    <TaskList>
      {sortedItems.map((item) => {
        return (
          <TaskContainer key={item.id}>
            <Text contentEditable={true}>{item.text}</Text>
            <CheckBox
              onClick={onDeleteTask.bind(null, item.id)}
              type={"checkbox"}
              id="finished"
            />
            {/* <button onClick={onDeleteTask.bind(null, item.id)}>DELETE</button> */}
          </TaskContainer>
        );
      })}
    </TaskList>
  );
};

export default ToDoList;
