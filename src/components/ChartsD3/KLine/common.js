import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsKLine = function (el, options) {
    //this.options = options
    // this.$el = el;
    D3Charts.call(this);
    this.type = "kline"
}
D3ChartsKLine.prototype = new D3Charts();
D3ChartsKLine.prototype.constructor = D3ChartsKLine;

// D3ChartsKLine.prototype.draw = function () {
//     this.drawContent();
// }
D3ChartsKLine.prototype.drawContent = function () {

    console.log(this.options)
    console.log("drwa kline")
    this.drawK();
    this.drawLine();
}
D3ChartsKLine.prototype.drawK = function () {
    var svg = this.$el;
    var staticp = this.options.static;
    var padding = staticp.padding;
    var seriesOption = this.getKDataSet();
    var ScaleParam = this.getScaleParam();
    var { xScale, yScale } = createScale(ScaleParam);
    var kwidth = 4;
    var linePath = d3.line()
        .x(d => { var date = this.options.xAxis[0].data[d[0]]; return xScale(date) })
        .y(d => { return yScale(d[1]) })
    var kgss = svg.append("g")
        .classed("kgs", true);
    var kgs = kgss.selectAll(".kg")
        .data(seriesOption)
        .enter()
        .append("g")
        .classed("kg", true)
        .attr("transform", (d, i) => { return "translate(" + padding.left + "," + padding.right + ")" })
    kgs.append("path")
        .attr("d", (d, i) => { return linePath([[i, d[2]], [i, d[3]]]) })
        .attr("stroke", (d, i) => {
            if (d[1] > d[0]) {
                return "#900"
            } else {
                return "green"
            }
        })
    kgs.append("rect")
        .attr("x", (d, i) => { var date = this.options.xAxis[0].data[i]; return xScale(date) - kwidth / 2 })
        .attr("y", d => { return yScale(d3.max([d[0], d[1]])) })
        .attr("width", kwidth)
        .attr("height", (d, i) => { return yScale(d3.min([d[0], d[1]])) - yScale(d3.max([d[0], d[1]])) })
        .attr("fill", (d, i) => {
            if (d[1] > d[0]) {
                return "#900"
            } else {
                return "green"
            }
        })

}
D3ChartsKLine.prototype.drawLine = function () {
    var svg = this.$el;
    var seriesOption = this.getLineDataSet();
    console.log(seriesOption)
    var staticp = this.options.static;
    var padding = staticp.padding;
    var ScaleParam = this.getScaleParam();
    var { xScale, yScale } = createScale(ScaleParam);
    var linePath = d3.line()
        .x(d => { console.log(d);if (d[0] == "" || d[0] == "-") d[0] = 0; return xScale(d[0]) })
        .y(d => {  console.log(d); if (d[1] == "" || d[1] == "-" || isNaN(d[1])) return null; return yScale(d[1]) })
    var lines = svg.append("g")
        .classed("lines", true);
    lines.selectAll(".linePath")
        .data(seriesOption)
        .enter()
        .append("path")
        .classed("linePath", true)
        .attr("transform", "translate(" + padding.left + "," + padding.right + ")")
        .attr("d", (d,i) => {console.log(d);return linePath(d)})
        .attr("fill", "none")
        .attr("stroke", (d, i) => {
        return    staticp.colors[i]
        })
}
D3ChartsKLine.prototype.getKDataSet = function () {

    return this.options.series[0].data;
}
D3ChartsKLine.prototype.getLineDataSet = function () {
    var dataSet = [];
    var option = this.options;
    var seriesOption = this.options.series;
    var xAxisOption = this.options.xAxis[0];
    seriesOption.slice(1,seriesOption.length).forEach((item, i) => {
     //   if (i != 0) {
            var arr = []
            xAxisOption.data.forEach((item2, j) => {
                if (item.data[j] !== "-") {
                    arr.push([item2, item.data[j]]);
                }

            })
            dataSet[i] = arr
        //}

    })
    // console.log()
    return dataSet;
}
export default new D3ChartsKLine()