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
      <div className="row">
        <div className="col-md-4">
          {isLoading ? (
            <Placeholder />
          ) : (
            <img
              src={player.basic.image.replace("40x40", "110x140")}
              alt="image"
            />
          )}
          <h2>{player.basic.name}</h2>
          {isLoading ? (
            <Placeholder type="match" />
          ) : (
            <PlayerRatingChart data={player} />
          )}
        </div>
        <div className="col-md-8">
          <h4>Player comments</h4>
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
      </div>
    </div>
  );
};

export default PlayerDetail;
