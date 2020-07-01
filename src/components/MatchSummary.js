import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MatchSummary = (props) => {
  const matchData = props.data;
  // console.log(matchData);
  return (
    <div className="mb-3">
      <Link
        to={{ pathname: "/match/" + matchData.id, state: matchData }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <p>
          {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
          {matchData.away}
        </p>
      </Link>

      <p className="text-muted">
        {moment.utc(matchData.date._seconds, "X").format("MMM Do YYYY")}
      </p>
    </div>
  );
};

export default MatchSummary;
