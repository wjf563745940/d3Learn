import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import { Bar } from 'components/ChartsD3';

export default class D3SvgLine extends Component {
    componentDidMount(){
        var  option2 = {
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
        };

        
    }
    render() {
        // var option = {
        //     title: {
        //         show: false
        //     },
        //     tooltip: {
        //         trigger: 'axis'
        //     },
        //     calculable: true,
        //     yAxis: [{
        //         show: false,
        //         type: 'value'
        //     }],
        //     textStyle: {
        //         fontWeight: 'bold',
        //         fontSize: 16
        //     },
        //     xAxis: [{
        //         axisLabel : {//坐标轴刻度标签的相关设置。
        //             interval:30,
                   
        //         },
        //         axisTick: {
        //             show: false
        //         },
        //         axisLine: {
        //             show: false
        //         },
        //         offset: -10,
        //         type: 'category',
        //         data: yShowData,
        //         position: 'right'
        //     }],
        //     series: [{
        //         name: '',
        //         type: 'bar',
        //         barWidth: 1,
        //         data: chartData,
        //         itemStyle: {
        //             normal: {
        //                 color: function(params) { //根据价格和收盘价比较设置柱状图颜色
        //                     if (yAxisData[params.dataIndex] == mFvgCost) {
        //                         return 'rgb(255,162,24)'
        //                     } else if (yAxisData[params.dataIndex] < mClosePrice) {
        //                         return 'rgb(239,44,41)'
        //                     } else if (yAxisData[params.dataIndex] > mClosePrice) {
        //                         return 'rgb(66,142,239)'
        //                     }
        //                 }
        //             }
        //         }
        //     }]
        // }
       var  option2 = {
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
        };

        return (
            <div className={styles.chartCon}>
                <div id="test"></div>
                <Bar></Bar>
            </div>
        )
    }
}