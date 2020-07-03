import React, { useEffect, useState } from "react";
import moment from "moment";

import PlayerRatingChart from "./PlayerRatingChart";
import Placeholder from "./Placeholder";

// Pass player_id as the only prop
const PlayerDetail = (props) => {
  const playerId = props.location.state.player_id;
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState({ basic: {}, comments: [{}] });

  useEffect(() => {
    fetch("/api/player/detail/" + playerId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayer(data);
        setIsLoading(false);
      });
  }, []);
  // console.log(player);

  return (
    <div>
      <h2>{player.basic.name}</h2>
      {isLoading ? <Placeholder /> : <PlayerRatingChart data={player} />}
      {isLoading ? (
        <Placeholder />
      ) : (
        player.comments.map((d, i) => {
          return (
            <div key={i} className="mb-2">
              <p>
                {d.date &&
                  moment.utc(d.date._seconds, "X").format("MMM D, YYYY")}
              </p>
              <p>{d.rating}/10</p>
              <p>{d.comment}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PlayerDetail;
