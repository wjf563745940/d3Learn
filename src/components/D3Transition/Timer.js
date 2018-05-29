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
            { name: "d3.now  - 获取当前高精度时间戳 ", funName: "now " },
            { name: "d3.timer - 定义一个定时器 ", funName: "timer " },
            { name: "timer .restart  -  重新设置定时器的开始时间和回调 ", funName: "restart " },
            { name: "d3.stop - 停止定时器 ", funName: "stop " },
            { name: "d3.timerFlush  - 立即执行合法的定时器", funName: "timerFlush " },
            { name: "d3.timeout - 定义一个只执行一次回调的定时器 ", funName: "timeout " },
            { name: "d3.interval - 定义一个可以按照指定间隔执行回调的定时器", funName: "interval " },

        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="可用于绑定一些过度效果制作动画" bordered={false}>
                <Row>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}> <svg id="test" width="600" height="600"></svg></Col>
                    {this.state.result != '' && (<Col span={8}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 