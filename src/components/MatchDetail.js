import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Placeholder from "./Placeholder";

const CommentAddForm = () => {
  return <div>form</div>;
};

const MatchDetail = (props) => {
  const [playersInfo, setPlayersInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const matchData = props.location.state;
  // const matchId = matchData.id;
  const matchId = props.match.params.uid;
  // console.log(matchData);

  const addButtonClick = () => {
    // Toggle
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetch("/api/match/" + matchId + "/squad")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayersInfo(data);
        setIsLoading(false);
      });
  }, []);

  // console.log(playersInfo);

  return (
    <div>
      <div className="row">
        <h2 className="col-12">
          {matchData.home} {matchData.home_goal} - {matchData.away_goal}{" "}
          {matchData.away}
        </h2>
        <p className="col-12">{matchData.event}</p>
        <p className="text-muted col-12">
          {moment(matchData.date._seconds, "X").format("MMM D, YYYY")}
        </p>
      </div>

      <p className="row">{matchData.match_comment}</p>
      <div className="mt-3 ">
        <h3 className="mr-3" style={{ display: "inline" }}>
          My rating on players
        </h3>
        <button id="add-btn" onClick={addButtonClick}>
          Add
        </button>
      </div>
      {showForm ? <CommentAddForm /> : null}

      {isLoading ? (
        <Placeholder count={4} type="match" />
      ) : (
        playersInfo.map((player, i) => {
          return (
            <div key={i} className="my-2 row">
              <div className="col-8 col-md-4">
                <img
                  src={player.image}
                  alt={player.name}
                  className="player-pic"
                />

                <Link
                  to={{
                    pathname: "/player/" + player.player_id,
                    state: player,
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                  className=""
                >
                  {player.name}
                </Link>
              </div>
              <div
                className="col-4 col-md-1"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="">{player.rating || "-"}/10</div>
              </div>
              <div className="col-12 col-md-7">
                <span className="">{player.comment || "-"}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MatchDetail;
