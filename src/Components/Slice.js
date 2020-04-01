import React, { Component } from 'react';
import * as d3 from 'd3';

class Slice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      opacity: 0,
      fillOpacity: 1
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({
      isHovered: true,
      opacity: 1,
      fillOpacity:0.8
    });
  }

  onMouseOut() {
    this.setState({
      isHovered: false,
      opacity: 0,
      fillOpacity: 1
    });
  }
 
  render() {
    const {value, label, fill, innerRadius = 0, outerRadius, padAngle,dataCategory} = this.props;
    // console.log(value)
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .padAngle(padAngle);
    return (
      <g onMouseOver={this.onMouseOver}
         onMouseOut={this.onMouseOut}>
        <path d={arc(value)}
              fill={fill}
              fillOpacity={this.state.fillOpacity} />

<text transform={`translate(${0}, ${0})`}
              dy=".35em"
              fontSize="22px"
              textAnchor="middle"
              fill={fill}
              opacity={this.state.opacity}>
              {`${dataCategory}:
              \n
              ${label}`}
          
              
        </text>      
        {/* <text transform={`translate(${arc.centroid(value)})`}
              dy=".35em"
              // fontSize="15px"
              textAnchor="middle"
              fill="white"
              opacity={this.state.opacity}>
              {label} 
        </text> */}
      </g>
    );
  }
};

export default Slice;
