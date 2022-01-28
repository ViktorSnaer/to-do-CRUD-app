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

const PageContainer = styled.div`
  height: 100%;
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
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const auth = getAuth(app);

export const signOutHandler = () => {
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

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).then(() => {
      addUserHandler();
    });
  };

  return (
    <PageContainer>
      <AuthContainer>
        <Title>To Do App ✅</Title>
        <ButtonContainer>
          <Button
            text={"Sign In with Google"}
            onClick={() => signIn()}
          ></Button>
        </ButtonContainer>
        <a href="/">Test Account</a>
      </AuthContainer>
    </PageContainer>
  );
}
