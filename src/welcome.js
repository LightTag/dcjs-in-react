import React from 'react'
import {css} from 'glamor'

export const Welcome =(props)=>{

    return(
        <div>
        <h1>
            Using DC.js in React
        </h1>
        <div>
            <a href={"http://dc-js.github.io/dc.js/"}> DC.js </a> is a charting library based on 
            <a href="http://square.github.io/crossfilter/"> crossfilter </a> and <a href="https://d3js.org/">d3. </a>
            <br/>It allows creating interactive charts with a significant wow factor<br/>
            <a href="https://www.lighttag.io/blog/react-dc-js">Read the Blog Post!</a>
        </div>
        <h2>
            What is this ? 
        </h2>
        <div>
            This page shows an implementation of the canonical dc.js example, in React. We love dc.js and we love React, 
            but it sometimes felt they did not love each other. The implementation demonstrated here uses React hooks to
            get everyone to play along
        </div>
        <h2>
            Who Made This ? 
        </h2>
        <div>
            LightTag! LightTag makes tools to <a href="https://www.lighttag.io">label NLP data</a> with teams.
        </div>
        <h2>Click on Things in These Charts</h2>
        </div>
    )
}