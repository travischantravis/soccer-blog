import React from "react";
import { Route } from "react-router-dom";

import MatchDetail from "./components/MatchDetail";
import PlayerDetail from "./components/PlayerDetail";
import PlayerList from "./components/PlayerList";
import Home from "./components/Home";
import MemoryList from "./components/MemoryList";

const Main = () => {
  return (
    <div className="container" style={{ minHeight: "75vh" }}>
      <Route exact path="/" component={Home} />
      <Route path={"/match/:uid"} component={MatchDetail}></Route>
      <Route path={"/players"} component={PlayerList}></Route>
      <Route path={"/player/:uid"} component={PlayerDetail}></Route>
      <Route path={"/memories"} component={MemoryList}></Route>
    </div>
  );
};

export default Main;
