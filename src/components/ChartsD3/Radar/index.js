import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    componentDidMount() {
        
        console.log(this.props)
        this.setOption(this.props.data)
       
    };
    setOption(option){
        var width = 600;
        var height = 600;
        var svg=d3.select("#chart")
        var main = svg.append("g")
            .classed("main", true)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var radar=[];  
        var series=  option.series==undefined?[]:option.series
            if(option.radar!=undefined){
                if(Object.prototype.toString.call(option.radar)==="[object Array]"){
                    radar=option.radar;
                }else{
                    radar.push(option.radar)
                }
            }
        var data = {
            fieldNames: ['语文', '数学', '外语', '物理', '化学', '生物', '政治', '历史'],
            values: [
                [25, 20, 30, 40, 50, 60, 70, 80]
            ]
        };
        if(series.length===0){
            return;
        }
        var palette = d3.schemeCategory10
        function getColor(idx) {
           
            return palette[idx % palette.length];
        }     
        // 设定一些方便计算的常量
        var radius = 200,
            // 指标的个数，即fieldNames的长度
            total = radar[0].indicator.length,
            // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
            level = option.level?option.level:5,
            // 网轴的范围，类似坐标轴
            rangeMin = 0,
            rangeMax = 200,
            arc = 2 * Math.PI;
        // 每项指标所在的角度
        var onePiece = arc / total;
        // 计算网轴的正多边形的坐标
        var polygons = {
            webs: [],
            webPoints: []
        };
        for (var k = level; k > 0; k--) {
            var webs = '',
                webPoints = [];
            var r = radius / level * k;
            for (var i = 0; i < total; i++) {
                var x = r * Math.sin(i * onePiece),
                    y = r * Math.cos(i * onePiece);
                webs += x + ',' + y + ' ';
                webPoints.push({
                    x: x,
                    y: y
                });
            }
            polygons.webs.push(webs);
            polygons.webPoints.push(webPoints);
        }
        (function painGrid() {
            // 绘制网轴
            console.log(polygons)

            var webs = main.append('g')
                .classed('webs', true);
            webs.selectAll('polygon')
                .data(polygons.webs)
                .enter()
                .append('polygon')
                .attr('points', function (d) {
                    return d;
                });
        })();
        function pianLine() {
            var lines = main.append('g')
                .classed('lines', true);
            lines.selectAll('line')
                .data(polygons.webPoints[0])
                .enter()
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', function (d) {
                    return d.x;
                })
                .attr('y2', function (d) {
                    return d.y;
                });
        }
        pianLine();

        var areasData = [];
        var values = series[0].data;
        for (var i = 0; i < values.length; i++) {
            var value = values[i].value,
            nowmax=d3.max(value),
                area = '',
                points = [];
            for (var k = 0; k < total; k++) {
                console.log(radar)
                 nowmax=radar[0].indicator[k].max?radar[0].indicator[k].max:nowmax;
                var r = radius * (value[k]) / (nowmax);
                var x = r * Math.sin(k * onePiece),
                    y = r * Math.cos(k * onePiece);
                area += x + ',' + y + ' ';
                points.push({
                    x: x,
                    y: y
                })
            }
            console.log(area)
            console.log(points)
            areasData.push({
                polygon: area,
                points: points
            });
        }
        console.log(areasData)
        var areas = main.append('g')
            .classed('areas', true);
        // 添加g分组用来包含一个雷达图区域下的多边形以及圆点 
        areas.selectAll('g')
            .data(areasData)
            .enter()
            .append('g')
            .attr('class', function (d, i) {
                return 'area' + (i + 1);
            });
        for (var i = 0; i < areasData.length; i++) {
            // 依次循环每个雷达图区域
            var area = areas.select('.area' + (i + 1)),
                areaData = areasData[i];
            // 绘制雷达图区域下的多边形
            area.append('polygon')
                .attr('points', areaData.polygon)
                .attr('stroke', function (d, index) {
                    return getColor(i);
                })
                .attr('fill', function (d, index) {
                   // return getColor(i);
                    return "rgba(0,0,0,0)"
                });
            // 绘制雷达图区域下的点 
            var circles = area.append('g')
                .classed('circles', true);
            circles.selectAll('circle')
                .data(areaData.points)
                .enter()
                .append('circle')
                .attr('cx', function (d) {
                    return d.x;
                })
                .attr('cy', function (d) {
                    return d.y;
                })
                .attr('r', 3)
                .attr('stroke', function (d, index) {
                    return getColor(i);
                });
        }


        var textPoints = [];
        var textRadius = radius + 60;
        for (var i = 0; i < total; i++) {
            var x = textRadius * Math.sin(i * onePiece),
                y = (radius+20) * Math.cos(i * onePiece);
                x=x==0?(x-60):(x-60)
            textPoints.push({
                x: x,
                y: y
            });
        }
        // 绘制文字标签
        var texts = main.append('g')
            .classed('texts', true);
        texts.selectAll('text')
            .data(textPoints)
            .enter()
            .append('text')
            .attr('x', function (d) {
                return d.x;
            })
            .attr('y', function (d) {
                return d.y;
            })
            .text(function (d, i) {
                return radar[0].indicator[i].name;
            });
            if(option.title){
                svg.selectAll('.title')
                .data([option.title.text])
                .enter()
                .append('text')
                .classed("title",true)
                .attr("x",function(){
                    return 20
                })
                .attr("y",d=> 20)
                .text(d=>{return d})
            };
            if(option.legend.data.length>0){
              //  option.legend.forEach(element => {
                    svg.selectAll('.legend')
                    .data(option.legend.data)
                    .enter()
                    .append('text')
                    .classed("legend",true)
                    .attr("x",function(d,i){
                        return 100+i*200+100
                    })
                    .attr("y",d=> 20)
                    .text(d=>{return d}) 
                    svg.selectAll('.legendb')
                    .data(option.legend.data)
                    .enter()
                    .append("rect")
                    .classed("legendb",true)
                    .attr("x",(d,i)=>{
                        return 60+i*200+100
                    })
                    .attr("y",10)
                    .attr("width",30)
                    .attr("height",15)
                    .attr("fill",(d,i)=>{
                        return palette[i]
                    })
                //});
            }
    }
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="600" height="600"></svg></div>
        )
    }
}