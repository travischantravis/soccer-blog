import React from "react";
import { Link, Route } from "react-router-dom";

import MatchDetail from "./components/MatchDetail";
import Home from "./components/Home";

const Main = () => {
  return (
    <div className="container">
      <div className="row my-3">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black", margin: "0 auto" }}
        >
          <h1 className="col text-center">Travis' Soccer Blog</h1>
        </Link>
      </div>
      <Route exact path="/" render={(props) => <Home />} />
      <Route path={"/match/:uid"} component={MatchDetail}></Route>
    </div>
  );
};

export default Main;
