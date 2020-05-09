import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import "./assets/styles/textColors.css";


var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Penguin Books" />, mountNode);
