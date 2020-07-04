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
      <div className="row">
        <div className="col-md-3 player-profile">
          <Placeholder type="image" />

          {isLoading ? (
            <Placeholder type="image" />
          ) : (
            <div
              style={{ width: "100%", maxHeight: "300px", overflow: "hidden" }}
            >
              <img
                src={player.basic.image.replace("40x40", "110x140")}
                alt="image"
                style={{ width: "100%" }}
              />
            </div>
          )}
          <p style={{ fontSize: "24px" }}>{player.basic.shirt_no} </p>

          <p style={{ fontSize: "24px", fontWeight: "700" }}>
            {player.basic.name}
          </p>

          <p style={{ fontSize: "18px", color: "#666" }}>
            {player.basic.position}
          </p>
          <p style={{ fontSize: "18px" }}>{player.basic.nationality}</p>
        </div>
        <div className="col-md-9">
          <h4>Player rating</h4>

          {isLoading ? (
            <Placeholder type="match" />
          ) : (
            <PlayerRatingChart data={player} />
          )}
          <h4>Player performance</h4>
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
