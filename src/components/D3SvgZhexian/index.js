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
   // .curve(d3.curveCatmullRom.alpha(0.5))

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


    var foucsCircle=svg.append("g")
    .attr("class","focusCircle")
    .style("display","none")
    foucsCircle.append("circle")
    .attr("r",5)
    foucsCircle.append("text")
    .attr("dx",10)
    .attr("dy","1rem")
    var foucsCircle2=svg.append("g")
    .attr("class","focusCircle")
    .style("display","none")
    foucsCircle2.append("circle")
    .attr("r",5)
    foucsCircle2.append("text")
    .attr("dx",10)
    .attr("dy","1rem")


    var foucusLine=svg.append("g")
    .attr("class","focusLine")
    .style("display","none")
   var vLine= foucusLine.append("line")
    var hLine=foucusLine.append("line")
    var foucusLine2=svg.append("g")
    .attr("class","focusLine")
    .style("display","none")
   var vLine2= foucusLine.append("line")
    var hLine2=foucusLine.append("line")


    svg.append("rect")
    .attr("class","overlay")
    .attr("x",padding.left)
    .attr("y",padding.top)
    .attr("width",width-padding.left-padding.right)
    .attr("height",height-padding.top-padding.bottom)
    .on("mousemover",d=>{
        foucsCircle.style("display","none")
        foucusLine.style("display","none")
    }).on("mouseout",d=>{
        foucsCircle.style("display","none")
        foucusLine.style("display","none")
    }).on("mousemove",function(d){
        var data=dataset[0].gdp;
       
        var data1=dataset[1].gdp;
       
        var mouseX=d3.mouse(this)[0]-padding.left;
        var mouseY=d3.mouse(this)[1]-padding.top;

        var x0=xScale.invert(mouseX)
        var y0=yScale.invert(mouseY)

        x0=Math.round(x0);
    
        var bisect=d3.bisector(d=>{console.log(d);return d[0]}).left;
        var bisect2=d3.bisector(d=>{return  d[0]}).left;
        console.log(x0)
        var index=bisect(data,x0)
        var index1=bisect2(data1,x0)
        console.log(index)
        console.log(index1)
        var x1=data[index][0]
        var y1=data[index][1]
        var y11=data1[index][1]
        console.log("是否存在")
        console.log(data[index][1])
        console.log(data1[index][1])



        var foucsX=xScale(x1)+padding.left;
        var foucsY=yScale(y1)+padding.top
        var foucsY1=yScale(y11)+padding.top

        foucsCircle.attr("transform","translate("+foucsX+","+foucsY+")");
        foucsCircle.select("text").text(x1+"年的GDP"+y1+"yi美元")
        foucsCircle.style("display","block")
        foucusLine.style("display","block")
        vLine.attr("x1",foucsX)
        .attr("y1",foucsY)
        .attr("x2",foucsX)
        .attr("y2",height-padding.bottom)
        hLine.attr("x1",foucsX)
        .attr("y1",foucsY)
        .attr("x2",padding.left)
        .attr("y2",foucsY)

        foucsCircle2.attr("transform","translate("+foucsX+","+foucsY1+")");
        foucsCircle2.select("text").text(x1+"年的GDP"+y11+"yi美元")
        foucsCircle2.style("display","block")
        foucusLine2.style("display","block")
        vLine2.attr("x1",foucsX)
        .attr("y1",foucsY1)
        .attr("x2",foucsX)
        .attr("y2",height-padding.bottom)
        hLine2.attr("x1",foucsX)
        .attr("y1",foucsY1)
        .attr("x2",padding.left)
        .attr("y2",foucsY1)



    })

   

    };
    render() {


        return (
            <div >
                <svg id="zhexian" className={styles.barCon} width="600" height="600"></svg>
            </div>
        )
    }
}