import React from "react";
import { Route } from "react-router-dom";
import MatchSummary from "./MatchSummary";
import MatchDetail from "./MatchDetail";

const data = [
  {
    team: "Man City",
    uid: 10,
  },
  {
    team: "Arsenal",
    uid: 11,
  },
];

const MatchList = () => {
  return (
    <div className="">
      <h5>Match List</h5>

      {data.map((d) => {
        return <MatchSummary data={d} key={d.uid} />;
      })}
    </div>
  );
};

export default MatchList;
