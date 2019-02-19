import React, { Component } from "react";
import logo from "./logo.svg";
import {typography} from './utils/typography'
import { Dashboard } from "./dc/dashboard";
import { Welcome } from "./welcome";
import { Grid } from "react-flexbox-grid";
import { css } from "glamor";

class App extends Component {

  render() {
    const style = css({
      background: `#ddd`
  
    })
    typography.injectStyles()
    return (
      <div {...style}>
      <Grid>
      <Welcome />
        <Dashboard />
        </Grid>
      </div>
    );
  }
}

export default App;
