import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone
} from './util'
var D3Charts=function(el,options){
    this.options=options
    this.$el=el;
    
}
D3Charts.DEFAULTS={
    width:600,
    height:600,
    padding:{ top: 50, right: 50, bottom: 50, left: 50 },
    onClick:function(){
        return false
    }
}
D3Charts.prototype.init=function(el){
    this.$el=el;
    return this;
}
D3Charts.prototype.DEFAULTOPTIONS={
    title:{name:"test"},
    legend:{},
    xAxis: {
        type: 'category',
        data: ['Mon'],
        position:"bottom",
    },
    yAxis: {
        type: 'value',
        position:"left"
    },
    series: [{
        data: [100],
        type: 'bar'
    }]
}
D3Charts.prototype.setOption=function(options){
    this.options=this.mergeOption(options,this.DEFAULTOPTIONS);
    this.draw();

}
D3Charts.prototype.mergeOption=function(newOpts,defaultOpts){
    console.log(defaultOpts)
   // console.log(Object.assign(defaultOpts,newOpts,{static:D3Charts.DEFAULTS}))    
   var con=deepClone(defaultOpts,newOpts);
   console.log(con)
  return Object.assign({}, con,{static:D3Charts.DEFAULTS}) ;
}
D3Charts.prototype.draw=function(){
        var {xScale,yScale}=createScale(this.getScaleParam());
        var {xAxis,yAxis}=createAxis(Object.assign({xScale,yScale},this.getAxisParam()))
        var staticp=this.options.static;
        var padding=staticp.padding;
        console.log(xAxis)
        var svg=this.$el;
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + (staticp.height - padding.bottom) + ")")
        .call(xAxis)
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis)
}
D3Charts.prototype.getScaleParam= function(){
    var x={},y={};
   
    var options=this.options;
    console.log(options)
    var staticp=options.static;
    if(this.options.xAxis.type=="category"){
        x.domainfrom= 0;
        x.domainto= options.xAxis.data.length;
    }else if(this.options.xAxis.type=="value"){
        x.domainfrom= d3.min(options.xAxis.data);
        x.domainto= d3.max(options.xAxis.data);
    }    
    x.rnagefrom=0;
    x.rnageto= staticp.width - staticp.padding.left - staticp.padding.right;
    y.domainfrom= 0;
    y.domainto= d3.max(options.series[0].data);
    y.rnagefrom=staticp.height - staticp.padding.top -staticp.padding.bottom;
    y.rnageto= 0;
    return {x,y}
}
D3Charts.prototype.getAxisParam=function(){
    console.log(this.options)
    return {x:this.options.xAxis.position,y:this.options.yAxis.position}
}

export default new D3Charts() 

