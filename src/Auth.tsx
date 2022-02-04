import styled from "styled-components";
import Button from "./components/shared/Button";
import app from "./firebase/firebase-config";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { getFirestore, setDoc, doc } from "firebase/firestore";

import { useAuth } from "./firebase/AuthProvider";

import LoadingSpinner from "./components/shared/LoadingSpinner";

const PageContainer = styled.div`
  height: 100vh;
  max-width: 500px;
  width: 95%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthContainer = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0.5rem;
`;

const About = styled.p`
  text-align: center;
  padding: 0 1rem;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const HomepageLink = styled.a`
  text-decoration: none;
  color: #baabda;
  &:hover {
    color: #d77fa1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

const auth = getAuth(app);

export const signOutHandler = () => {
  window.location.hash = "";
  signOut(auth)
    .then(() => {
      // TODO redirect to auth page
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function Auth() {
  const db = getFirestore(app);
  const userId = useAuth();
  const addUserHandler = async () => {
    await setDoc(doc(db, "users", `${userId}`), {
      // new user added to the doc
    });
  };

  const signIn = async () => {
    window.location.hash = "app";
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider).then(() => {
      addUserHandler();
    });
  };

  return (
    <PageContainer>
      {window.location.hash === "#app" ? (
        <LoadingSpinner />
      ) : (
        <AuthContainer>
          <Title>To Do App ✅</Title>
          <About>
            Create and set the priority of each task, update and hopefully
            finish some tasks. Create account / sign in down below its free 🎉
          </About>
          <ButtonContainer>
            <Button
              text={"Sign In with Google"}
              onClick={() => signIn()}
            ></Button>
          </ButtonContainer>
          <About>
            Created by{" "}
            <HomepageLink
              href="https://viktorsnaer.com/"
              target={"_blank"}
              rel="noreferrer"
            >
              Viktor Snaer
            </HomepageLink>
          </About>
        </AuthContainer>
      )}
    </PageContainer>
  );
}
