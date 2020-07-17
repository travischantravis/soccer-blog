import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import LastName from "../functions/LastName";

const posColor = (pos) => {
  const lastChar = pos.charAt(pos.length - 1);
  // console.log(lastChar);
  switch (lastChar) {
    case "K":
      return "#cebf3b";
    case "F":
      return "#ed3535";
    case "M":
      return "#2a49cf";
    case "B":
      return "#5ca52c";
    default:
      return "#2a49cf";
  }
};

const Formation = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("/api/formations/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFormations(data);
        // console.log(data);
      });
  }, []);

  return (
    <div>
      {formations &&
        formations.map((d, i) => {
          return (
            <div key={i}>
              <h5>{d.season} Formation</h5>

              <h6>{d.formation_name}</h6>
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
                        <div
                          className="drag-box"
                          style={{ backgroundColor: posColor(pos.name) }}
                        >
                          <span>{LastName(pos.name)}</span>
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
