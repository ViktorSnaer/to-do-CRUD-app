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

  const CenterContainer = styled.div`
    min-height: 100vh;
    max-width: 1000px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const ToDoContainer = styled.div`
    width: 100%;
    min-height: 90vh;
    margin: 1rem;
    padding: 1.5rem;
    background-color: #fff9f9;
    border-radius: 10px;
    position: relative;
  `;

  const Title = styled.h1`
    text-align: center;
    margin: 0;
  `;

  const SignOut = styled.p`
    text-align: center;
    text-decoration: underline;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    cursor: pointer;
    &:hover {
      color: #baabda;
    }
  `;

  return (
    <CenterContainer>
      <ToDoContainer>
        <Title>To Do App ✅</Title>
        <NewTask onAddTask={addTaskHandler} />
        <ToDoList
          items={tasks}
          onDeleteTask={taskDeleteHandler}
          onUpdateHandler={taskUpdateHandler}
        />
        <SignOut onClick={signOutHandler}>Sign Out</SignOut>
      </ToDoContainer>
    </CenterContainer>
  );
}

export default MainPage;
