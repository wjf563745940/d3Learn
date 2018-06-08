import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import { Dbline } from 'components/ChartsD3';
export default class D3SvgLine extends Component {

    render() {
        var option = {
            "axis": [
                {
                    "position": "bottom",
                    "data": [
                        20180424,
                        20180425,
                        20180426,
                        20180427,
                        20180502,
                        20180503,
                        20180504,
                        20180507,
                        20180508,
                        20180509,
                        20180510,
                        20180511,
                        20180514,
                        20180515,
                        20180516,
                        20180517,
                        20180518,
                        20180521,
                        20180522,
                        20180523,
                        20180524,
                        20180525,
                        20180528,
                        20180529,
                        20180530,
                        20180531,
                        20180601,
                        20180604,
                        20180605,
                        20180606,
                        20180607
                    ],
                    "paddingInner": "20%",
                    "tick": {
                        "show": false,
                        "outerSize": 6,
                        "innerSize": 0,
                        "style": {
                            "lineWidth": 1,
                            "stroke": "rgba(51, 51, 51, 0.1)"
                        }
                    },
                    "line": {
                        "show": true,
                        "style": {
                            "stroke": "#D1D1D1",
                            "lineWidth": 2
                        },
                        "onZero": true
                    },
                    "label": {
                        "show": true,
                        "padding": 10,
                        "style": {
                            "fill": "rgba(51, 51, 51, 0.4)",
                            "fontSize": 12
                        },
                        "scale": [
                            0.6,
                            0.6
                        ],
                        "followLine": false
                    }
                },
                {
                    "position": "left",
                    "type": "linear",
                    "xOrY": "y",
                    "splitNumber": 5,
                    "nice": true,
                    "domainScale": 1.2,
                    "tick": {
                        "show": true,
                        "outerSize": 3,
                        "innerSize": 0,
                        "style": {
                            "lineWidth": 1,
                            "stroke": "rgba(51, 51, 51, 0.1)"
                        }
                    },
                    "line": {
                        "show": true,
                        "style": {
                            "stroke": "#D1D1D1",
                            "lineWidth": 1
                        }
                    },
                    "label": {
                        "show": true,
                        "padding": 5,
                        "style": {
                            "fill": "rgba(51, 51, 51, 0.4)",
                            "fontSize": 12
                        },
                        "scale": [
                            0.6,
                            0.6
                        ]
                    },
                    "splitLine": {
                        "show": true,
                        "style": {
                            "color": "#E4E4E4",
                            "lineWidth": 1
                        }
                    },
                    "axisName": {
                        "show": true,
                        "text": "元",
                        "offset": [
                            0,
                            -7
                        ],
                        "location": "end",
                        "gap": 10,
                        "style": {
                            "fontSize": 12,
                            "fill": "rgba(51, 51, 51, 0.4)"
                        }
                    }
                }
            ],
            "grid": [
                {
                    "top": 35,
                    "left": 55,
                    "bottom": 25,
                    "right": 20
                }
            ],
            "series": [
                {
                    "type": "line",
                    "data": [
                        12.93,
                        12.93,
                        12.93,
                        12.87,
                        12.84,
                        12.81,
                        12.78,
                        12.75,
                        12.72,
                        12.75,
                        12.78,
                        12.78,
                        12.75,
                        12.72,
                        12.69,
                        12.63,
                        12.6,
                        12.54,
                        12.42,
                        12.3,
                        12.18,
                        12.12,
                        12.09,
                        12.06,
                        12.04,
                        12.04,
                        12,
                        12,
                        12,
                        11.96,
                        "-"
                    ],
                    "dataKey": 1,
                    "name": "平均成本",
                    "itemStyle": {
                        "normal": {
                            "fill": "#c23531"
                        }
                    },
                    "line": {
                        "show": true,
                        "style": {
                            "normal": {
                                "stroke": "#c23531"
                            }
                        }
                    },
                    "symbol": {
                        "normal": {
                            "show": "all",
                            "size": 4,
                            "style": {
                                "fill": "#c23531",
                                "stroke": "#c23531",
                                "lineWidth": 2
                            }
                        }
                    }
                },
                {
                    "type": "line",
                    "data": [
                        "-",
                        11.68,
                        11.42,
                        10.85,
                        10.88,
                        10.75,
                        10.68,
                        10.81,
                        11.01,
                        10.97,
                        11.01,
                        11.01,
                        11.18,
                        11.12,
                        10.9,
                        10.82,
                        10.96,
                        10.95,
                        10.86,
                        10.65,
                        10.61,
                        10.59,
                        10.59,
                        10.38,
                        10.08,
                        10.18,
                        10.19,
                        10.27,
                        10.26,
                        10.14,
                        10.22
                    ],
                    "dataKey": 1,
                    "name": "股价",
                    "itemStyle": {
                        "normal": {
                            "fill": "#2f4554"
                        }
                    },
                    "line": {
                        "show": true,
                        "style": {
                            "normal": {
                                "stroke": "#2f4554"
                            }
                        }
                    },
                    "symbol": {
                        "normal": {
                            "show": "all",
                            "size": 4,
                            "style": {
                                "fill": "#2f4554",
                                "stroke": "#2f4554",
                                "lineWidth": 2
                            }
                        }
                    }
                }
            ],
            "legend": [
                {
                    "show": true,
                    "data": [],
                    "left": "12%",
                    "top": 5,
                    "textStyle": {
                        "color": "#585858",
                        "fontSize": 12
                    },
                    "symbol": {
                        "size": [
                            16,
                            8
                        ]
                    }
                }
            ]
        }
        var option2={
            "color": [
                "#77ACF3",
                "#FA5959"
            ],
            "legend": {
                "data": [
                    "平均成本",
                    "股价"
                ],
                "bottom": 0,
                "padding": 10,
                "right": 20,
                "textStyle": {
                    "color": "#D2C9D0"
                },
                "itemwidth": 24,
                "itemHeight": 14
            },
            "grid": {
                "top": 15,
                "bottom": 65,
                "left": 40,
                "right": 30
            },
            "xAxis": {
                "type": "category",
                "boundaryGap": false,
                "data": [
                    20180424,
                    20180425,
                    20180426,
                    20180427,
                    20180502,
                    20180503,
                    20180504,
                    20180507,
                    20180508,
                    20180509,
                    20180510,
                    20180511,
                    20180514,
                    20180515,
                    20180516,
                    20180517,
                    20180518,
                    20180521,
                    20180522,
                    20180523,
                    20180524,
                    20180525,
                    20180528,
                    20180529,
                    20180530,
                    20180531,
                    20180601,
                    20180604,
                    20180605,
                    20180606,
                    20180607
                ],
                "axisLine": {
                    "lineStyle": {
                        "color": "#999",
                        "width": 1
                    }
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "color": "#999"
                }
            },
            "yAxis": {
                "type": "value",
                "axisLabel": {
                    "formatter": "{value} ",
                    "color": "#999"
                },
                "axisLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitLine": {
                    "show": false
                }
            },
            "series": [
                {
                    "name": "平均成本",
                    "type": "line",
                    "symbol": "circle",
                    "data": [
                        12.93,
                        12.93,
                        12.93,
                        12.87,
                        12.84,
                        12.81,
                        12.78,
                        12.75,
                        12.72,
                        12.75,
                        12.78,
                        12.78,
                        12.75,
                        12.72,
                        12.69,
                        12.63,
                        12.6,
                        12.54,
                        12.42,
                        12.3,
                        12.18,
                        12.12,
                        12.09,
                        12.06,
                        12.04,
                        12.04,
                        12,
                        12,
                        12,
                        11.96,
                        "-"
                    ],
                    "itemStyle": {
                        "normal": {
                            "lineStyle": {
                                "color": "#77ACF3",
                                "width": 1
                            }
                        }
                    },
                    "symbolSize": 0
                },
                {
                    "name": "股价",
                    "type": "line",
                    "data": [
                        "-",
                        11.68,
                        11.42,
                        10.85,
                        10.88,
                        10.75,
                        10.68,
                        10.81,
                        11.01,
                        10.97,
                        11.01,
                        11.01,
                        11.18,
                        11.12,
                        10.9,
                        10.82,
                        10.96,
                        10.95,
                        10.86,
                        10.65,
                        10.61,
                        10.59,
                        10.59,
                        10.38,
                        10.08,
                        10.18,
                        10.19,
                        10.27,
                        10.26,
                        10.14,
                        10.37
                    ],
                    "itemStyle": {
                        "normal": {
                            "lineStyle": {
                                "color": "#FA5959",
                                "width": 1
                            }
                        }
                    },
                    "symbolSize": 0
                }
            ]
        }

        return (
            <div className={styles.chartCon}><Dbline data={option2}></Dbline></div>
        )
    }
}