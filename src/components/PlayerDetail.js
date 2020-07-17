import React, { useEffect, useState } from "react";
import moment from "moment";

import PlayerRatingChart from "./PlayerRatingChart";
import Placeholder from "./Placeholder";

const CalculateAge = (dob) => {
  if (dob) {
    const seconds = dob._seconds;
    var diff_ms = Date.now() - seconds * 1000; // milliseconds
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
};

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
                alt={player.basic.name}
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
          <p>
            {player.basic.dob &&
              moment
                .utc(player.basic.dob._seconds, "X")
                .format("MMM D, YYYY")}{" "}
            <span className="text-muted">
              {isLoading ? null : "[" + CalculateAge(player.basic.dob) + "]"}
            </span>
          </p>
        </div>
        <div className="col-md-9">
          <h4>Player rating</h4>

          <div style={{ overflowX: "auto" }}>
            {isLoading ? (
              <Placeholder type="match" />
            ) : (
              <PlayerRatingChart data={player} />
            )}
          </div>
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
