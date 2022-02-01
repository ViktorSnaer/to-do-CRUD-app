import React, { useState } from "react";
import styled from "styled-components";
import CustomCheckbox from "./shared/CustomCheckbox";

const TaskList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TaskContainer = styled.li`
  font-size: 1.4rem;
  border-radius: 10px;
  padding: 1rem;
  margin: 1.5rem 0;
`;

const Text = styled.p`
  max-width: 85%;
  width: fit-content;
  padding: 0;
  margin: 0;
  display: inline-block;
  color: black;
  &:focus {
    outline: none;
  }
`;

interface ToDoListProps {
  items: { id: string; text: string; priority: string }[];
  onDeleteTask: (id: string) => void;
  onUpdateHandler: (id: string, text: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  items,
  onDeleteTask,
  onUpdateHandler,
}) => {
  const [updateTask, setUpdateTask] = useState<string | null>("");

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
        let setPriorityColor = "";
        if (item.priority === "3") {
          setPriorityColor = "#d77fa1";
        } else if (item.priority === "2") {
          setPriorityColor = "#baabda";
        } else {
          setPriorityColor = "#d6e5fa";
        }

        return (
          <TaskContainer
            style={{ backgroundColor: setPriorityColor }}
            key={item.id}
          >
            <Text
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(event) => {
                setUpdateTask(event.currentTarget.textContent);
              }}
              // ! indicating that there will be a value
              onBlur={onUpdateHandler.bind(null, item.id, updateTask!)}
            >
              {item.text}
            </Text>
            <CustomCheckbox onClick={onDeleteTask.bind(null, item.id)} />
          </TaskContainer>
        );
      })}
    </TaskList>
  );
};

export default ToDoList;
