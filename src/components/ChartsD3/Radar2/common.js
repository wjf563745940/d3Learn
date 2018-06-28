import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsRadar = function (el, options) {
    //this.options = options
    // this.$el = el;
    D3Charts.call(this)
}
D3ChartsRadar.prototype = new D3Charts();
D3ChartsRadar.prototype.constructor = D3ChartsRadar;

D3ChartsRadar.prototype.draw = function () {
    this.drawContent();
}
D3ChartsRadar.prototype.drawContent = function () {
    var svg = this.$el;
    console.log(this)
    var staticp = this.options.static;
    var width = staticp.width;
    var option=this.options;
    var height = staticp.height;
    var series = this.options.series == undefined ? [] : this.options.series;
    var datacolor = series[0].color ? series[0].color : "#1f77b4";
    var radar = [];
    var main = svg.append("g")
        .classed("main", true)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    if (option.radarAxis != undefined) {
        if (Object.prototype.toString.call(option.radarAxis) === "[object Array]") {
            radar = option.radarAxis;
        } else {
            radar.push(option.radarAxis)
        }
    }
    var axisLineColor = radar[0].axisLine ? radar[0].axisLine.lineStyle.color : "gray";
    var splitLineColor = radar[0].axisLine ? radar[0].splitLine.lineStyle.color : "gray";
    var splitAreaColor = radar[0].axisLine ? radar[0].splitArea.areaStyle.color : "gray";

    if (series.length === 0) {
        return;
    }
    var palette = d3.schemeCategory10;
    console.log(option)
    function getColor(idx) {

        return palette[idx % palette.length];
    }
    // 设定一些方便计算的常量
    var radius = 200,
        // 指标的个数，即fieldNames的长度

        total = radar[0].indicator.length,
        // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
        level = option.level ? option.level : 5,
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

        var webs = main.append('g')
            .classed('webs', true);
        webs.selectAll('polygon')
            .data(polygons.webs)
            .enter()
            .append('polygon')
            .attr("stroke", function (d, i) {
                return splitLineColor[i % 2]
            })
            .attr("fill", (d, i) => {
                return splitAreaColor[i % 2]
            })
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
            .attr("fill", axisLineColor)
            .attr("stroke", axisLineColor)
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
    function drawData() {
        for (var i = 0; i < values.length; i++) {
            var value = values[i].value,
                nowmax = d3.max(value),
                area = '',
                points = [];
            for (var k = 0; k < total; k++) {
                console.log(radar)
                nowmax = radar[0].indicator[k].max ? radar[0].indicator[k].max : nowmax;
                var r = radius * (value[k]) / (nowmax);
                var x = r * Math.sin(k * onePiece),
                    y = r * Math.cos(k * onePiece);
                area += x + ',' + y + ' ';
                points.push({
                    x: x,
                    y: y
                })
            }
            areasData.push({
                polygon: area,
                points: points
            });
        }

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
                    return datacolor;
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
                    return datacolor;
                });
        }


        var textPoints = [];
        var textRadius = radius + 30;
        for (var i = 0; i < total; i++) {
            var x = textRadius * Math.sin(i * onePiece),
                y = (radius + 10) * Math.cos(i * onePiece);
            x = x == 0 ? (x - 30) : (x - 30)
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
        if (option.title) {
            svg.selectAll('.title')
                .data([option.title.text])
                .enter()
                .append('text')
                .classed("title", true)
                .attr("x", function () {
                    return 20
                })
                .attr("y", d => 20)
                .text(d => { return d })
        };
        if (option.legend.data && option.legend.data.length > 0) {
            //  option.legend.forEach(element => {
            svg.selectAll('.legend')
                .data(option.legend.data)
                .enter()
                .append('text')
                .classed("legend", true)
                .attr("x", function (d, i) {
                    return 100 + i * 200 + 100
                })
                .attr("y", d => 20)
                .text(d => { return d })
            svg.selectAll('.legendb')
                .data(option.legend.data)
                .enter()
                .append("rect")
                .classed("legendb", true)
                .attr("x", (d, i) => {
                    return 60 + i * 200 + 100
                })
                .attr("y", 10)
                .attr("width", 30)
                .attr("height", 15)
                .attr("fill", (d, i) => {
                    return palette[i]
                })
            //});
        }
    }
    drawData()
}
export default new D3ChartsRadar()