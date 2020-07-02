import React from "react";

const MatchStatus = ({ status }) => {
  let color1;
  let letter;

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
  }

  let statusStyle = {
    color: color1,
    backgroundColor: "#EEEEEE",
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    textAlign: "center",
    borderRadius: "5px",
    marginRight: "5px",
    fontWeight: "700",
  };
  return <div style={statusStyle}>{letter}</div>;
};

export default MatchStatus;
