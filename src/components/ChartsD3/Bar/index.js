import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import d3Charts from './common'
export default class D3SvgLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // var defaultOption={

        // }
    var o={
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    }
    console.log(this.props.data)
     var d3charts=   d3Charts.init(d3.select("#chart"))
    // d3charts.setOption(o)
     d3charts.setOption(this.props.data)
     //   this.setOption(this.props.data)

    };
   
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="600" height="600"></svg></div>
        )
    }
}