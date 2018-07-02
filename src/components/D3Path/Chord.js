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
            var matrix = [
                [11975,  5871, 8916, 2868],
                [ 1951, 10048, 2060, 6171],
                [ 8010, 16145, 8090, 8045],
                [ 1013,   990,  940, 6907]
              ];
            var chord = d3.chord()
           
            
             var dataset2=chord(matrix);
             
            // .sourchord
            var ribbon = d3.ribbon()
            .radius(240);
           // dataset2[0].source.radius=240;
            //dataset2[0].target.radius=240;
           
            var color=d3.schemeCategory10;
          
            var tt={
                source: {startAngle: 0.7524114, endAngle: 1.1212972, radius: 240},
                target: {startAngle: 1.8617078, endAngle: 1.9842927, radius: 240}
              }
             
         
            var svg = d3.select(".charCon2").append("svg")
                .attr("width", width)
                .attr("height", height);
            svg.selectAll("path")
            .data(dataset2)
            .enter()
            .append('path')
            .attr("d",d=>{return ribbon(d)})
            .attr("transform","translate(250,250)")
            .attr("stroke",(d,i)=> color[i])
            .attr("stroke-width","2px")
            .attr("fill","white")
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
                name: "d3.chord-创建生成器", funName: "rgb"
            },
           
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

   