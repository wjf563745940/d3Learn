import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var data = [
            { x: 0, y: 30 },
            { x: 50, y: 20 },
            { x: 100, y: 40 },
            { x: 150, y: 80 },
            { x: 200, y: 95 }
        ]

        var line = d3.line()
            .x((d) => d.x)
            .y((d) => 100 - d.y).curve(d3.curveCatmullRom.alpha(0.5))


        d3.select('#chart')
            .append("path")
            .attr('stroke-width', 2)
            .attr('d', line(data))
    };
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="200" height="100"></svg></div>
        )
    }
}