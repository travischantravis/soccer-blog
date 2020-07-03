import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryScatter,
  VictoryLabel,
  VictoryAxis,
} from "victory";
import moment from "moment";

const PlayerRatingChart = (props) => {
  let data = props.data.comments;
  // console.log(data);

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
      containerComponent={<VictoryContainer responsive={false} />}
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
        // size={({ active }) => (active ? 8 : 4)}
        style={{ data: { fill: "black" } }}
      />
      <VictoryLabel
        x={25}
        y={25}
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
