import React from "react";
import { Link, Route } from "react-router-dom";
import MatchDetail from "./MatchDetail";

const MatchSummary = ({ data }) => {
  const { team, uid } = data;
  return (
    <div>
      <Link
        to={{ pathname: "/match/" + uid, state: data }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <p>Chelsea 2 - 1 {team}</p>
      </Link>

      <p className="text-muted">25 Jun 2020</p>
    </div>
  );
};

export default MatchSummary;
