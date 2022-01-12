import React from "react";

interface ToDoListProps {
  items: { id: string; text: string; priority: string }[];
  onDeleteTask: (id: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ items, onDeleteTask }) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.text}</span>
            <span>{item.priority}</span>
            <button onClick={onDeleteTask.bind(null, item.id)}>DELETE</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;