import React from "react";

const MatchDetail = (data) => {
  const { team, uid } = data.location.state;
  return (
    <div>
      <p>Chelsea 2 - 1 {team}</p>
      <p className="text-muted">25 Jun 2020</p>
      <p>Premier League Week 31</p>
      <p>MOTM: Pulisic</p>
    </div>
  );
};

export default MatchDetail;
