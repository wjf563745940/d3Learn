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
            var xAxisWidth=300;
            var yAxisWidth=300;
            var dataSet= [51,22,34,44,55,111,229];
            var  padding={top:20,right:20,bottom:20,left:10};
            var width=300;
            var height=300;
            var svg=d3.select(".charCon2").append("svg")
            .attr("id","chart2")
            .attr("width",width)
            .attr("height",height)
            //设置比例尺
            var xScale=d3.scaleBand()
            .domain(d3.range(dataSet.length))
            .rangeRound([0,xAxisWidth])
            var YScale=d3.scaleLinear()
            .domain([0,d3.max(dataSet)])
            .range([0,yAxisWidth]);
            

            svg.selectAll("rect")
        .data(dataSet)//绑定元素
        .enter()//获取enter部分
        .append("rect")//让元素跟数据同步
        .attr("fill","steelbule")
        .attr("x",function(d,i){
            //console.log(i)
           //console.log( xScale(i))
            return padding.left+xScale(i);
        })
        .attr("y",function(d,i){
            return height-padding.bottom-YScale(d);
        })
        .attr("width",20)
        .attr("height",function(d){
            console.log(d)
            console.log(YScale(d))
            return YScale(d);
        })
            //定义坐标
            var axis=d3.axisBottom()
            .scale(xScale)//设置坐标比例尺
            .tickFormat(d3.format("$0.1f"))
            YScale.range([yAxisWidth,0])
            var axisy=d3.axisLeft()
            .scale(YScale)//设置坐标比例尺
            .tickFormat(d3.format("$0.1f"))
            var gaxis=svg.append("g")
            .attr("transform","translate(0,280)");
            axis(gaxis);
            svg.append("g").attr("transform","translate(40,-20)").call(axisy);

            break;
            default:
                this.setState({ arrString: "" });
                this.setState({ funName: "" });
                this.setState({ result: "无效方法" });
        }

    };
    render() {
        const numbers = [
           
           
            {name:'测试',funName:'test'},

        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <Card title="用摸个范围的值代表实际值" bordered={false}>
                <Row>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}> <div className={classNames('charCon2')}></div></Col>
                    {this.state.result != '' && (<Col span={8}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Row>
            </Card>
        )
    }
} 