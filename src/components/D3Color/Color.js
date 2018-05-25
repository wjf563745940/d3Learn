import React, { Component } from 'react'
import { Row, Col ,Card} from 'antd';
import * as d3 from "d3";

export default class Search extends Component {
    state = {
        result: '',
        arr: "1, 2, 5, 77, 8768",
        scanArray: [9, 1, 7, 3],
        arrString:'',
        bisectorArray: [
            { date: new Date(2011, 1, 1), value: 0.5 },
            { date: new Date(2011, 2, 1), value: 0.6 },
            { date: new Date(2011, 3, 1), value: 0.7 },
            { date: new Date(2011, 4, 1), value: 0.8 }
        ],
        funName: ''
    };
    arrTorString=(arr)=>{
        var str="";
         arr.map((item)=>{
            return str+=JSON.stringify(item)+" ";
        })
        return str;
    };
    methName = (par) => {
        par.funName = par.funName.trim();
        switch (par.funName) {

            case "scan":
                const { scanArray } = this.state;
                var r = d3[par.funName](scanArray);
                this.setState({ result: "位置在" + r });
                this.setState({ funName: par.name })
                this.setState({arrString:this.state.scanArray.toString()})
                break;
            case "bisector":
                const { bisectorArray } = this.state;
                var bisectDate = d3.bisector(function (d, x) {
                    return d.date - x;
                }).right;
                //var bisectDate = d3.bisector(function(d, x) { return d.date - x; }).right;
                var i = bisectDate(bisectorArray, new Date(2011, 1, 2))
                console.log(i);
                this.setState({arrString:this.arrTorString(bisectorArray)})
                this.setState({ result: "new Date(2011, 1, 2) 在new Date(2011, 1, 1)和new Date(2011, 2, 1)之间返回索引值" +i  });
                this.setState({ funName: par.name })
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
                name: "d3.rgb-通过red green blue创建颜色. #000？", funName: "rgb"
            },
            { name: "rgb.brighter()变亮一点", funName: "brighter " },
            { name: "rgb.darker .变暗一点", funName: "darker " },
            { name: "rgb.hsl 返回对应的hsl值", funName: "rgb.hsl " },
            { name: "d3.hsl 通过hue saturation lightter创建颜色", funName: "hsl " },
            { name: "d3.interpolate(acolor,bcolor) 插值运算 根据2个颜色生成. 通过输入0-1返回acolor和bcolor颜色区间的颜色", funName: "interpolate" },
  
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <div>
                <Card title="颜色" bordered={false}>
                    <Col span={12}> <ul>{listItems}</ul></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Card>
            </div>
        )
    }
} 