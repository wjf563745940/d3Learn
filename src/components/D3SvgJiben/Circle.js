import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        d3.select("#chart").append('circle')
        .attr("cx","50px")
        .attr("cy","50px")
        .attr("r","50")
        .attr("fill","red")
    };
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="200" height="100"></svg></div>
        )
    }
}