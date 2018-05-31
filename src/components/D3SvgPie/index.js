import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import styles2 from './index.css';
import styled from 'styled-components';
export default class D3SvgLine extends Component {
    componentDidMount() {
        var width = 600, height = 600;
        var svg = d3.select("#chart")
        var dataset = [["小米", 60.8], ["三星", 58.4], ["苹果", 99], ["华为", 66]]
        var pie = d3.pie()
            .value(d => d[1])
        var piedata = pie(dataset)
        console.log(piedata)
        var outerRadius = width / 3;
        var innerRadius = 0;
        var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        var color = d3.schemeCategory20;
        var arcs = svg.selectAll("g")
            .data(piedata)
            .enter()
            .append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
        arcs.append("path")
            //.attr("fill","none")
            //.attr("stroke-width",3)
            .attr("fill", (d, i) => { console.log(color[i]); return color[i] })
            .attr("d", d => arc(d))
        ///绘制数字
        arcs.append("text")
            .attr("transform", d => {
                var x = arc.centroid(d)[0] * 1.4
                var y = arc.centroid(d)[1] * 1.4
                return "translate(" + x + "," + y + ")"
            })
            .attr("text-anchor", "middle")
            .text(d => {
                var percent = Number(d.value) / d3.sum(dataset, d => d[1]) * 100
                return percent.toFixed(1) + "%";
            })

        //绘制文字
        arcs.append("line")
            .attr("stroke", "black")
            .attr("x1", d => arc.centroid(d)[0] * 2)
            .attr("y1", d => arc.centroid(d)[1] * 2)
            .attr("x2", d => arc.centroid(d)[0] * 2.2)
            .attr("y2", d => arc.centroid(d)[1] * 2.2)

        arcs.append("text")
            .attr("transform", d => {
                var x = arc.centroid(d)[0] * 2.5
                var y = arc.centroid(d)[1] * 2.5
                return "translate(" + x + "," + y + ")"
            })
            .attr("text-anchor", "middle")
            .text(d => {
                return d.data[0]
            })
           var tooltip =d3.select("#chartCon")
           .append("div")
             .attr("class","tooltip") 
        var tooltip = d3.select("#tooltip")
            .style("opacity", 0)
        arcs.on("mouseover", d => {
            tooltip.html(d.data[0] + "出货量为<br/>" + d.data[1] + "百万台")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity", 1)
        })
        arcs.on("mousemove", d => {
            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
        })
        arcs.on("mouseout", d => {
            tooltip.style("opacity", 0)
        })

    };
    render() {
        const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Wrapper=styled.div`
        padding:1rem;
`

        return (
            <div id="chartCon" className={styles.chartCon}>
                <Wrapper>
                    <Title>Hello World, this is my first styled component!</Title>
                </Wrapper>
                <div id="tooltip" className={styles.tooltip}></div>
                <svg className={styles.chart} id="chart" width="600" height="600"></svg>
            </div>
        )
    }
}