import Auth from "./Auth";
import MainPage from "./MainPage";

const user = false;

function App() {
  return <>{user ? <MainPage /> : <Auth />};</>;
}

export default App;
