import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var data = d3.range(1000).map(d3.randomBates(10));//生成数据
        console.log(data)
        var formatCount = d3.format(",.0f");//设置数据格式 浮点后保留一位

        var svg = d3.select("#zhiFan"),
            margin = { top: 10, right: 30, bottom: 30, left: 30 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");//设置元素 位置

        var x = d3.scaleLinear()
            .rangeRound([0, width]);//创建一个线性尺度 并设置个连续范围 看锯齿band.range(range).round(true);
          
        console.log(x)
        console.log(x.ticks(20))
        console.log(x.domain())
        //(分箱)数组, 每个分箱都是一个包含一组来自 data 的数据的数组
        var bins = d3.histogram()//直方图生成器
            .domain(x.domain())//设置课观测区间
            .thresholds(x.ticks(20))//设置直方图阀值生成方式
            (data);

        var y = d3.scaleLinear()
            .domain([0, d3.max(bins, function (d) { return d.length; })])
            .range([height, 0]);

        var bar = g.selectAll(".bar")
            .data(bins)//根据bins数据数据添加到元素里
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
            .attr("height", function (d) { return height - y(d.length); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
            .attr("text-anchor", "middle")
            .text(function (d) { return formatCount(d.length); });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        g.append("g")
            .attr("class", "axis axis--x axis--y")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(y))
            
    };
    render() {


        return (
            <div >
                <svg id="zhiFan" className={styles.barCon} width="960" height="500"></svg>
            </div>
        )
    }
}