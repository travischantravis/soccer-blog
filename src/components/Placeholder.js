import React from "react";
import ContentLoader from "react-content-loader";

const MatchPlaceholder = () => {
  return (
    <ContentLoader style={{ height: "60px", display: "block" }}>
      <rect x="0" y="0" rx="5" ry="5" width="50" height="50" />
      <rect x="60" y="10" rx="4" ry="4" width="300" height="13" />
      <rect x="60" y="30" rx="3" ry="3" width="250" height="13" />
    </ContentLoader>
  );
};

// unfinished
const ImagePlaceholder = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#F5F6F7",
          maxHeight: "300px",
        }}
      ></div>
    </div>
  );
};

const Placeholder = (props) => {
  const { count } = props || 1;
  const { type } = props;

  return [...Array(count)].map((d, i) => {
    switch (type) {
      case "match":
        return <MatchPlaceholder key={i} />;
      case "image":
        return <ImagePlaceholder key={i} />;
      default:
        return null;
    }
  });
};

export default Placeholder;
