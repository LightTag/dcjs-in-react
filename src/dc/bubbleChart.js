import React from "react";
import * as dc from "dc";
import { timeYear, schemeRdYlGn, scaleLinear } from "d3";
import { numberFormat } from "./cxContext";
import { ChartTemplate } from "./chartTemplate";

const groupAddReducer =(p,v)=>{
    ++p.count;
    p.absGain += v.close - v.open;
    p.fluctuation += Math.abs(v.close - v.open);
    p.sumIndex += (v.open + v.close) / 2;
    p.avgIndex = p.sumIndex / p.count;
    p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
    p.fluctuationPercentage = p.avgIndex
      ? (p.fluctuation / p.avgIndex) * 100
      : 0;
    return p;
  }
const groupRemoveRudcer =(p, v) =>{
    --p.count;
    p.absGain -= v.close - v.open;
    p.fluctuation -= Math.abs(v.close - v.open);
    p.sumIndex -= (v.open + v.close) / 2;
    p.avgIndex = p.count ? p.sumIndex / p.count : 0;
    p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
    p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
    return p;
}

const groupInitalizer = ()=> {
    return {
        count: 0,
        absGain: 0,
        fluctuation: 0,
        fluctuationPercentage: 0,
        sumIndex: 0,
        avgIndex: 0,
        percentageGain: 0
    };
}

const bubbleChartFunc = (divRef, ndx) => {
  const yearlyDimension = ndx.dimension(d => timeYear(d.dd).getFullYear());
  const yearlyPerformanceGroup = yearlyDimension.group()
  .reduce(groupAddReducer,groupRemoveRudcer,groupInitalizer);
  const yearlyBubbleChart = dc.bubbleChart(divRef); // Divref is a refere3nce to the div we're attaching to
  yearlyBubbleChart
    .transitionDuration(1500)
    .dimension(yearlyDimension)
    .group(yearlyPerformanceGroup)
    .colors(schemeRdYlGn[9]) // why the 9 ?
    .colorAccessor(d => d.value.absGain)
    .keyAccessor(p => p.value.absGain)
    .valueAccessor(p=>p.value.percentageGain)
    .radiusValueAccessor(p => p.value.fluctuationPercentage)
    .maxBubbleRelativeSize(0.3)
    .x(scaleLinear().domain([-2500, 2500]))
    .y(scaleLinear().domain([-100, 100]))
    .r(scaleLinear().domain([0, 4000]))
    .elasticY(false)
    .elasticX(true)
    .yAxisPadding(100)
    .xAxisPadding('10%')
    .renderHorizontalGridLines(true)
    .renderVerticalGridLines(true)
    .xAxisLabel('Index Gain')
    .yAxisLabel('Index Gain %')
    .renderLabel(true)
    .label(p=>p.key)
    .renderTitle(true)
    .title( (p)=>(
         [
            p.key,
            'Index Gain: ' + numberFormat(p.value.absGain),
            'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
            'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
        ].join('\n')
    ))
    .yAxis().tickFormat(v=>`${v}%`)
    return yearlyBubbleChart

};
export const BubbleChart = props => (
    <ChartTemplate chartFunction={bubbleChartFunc} title="Yearly Fluctuation"/>
)
