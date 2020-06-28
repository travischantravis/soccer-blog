import React, { useEffect, useState } from "react";
import moment from "moment";

const MatchDetail = (props) => {
  const [players, setPlayers] = useState([]);
  const matchData = props.location.state;
  console.log(matchData);

  useEffect(() => {
    fetch("/api/players/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  console.log(players);

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

      <h3 className="mt-3">Player Comments</h3>
      {players.map((player, i) => {
        return (
          <div key={i} className="my-2">
            <img src={player.image} alt={player.name} className="player-pic" />
            <span>{player.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MatchDetail;
