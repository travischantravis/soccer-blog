import React from "react";
import ContentLoader from "react-content-loader";

const MatchPlaceholder = () => {
  return (
    <ContentLoader className="row" style={{ height: "60px" }}>
      <rect x="0" y="0" rx="5" ry="5" width="50" height="50" />
      <rect x="60" y="10" rx="4" ry="4" width="300" height="13" />
      <rect x="60" y="30" rx="3" ry="3" width="250" height="13" />
    </ContentLoader>
  );
};

const ImagePlaceholder = () => {
  return <ContentLoader></ContentLoader>;
};

const Placeholder = (props) => {
  const { count } = props || 1;
  const { type } = props || "match";

  return [...Array(count)].map((d, i) => {
    switch (type) {
      case "match":
        return <MatchPlaceholder key={i} />;
      case "image":
        return <ImagePlaceholder key={i} />;
    }
  });
};

export default Placeholder;
