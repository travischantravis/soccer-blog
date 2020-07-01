import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container">
      <div className="row my-3">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "black", margin: "0 auto" }}
        >
          <h1 className="col text-center">Travis' Soccer Blog</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
