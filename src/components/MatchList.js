import React, { useState, useEffect } from "react";
import MatchSummary from "./MatchSummary";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/api/matches/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMatches(data);
      });
    // console.log(match);
  }, []);

  return (
    <div className="">
      <h5>Most recent matches of Chelsea</h5>

      {matches.map((d, i) => {
        return <MatchSummary data={d} key={i} />;
      })}
    </div>
  );
};

export default MatchList;
