import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import Pie from './Components/Pie';
import Legend from './Components/Legend';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data:[],
      SelectedValue: 'preferredStyle'
    }
    this.handleChange = this.handleChange.bind(this);
    
    // gets 10 random colors from the ordinal color scale schemeCategory20b
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10.sort(() => Math.random() - 0.5));
    this.renderLegend = this.renderLegend.bind(this);
  }
  handleChange(event) {
    this.setState({SelectedValue: event.target.value});
    console.log(this.state.SelectedValue)
    this.mountingFunc()
  }
  mountingFunc(){
    // console.log(this.state.SelectedValue)
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
        const finalPost=response.data.map(finalVar=>{
        let choice=this.state.SelectedValue
        console.log(choice)
          
        let groupedPeople = groupBy(response.data, choice)
          return{
                category:finalVar[choice],
                value:groupedPeople[finalVar[choice]].length
                } 
              }
            )
        this.setState({data: finalPost});       
      });
  }

  // componentDidUpdate(){
  //   this.mountingFunc()
  // }

  componentDidMount(){
    this.mountingFunc()
    
  }  

  render() {
    const width =500;
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
    const radius = (minViewportSize * .9) / 2;
    // centers the pie chart
    const x = width / 2;
    const y = height / 2;
    // uses the same random color selection in order to pass it to the Pie child component
    const colors_data = dataValue.map(this.renderLegend);
    const colors = colors_data.map((color) => {
      return color.props.fill;
    });
    
    return (
      <div className='App-chart-container'>
      <form onSubmit={this.handleSubmit}>
          <label>
            Choose the display category:
            <br/>
            <br/>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="preferredStyle">Preferred Style</option>
              <option value="gender">Gender</option>
              <option value="age">Age</option>
            </select>
          </label>
        </form>
       
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
      </div>
    );
  }

  renderLegend(value, i) {
    return (
      <Legend key={i}
           value={value}
           width={550/2+250}
           height={40+i*20}
           fill={this.colorScale(i)} />
    );
  }
}

export default App;
