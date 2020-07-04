import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navStyle = {
    textDecoration: "none",
    color: "grey",
    marginLeft: "10px",
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        height: "70px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black" }}
          className="ml-5"
        >
          <h2>Travis' Soccer Blog</h2>
        </Link>
        <div
          className="mr-5"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/" style={navStyle}>
            <h5>Matches</h5>
          </Link>
          <Link to="/players" style={navStyle}>
            <h5>Players</h5>
          </Link>
          <Link to="/memories" style={navStyle}>
            <h5>Memories</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
