import React, { useEffect, useState } from "react";
import moment from "moment";

const MatchDetail = (props) => {
  const [playersInfo, setPlayersInfo] = useState([]);
  //const [squad, setSquad] = useState([]);
  //let playerIdList;

  const matchData = props.location.state;
  const matchId = matchData.id;
  console.log(matchData);

  useEffect(() => {
    fetch("/api/match/" + matchId + "/squad")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayersInfo(data);
      });
  }, []);

  console.log(playersInfo);

  return (
    <div>
      <h2>
        {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
        {matchData.away}
      </h2>
      <p>{matchData.event}</p>
      <p className="text-muted">
        {moment.utc(matchData.date._seconds, "X").format("MMM Do")}
      </p>
      <p>{matchData.comment}</p>

      <h3 className="mt-3">My comments on players</h3>
      {playersInfo.map((player, i) => {
        return (
          <div key={i} className="my-2 row">
            <img
              src={player.image}
              alt={player.name}
              className="player-pic col-1"
            />
            <span className="col-2">{player.name}</span>
            <span className="col-1">{player.rating}/10</span>
            <span className="col-6">{player.comment}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MatchDetail;
