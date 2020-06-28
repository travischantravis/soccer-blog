import React from "react";
import { Link, Route } from "react-router-dom";
import MatchDetail from "./MatchDetail";

const MatchSummary = (props) => {
  const matchData = props.data;
  // console.log(matchData);
  return (
    <div>
      <Link
        to={{ pathname: "/match/" + matchData.id, state: matchData }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <p>
          {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
          {matchData.away}
        </p>
      </Link>

      <p className="text-muted">{matchData.id} Jun 2020</p>
    </div>
  );
};

export default MatchSummary;
