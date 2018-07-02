import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsLine = function (el, options) {
    // this.options = options
    // this.$el = el;
 D3Charts.call(this)
}
D3ChartsLine.prototype=new D3Charts();
D3ChartsLine.prototype.constructor=D3ChartsLine;
D3ChartsLine.prototype.drawContent=function(){
    var svg = this.$el;
    var seriesOption=this.getDataSet();
    var staticp = this.options.static;
    var padding=staticp.padding;
    var ScaleParam = this.getScaleParam();
     var { xScale, yScale } = createScale(ScaleParam);
    var linePath = d3.line()
    .x(d => { if (d[0] == "" || d[0] == "-") d[0] = 0; return xScale(d[0]) })
    .y(d => {if (d[1] == "" || d[1] == "-" || isNaN(d[1])) return null;return yScale(d[1]) })
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
D3ChartsLine.prototype.getDataSet=function(){
    var dataSet=[];
    var option=this.options;
    var seriesOption = this.options.series;

    var xAxisOption = option.xAxis ? option.xAxis[0] : (option.axis ? option.axis[0] : null);
    var yAxisOption = option.yAxis ? option.yAxis : (option.axis ? option.axis[1] : null);

    seriesOption.forEach((item, i) => {
        var arr = []
        xAxisOption.data.forEach((item2, j) => {
            if (item.data[j] !== "-") {
                arr.push([item2, item.data[j]]);
            }

        })
        seriesOption[i]["datanew"] = arr
    })
    return seriesOption;
}


export default new D3ChartsLine()

