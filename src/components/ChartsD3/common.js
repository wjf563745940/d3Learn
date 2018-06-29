import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from './util'
var D3Charts = function (el, options) {
    this.options = options
    this.$el = el;

}
D3Charts.DEFAULTS = {
    width: 600,
    height: 600,
    padding: { top: 50, right: 50, bottom: 50, left: 50 },
    onClick: function () {
        return false
    }
}
D3Charts.prototype.init = function (el) {
    this.$el = el;
    return this;
}
D3Charts.prototype.DEFAULTOPTIONS = {
    title: { name: "test" },
    legend: {},
    xAxis: [{
        type: 'category',
        data: ['Mon'],
        position: "bottom",
    }],
    yAxis: [{
        type: 'value',
        position: "left"
    }],
    series: [{
        data: [100],
        type: 'bar',
        itemStyle: {
            normal: {
                color: function(params) { //根据价格和收盘价比较设置柱状图颜色
                   return "#333"
                }
            }
        }
    }]
}
D3Charts.prototype.setOption = function (options) {
    if( getType(options.xAxis)=="object"){
        options.xAxis=[options.xAxis]
    }
    if( getType(options.yAxis)=="object"){
        options.yAxis=[options.yAxis]
    }
    console.log(this.DEFAULTOPTIONS) 
    console.log(options)
    this.options = this.mergeOption(options, this.DEFAULTOPTIONS);
    console.log( this.options)
    this.draw();
}
D3Charts.prototype.mergeOption = function (newOpts, defaultOpts) {//合并参数
    var con = deepClone(defaultOpts, newOpts);
    console.log(con)
    return Object.assign({}, con, { static: D3Charts.DEFAULTS });
}
D3Charts.prototype.draw = function () {
    this.drawAxis();
    this.drawContent(); 
}
D3Charts.prototype.drawContent=function drawContent(){   
}
D3Charts.prototype.getDataSet=function(){
    var dataSet=[];
    this.options.series[0].data.forEach((item,i)=>{
        dataSet.push({x:this.options.xAxis[0].data[i],y:item})
    })
    return dataSet;
}
D3Charts.prototype.drawAxis=function drawAxis(){
    var ScaleParam = this.getScaleParam()
    var { xScale, yScale } = createScale(ScaleParam);
    var axiosp = this.getAxisParam();
    axiosp.x.xScale=xScale;
    axiosp.y.yScale=yScale;

    var { xAxis, yAxis } = createAxis(axiosp)
    var staticp = this.options.static;
    var padding = staticp.padding;

    var svg = this.$el;
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + (staticp.height - padding.bottom) + ")")
        .call(xAxis)
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis)
}
D3Charts.prototype.getScaleParam = function () {
    var x = {}, y = {};
    var options = this.options;
    var staticp = options.static;
    if (this.options.xAxis[0].type == "category") {
        x.domainfrom = 0;
        x.domainto = options.xAxis[0].data;
        x.type=this.options.xAxis[0].type;
    } else if (this.options.xAxis[0].type == "value") {
        x.domainfrom = d3.min(options.xAxis[0].data);
        x.domainto = d3.max(options.xAxis[0].data);
    }
    x.rangefrom = 0;
    x.rangeto = staticp.width - staticp.padding.left - staticp.padding.right;
    y.domainfrom = 0;
    console.log(options)
    options.series[0].data.forEach((item,i)=>{
        options.series[0].data[i]= options.series[0].data[i]*1
    })
    y.domainto = d3.max(options.series[0].data);
    y.rangefrom = staticp.height - staticp.padding.top - staticp.padding.bottom;
    y.rangeto = 0;
    return { x, y }
}
D3Charts.prototype.getAxisParam = function () {
    var defaultNum=this.options.width/100;
   
    var xvalues=this.options.xAxis[0].data;
    var interval=Math.floor(xvalues.length/defaultNum);
    if(this.options.xAxis[0].axisLabel){
     if(this.options.xAxis[0].axisLabel.interval){
        interval=this.options.xAxis[0].axisLabel.interval;
        defaultNum=Math.floor(xvalues.length/this.options.xAxis[0].axisLabel.interval);

     }  
    }  
    var tickValues=[];

    for(let i=0;i<defaultNum;i++){
        tickValues.push(xvalues[i*interval]) 
    }
    return { x: {position:this.options.xAxis[0].position,tickValues:tickValues}, y: {position:this.options.yAxis[0].position} }
}

export default  D3Charts

