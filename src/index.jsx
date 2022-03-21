import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
// import {AppState} from "./AppState.jsx";
import {App} from './router/App.jsx';


ReactDom.render(<App/>, document.querySelector("#root"));
