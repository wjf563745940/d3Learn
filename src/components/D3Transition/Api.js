import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";

export default class Search extends Component {
    state = {
        result: '',
        arr: "1, 2, 5, 77, 8768",
        normalArray1: [{ id: 100, name: '张某某', year: 1989, hometown: '北京' },
        { id: 100, name: '李某某', year: 1988, hometown: '北京' },
        { id: 100, name: 'x某某', year: 1988, hometown: '上海' },
        { id: 100, name: 'a某某', year: 1989, hometown: '北京' },
        { id: 100, name: 'b某某', year: 1989, hometown: '北京' },
        ],
        normalArray2: [88, 99],
        arrString: '',
        funName: ''
    };
    arrTorString = (arr) => {
        var str = "";
        arr.map((item) => {
            return str += JSON.stringify(item) + " ";
        })
        return str;
    };
    methName = (par) => {
        par.funName = par.funName.trim();
        var svg = d3.select("#test")
        switch (par.funName) {

            case "test":
                var t = d3.transition()
                    .duration(750)
                    .ease(d3.easeLinear);
                
                svg.append("rect")
                    .attr("fill", "steelblue")
                    .attr("x", 10)
                    .attr("y", 10)
                    .attr("width", 100)
                    .attr("height", 30)
                    .transition()
                    .attr("width", 300)
                    .transition()
                    .delay(1000)
                    .duration(2000)
                    .ease(d3.easeLinear)
                    .attr("width", 100)

                    .transition()
                    // .attrTween("fill",function(){
                    //     return d3.interpolateRgb("red","blue")

                    // })
                    .attrTween("fill", function () {
                        return function (t) {
                            console.log(t)
                            return "hsl(" + t * 360 + ",100%,50%)"
                        }
                    })
                    .transition(t)
                .on("start",function repeat(){
                    console.log("change bc")
                    d3.active(this)
                    .style("fill","red")
                    .transition()
                    .style("fill","blue")
                    .transition()
                    .on("start",repeat)
                })



                break;
            case "test2":
                       var text=svg.append("text")
                       .attr("fill","#666")
                       .attr("x",100)
                       .attr("y",10)
                       .attr("dy","1.2rem")
                       .attr("text-anchor","end")
                       .text(100)
                       var initx=text.attr("x")
                       var inittetx=text.text()
                       var textTran=text.transition()
                       .duration(2000)
                       .tween("text",function(){
                           return function(t){
                               console.log(t);
                               console.log(this)
                               console.log(d3.select(this))
                               d3.select("text")
                               .attr("x",Number(initx)+t*300)
                               .text(Math.floor(Number(inittetx)+t*300));
                           }
                       })

                       
                     
                break
                case "test3":
                var xScale=d3.scaleLinear()
                .domain([0,10])
                .range([0,300]);
                var xAxis=d3.axisBottom()
                .scale(xScale)
                var g=svg.append("g")
                .attr("transform","translate(50,200)")
                .call(xAxis)
                xScale.domain([0,50])
                g.transition()
                .duration(2000)
                .call(xAxis);
                break;
            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
            { name: "d3.transition - 创建一个过渡对象(过渡对象不是选择集对象两则有不同的方法和属性) ", funName: "transition " },
            { name: "d3.delay(delay) - 延迟发生时间 ", funName: "delay " },
            { name: "d3.duration(duration) - 过渡发生时间 ", funName: "duration " },
            { name: "d3.ease(easeFun) - 过渡发生样式（怎么去过渡 线性过渡之类 d3.easeBounce | d3.easeSinIn  ....） ", funName: "ease " },
            { name: "attrTween,styleTween 可以设置插补器（设置插值，返回一定范围的各种数据） ", funName: "attrTween " },
            {name:"each,on 绑定事件监听 可监听 start end interrput",funName:"on"},
        
            { name: "test", funName: "test" },
            { name: "测试文字", funName: "test2" },
            { name: "测试过渡坐标轴", funName: "test3" }

        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="" bordered={false}>
                <Row>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}> <svg id="test" width="600" height="600"></svg></Col>
                    {this.state.result != '' && (<Col span={8}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 