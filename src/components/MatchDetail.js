import React from "react";

const MatchDetail = (props) => {
  const matchData = props.location.state;
  console.log(matchData);
  return (
    <div>
      <p>
        {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
        {matchData.away}
      </p>
      <p className="text-muted">{matchData.id} Jun 2020</p>
      <p>Premier League Week 31</p>
      <p>MOTM: Pulisic</p>
    </div>
  );
};

export default MatchDetail;
