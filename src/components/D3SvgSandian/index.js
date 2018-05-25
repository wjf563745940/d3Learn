import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var width=600,
        height=600,
        xAxisWidth=500,
        yAxisWidth=500;
      var center=[[0.5,0.5],
      [0.7,0.8],
      [0.4,0.9],
      [0.11,0.32],
      [0.88,0.25],
      [0.75,0.12],
      [0.5,0.1],                
      [0.2,0.3],
      [0.4,0.1],
      [0.6,0.7],
      [0,0],
    ]
    //设置比例尺
    var xScale=d3.scaleLinear()
    .domain([0,1.2*d3.max(center,(d)=>{
        return d[0]
    })])
    .range([0,xAxisWidth])
    var yScale=d3.scaleLinear()
    .domain([0,1.2*d3.max(center,(d)=>{
        return d[1]
    })])
    .range([0,yAxisWidth]) ;
    var svg=d3.select("#sandian")
    var padding={top:30,right:30,bottom:30,left:30};
     //画根据比例尺画圆
     var circle=svg.selectAll('circle')
     .data(center)
     .enter()
     .append('circle')
     .attr('fill','black')
     .attr('cx',d=>{return padding.left+xScale(d[0])})
     .attr('cy',d=>{return yAxisWidth+padding.bottom-yScale(d[1])})
     .attr("r",5)
    //画坐标
    var xaxis=d3.axisBottom()
    .scale(xScale)//设置坐标比例尺
    svg.append("g")
            .attr("transform","translate("+padding.left+","+(yAxisWidth+padding.bottom)+")")
            .call(xaxis)
    yScale.range([yAxisWidth,0])
    var yaxis=d3.axisLeft()
    .scale(yScale)//设置坐标比例尺
    svg.append("g")
    .attr("transform","translate("+padding.left+","+padding.bottom+")")
    .call(yaxis)

   
    

    };
    render() {


        return (
            <div >
                <svg id="sandian" className={styles.barCon} width="600" height="600"></svg>
            </div>
        )
    }
}