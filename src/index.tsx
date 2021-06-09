import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import "react-reflex/styles.css";
import Context from "./components/context/Context";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
