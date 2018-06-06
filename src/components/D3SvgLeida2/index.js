import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import { Radar2 } from 'components/ChartsD3'
export default class D3SvgLine extends Component {

    render() {
        var option = {
            "tooltip": [
                {
                    "trigger": "none"
                }
            ],
            "legend": [
                {
                    "left": "20%",
                    "top": "4%",
                    "data": [],
                    "textStyle": {
                        "color": "rgba(120,126,142,1)"
                    }
                }
            ],
            "radarAxis": [
                {
                    "radius": "28%",
                    "center": [
                        "50%",
                        "50%"
                    ],
                    "splitNumber": 3,
                    "name": {
                        "positionOffset": 1.3,
                        "textStyle": {
                            "textFill": "#585858"
                        }
                    },
                    "axisLine": {
                        "lineStyle": {
                            "color": "rgba(0, 0, 0, 0.06)"
                        }
                    },
                    "splitLine": {
                        "lineStyle": {
                            "color": [
                                "rgba(0,0,0,0.1)",
                                "rgba(0,0,0,0.06)"
                            ]
                        }
                    },
                    "splitArea": {
                        "areaStyle": {
                            "color": [
                                "rgba(255,255,255,0.5)",
                                "rgba(255,255,255,0.8)"
                            ]
                        }
                    },
                    "indicator": [
                        {
                            "name": "成长能力",
                            "max": 1
                        },
                        {
                            "name": "盈利能力",
                            "max": 1
                        },
                        {
                            "name": "估值",
                            "max": 1
                        },
                        {
                            "name": "资产",
                            "max": 1
                        },
                        {
                            "name": "现金流",
                            "max": 1
                        }
                    ],
                    "shape": "polygon"
                }
            ],
            "series": [
                {
                    "$radarAxisIndex": 0,
                    "symbolSize": 3,
                    "label": {
                        "normal": {
                            "show": false,
                            "distanceOffset": 1.1,
                            "offset": [
                                0,
                                0
                            ]
                        },
                        "emphasis": {
                            "show": false
                        }
                    },
                    "itemStyle": {
                        "normal": {
                            "lineWidth": 2,
                            "fill": "rgba(0,0,0,0)"
                        },
                        "emphasis": {
                            "lineWidth": 2,
                            "fill": "rgba(0,0,0,0)"
                        }
                    },
                    "type": "radar",
                    "data": [
                        {
                            "name": "平安银行",
                            "text": [
                                "21/26",
                                "20/26",
                                "16/26",
                                "12/26",
                                "22/26"
                            ],
                            "value": [
                                0.23076923076923073,
                                0.2692307692307693,
                                0.42307692307692313,
                                0.5769230769230769,
                                0.1923076923076923
                            ]
                        }
                    ],
                    "name": "平安银行",
                    "color": "#c23531"
                }
            ]
        }
        return (
            <div className={styles.chartCon}><Radar2 data={option}></Radar2></div>
        )
    }
}