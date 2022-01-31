import Auth from "./Auth";
import MainPage from "./MainPage";
import styled from "styled-components";
import styles from "./App.module.css";
import { useAuth } from "./firebase/AuthProvider";

const AppComponent = styled.div`
  margin: auto;
  min-height: 100vh;
  background-color: #3e2c41;
`;

function App() {
  // useAuth function returns email of user or if no user returns null

  return (
    <AppComponent className={styles.App}>
      {useAuth() ? <MainPage /> : <Auth />}
    </AppComponent>
  );
}

export default App;
