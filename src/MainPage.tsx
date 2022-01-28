import { useState, useEffect } from "react";
import styled from "styled-components";

import NewTask from "./components/NewTask";
import ToDoList from "./components/ToDoList";
import { signOutHandler } from "./Auth";
import { useAuth } from "./firebase/AuthProvider";

import app from "./firebase/firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Button from "./components/shared/Button";

function MainPage() {
  useEffect(() => {
    getTasks();
    return;
  }, []);

  const db = getFirestore(app);
  const userId = useAuth();
  const tasksDocumentPath = `users/${userId}/tasks`;
  const usersTasksRef = collection(db, tasksDocumentPath);

  const [tasks, setTasks] = useState<
    { id: string; text: string; priority: string }[]
  >([]);

  async function getTasks() {
    const tasks = await getDocs(usersTasksRef);

    const mapTasks = tasks.docs.map((task) => ({
      id: task.id,
      text: task.data().task,
      priority: task.data().priority,
    }));
    setTasks(mapTasks);
  }

  const addTaskHandler = async (text: string, priority: string) => {
    await addDoc(usersTasksRef, { task: text, priority });
    // firestore database creates id string
    getTasks();
  };

  const taskDeleteHandler = async (taskId: string) => {
    // get ref to exact document using the doc()
    const taskDocument = doc(db, tasksDocumentPath, taskId);
    await deleteDoc(taskDocument);
    getTasks();
  };

  const taskUpdateHandler = async (taskId: string, task: string | null) => {
    const taskDocument = doc(db, tasksDocumentPath, taskId);
    await updateDoc(taskDocument, { task });
  };

  const MainPage = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 0;
  `;

  const Title = styled.h1`
    text-align: center;
    margin: 0;
  `;

  return (
    <MainPage>
      <Button text={"sign out"} onClick={() => signOutHandler()} />
      <Title>To-do list app</Title>
      <NewTask onAddTask={addTaskHandler} />
      <ToDoList
        items={tasks}
        onDeleteTask={taskDeleteHandler}
        onUpdateHandler={taskUpdateHandler}
      />
    </MainPage>
  );
}

export default MainPage;
