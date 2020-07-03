import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryScatter,
  VictoryLabel,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import moment from "moment";

const CustomLabel = (props) => {
  const { active } = props;
  console.log(props);
  const style = {
    fill: "black",
    textAnchor: "middle",
    fontSize: 12,
  };
  return active ? (
    <VictoryLabel text="test" style={style} x={175} y={175} renderInPortal />
  ) : null;
};

const PlayerRatingChart = (props) => {
  let data = props.data.comments;
  console.log(data);
  const ratingArray = data.map((d) => d.rating);

  let styles = {
    axisOne: {
      grid: {
        stroke: ({ tick }) => (tick === 0 ? "transparent" : "#aaa"),
        strokeWidth: 1,
        strokeDasharray: 5,
      },
    },
  };

  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => datum.rating}
          labelComponent={<VictoryTooltip dy={-7} constrainToVisibleArea />}
          responsive={false}
          voronoiBlacklist={["scatterDots"]}
        />
      }
      width={400}
      height={220}
      minDomain={{ y: 0 }}
      maxDomain={{ y: 10 }}
      events={[
        {
          childName: "scatterDots",
          target: "data",
          eventHandlers: {
            onMouseOver: () => {
              return [
                {
                  childName: "scatterDots",
                  mutation: (props) => {
                    // const fill = props.style.fill;
                    return { style: { fill: "#034694" }, size: 6 };
                  },
                },
              ];
            },
            onMouseOut: () => {
              return [
                {
                  childName: "scatterDots",
                  mutation: (props) => {
                    return { style: { fill: "black" } };
                  },
                },
              ];
            },
          },
        },
      ]}
    >
      <VictoryLine
        data={data}
        x={(d) => moment.utc(d.date._seconds, "X").format("MMM D")}
        y={(d) => d.rating}
        style={{ data: { stroke: "black", strokeWidth: 2 } }}
        animate={{
          duration: 1000,
          onLoad: { duration: 1000 },
        }}
      />

      <VictoryScatter
        name="scatterDots"
        data={data}
        x={(d) => moment.utc(d.date._seconds, "X").format("MMM D")}
        y={(d) => d.rating}
        size={4}
        style={{ data: { fill: "black" } }}
      />

      <VictoryLabel
        x={25}
        y={20}
        style={{ fontSize: "18px" }}
        text={"Player Rating"}
      />

      {/* y-axis */}
      <VictoryAxis dependentAxis style={styles.axisOne} />

      {/* x-axis */}
      <VictoryAxis />
    </VictoryChart>
  );
};

export default PlayerRatingChart;
