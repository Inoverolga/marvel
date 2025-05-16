import React from "react";
// import { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/app/app";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

// reportWebVitals();
