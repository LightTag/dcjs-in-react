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
            It allows creating interactive charts with a significant wow factor
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
            
        </h2>
        </div>
    )
}