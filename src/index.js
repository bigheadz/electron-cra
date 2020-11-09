import React from "react";
import ReactDOM from "react-dom";
import InputBox from "./components/inputBox";
import "./index.less";

import ResizeObserver from "resize-observer-polyfill";
if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

// const App = () => <InputBox />;
ReactDOM.render(<InputBox />, document.getElementById("root"));
