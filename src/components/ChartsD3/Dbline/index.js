import React, { Component } from 'react'

import * as d3 from "d3";
import styles from './index.less';
import d3Charts from './common'

export default class D3SvgLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        var defaultOption={

        }
      // this.setOption(this.props.data)
      var d3charts=   d3Charts.init(d3.select("#chart"));
      d3charts.setOption(this.props.data)
    };
    jisuanFun(num, nosurenum) {

        if (/^[0-9]+$/.test(nosurenum)) {
            return nosurenum * 1
        } else if (nosurenum.indexOf("%")) {
            return nosurenum.split("%")[0] * 10000 / 1000000 *num
        } else if (nosurenum.indexOf("px")) {
            return nosurenum.split("px")[0] * 1
        }
    }
    setOption(option) {
        var self = this;
        var width = 600;
        var height = 600;
        var padding = { top: 50, right: 50, bottom: 50, left: 50 };
        var svg = d3.select("#chart2");
        var xAxisOption = option.xAxis ? option.xAxis : (option.axis ? option.axis[0] : null);
        var yAxisOption = option.yAxis ? option.yAxis : (option.axis ? option.axis[1] : null);
        var seriesOption = option.series;
        seriesOption.forEach((item, i) => {
            var arr = []
            xAxisOption.data.forEach((item2, j) => {
                if (item.data[j] !== "-") {
                    arr.push([item2, item.data[j]]);
                }

            })
            seriesOption[i]["datanew"] = arr
        })
        if (xAxisOption.paddingInner) {
            padding[xAxisOption.position] = this.jisuanFun(height, xAxisOption.paddingInner)
        }
        if(option.grid){
            padding=option.grid
        }
        console.log("pddd",option.grid) 
        console.log("pddd",padding)
        var xScale,
            yScale;
        function createScale() {

            xScale = d3.scaleLinear()
                .domain([d3.min(xAxisOption.data), d3.max(xAxisOption.data)])
                .range([0, width - padding.left - padding.right])
            yScale = d3.scaleLinear()
                .domain([0, d3.max(seriesOption[0].data)])
                .range([height - padding.top - padding.bottom, 0])
        }

        var linePath = d3.line()
            .x(d => { if (d[0] == "" || d[0] == "-") d[0] = 0; return xScale(d[0]) })
            .y(d => {if (d[1] == "" || d[1] == "-") d[1] = 0; return yScale(d[1]) })

        function createAxis() {
            var xAxis = self.createAxisDir(xAxisOption.position)
                .scale(xScale)
            .ticks(5)
             .tickFormat(d3.format("d"))
            var yAxis = self.createAxisDir("left")
                .scale(yScale);
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
                .call(xAxis)
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
                .call(yAxis)
        }
        function createLine() {
            //绘制线

            svg.selectAll(".linePath")
                .data(seriesOption)
                .enter()
                .append("path")
                .classed("linePath", true)
                .attr("transform", "translate(" + padding.left + "," + padding.right + ")")
                .attr("d", d => linePath(d.datanew))
                .attr("fill", "none")
                .attr("stroke-width", (d,i)=>{
                    if(seriesOption[i].line!=undefined)
                    return 2
                    if(seriesOption[i].itemStyle!=undefined)
                    return seriesOption[i].itemStyle.normal.lineStyle.width
                })
                .attr("stroke", (d, i) => {
                    if(seriesOption[i].line!=undefined)
                    return seriesOption[i].line.style.normal.stroke
                    if(seriesOption[i].itemStyle!=undefined)
                    return seriesOption[i].itemStyle.normal.lineStyle.color
                })
        }
        function createLegend(){
            var legendOption=option.legend;
            legendOption.width=width;
            legendOption.height=height;
            var position=self.getPosByObj(legendOption)
            var legendC = svg.append('g')
            .classed('legend', true)
            .attr("transform","translate("+position.x+","+position.y+")")
            legendC.selectAll("text")
            .data(legendOption.data)
            .enter()
            .append("text")
            .attr("stroke",legendOption.textStyle.color)
            .attr("transform",(d,i)=>{
                return "translate("+ (i*100 +40)+",0)"
            })
            .text(d=>{
                return d
            })
            legendC.selectAll("rect")
            .data(legendOption.data)
            .enter()
            .append("rect")
            .attr("stroke", (d, i) => {
                if(seriesOption[i].line!=undefined)
                return seriesOption[i].line.style.normal.stroke
                if(seriesOption[i].itemStyle!=undefined)
                return seriesOption[i].itemStyle.normal.lineStyle.color
            })
            .attr("width",20)
            .attr("height",10)
            .attr("fill", (d, i) => {
                if(seriesOption[i].line!=undefined)
                return seriesOption[i].line.style.normal.stroke
                if(seriesOption[i].itemStyle!=undefined)
                return seriesOption[i].itemStyle.normal.lineStyle.color
            })
            .attr("transform",(d,i)=>{
                return "translate("+ (i*100)+",-10)"
            })
        }
        function init() {
            createScale();
            createAxis();
            createLine();
            createLegend();
        }
        init();


    }
    getPosByObj(obj)
    {
        var y=0,x=0;
        if(obj.top!=undefined){
            y=obj.top
        }if(obj.bottom!=undefined){
            y=obj.height-obj.bottom
        }if(obj.left!=undefined){
            x=obj.left
        }if(obj.right!=undefined){
            x=obj.width-obj.right
        }
        if(obj.padding){
            x-=obj.padding+(60+40)*2
            y-=obj.padding
        }
        return {x,y}
    }
    createAxisDir(dir) {
        var obj;
        switch (dir) {
            case "bottom":
                obj = d3.axisBottom();
                break;
            case "left":
                obj = d3.axisLeft();
                break;
            default:
                obj = d3.axisBottom();
        }
        return obj
    }
    render() {
      
        return (
            <div className={styles.chartCon}>
            <svg className={styles.chart} id="chart" width="600" height="600"></svg>
            <svg className={styles.chart} id="chart2" width="600" height="600"></svg>
            </div>
        )
    }
}