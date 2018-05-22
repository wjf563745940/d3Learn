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
            { name: "selection.datum（value） -将数据绑定到选择集上（selection.append('span').datum(value) 后面加入的元素也会绑定对应的value）  ", funName: "bisect " },
            { name: "selection.data（value,'classname'） - 给选择集分别绑定value中的数据（如果元素过多 多出元素进入exit  如果数组过多 则不存在的元素即将enter）", funName: "pairs " },
            { name: "enter处理 -如果返回的数据没有没有对应这么多元素可以先enter().append(ele)", funName: "permute " },
            { name: "exit处理 -删除多出的元素", funName: "shuffle " },
            { name: " selection.property -获取无法用attr获得的的值（input value）.", funName: "ticks" },
            { name: "selection.text - 设置元素内容.", funName: "tickIncrement" },
            { name: "selection.html - dom的innerHTML.", funName: "tickStep" },
            { name: "selection.append - 给选择集末尾添加一个元素.", funName: "range " },
            { name: "selection.insert（name,className|Id） - 给选择集中指定元素之前插入元素", funName: "transpose " },
            { name: "selection.remove - 移除元素.", funName: "zip " },
            { name: "selection.filter - 过滤元素.", funName: "zip " },
            { name: "selection.sort - 排序.", funName: "zip " },
            { name: "selection.each - 遍历元素.", funName: "zip " },
            { name: "selection.call - 调用某个方法并以自身作为参数.", funName: "zip " },
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