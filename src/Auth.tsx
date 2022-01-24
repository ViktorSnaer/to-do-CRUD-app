import React from "react";
import styled from "styled-components";
import Button from "./components/shared/Button";

const PageContainer = styled.div`
  height: 100%;
  max-width: 1000px;
  min-width: 500px;
  width: 30%;
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
  background-color: #ffcbcb;
`;

const Title = styled.h1`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Auth() {
  return (
    <PageContainer>
      <AuthContainer>
        <Title>To Do App</Title>
        <ButtonContainer>
          <Button text={"Sign In with Google"}></Button>
        </ButtonContainer>
        <a href="/">Test Account</a>
      </AuthContainer>
    </PageContainer>
  );
}
