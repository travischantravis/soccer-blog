import React from "react";

const MatchStatus = ({ status }) => {
  let color1;
  let letter;
  let _width = "30px";

  if (status === "win") {
    color1 = "#2AD241";
    letter = "W";
  } else if (status === "lose") {
    color1 = "#F63737";
    letter = "L";
  } else if (status === "draw") {
    color1 = "grey";
    letter = "D";
  } else if (status === "upcoming") {
    color1 = "grey";
    letter = "TBC";
    _width = "40px";
  }

  let statusStyle = {
    color: color1,
    backgroundColor: "#EEEEEE",
    width: _width,
    height: "30px",
    lineHeight: "30px",
    textAlign: "center",
    borderRadius: "5px",
    marginRight: "5px",
    fontWeight: "700",
    display: "inline-block",
  };
  return <div style={statusStyle}>{letter}</div>;
};

export default MatchStatus;
