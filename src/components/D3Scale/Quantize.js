import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";
import classNames from 'classnames';
export default class Search extends Component {
    state = {
        result: '',
        arr: "1, 2, 5, 77, 8768",
        normalArray1: [],
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
        switch (par.funName) {
            case 'test':
            var quantize=d3.scaleQuantize()
            .domain([0,50])
            .range(["#888","#666","#444","#222","#000"])
            console.log(quantize(45))
            console.log(quantize(35))
            var r=[45,35,25,15,5]
            var svg=d3.select(".charCon").append("svg")
            .attr("width",400)
            .attr("height",400);
            svg.selectAll("circle")
            .data(r)
            .enter()
            .append("circle")
            .attr("cx",(d,i)=>{return 50+i*30})
            .attr("cy",50)
            .attr("r",d=>d)
            .attr("fill",d=>quantize(d))
           // this.setState({result})
            break;
            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
           
            { name: "d3.scaleQuantize  - 创建一个量子比例尺 ", funName: "scale.scaleQuantize " },

            { name: "linear.domain - 设置定义域 ", funName: "domain " },
            { name: " linear.range- 设置值域 ", funName: "range " },
            { name: "linear(x) - 根据定义域值得到值域的值 ", funName: "linear " },
            { name: "linear.invert(fun) - 更上面相反", funName: "invert " },
            { name: "linear.rangeRound - 设置值域 结果是整数", funName: "rangeRound " },
            {name:'linear.clamp(boolean) -默认false 如果定义域超出范围则仍按照对应计算方法输出值域值',funName:'clamp'},
            {name:'linear.nice-将定义域的值扩展到好看点形式',funName:"nice"},
            {name:'linear.ticks(count) -默认10设置定义域具有代表性值',funName:'ticks'},
            {name:'linear.ticksFormat(count,Format) -默认10设置定义域具有代表性值',funName:'ticksFormat'},
            {name:'点击测试',funName:'test'}
       
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="量子比例尺在于值域是离散的domian([0,10]) range([white,black]) 5以下会是白色，以上是黑色" bordered={false}>
                <Row>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}> <div className={classNames('charCon')}></div></Col>
                    {this.state.result != '' && (<Col span={8}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 