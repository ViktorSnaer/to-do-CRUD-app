import React, { useState } from "react";
import NewTask from "./components/NewTask";
import ToDoList from "./components/ToDoList";

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

  return (
    <div className="App">
      <NewTask onAddTask={addTaskHandler} />
      <ToDoList items={tasks} onDeleteTask={taskDeleteHandler} />
    </div>
  );
}

export default App;
