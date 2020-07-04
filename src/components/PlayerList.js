import React, { useEffect, useState } from "react";
import PlayerSummary from "./PlayerSummary";
import Placeholder from "./Placeholder";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/players/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setIsLoading(false);
      });
    // console.log(players);
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <h5 className="col">All players of Chelsea</h5>
      </div>
      {isLoading ? (
        <Placeholder count={3} type="match" />
      ) : (
        players.map((d, i) => {
          return <PlayerSummary data={d} key={i} />;
        })
      )}
    </React.Fragment>
  );
};

export default PlayerList;
