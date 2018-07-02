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

            case "cross":
                const { normalArray1, normalArray2 } = this.state;
                var r = d3[par.funName](normalArray1, normalArray2);
                this.setState({ arrString: this.state.normalArray1.toString() + "和" + this.state.normalArray2.toString() })
                this.setState({ result: "笛卡尔积" + r.toString() });
                this.setState({ funName: par.name })

                break;
            case "ticks":
                var r = d3[par.funName](10,20,4);
              
                this.setState({ arrString: "入参900" })
                this.setState({ funName: par.name + "" })
                this.setState({ result: r.toString() });
                break
            case "range":

                var r = d3[par.funName](0, 100, 3);
                this.setState({ arrString: "入参0，100，3" })
                this.setState({ funName: par.name + "生成等差数列" })
                this.setState({ result: r.toString() });

                break;
            case "transpose":
                var r = d3[par.funName]([[0, 1, 2], [3, 4, 5]])
              
                this.setState({ arrString: "[[0,1,2],[3,4,5]]" })
                this.setState({ funName: par.name })
                this.setState({ result: "[[0, 3],[1,4],[2, 5]" + "矩阵置换" });
                break;
            case "zip":

                var r = d3[par.funName]([1, 2, 3, 4], [5, 6, 7], [8, 9])
             
                this.setState({ arrString: "[1,2,3,4],[5,6,7],[8,9]" })
                this.setState({ funName: par.name })
                this.setState({ result: "[[1, 5, 8],[2, 6, 9]]" + "第i个元素来自不同数组的第i个元素" });
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
                name: "d3.cross - 计算两个数组的笛卡尔积.", funName: "cross", comparator: function (a, b) {

                }
            },
            { name: "d3.merge - 将多个数组合并为一个 ", funName: "bisect " },
            { name: "d3.pairs - 将数组中相邻的两个元素两两结合", funName: "pairs " },
            { name: "d3.permute - 根据指定的索引返回对数组重排后的结果.", funName: "permute " },
            { name: "d3.shuffle - 随机打乱数组顺序", funName: "shuffle " },
            { name: " d3.ticks - 从给定的区间范围内生成一系列值.", funName: "ticks" },
            { name: "d3.tickIncrement - 从给定的区间范围内生成一系列值.", funName: "tickIncrement" },
            { name: "d3.tickStep - 从给定的区间范围内生成一系列值.", funName: "tickStep" },
            { name: "d3.range - 根据指定的区间生成一系列值.", funName: "range " },
            { name: "d3.transpose - 将数组的数组进行转置", funName: "transpose " },
            { name: "d3.zip - 转置多个数组.", funName: "zip " },
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="活动实时交易情况" bordered={false}>
                <Row>
                    <Col span={12}> <ul>{listItems}</ul></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 