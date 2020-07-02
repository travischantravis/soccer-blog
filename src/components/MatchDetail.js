import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MatchDetail = (props) => {
  const [playersInfo, setPlayersInfo] = useState([]);

  const matchData = props.location.state;
  const matchId = matchData.id;
  // console.log(matchData);

  useEffect(() => {
    fetch("/api/match/" + matchId + "/squad")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayersInfo(data);
      });
  }, []);

  // console.log(playersInfo);

  return (
    <div>
      <h2 className="row">
        {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
        {matchData.away}
      </h2>
      <p className="row">{matchData.event}</p>
      <p className="text-muted row">
        {moment.utc(matchData.date._seconds, "X").format("MMM Do YYYY")}
      </p>
      <p className="row">{matchData.match_comment}</p>

      <h3 className="mt-3 row">My rating on players</h3>
      {playersInfo.map((player, i) => {
        return (
          <div key={i} className="my-2 row">
            <img
              src={player.image}
              alt={player.name}
              className="player-pic col-2 col-md-2"
            />
            <Link
              to={{ pathname: "/player/" + player.player_id, state: player }}
              style={{ textDecoration: "none", color: "black" }}
              className="col-5 col-md-2"
            >
              {player.name}
            </Link>

            <span className="col-3 col-md-1">{player.rating || "-"}/10</span>
            <span className="col-md-7">{player.comment || "-"}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MatchDetail;
