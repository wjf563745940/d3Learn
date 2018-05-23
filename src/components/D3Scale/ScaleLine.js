import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";

export default class Search extends Component {
    state = {
        result: '',
        arr: "1, 2, 5, 77, 8768",
        normalArray1: [{id:100,name:'张某某',year:1989,hometown:'北京'},
        {id:100,name:'李某某',year:1988,hometown:'北京'},
        {id:100,name:'x某某',year:1988,hometown:'上海'},
        {id:100,name:'a某某',year:1989,hometown:'北京'} ,   
        {id:100,name:'b某某',year:1989,hometown:'北京'},
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
        switch (par.funName) {
 
            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
           
            { name: "d3.scale.linear - 创建一个性性比例尺 ", funName: "scale.linear" },
            { name: "linear.domain - 设置定义域 ", funName: "domain " },
            { name: " linear.range- 设置值域 ", funName: "range " },
            { name: "linear(x) - 根据定义域值得到值域的值 ", funName: "linear " },
            { name: "linear.invert(fun) - 更上面相反", funName: "invert " },
            { name: "linear.rangeRound - 设置值域 结果是整数", funName: "rangeRound " },
            {name:'linear.clamp(boolean) -默认false 如果定义域超出范围则仍按照对应计算方法输出值域值',funName:'clamp'},
            {name:'linear.nice-将定义域的值扩展到好看点形式',funName:"nice"},
            {name:'linear.ticks(count) -默认10设置定义域具有代表性值',funName:'ticks'},
            {name:'linear.ticksFormat(count,Format) -默认10设置定义域具有代表性值',funName:'ticksFormat'},
       
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="用摸个范围的值代表实际值" bordered={false}>
                <Row>
                    <Col span={12}> <ul>{listItems}</ul></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 