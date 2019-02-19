# React + DC.JS

This is a POC of using [DC.JS within a React application](https://www.lighttag.io/blog/react-dc-js/). 

[demo](https://lighttag.github.io/dcjs-in-react/), [blog post](https://www.lighttag.io/blog/react-dc-js/)

## The Problem

React is, well React, and DC.JS is a library for making interactive charts and dashboards on high dimensional data. [We](https://www.lighttag.io) want to use DC.JS inside of our react app but they don't play nice. 

DC is powered by D3, which manipulates the DOM. Since React also manipulates the dom this has potential for conflicts and significant cognitive overhead. 

DC is also powered by crossfilter, which manages the state of your data and filters. Generally, we let React manage data/state either directly in state or through something like redux. This also has potential for conflicts and overhead. 

## The Solution

### Keep Crossfilter in a Context Provider

DC works by keeping a "global" crossfilter object witht he data, and letting the charts apply various filters on it. We tried to put that crossfilter inside of a context object, and render all charts using it. 

You can see the code [here](/src/dc/cxContext.js) but the crux of it is

```es6
export class DataContext extends React.Component {
  constructor(props) {
    super(props);
    this.state={loading:false,hasNDX:false};
  }

  componentDidMount(){
      if (this.state.hasNDX){
          return
      }
      if(this.state.loading){
          return
      }
      this.setState({loading:true})
        {/*do things here to get data */}
        this.ndx = crossfilter(data); //TODO possibly need to update this
        this.setState({loading:false,hasNDX:true})
        })
  }

  render() {
      if(!this.state.hasNDX){

          return null;
      }
    return (
      <CXContext.Provider value={{ndx:this.ndx}}>
        <div ref={this.parent}>
        {this.props.children}
        </div>
      </CXContext.Provider>
    );
  }
}

```

### Create A "Chart Wrapper Component" 

DC uses a declarative syntax to define charts. You give it a DOM element and data from crossfilter, and it gives you a chart back.  If you use the same crossfilter object the charts will interact, which is what we want. 

To get this working in react we can break it down into two parts. 1) Is a react component that creates an element and has access to the crossfilter context. 2) Is a function that receives the element and crossfilter object and creates a chart. 

Since part 1 repeats, it makes sense to abstract it into it's own component, which you can find [here](/src/chartTemplate.js)

A simplified version of it looks like this

```es6
export const ChartTemplate = props => {
    /*
    We render the dc chart using an effect. We want to pass the chart as a prop after the dc call,
    but there is nothing by default to trigger a re-render and the prop, by default would be undefined.
    To solve this, we 1) hold the chart in state using a hook 2) make sure the effect hook is run exactly once
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
    </div>
  );
};

```

## Making A Chart

From there, making a new chart is just writing standard dc.js code as a function, and passing that function as a
prop to the template component.  Victory! 

## Brought To You By LightTag
LightTag is a tool for [NLP annotation](https://www.lighttag.io). 
