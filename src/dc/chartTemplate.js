import React from "react";
import { CXContext } from "./cxContext";
import * as dc from "dc";
import { rhythm } from "../utils/typography";
import { css } from "glamor";

const ResetButton = props => {
  const style = css({
    padding: rhythm(0.1),
    background: "#dddd",
    display: "inline",
    cursor:'pointer',
    '&:hover':{
        background: "#ddd",
    }
  });
  return (
    <div
      {...style}
      onClick={() => {
        props.chart.filterAll();
        dc.redrawAll();
      }}
    >
      Reset
    </div>
  );
};
export const ChartTemplate = props => {
    /*
    We render the dc chart using an effect. We want to pass the chart as a prop after the dc call,
    but there is nothing by default to trigger a re-render and the prop, by default would be undefined.
    To solve this, we hold a state key and increment it after the effect ran. 
    By passing the key to the parent div, we get a rerender once the chart is defined. 
    */
  const context = React.useContext(CXContext);
  const [chart,updateChart] = React.useState(null);
  const ndx = context.ndx;
  const div = React.useRef(null);
  React.useEffect(() => {
    const newChart = props.chartFunction(div.current, ndx); // chartfunction takes the ref and does something with it

    newChart.render();
    updateChart(newChart);
  },1); {/*Run this exactly once */}
  return (
    <div
      ref={div}
      style={{ width: "100%", minHeight: "100%" }}
      {...props.styles}
    >
     <ResetButton chart={chart} /> 
    </div>
  );
};
