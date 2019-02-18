import React, { Component } from "react";
import logo from "./logo.svg";
import {typography} from './utils/typography'
import { Dashboard } from "./dc/dashboard";
import { Welcome } from "./welcome";
import { Grid } from "react-flexbox-grid";

class App extends Component {
  
  render() {
    typography.injectStyles()
    return (
      <div className="App">
      <Grid>
      <Welcome />
        <Dashboard />
        </Grid>
      </div>
    );
  }
}

export default App;
