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
                name: "scan 使用指定的比较器进行线性查找指定的元素 (默认升序).", funName: "scan", comparator: function (a, b) {

                }
            },
            { name: "bisect二分查找有序数组中指定元素的索引 ", funName: "bisect " },
            { name: "bisectRight .二分查找有序数组中指定元素的索引(可配合splice 对数组摸个位置插入对应值)", funName: "bisectRight " },
            { name: "bisectLeft 二分查找有序数组中指定元素的索引", funName: "bisectLeft " },
            { name: "bisector 用指定的访问器或比较器对二分查找", funName: "bisector " },
            { name: " bisector.left 与 bisectLeft 类似, 可以指定比较器.", funName: "bisector.left" },
            { name: "bisector.right ", funName: "bisector.right" },
            { name: "ascending 计算两个值的自然顺序（排序）", funName: "ascending" },
            { name: "d3.descending  计算两个值的自然顺序.（排序）", funName: "descending " },
        ];
        const listItems = numbers.map((number) =>
            <li onClick={this.methName.bind(this, number)} key={number.funName}>{number.name}</li>
        );
        return (
            <div>
                <Card title="活动实时交易情况" bordered={false}>
                    <Col span={12}> <ul>{listItems}</ul></Col>
                    {this.state.result != '' && (<Col span={12}>{this.state.arrString} 通过{this.state.funName}计算得到结果{this.state.result}</Col>)}
                </Card>
            </div>
        )
    }
} 