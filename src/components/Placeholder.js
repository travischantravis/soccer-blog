import React from "react";
import ContentLoader from "react-content-loader";

const Placeholder = (props) => {
  const { count } = props || 1;

  return [...Array(count)].map((d, i) => {
    return (
      <ContentLoader key={i} className="row" style={{ height: "60px" }}>
        <rect x="0" y="0" rx="5" ry="5" width="50" height="50" />
        <rect x="60" y="10" rx="4" ry="4" width="300" height="13" />
        <rect x="60" y="30" rx="3" ry="3" width="250" height="13" />
      </ContentLoader>
    );
  });
};

export default Placeholder;
