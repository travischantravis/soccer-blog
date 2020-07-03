import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import MatchStatus from "./MatchStatus";

const MatchSummary = (props) => {
  const matchData = props.data;
  // console.log(matchData);
  return (
    <div className="mb-3">
      <div className="row">
        <MatchStatus status={matchData.status} />
        <Link
          to={{ pathname: "/match/" + matchData.id, state: matchData }}
          style={{ textDecoration: "none", color: "black", lineHeight: "30px" }}
        >
          <p>
            {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
            {matchData.away}
          </p>
        </Link>
      </div>

      <p className="text-muted row">
        {moment(matchData.date._seconds, "X").format("MMM D, YYYY")}
      </p>
    </div>
  );
};

export default MatchSummary;
