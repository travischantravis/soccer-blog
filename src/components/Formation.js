import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const posColor = (pos) => {
  const lastChar = pos.charAt(pos.length - 1);
  console.log(lastChar);
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
              <h6>{d.name}</h6>
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
