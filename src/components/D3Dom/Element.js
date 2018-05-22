import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";

export default class Search extends Component {
    state = {
        result: '',
        arr: "1, 2, 5, 77, 8768",
        normalArray1: [11, 22, 33],
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

           

            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
            {
                name: "d3.selectAll -选择0个或多个元素.", funName: "cross", comparator: function (a, b) {

                }
            },
            { name: "d3.select - 选择一个元素 多个取第一个 ", funName: "bisect " },
            { name: "selection.attr - 给元素添加属性", funName: "pairs " },
            { name: "selection.classed - 给元素添加class.", funName: "permute " },
            { name: "selection.style - 给元素添加样式", funName: "shuffle " },
            { name: " selection.property -获取无法用attr获得的的值（input value）.", funName: "ticks" },
            { name: "selection.text - 设置元素内容.", funName: "tickIncrement" },
            { name: "selection.html - dom的innerHTML.", funName: "tickStep" },
            { name: "selection.append - 给选择集末尾添加一个元素.", funName: "range " },
            { name: "selection.insert（name,className|Id） - 给选择集中指定元素之前插入元素", funName: "transpose " },
            { name: "selection.remove - 移除元素.", funName: "zip " },
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="很像jquery的dom操作" bordered={false}>
                <Row>
                    <Col span={12}> <ul>{listItems}</ul></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 