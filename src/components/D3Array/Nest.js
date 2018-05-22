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

            case "test":
                const { normalArray1 } = this.state;
                var r = d3.nest().key(function(d){
                    return d.year;
                }).key(function(d){
                    return d.hometown;
                }).entries(normalArray1);
                console.log(r)
                this.setState({ arrString:this.arrTorString(normalArray1)   })
                this.setState({ result: "" + this.arrTorString(r)});
                this.setState({ funName:`d3.nest().key(function(d){
                    return d.year;
                }).key(function(d){
                    return d.hometown;
                }).entries(normalArray1)` })

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
                name: "d3.nest.生成一个嵌套结构", funName: "cross", comparator: function (a, b) {

                }
            },
            { name: "d3.key(fun) - 指定key值 ", funName: "bisect2 " },
            { name: "d3.entries(arr) - 绑定数组 ", funName: "bisect3 " },
            { name: "d3.sortKeys(comparator) - 对key进行排序 ", funName: "bisect4 " },
            { name: "d3.sortValues(comparator) - 按照值对嵌套进行排序 ", funName: "bisect5 " },
            { name: "d3.rollup(fun) - 可以对整个组进行操作", funName: "bisect6 " },
            { name: "d3.map - 以映射形式进行输出", funName: "bisect7 " },
            {name:'test',funName:'test'}
       
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