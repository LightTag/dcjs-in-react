import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const quarterChartFunc = (divRef, ndx) => {
    const  dimension = ndx.dimension((d) => {
        var month = d.dd.getMonth();
        if (month <= 2) {
            return 'Q1';
        } else if (month > 2 && month <= 5) {
            return 'Q2';
        } else if (month > 5 && month <= 8) {
            return 'Q3';
        } else {
            return 'Q4';
        }
    });
    const group =dimension.group().reduceSum((d)=>d.volume) 

    const quarterChart = dc.pieChart(divRef);
    quarterChart /* dc.pieChart('#quarter-chart', 'chartGroup') */
    .innerRadius(30)
    .dimension(dimension)
    .group(group);
    return quarterChart

}

export const QuarterChart = props => (
    <ChartTemplate chartFunction={quarterChartFunc} title="Quarterly Breakdown" />
)
