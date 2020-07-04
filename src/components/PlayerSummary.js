import React from "react";
import { Link } from "react-router-dom";

const PlayerSummary = (props) => {
  const playerData = props.data;
  const compatiblePlayerData = {
    player_id: playerData.p_id,
  };

  return (
    <div className="my-2 row">
      <img
        src={playerData.image}
        alt={playerData.name}
        className="player-pic col-2 col-md-2"
      />
      <Link
        to={{
          pathname: "/player/" + playerData.p_id,
          state: compatiblePlayerData,
        }}
        style={{ textDecoration: "none", color: "black", lineHeight: "30px" }}
        className="col"
      >
        <p>{playerData.name}</p>
      </Link>
    </div>
  );
};

export default PlayerSummary;
