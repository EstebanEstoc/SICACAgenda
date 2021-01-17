import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./view/Login/Login";
import Home from "./view/Home/Home";

function App() {
  const isAuth = useSelector((state) => state.GoogleUser);

  return <div className="App">{isAuth ? <Home /> : <Login />}</div>;
}

export default App;
