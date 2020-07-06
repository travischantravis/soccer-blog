import React from "react";
import { Link } from "react-router-dom";

const PlayerSummary = (props) => {
  const playerData = props.data;
  const compatiblePlayerData = {
    player_id: playerData.p_id,
  };

  return (
    <div className="my-2 row">
      <div className="col-2 col-md-1">
        <img
          src={playerData.image}
          alt={playerData.name}
          className="player-pic"
        />
      </div>

      <Link
        to={{
          pathname: "/player/" + playerData.p_id,
          state: compatiblePlayerData,
        }}
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          alignItems: "center",
        }}
        className="col ml-3"
      >
        <span>{playerData.name}</span>
      </Link>
    </div>
  );
};

export default PlayerSummary;
