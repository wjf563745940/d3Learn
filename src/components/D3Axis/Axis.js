import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";
import classNames from 'classnames';
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
            case 'test':
            var width=600;
            var height=600;
            var svg=d3.select(".charCon").append("svg")
            .attr("width",width)
            .attr("height",height)
            //设置比例尺
            var xScale=d3.scaleLinear()
            .domain([0,20])
            .range([0,300])

            //定义坐标
            var axis=d3.axisBottom()
            .scale(xScale)//设置坐标比例尺
            .tickFormat(d3.format("$0.1f"))
            var gaxis=svg.append("g")
            .attr("transform","translate(80,80)");
            axis(gaxis);

            break;
            case 'test2':
            var width=600;
            var height=600;
            var svg=d3.select(".charCon").append("svg")
            .attr("width",width)
            .attr("height",height)
            //设置比例尺
            var xScale=d3.scalePow()
            .exponent(2)
            .domain([0,20])
            .range([0,300])

            //定义坐标
            var axis=d3.axisBottom()
            .scale(xScale)//设置坐标比例尺
            .tickFormat(d3.format("$0.1f"))
            var gaxis=svg.append("g")
            .attr("transform","translate(80,80)");
            axis(gaxis);

            break;
            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
           
            { name: "d3.axisTop - 创建一个新的刻度在上的坐标轴生成器 ", funName: "axisTop" },
            { name: "d3.axisRight  - 创建一个新的刻度在上的坐标轴生成器 ", funName: "axisRight " },
            { name: "d3.axisBottom  - 创建一个新的刻度在上的坐标轴生成器 ", funName: "axisBottom " },
            { name: "d3..axisLeft  - 创建一个新的刻度在上的坐标轴生成器 ", funName: "axisLeft " },
            { name: "axis(selction) - 为指定的选择器生成一个坐标轴 ", funName: "axis " },
            { name: " axis.scale- 设置坐标轴的比例尺 ", funName: "axis.scale " },
            { name: "axis.ticks - 自定义刻度的显示方式以及格式化刻度（默认显示10个分段） ", funName: "ticks " },
            { name: "axis.tickArguments - 自定义如何生成刻度或者格式化刻度（）", funName: "tickArguments " },
            { name: "axis.tickValues - 指定固定的刻度值(现在固定值的刻度)", funName: "tickValues " },
            {name:'axis.tickFormat-指定固定的刻度格式化方式.',funName:'clamp'},
            {name:'axis.tickSize-设置刻度大小(可配置首尾刻度长度大于其他长度)',funName:"nice"},
            {name:'axis.tickSizeInner 设置内侧刻度大小',funName:'ticks'},
            {name:'axis.tickSizeOuter -设置外侧(坐标轴两端)刻度大小.',funName:'tickSizeOuter'},
            {name:'axis.tickPadding -设置刻度和刻度文本之间的间距..',funName:'tickPadding'},
            {name:'测试线性坐标',funName:'test'},
            {name:'测试对数坐标',funName:'test2'}
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="用摸个范围的值代表实际值" bordered={false}>
                <Row>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}> <div className={classNames('charCon')}></div></Col>
                    {this.state.result != '' && (<Col span={8}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 