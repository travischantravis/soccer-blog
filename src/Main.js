import React from "react";
import { Route } from "react-router-dom";

import MatchDetail from "./components/MatchDetail";
import PlayerDetail from "./components/PlayerDetail";
import Home from "./components/Home";

const Main = () => {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path={"/match/:uid"} component={MatchDetail}></Route>
      <Route path={"/player/:uid"} component={PlayerDetail}></Route>
    </div>
  );
};

export default Main;
