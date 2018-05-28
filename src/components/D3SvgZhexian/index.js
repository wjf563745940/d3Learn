import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var dataset=[{
            country:"china",
            gdp:[[2000,11920],[2001,13170],[2002,14550],
            [2003,16500],[2004,19440],[2005,22870],
            [2006,27930],[2007,35040],[2008,45470],
            
        ]
        },
        {
            country:'japan',
            gdp:[[2000,47310],[2001,41590],[2002,39800],
            [2003,43020],[2004,46550],[2005,45710],
            [2006,43560],[2007,43560],[2008,48490],
            
        ]
        }
    ];
    var width=600,height=600;
    var padding={top:50,right:50,bottom:50,left:50};
    var gdpmax=0;
    for(var i=0;i<dataset.length;i++){
        var currgdp=d3.max(dataset[i].gdp,(d)=>d[1]);
        if(currgdp>gdpmax){
            gdpmax=currgdp;
        }
    }

    //比例尺
    var xScale=d3.scaleLinear()
    .domain([2000,2008])
    .range([0,width-padding.left-padding.right]);
    var yScale=d3.scaleLinear()
    .domain([0,gdpmax*1.1])
    .range([height-padding.top-padding.bottom,0]);

    //直线生成器
    var linePath=d3.line()
    .x(d=>{console.log(d[0]);console.log( xScale(d[0]));return xScale(d[0])})
    .y(d=>{console.log(d[1]);console.log( yScale(d[1]));return yScale(d[1])})
    .curve(d3.curveCatmullRom.alpha(0.5))

    var colors=[d3.rgb(0,0,255),d3.rgb(0,255,0)]
    //绘制线
    var svg=d3.select("#zhexian");
    svg.selectAll("path")
    .data(dataset)
    .enter()
    .append("path")
    .attr("transform","translate("+padding.left+","+padding.right+")")
    .attr("d",d=>linePath(d.gdp))
    .attr("fill","none")
    .attr("stroke-width",3)
    .attr("stroke",(d,i)=>{
        return colors[i]
    })
    //添加坐标
    var xAxis=d3.axisBottom()
    .scale(xScale)
    .ticks(5)
    .tickFormat(d3.format("d"))
    var yAxis=d3.axisLeft()
    .scale(yScale)
    svg.append("g")
    .attr("class","axis")
    .attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
    .call(xAxis)

    svg.append("g")
    .attr("class","axis")
    .attr("transform","translate("+padding.left+","+padding.top+")")
    .call(yAxis)


   
    

    };
    render() {


        return (
            <div >
                <svg id="zhexian" className={styles.barCon} width="600" height="600"></svg>
            </div>
        )
    }
}