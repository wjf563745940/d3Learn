import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import { Button } from 'antd';
export default class D3SvgLine extends Component {

    state = {
        width: 600,
        height: 600,
        xAxisWidth: 500,
        yAxisWidth: 500,
        padding: { top: 30, right: 30, bottom: 30, left: 30 },

        xScale: '',
        yScale: '',
        center: [[0.5, 0.5],

        [0.7, 0.8],
        [0.4, 0.9],
        [0.11, 0.32],
        [0.88, 0.25],
        [0.75, 0.12],
        [0.5, 0.1],
        [0.2, 0.3],
        [0.4, 0.1],
        [0.6, 0.7],
        [0, 0],
        ]
    };
    componentDidMount() {
        var { center,xAxisWidth,yAxisWidth } = this.state
        //   var center
        //设置比例尺
        var xScale =this.getXScale()
        var yScale = this.getYScale();
       // this.setState({ yScale:yScale });
        //console.log(this.state.yScale)
        this.drawCicle()
        this.drawAxis(); 

    };
    getXScale(){
        var { center,xAxisWidth,yAxisWidth } = this.state
        return  d3.scaleLinear()
        .domain([0, 1.2 * d3.max(center, (d) => {
            return d[0]
        })])
        .range([0, xAxisWidth])
    };
    getYScale(){
        var { center,xAxisWidth,yAxisWidth } = this.state
        return  d3.scaleLinear()
        .domain([0, 1.2 * d3.max(center, (d) => {
            return d[1]
        })])
        .range([0, yAxisWidth]);
    };
    drawCicle() {
        //画根据比例尺画圆
        var xScale =this.getXScale()
        var yScale = this.getYScale();
        var { center,yAxisWidth,padding,height } = this.state
        console.log(this.state.yScale)
        console.log(yScale)
        var svg = d3.select("#sandian")
        var circleUpdate = svg.selectAll("circle")
            .data(center)
        var circleEnter = circleUpdate.enter()
        var circleExit = circleUpdate.exit()
        circleUpdate.transition()
            .duration(500)
            .attr("cx", function (d) {
                return padding.left + xScale(d[0])
            })
            .attr('cy', d => { return yAxisWidth + padding.bottom - yScale(d[1]) })
           
        circleEnter
            .append('circle')
            .attr('fill', 'black')
            .attr("cx", padding.left)
            .attr("cy", height - padding.bottom)
            .attr("r", 7)
            .transition()
            .duration(500)
            .attr('cx', d => { return padding.left + xScale(d[0]) })
            .attr('cy', d => { return yAxisWidth + padding.bottom - yScale(d[1]) })
        //  .attr("r",7);

        circleExit.transition()
            .duration(500)
            .attr("fill", "white")
            .remove();
              
    };
    drawAxis() {
        var xScale =this.getXScale()
        var yScale = this.getYScale();
        //画坐标
        var { center,yAxisWidth,padding } = this.state
        var svg = d3.select("#sandian")
        var xaxis = d3.axisBottom()
            .scale(xScale)//设置坐标比例尺
        svg.append("g")
            .attr("transform", "translate(" + padding.left + "," + (yAxisWidth + padding.bottom) + ")")
            .call(xaxis)
        yScale.range([yAxisWidth, 0])
        var yaxis = d3.axisLeft()
            .scale(yScale)//设置坐标比例尺
        svg.append("g")
            .attr("transform", "translate(" + padding.left + "," + padding.bottom + ")")
            .call(yaxis)
        yScale.range([0, yAxisWidth])
    };
    update() {
        var { center,yAxisWidth,padding } = this.state
        for (var i = 0; i < center.length; i++) {
            center[i][0] = Math.random()
            center[i][1] = Math.random()
        }
        this.drawCicle()
    };
    add() {
        var { center,yAxisWidth,padding } = this.state
        center.push([Math.random(), Math.random()])
        this.drawCicle();
    };
    sub() {
        var { center,yAxisWidth,padding } = this.state
        center.pop();
        this.drawCicle();
    };
    render() {


        return (
            <div >
                <svg id="sandian" className={styles.barCon} width="600" height="600"></svg>
                <div>
                    <Button type="primary" onClick={this.update.bind(this)}>update</Button>
                    <Button type="primary" onClick={this.add.bind(this)}>add</Button>
                    <Button type="primary" onClick={this.sub.bind(this)}>sub</Button>
                </div>
            </div>
        )
    }
}