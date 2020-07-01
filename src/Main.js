import React from "react";
import { Route } from "react-router-dom";

import MatchDetail from "./components/MatchDetail";
import Home from "./components/Home";

const Main = () => {
  return (
    <div className="container">
      <Route exact path="/" render={(props) => <Home />} />
      <Route path={"/match/:uid"} component={MatchDetail}></Route>
    </div>
  );
};

export default Main;
