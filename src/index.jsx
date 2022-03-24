import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
import {App} from './router/App.js';


ReactDom.render(<App/>, document.querySelector("#root"));
