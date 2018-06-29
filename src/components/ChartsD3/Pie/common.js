import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsPie = function (el, options) {
    //this.options = options
    // this.$el = el;
    D3Charts.call(this)
}
D3ChartsPie.prototype = new D3Charts();
D3ChartsPie.prototype.constructor = D3ChartsPie;
D3ChartsPie.prototype.draw = function () {
    this.drawContent();
}
D3ChartsPie.prototype.drawContent = function drawContent() {
    console.log("----dirwa pie")
    var svg = this.$el;
    var staticp = this.options.static;
    var padding = staticp.padding;
    var width = staticp.width;
    var height = staticp.height;
    var dataset2 = this.getDataSet();
    console.log(dataset2)
    var dataset=[];
    for(var i=0;i<dataset2.length;i++){
        dataset[i]=[]
        dataset[i][0]=dataset2[i].y.name;
        dataset[i][1]=dataset2[i].y.value
    }
    console.log(dataset)
    var pie = d3.pie()
        .value(d =>{ return d[1]});
    var piedata = pie(dataset);
    var outerRadius = width / 3;
    var innerRadius = 0;
    console.log(piedata)
    ///绘制弧
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
        .attr("class",d=> "index"+d.index)
        //.attr("fill","none")
        //.attr("stroke-width",3)
        .attr("fill", (d, i) => { return color[i] })
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
    var tooltip = d3.select("#chartCon")
        .append("div")
        .attr("class", "tooltip")
    var tooltip = d3.select("#tooltip")
        .style("opacity", 0)
    arcs.on("mouseover", d => {
        var obj=d3.select(".index"+d.index);
        obj.attr("transform", "scale(1.05)")
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
        var obj=d3.select(".index"+d.index);
        obj.attr("transform", "scale(1)")
        tooltip.style("opacity", 0)
    })
}
export default new D3ChartsPie()

