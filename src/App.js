import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React from "react";
import Main from "./Main";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
