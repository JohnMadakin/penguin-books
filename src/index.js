import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider }  from './store';

import "./styles.css";
import "./assets/styles/textColors.css";


var mountNode = document.getElementById("app");
const app = (
  <StateProvider>
    <App name="Penguin Books" />
  </StateProvider>
);

ReactDOM.render(app, mountNode);
