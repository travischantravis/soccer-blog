import React, { useEffect, useState } from "react";
import moment from "moment";

const PlayerDetail = (props) => {
  const playerId = props.location.state.player_id;
  const [player, setPlayer] = useState({ basic: {}, comments: [{}] });

  useEffect(() => {
    fetch("/api/player/detail/" + playerId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayer(data);
        // console.log(data);
      });
  }, []);
  // console.log(player);

  return (
    <div>
      <h2>{player.basic.name}</h2>
      {player.comments.map((d, i) => {
        return (
          <div key={i} className="mb-2">
            <p>
              {d.date && moment.utc(d.date._seconds, "X").format("MMM Do YYYY")}
            </p>
            <p>{d.rating}/10</p>
            <p>{d.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerDetail;
