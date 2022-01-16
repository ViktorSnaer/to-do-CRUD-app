import React, { useState } from "react";
import NewTask from "./components/NewTask";
import ToDoList from "./components/ToDoList";
import styled from "styled-components";
function App() {
  const [tasks, setTasks] = useState<
    { id: string; text: string; priority: string }[]
  >([]);

  const addTaskHandler = (text: string, priority: string) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      { id: Math.random().toString(), text: text, priority: priority },
    ]);
  };

  const taskDeleteHandler = (taskId: string) => {
    setTasks((previousTasks) => {
      return previousTasks.filter((task) => task.id !== taskId);
    });
  };

  const App = styled.div`
    max-width: 1000px;
    margin: auto;
  `;

  const Title = styled.h1`
    text-align: center;
  `;

  return (
    <App>
      <Title>To-do list app</Title>
      <NewTask onAddTask={addTaskHandler} />
      <ToDoList items={tasks} onDeleteTask={taskDeleteHandler} />
    </App>
  );
}

export default App;
