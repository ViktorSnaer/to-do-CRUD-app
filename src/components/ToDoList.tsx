import React, { useState } from "react";
import styled from "styled-components";

const TaskList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TaskContainer = styled.li`
  font-size: 1.4rem;
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
  appearance: none;
  outline: none;
  cursor: pointer;
  float: right;
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
          setPriorityColor = "#445942";
        } else if (item.priority === "2") {
          setPriorityColor = "#809370";
        } else {
          setPriorityColor = "#c3d3b2";
        }
        return (
          <TaskContainer
            style={{ backgroundColor: setPriorityColor }}
            key={item.id}
          >
            <Text
              contentEditable={true}
              onInput={(event) =>
                setUpdateTask(event.currentTarget.textContent)
              }
              // ! indicating that there will be a value
              onBlur={onUpdateHandler.bind(null, item.id, updateTask!)}
            >
              {item.text}
            </Text>
            <CheckBox
              onClick={onDeleteTask.bind(null, item.id)}
              type={"checkbox"}
              id="finished"
            />
          </TaskContainer>
        );
      })}
    </TaskList>
  );
};

export default ToDoList;
