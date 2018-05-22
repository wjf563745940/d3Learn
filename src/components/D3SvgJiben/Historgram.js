import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import {Button} from 'antd';
import { RSA_NO_PADDING } from 'constants';

export default class D3SvgLine extends Component {
    state = {
        dataSet: [51,22,34,44,55,111,229],
        pars:{width:400,
                height:400,
                padding:    {top:20,right:20,bottom:20,left:20}, 
                reactStep:35,
                reactWidth:30  
        },
    };
    componentDidMount() {
        // var width=400;
        // var height=400;
        // var padding={top:20,right:20,bottom:20,left:20};
        // var reactStep=35;
        // var reactWidth=30;
        var {width,height,padding,reactStep,reactWidth}=this.state.pars;
        var {dataSet}=this.state;

        d3.select("#chart2").selectAll("rect")
        .data(dataSet)//绑定元素
        .enter()//获取enter部分
        .append("rect")//让元素跟数据同步
        .attr("fill","steelbule")
        .attr("x",function(d,i){
            return padding.left+i*reactStep;
        })
        .attr("y",function(d,i){
            return height-padding.bottom-d;
        })
        .attr("width",reactWidth)
        .attr("height",function(d){
            return d;
        })
        d3.select("#chart2").selectAll("text")
        .data(dataSet)
        .enter()
        .append("text")
        .attr("fill",'white')
        .attr("font-size","12px")
        .attr("text-anchor",'middle')
        .attr("x",function(d,i){
            return padding.left+i*reactStep;
        })
        .attr("y",function(d,i){
            return height-padding.bottom-d;
        })
        .attr("dx",reactWidth/2)
        .attr("dy",'1rem')
        .text(function(d){
            return d
        })

    };
    draw(){
        var {width,height,padding,reactStep,reactWidth}=this.state.pars;
        var {dataSet}=this.state;
        var svg=d3.select("#chart2");
        var updateRect=svg.selectAll("rect").data(dataSet);
        var enterRect=updateRect.enter();
        var exitRect=updateRect.exit();

        var updateRect2=svg.selectAll("text").data(dataSet);
        var enterRect2=updateRect2.enter();
        var exitRect2=updateRect2.exit();
        updateRect.attr("fill","steelbule")
        .attr("x",function(d,i){
            return padding.left+i*reactStep;
        })
        .attr("y",function(d,i){
            return height-padding.bottom-d;
        })
        .attr("width",reactWidth)
        .attr("height",function(d){
            return d;
        })
        console.log(updateRect)
        console.log(enterRect)
        console.log(updateRect2)
        console.log(enterRect2)
        enterRect.append("rect").attr("fill","steelbule")
        .attr("x",function(d,i){
            return padding.left+i*reactStep;
        })
        .attr("y",function(d,i){
            return height-padding.bottom-d;
        })
        .attr("width",reactWidth)
        .attr("height",function(d){
            return d;
        })
        exitRect.remove();

        updateRect2.attr("fill",'white')
        .attr("font-size","12px")
        .attr("text-anchor",'middle')
        .attr("x",function(d,i){
            return padding.left+i*reactStep;
        })
        .attr("y",function(d,i){
            return height-padding.bottom-d;
        })
        .attr("dx",reactWidth/2)
        .attr("dy",'1rem')
        .text(function(d){
            return d
        })
        enterRect2.append("text").attr("fill",'white')
        .attr("font-size","12px")
        .attr("text-anchor",'middle')
        .attr("x",function(d,i){
            return padding.left+i*reactStep;
        })
        .attr("y",function(d,i){
            return height-padding.bottom-d;
        })
        .attr("dx",reactWidth/2)
        .attr("dy",'1rem')
        .text(function(d){
            return d
        })
        exitRect2.remove();

    };
    mySort(){
        var {dataSet}=this.state;
        this.setState({dataSet:dataSet.sort(d3.ascending)})
        this.draw();
    };
    myAdd(){
        var {dataSet}=this.state;
        dataSet.push(Math.floor(Math.random()*100));
        this.setState({dataSet:dataSet});
        this.draw();
    };
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart2" width="800" height="400"></svg>
                <div>
                <Button type="primary" onClick={this.mySort.bind(this)}>排序</Button>
                <Button type="primary" onClick={this.myAdd.bind(this)}>添加一个数据</Button>
                </div>
            </div>
        )
    }
}