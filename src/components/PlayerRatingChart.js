import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import moment from "moment";

const PlayerRatingChart = (props) => {
  let data = props.data.comments;

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
          voronoiBlacklist={["line1"]}
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
        name="line1"
        data={data}
        x={(d) => moment.utc(d.date._seconds, "X").format("MMM D")}
        y={(d) => d.rating}
        style={{ data: { stroke: "#034694", strokeWidth: 2 } }}
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
        size={({ active }) => {
          return active ? 6 : 4;
        }}
        style={{
          data: { fill: ({ active }) => (active ? "#034694" : "#034694") },
        }}
      />

      {/* <VictoryLabel
        x={25}
        y={20}
        style={{ fontSize: "18px" }}
        text={"Player Rating"}
      /> */}

      {/* y-axis */}
      <VictoryAxis dependentAxis style={styles.axisOne} />

      {/* x-axis */}
      <VictoryAxis />
    </VictoryChart>
  );
};

export default PlayerRatingChart;
