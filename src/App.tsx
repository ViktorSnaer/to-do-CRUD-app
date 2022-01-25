import Auth from "./Auth";
import MainPage from "./MainPage";
import styled from "styled-components";
import styles from "./App.module.css";

const AppComponent = styled.div`
  margin: auto;
  padding: 0;
  height: 100vh;
  background-color: #3e2c41;
`;

const user = false;

function App() {
  return (
    <AppComponent className={styles.App}>
      {user ? <MainPage /> : <Auth />}
    </AppComponent>
  );
}

export default App;
