import React from "react";
import { CXContext } from "./cxContext";
import * as dc from "dc";
import { rhythm } from "../utils/typography";
import { css } from "glamor";

const ResetButton = props => {
  const style = css({
    padding: rhythm(0.1),
    display: "inline",
    cursor:'pointer',
    float:'right',
    '&:hover':{
        background: "#ddd",
    }
  });
  return (
    <span
      {...style}
      onClick={() => {
        props.chart.filterAll();
        dc.redrawAll();
      }}
    >
      reset
    </span>
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

  const chartStyles  = css({
    width:'100%',
    height:'auto',
    boxSizing:'border-box',
    padding:rhythm(1),
    '& label':{
      textTransform:'capitalize',
      textDecoration:'underline'

    }

  })
  return (
    <div
      ref={div}
      {...chartStyles}
    >
    
     <ResetButton chart={chart} /> 
     <label>{props.title}</label>
    </div>
  );
};
