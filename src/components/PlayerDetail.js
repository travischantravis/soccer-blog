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
  console.log(player);

  return (
    <div>
      <div>
        <h2>{player.basic.name}</h2>
        {isLoading ? (
          <Placeholder type="match" />
        ) : (
          <PlayerRatingChart data={player} />
        )}
      </div>
      {isLoading ? (
        <Placeholder type="match" />
      ) : (
        player.comments.map((d, i) => {
          return (
            <div key={i} className="mb-3">
              <span>
                {d.date &&
                  moment.utc(d.date._seconds, "X").format("MMM D, YYYY")}
              </span>
              {"  "}
              <span className="text-muted">
                [{d.home} {d.home_goal} - {d.away_goal} {d.away}]
              </span>
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
