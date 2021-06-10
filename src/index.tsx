import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Context from "./components/context/Context";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
