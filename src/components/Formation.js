import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const Formation = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("/api/formations/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFormations(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h5>2019/2020 Formation</h5>
      {formations &&
        formations.map((d, i) => {
          return (
            <div key={i}>
              <p>{d.name}</p>
              <div id="soccer-field">
                {d.positions &&
                  d.positions.map((pos, i) => {
                    return (
                      <Draggable
                        key={i}
                        bounds="parent"
                        grid={[10, 10]}
                        defaultPosition={{ x: pos.x, y: pos.y }}
                      >
                        <div className="drag-box">
                          <span>{pos.name}</span>
                        </div>
                      </Draggable>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Formation;
