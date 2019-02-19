import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const dayOfWeekFunc = (divRef, ndx) => {
    const dayOfWeekChart = dc.rowChart(divRef)
    const dimension = ndx.dimension(function (d) {
        var day = d.dd.getDay();
        var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return day + '.' + name[day];
    });
    const group = dimension.group()
    dayOfWeekChart
    .dimension(dimension)
    .group(group)

    return dayOfWeekChart
}

export const DayOfWeekChart = props => (
    <ChartTemplate chartFunction={dayOfWeekFunc} title="Weekday"/>
)

