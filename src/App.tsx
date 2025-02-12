import "./App.css";
import signUpPage from "./components/signUp";
import Chat from "./components/chat"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={signUpPage}></Route>
          <Route path='/chat' Component={Chat}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
