import React from "react";
import * as dc from "dc";
import {scaleLinear } from "d3";
import { ChartTemplate } from "./chartTemplate";
import { numberFormat } from "./cxContext";

const fluctuationChartFunc = (divRef, ndx) => {
    const fluctuationChart = dc.barChart(divRef)
    const dimension = ndx.dimension(d=> Math.round((d.close - d.open) / d.open * 100));
    const group  =dimension.group()
    fluctuationChart
    .dimension(dimension)
    .group(group)
    .gap(1)
    .x(scaleLinear().domain([-25, 25]))
    .valueAccessor(x=>Math.log10(1+x.value))
    .centerBar(true)
    .round(dc.round.floor)
    .renderHorizontalGridLines(true)
    .filterPrinter( (filters) => {
        var filter = filters[0], s = '';
        s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
        return s;
    });





    fluctuationChart.xAxis().tickFormat(
        function (v) { return v + '%'; });
    fluctuationChart.yAxis().ticks(5);
    

    return fluctuationChart
}

export const FluctuationChart = props => (
    <ChartTemplate chartFunction={fluctuationChartFunc} title="Return Distribution"/>
)

