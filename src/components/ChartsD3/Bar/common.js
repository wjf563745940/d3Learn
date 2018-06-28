import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsBar = function (el, options) {
    //this.options = options
   // this.$el = el;
   D3Charts.call(this)
}
D3ChartsBar.prototype=new D3Charts();
D3ChartsBar.prototype.constructor=D3ChartsBar;
D3ChartsBar.prototype.drawContent=function drawContent(){
    var svg = this.$el;
    var dataSet=this.getDataSet();
    var staticp = this.options.static;
    var padding=staticp.padding;
    var ScaleParam = this.getScaleParam();
    var { xScale, yScale } = createScale(ScaleParam,true);
    svg.selectAll("rect")
        .data(dataSet)//绑定元素
        .enter()//获取enter部分
        .append("rect")//让元素跟数据同步
        .attr("fill","steelbule")
        .attr("x",function(d,i){

            return padding.left+xScale(d.x);
        })
        .attr("y",function(d,i){
 
          
            return staticp.height-padding.bottom;
        })
        .attr("width",xScale.bandwidth)
        .attr("height",function(d){
     
            return yScale(d.y) ;
        })
        .attr("fill",(d,i)=>{
            
            return this.options.series[0].itemStyle.normal.color({dataIndex:i})
        }).transition()
        .attr("height",function(d){
     
            return yScale(d.y);
        })
        .attr("y",function(d){
     
            return staticp.height-padding.bottom-yScale(d.y);
        })
        .duration(1000)

}


export default new D3ChartsBar()

