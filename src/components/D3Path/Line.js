import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";
import classNames from 'classnames';
export default class Search extends Component {
    state = {
        result: '',
        arr: "1, 2, 5, 77, 8768",
        scanArray: [9, 1, 7, 3],
        arrString: '',
        bisectorArray: [
            { date: new Date(2011, 1, 1), value: 0.5 },
            { date: new Date(2011, 2, 1), value: 0.6 },
            { date: new Date(2011, 3, 1), value: 0.7 },
            { date: new Date(2011, 4, 1), value: 0.8 }
        ],
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
        var width=200,
            height=200
        ;

        switch (par.funName) {

            case "test":
                var lines = [[80, 80], [200, 100], [200, 200], [100, 200]]
                var linePath = d3.line()
                var svg = d3.select(".charCon").append("svg")
                    .attr("width", width)
                    .attr("height", height);
                svg.append('path')
                .attr("d",linePath(lines))
                .attr("stroke","black")
                .attr("stroke-width","3px")
                .attr("fill","none")
                break;

                case "test2":
                var lines = [80,100,120,140,160,180]
                var linePath = d3.line()
                .x(d=>{return d})
                .y((d,i)=>{return i%2==0?20:120})
                .defined(d=>{return d<150})
                var svg = d3.select(".charCon").append("svg")
                    .attr("width", width)
                    .attr("height", height);
                svg.append('path')
                .attr("d",linePath(lines))
                .attr("stroke","black")
                .attr("stroke-width","3px")
                .attr("fill","none")
                break;
                case "test3":
                var lines = [80,100,120,140,160,180]
                var linePath = d3.line()
                .x(d=>{return d})
                .y((d,i)=>{return i%2==0?20:120})
                .curve(d3.curveCatmullRom.alpha(0.5))
                var svg = d3.select(".charCon").append("svg")
                    .attr("width", width)
                    .attr("height", height);
                svg.append('path')
                .attr("d",linePath(lines))
                .attr("stroke","black")
                .attr("stroke-width","3px")
                .attr("fill","none")
                break;
            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
            {
                name: "d3.line-创建生成器", funName: "rgb"
            },
            { name: "line（data） 绑定数据", funName: "brighter " },
            { name: "line.x 设置获取线段x坐标的访问值", funName: "darker " },
            { name: "line.y 设置获取线段y坐标的访问值", funName: "rgb.hsl " },
            { name: "d3.curve 设置曲线插补器", funName: "curve " },
            { name: "d3.defined 设置定义的访问者", funName: "defined" },
            { name: "d3.context  设置上下文", funName: "context" },
            { name: "测试", funName: "test" },
            { name: "测试defined", funName: "test2" },
            { name: "测试curve (d3.curveCatmullRom.alpha(0.5))", funName: "test3" }
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <div>
                <Card title="路径" bordered={false}>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}> <div className={classNames('charCon')}></div></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Card>
            </div>
        )
    }
} 