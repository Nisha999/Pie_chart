import React, { Component } from 'react';
import * as d3 from 'd3';
import Slice from './Slice';


class Pie extends Component {

  constructor(props) {
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
  }

  render() {
    
    const {x, y, dataValue} = this.props;
    const pie = d3.pie(); 

    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* renders a slice for each data point  */}
        {pie(dataValue).map(this.renderSlice)}
      </g>
    );
  }  
  renderSlice(value,i) {
    const {innerRadius, outerRadius, padAngle, fill,dataCategory} = this.props;
    return (
      <Slice key={i}
             innerRadius={innerRadius}
             outerRadius={outerRadius}
             padAngle={padAngle}
             value={value}
             label={value.data}
             dataCategory={dataCategory[i]}
             fill={fill[i]}
             />
    );
  }
}

export default Pie;
