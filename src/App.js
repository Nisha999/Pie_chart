import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Pie from './Components/Pie';
import Legend from './Components/Legend';
import SelectionForm from './Components/SelectionForm'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data:[]
    }
    // this.SelectedValue=
    
    // gets 10 random colors from the ordinal color scale schemeCategory20b
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory20.sort(() => Math.random() - 0.5));
    this.renderLegend = this.renderLegend.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:8080/myApp/myApp/subscriptions')
    .then(response=>{   
      function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          let key = obj[property]
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(obj)
          return acc
        }, {})
      }
      // const finalPost=response.data.map(finalVar=>{
      //  let groupedPeople = groupBy(response.data, 'preferredStyle')
      //  return{
      //       category:finalVar.preferredStyle,
      //       value:groupedPeople[finalVar.preferredStyle].length
      //       } 
      //     }
      //   )
      const finalPost=response.data.map(finalVar=>{
        let groupedPeople = groupBy(response.data, 'gender')
        return{
              category:finalVar.gender,
              value:groupedPeople[finalVar.gender].length
              } 
            }
          )

      this.setState({data: finalPost});       
    });
  }  
  render() {
    const width =1500;
    const height =500;
    let jsonObject =this.state.data.map(JSON.stringify); 
    let uniqueSet = new Set(jsonObject); 
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse); 
    let dataValue = uniqueArray.map(val=>{
        return val.value
    })
    let dataCategory =uniqueArray.map(val=>{
      return val.category
    })
    const minViewportSize = Math.min(width, height);
    // This sets the radius of the pie chart to fit within
    // the current window size, with some additional padding
    const radius = (minViewportSize * .6) / 2;
    // centers the pie chart
    const x = width / 2;
    const y = height / 2;
    // uses the same random color selection in order to pass it to the Pie child component
    const colors_data = dataValue.map(this.renderLegend);
    const colors = colors_data.map((color) => {
      return color.props.fill;
    });
    
    return (
      <svg width='100%' height='100vh'>
        <Pie x={x}
             y={y}
             innerRadius={radius * .35}
            //  innerRadius={0}
             outerRadius={radius}
             padAngle={.01}
             dataValue={dataValue}
             dataCategory={dataCategory}
             fill={colors} />
        <g>
          {/* renders a legend line for each data point */}
          {dataCategory.map(this.renderLegend)}
        </g>
      </svg>
    );
  }

  renderLegend(value, i) {
    return (
      <Legend key={i}
           value={value}
           width={1500/2+250}
           height={100+i*20}
           fill={this.colorScale(i)} />
    );
  }

}

export default App;
