import React, { useState, useEffect } from "react";

import Placeholder from "./Placeholder";
import MatchSummary from "./MatchSummary";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMatches(data);
        setIsLoading(false);
      });
    // console.log(match);
  }, []);

  return (
    <div>
      <h5 className="row">Most recent matches of Chelsea</h5>
      {isLoading ? (
        <Placeholder count={3} />
      ) : (
        matches.map((d, i) => {
          return <MatchSummary data={d} key={i} />;
        })
      )}
    </div>
  );
};

export default MatchList;
