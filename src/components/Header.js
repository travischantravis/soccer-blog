import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="navbar">
      <Link to="/" id="navbar-brand">
        <h2>Travis' Soccer Blog</h2>
      </Link>
      <div id="navbar-links">
        <Link to="/" className="navbar-link">
          <span>Matches</span>
        </Link>
        <Link to="/players" className="navbar-link">
          <span>Players</span>
        </Link>
        <Link to="/memories" className="navbar-link">
          <span>Memories</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
