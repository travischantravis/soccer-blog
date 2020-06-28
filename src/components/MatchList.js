import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import MatchSummary from "./MatchSummary";
import MatchDetail from "./MatchDetail";

const MatchList = () => {
  const [match, setMatch] = useState([]);

  useEffect(() => {
    fetch("/api/matches/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMatch(data);
      });
    console.log(match);
  }, []);

  return (
    <div className="">
      <h5>Match List</h5>

      {match.map((d, i) => {
        return <MatchSummary data={d} key={i} />;
      })}
    </div>
  );
};

export default MatchList;
