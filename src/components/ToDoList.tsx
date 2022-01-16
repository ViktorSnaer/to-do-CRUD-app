import React from "react";
import styled from "styled-components";

const TaskList = styled.ul`
  width: 100%;
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
          <li key={item.id}>
            <span contentEditable={true}>{item.text}</span>
            <input
              onClick={onDeleteTask.bind(null, item.id)}
              type={"checkbox"}
              id="finished"
            />
            <button onClick={onDeleteTask.bind(null, item.id)}>DELETE</button>
          </li>
        );
      })}
    </TaskList>
  );
};

export default ToDoList;
