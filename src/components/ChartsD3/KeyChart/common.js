import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsKeyChart = function (el, options) {
    //this.options = options
    // this.$el = el;
    D3Charts.call(this);
    this.type = "kline"
}
var _getscale = D3Charts.prototype.getScaleParam;
var _getAxisParam = D3Charts.prototype.getAxisParam;
D3ChartsKeyChart.prototype = new D3Charts();
D3ChartsKeyChart.prototype.constructor = D3ChartsKeyChart;

D3ChartsKeyChart.prototype.drawContent = function () {

    console.log(this.options)
    console.log("drwa keychart")
    // this.drawK();
    // this.drawLine();
    this.drawKey();
}
D3ChartsKeyChart.prototype.drawKey = function () {
    var svg = this.$el;
    var staticp = this.options.static;
    var padding = staticp.padding;
    var seriesOption = this.getKeyDataSet();
    var ScaleParam = this.getScaleParam();
     var { xScale, yScale } = createScale(ScaleParam);
    console.log(seriesOption)
    var linePath = d3.line()
        .x(d => { return xScale(d[0]) })
        .y(d => { return yScale(d[1]) })
    svg.selectAll(".linePath")
        .data(seriesOption)
        .enter()
        .append("path")
        .classed("linePath", true)
        .attr("transform", "translate(" + padding.left + "," + padding.right + ")")
        .attr("d", d => linePath(d))
        .attr("fill", "none")
        .attr("stroke-width", (d, i) => {
          console.log(d)
           if(d[d.length-1][2]=="bold"){
               return 3;
           }else if(d[d.length-1][2]=="thin"){
               return 1;
           }
        return 2
        })
        .attr("stroke", (d, i) => {
            return "#111"
        })
}
D3ChartsKeyChart.prototype.drawK = function () {
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
D3ChartsKeyChart.prototype.drawLine = function () {
    var svg = this.$el;
    var seriesOption = this.getLineDataSet();
    console.log(seriesOption)
    var staticp = this.options.static;
    var padding = staticp.padding;
    var ScaleParam = this.getScaleParam();
    var { xScale, yScale } = createScale(ScaleParam);
    var linePath = d3.line()
        .x(d => { console.log(d); if (d[0] == "" || d[0] == "-") d[0] = 0; return xScale(d[0]) })
        .y(d => { console.log(d); if (d[1] == "" || d[1] == "-" || isNaN(d[1])) return null; return yScale(d[1]) })
    var lines = svg.append("g")
        .classed("lines", true);
    lines.selectAll(".linePath")
        .data(seriesOption)
        .enter()
        .append("path")
        .classed("linePath", true)
        .attr("transform", "translate(" + padding.left + "," + padding.right + ")")
        .attr("d", (d, i) => { console.log(d); return linePath(d) })
        .attr("fill", "none")
        .attr("stroke", (d, i) => {
            return staticp.colors[i]
        })
}
D3ChartsKeyChart.prototype.getKDataSet = function () {

    return this.options.series[0].data;
}
D3ChartsKeyChart.prototype.getLineDataSet = function () {
    var dataSet = [];
    var option = this.options;
    var seriesOption = this.options.series;
    var xAxisOption = this.options.xAxis[0];
    seriesOption.slice(1, seriesOption.length).forEach((item, i) => {
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
D3ChartsKeyChart.prototype.getKeyDataSet = function () {
    var index = 1;
    var verori = "";
    var ver = "";
    var zhuanxiangzhi = 1;//3%*initdata
    // console.log(this.options);
    var result = [];
    var datas = this.options.series[0].data;
    var higher = 0;
    var highest = 0;
    var lower = 0;
    var lowest = 0;
    var lastData = datas[0][0];
    var type = "";
    for (var i = 1; i < datas.length; i++) {
        var item = datas[i][0];
        if (item == lastData || item == datas[i - 1][0]) {
            continue;
        }
        if (item > lastData) {
            if (ver == "" || ver == "up") {
                verori = ver;
                ver = "up"
                addpoint(lastData, item, i);
            } else {
                if ((item - lastData) < zhuanxiangzhi) {
                    continue;
                } else {
                    verori = ver;
                    ver = "up"
                    addpoint(lastData, item, i);
                }
            }
        } else {
            if (ver == "" || ver == "down") {
                verori = ver;
                ver = "down"
                addpoint(lastData, item, i);
            } else {
                if ((lastData - item) < zhuanxiangzhi) {
                    continue;
                } else {
                    verori = ver;
                    ver = "down"
                    addpoint(lastData, item, i);
                }
            }
        }
    }
    function addpoint(data1, data2, oriIndex) {
        lastData = data2;
        if (ver == "up") {
            if (lower == 0) {//说明是第一次
                lowest = lower = data1;
                highest = higher = data2;
                type = "bold";
                result.push({ type: type, from: data1, to: data2, index: index, oriIndex: oriIndex + 1, lower: lower, higher: higher, ver: ver });

            } else {
                if (ver != verori) {
                    index += 1;
                    higher = data2;
                    lowest = data1;
                }
                if (data2 > higher) {
                    higher = data2;
                }
                if (higher > highest && result[result.length - 1].type == "thin") {
                    var oriHigher = highest;
                    highest = higher;
                    type = "bold";
                    result.push({ type: type, change: "bold", changeNum: oriHigher, from: data1, to: data2, index: index, oriIndex: oriIndex + 1, lower: lower, higher: higher, ver: ver })

                } else {
                    result.push({ type: type, from: data1, to: data2, index: index, oriIndex: oriIndex + 1, lower: lower, higher: higher, ver: ver })
                }



            }


        } else {//down
            if (higher == 0) {//说明是第一次
                highest = higher = data1;
                lowest = lower = data2;
                type = "thin";
                result.push({ type: type, from: data1, to: data2, index: index, oriIndex: oriIndex + 1, lower: lower, higher: higher, ver: ver })

            } else {
                if (ver != verori) {
                    index += 1;
                    lower = data2;
                    highest = data1;
                }
                if (data2 < lower && result[result.length - 1].type == "bold") {
                    lower = data2;
                }
                if (lower < lowest) {
                    var oriLower = lowest;
                    lowest = lower
                    type = "thin";
                    result.push({ type: type, change: "thin", changeNum: oriLower, from: data1, to: data2, index: index, oriIndex: oriIndex + 1, lower: lower, higher: higher, ver: ver });
                } else {
                    result.push({ type: type, from: data1, to: data2, index: index, oriIndex: oriIndex + 1, lower: lower, higher: higher, ver: ver });
                }



            }


        }
    }

    function getPoint(r) {
        var tt=[];
        var result = [];
        result.push([r[0].index, r[0].from, ""])
        for (var i = 0; i < r.length; i++) {
            var item = r[i];
            if (i>0 && item.index != r[i - 1].index) {
                result.push([item.index, item.from, item.type])
            }
            if (item.changeNum == undefined) {
                result.push([item.index, item.to, item.type])
            } else {
                console.log(item.changeNum)
                result.push([item.index, item.changeNum, r[i-1].type])
                tt.push(result);
                result=[];
                result.push([item.index, item.changeNum, item.type])
                if(item.changeNum==item.from){
                    
                    result.push([item.index, item.to, item.type])
                }else{
                    result.push([item.index, item.changeNum, item.type])
                    result.push([item.index, item.to, item.type])
                }
                
            }
        }
        tt.push(result);
                
        return tt
    }
    console.log(result)
    return getPoint(result);
}
D3ChartsKeyChart.prototype.getScaleParam = function () {
    var r = _getscale.apply(this, Array.prototype.slice.apply(arguments));
    var xAxis = this.options.xAxis[0];
    console.log(this.options)
    var num = Math.ceil((xAxis.data.length) / 4);
    var arr = d3.range(1, num, 1);
    console.log(arr, num)
    r.x.domainto = arr;
    return r

}

D3ChartsKeyChart.prototype.getAxisParam = function () {
    var r = _getAxisParam.apply(this, Array.prototype.slice.apply(arguments));
    var xAxis = this.options.xAxis[0];
    console.log(this.options)
    var num = Math.ceil((xAxis.data.length) / 4);
    var arr = d3.range(1, num, 1);
    console.log(arr, num)
    r.x.tickValues = arr;
    return r
}
export default new D3ChartsKeyChart()