import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "./firebase-config";

import NewTask from "./components/NewTask";
import ToDoList from "./components/ToDoList";

const db = getFirestore(firebaseApp);
const usersTasksRef = collection(db, "tasks");

function App() {
  useEffect(() => {
    getTasks();
  }, []);

  const [tasks, setTasks] = useState<
    { id: string; text: string; priority: string }[]
  >([]);

  const getTasks = async () => {
    const tasks = await getDocs(usersTasksRef);

    const mapTasks = tasks.docs.map((task) => ({
      id: task.id,
      text: task.data().task,
      priority: task.data().priority,
    }));
    setTasks(mapTasks);
  };

  const addTaskHandler = async (text: string, priority: string) => {
    await addDoc(usersTasksRef, { task: text, priority });
    // firestore database creates id string
    getTasks();
  };

  const taskDeleteHandler = async (taskId: string) => {
    // get ref to exact document using the doc()
    const taskDocument = doc(db, "tasks", taskId);
    await deleteDoc(taskDocument);
    getTasks();
  };

  const taskUpdateHandler = async (taskId: string, task: string | null) => {
    const taskDocument = doc(db, "tasks", taskId);
    await updateDoc(taskDocument, { task });
  };

  const App = styled.div`
    max-width: 1000px;
    margin: auto;
    padding: 1rem;
  `;

  const Title = styled.h1`
    text-align: center;
  `;

  return (
    <App>
      <Title>To-do list app</Title>
      <NewTask onAddTask={addTaskHandler} />
      <ToDoList
        items={tasks}
        onDeleteTask={taskDeleteHandler}
        onUpdateHandler={taskUpdateHandler}
      />
    </App>
  );
}

export default App;
