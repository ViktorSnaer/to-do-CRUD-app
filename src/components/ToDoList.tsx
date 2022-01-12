import React from "react";

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
    <ul>
      {sortedItems.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.text}</span>
            <button onClick={onDeleteTask.bind(null, item.id)}>DELETE</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
