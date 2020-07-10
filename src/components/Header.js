import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="navbar">
      <NavLink to="/" id="navbar-brand">
        <h2>Travis' Soccer Blog</h2>
      </NavLink>
      <div id="navbar-links">
        <NavLink
          exact
          to="/"
          className="navbar-link"
          activeClassName="nav-selected"
        >
          <span>Matches</span>
        </NavLink>
        <NavLink
          to="/players"
          className="navbar-link"
          activeClassName="nav-selected"
        >
          <span>Players</span>
        </NavLink>
        <NavLink
          to="/memories"
          className="navbar-link"
          activeClassName="nav-selected"
        >
          <span>Memories</span>
        </NavLink>
        <NavLink
          to="/formations"
          className="navbar-link"
          activeClassName="nav-selected"
        >
          <span>Formations</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
