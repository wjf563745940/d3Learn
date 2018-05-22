
import React, { Component } from "react";
import * as d3 from "d3";
import { Row, Col,Card } from 'antd';




export default class Statistics extends Component {
    //
    state={
        result:'',
        arr:"1, 2, 5, 77, 8768",
        funName:''
    };

    methName = (par) => {
        const { arr} = this.state;
        var r = d3[par.funName](arr.split(","));
        this.setState({result:r});
        this.setState({funName:par.name})
    };
    render() {
        const numbers = [{ name: "min", funName: "min" },
        { name: "max", funName: "max" },
        { name: "extent计算数组中的最大值和最小值.", funName: "extent" },
        { name: "sum", funName: "sum" },
        { name: "mean(算术中位数 平均值)", funName: "mean" },
        { name: " d3.median (中位数 中间值)", funName: "median" },
        { name: "d3.quantile（arrays,p） (有序数组的分位数.)", funName: "quantile" },
        { name: "d3.variance (反差.)", funName: "variance" },
        { name: "d3.deviation (标准差.)", funName: "deviation" },
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        let r=''
        return (
            <Card title="活动实时交易情况" bordered={false}>
                <Row>
                    <Col span={12}> <ul>{listItems}</ul></Col>
                    {this.state.result!='' && (<Col span={12}>{this.state.arr} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}  
                </Row>
            </Card>

        );
    }
}