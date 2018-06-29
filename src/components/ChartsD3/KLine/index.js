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
        var defaultOption={

        }
      var d3charts=   d3Charts.init(d3.select("#chart"));
      d3charts.setOption(this.props.data)
    };

    render() {
      
        return (
            <div className={styles.chartCon}>
            <svg className={styles.chart} id="chart" width="600" height="600"></svg>
            <svg className={styles.chart} id="chart2" width="600" height="600"></svg>
            </div>
        )
    }
}