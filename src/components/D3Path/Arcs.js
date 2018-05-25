import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import * as d3 from "d3";
import classNames from 'classnames';
import smt from 'assets/1.jpg';

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
        var width=600,
            height=400
        ;
        var dataset={startAngle:0,endAngle:Math.PI*2}
        switch (par.funName) {
            case "test":
            
            var arcPath = d3.arc()
            .innerRadius(50)
            .outerRadius(100)
            var svg = d3.select(".charCon2").append("svg")
                .attr("width", width)
                .attr("height", height);
            svg.append('path')
            .attr("d",arcPath(dataset))
            .attr("transform","translate(250,250)")
            .attr("stroke","black")
            .attr("stroke-width","3px")
            .attr("fill","yellow")
            break;
          
            case "test3":
            var dataset=[{startAngle:0,endAngle:Math.PI*0.75},{startAngle:Math.PI*0.75,endAngle:Math.PI*2}]
            var lines = [ 80,120,130,70,60,90]
            var arcPath = d3.arc()
            .innerRadius(0)
            .outerRadius(100);
            var color =d3.schemeCategory10;
            console.log(color)

            var svg = d3.select(".charCon2").append("svg")
                .attr("width", width)
                .attr("height", height);
            svg.selectAll("path")
            .data(dataset)
            .enter()
            .append('path')
            .attr("d",d=>{console.log(d);return arcPath(d)})
            .attr("transform","translate(250,250)")
            .attr("stroke","black")
            .attr("stroke-width","2px")
            .attr("fill",(d,i)=> color[i])
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
                name: "d3.arc-创建生成器", funName: "rgb"
            },
            { name: "arc.centroid  设置中心里圈外位置？？？？", funName: "brighter " },
            { name: "arc.innerRadius  内圈半径", funName: "darker " },
            { name: "arc.outerRadius  外圈半径", funName: "rgb.hsl " },
            { name: "arc.cornerRadius 角度半径？？？？", funName: "curve " },
            { name: "arc.startAngle  开始角度", funName: "defined" },
            { name: "arc.endAngle   结束角度", funName: "endAngle" },
            { name: "arc.padAngle  ？？？", funName: "padAngle" },
            { name: "arc.arc.padRadius  ？？？", funName: "padRadius" },
            { name: "arc.context  ？？？", funName: "context" },
            { name: "测试1(生成饼图？or   Pies)", funName: "test" },
            { name: "测试2", funName: "test3" }
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <div>
                <Card title="路径" bordered={false}>
                    <Col span={8}> <ul>{listItems}</ul></Col>
                    <Col span={8}>  <img src={smt} alt="logo" /><div className={classNames('charCon2')}></div></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Card>
            </div>
        )
    }
} 

   