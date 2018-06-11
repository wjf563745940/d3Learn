import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

        this.setOption(this.props.data)

    };
    setOption(option) {
        var width = 600;
        var height = 600;
        var svg = d3.select("#chart")
        var gridTotal=5;
        var rd=20;
        var r=(gridTotal-1)*rd;
        var gridData=[],lineData=[],zhunxinData=[],styleData=[];
        var  arc = 2 * Math.PI;
        var onePiece = arc / 4;
        var color="#36c9ff"
        for(let i=0;i<gridTotal;i++){
            if(i===gridTotal-1){
                gridData.push({x:0,y:0,r:rd*i+5})
            }else{
                gridData.push({x:0,y:0,r:rd*i+rd})
            }
         
        }
        for(let i=0;i<4;i++){
            var x =  r* Math.sin(i * onePiece),
            y = r * Math.cos(i * onePiece);
            lineData.push({x2:x,y2:y})
        }
        for(let i=0;i<4;i++){
           let rotate= i*90;
            zhunxinData.push("rotate("+rotate+")")
        }
        for(let i=0;i<4;i++){
            console.log(onePiece)
            var x2 =  r* Math.sin(i * onePiece-2 * Math.PI /360*2),
            y2 = r * Math.cos(i * onePiece-2 * Math.PI /360*2);
           
            if(Math.cos(i * onePiece)>0){
                var x1=x2;
                var y1=y2-2.5*rd;
                if(Math.sin(i * onePiece)>0){
                    var x1=x2-2.5*rd;
                    var y1=y2; 
                }
            }else{
                var x1=x2;
                var y1=y2+2.5*rd;
                if(Math.sin(i * onePiece)<0){
                    var x1=x1+2.5*rd;
                    var y1=y2; 
                }
            }
            styleData.push({x1:x1,y1:y1,x2:x2,y2:y2})
            var x2 =  r* Math.sin(i * onePiece+2 * Math.PI /360*2),
            y2 = r * Math.cos(i * onePiece+2 * Math.PI /360*2);
            if(Math.cos(i * onePiece)>0){
                var x1=x2;
                var y1=0+1.5*rd;
                if(Math.sin(i * onePiece)>0){
                    var x1=0+1.5*rd;
                    var y1=y2; 
                }
            }else{
                var x1=x2;
                var y1=0-1.5*rd;
                if(Math.sin(i * onePiece)<0){
                    var x1=0-1.5*rd;
                    var y1=y2; 
                }
            }
            styleData.push({x1:x1,y1:y1,x2:x2,y2:y2})
        }
     
        
        

        var grids = svg.append('g')
        .classed('grids', true)
        .attr("transform","translate(200,200)")
        grids.selectAll("circle")
        .data(gridData)
        .enter()
        .append("circle")
        .attr("x",d=>d.x)
        .attr("y",d=>d.y)
        .attr("r",d=>d.r)
        .attr("stroke",color)
        .attr("stroke-width",3)
        .attr("stroke-dasharray",(d,i)=>{
            if(i==gridData.length-1){
                return"2 2";
            }
        })
        .attr("fill","rgba(0,0,0,0)");
        function pianLine() {
            var lines = svg.append('g')
            .attr("transform","translate(200,200)")
                .classed('lines', true);
            lines.selectAll('line')
                .data(lineData)
                .enter()
                .append('line')
                .attr("stroke",color)
                .attr('x1', 0)
                .attr('y1', 0)

                .attr('x2', function (d) {
                    return d.x2;
                })
                .attr('y2', function (d) {
                    return d.y2;
                });

                var lines2 = svg.append('g')
            .attr("transform","translate(200,200)")
                .classed('lines2', true);
                lines2.selectAll('line2')
                .data(styleData)
                .enter()
                .append('line')
                .attr("stroke",color)
                .attr("stroke-width","1")
                .attr('x1',  function (d) {
                    return d.x1;
                })
                .attr('y1', function (d) {
                    return d.y1;
                })
                .attr('x2', function (d) {
                    return d.x2;
                })
                .attr('y2', function (d) {
                    return d.y2;
                });


        }
        pianLine();
        function pianZhunxin(){
            var zhunxin = svg.append('g')
            .attr("transform","translate(200,200)")
                .classed('zhunxin', true);

               
                zhunxin.selectAll("rect")
                .data(zhunxinData)
                .enter()
                .append("rect")
                .attr("fill","rgba(0,0,0,0)")
                .attr("stroke",color)
                .attr("x",-rd/2)
                .attr("y",-rd/2)
                .attr("width",rd)
                .attr("height",rd)
                .attr("stroke-dasharray","8,65")
                .attr("transform",d=>{
                    return d
                })
                .attr("style","stroke:url(#orange_red)")
        }
        pianZhunxin();
        var linePath = d3.line()
            .x(d => { return d.x })
            .y(d => { return d.y })
            .curve(d3.curveCatmullRom.alpha(1))
        
        function painStyle(){
            var styleA = svg.append('g')
            .attr("transform","translate(200,200)")
                .classed('styleA', true);

                styleA.selectAll(".styleData")
            .data(styleData)
            .enter()
            .append("path")
            .classed("styleData", true)
            .attr("d", d => linePath(d))
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("stroke",color)
        }
        painStyle()

        function pianScan(){
            var scan = svg.append('g')
            .attr("transform","translate(0,0)")
                .classed('scan', true);
                var dataset={startAngle:0,endAngle:Math.PI/2}
                var arcPath = d3.arc()
                .innerRadius(0)
                .outerRadius(4*rd)
                scan
                .append("path")
                .attr("d",arcPath(dataset))
                .attr("class", "p")
                .attr("stroke",color)
                .attr("style","fill:url(#orange_red)")
                .attr("transform","translate(200,200)")

                scan.append("animateTransform")
                .attr("attributeName","transform")
                .attr("begin","0s")
                .attr("dur","10s")
                .attr("type","rotate")
                .attr("from","0 200 200")
                .attr("to","360 200 200")
                .attr("repeatCount","indefinite")
                
          }
            pianScan()

        
    }
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="600" height="600">
                <defs>
                <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'rgba(54, 201, 255,1)',
                stopOpacity:1}}/>
                <stop offset="25%" style={{stopColor:'rgba(54, 201, 255,.7)',
                stopOpacity:1}}/>
                 <stop offset="50%" style={{stopColor:'rgba(54, 201, 255,.5)',
                stopOpacity:1}}/>
                <stop offset="75%" style={{stopColor:'rgba(54, 201, 255,.3)',
                stopOpacity:1}}/>
                <stop offset="100%" style={{stopColor:'rgba(54, 201, 255,.1)',
                stopOpacity:1}}/>
                </linearGradient>
                </defs>
                {/* <animateTransform id="zhuan" attributeName="transform" begin="0s" dur="10s" type="rotate" from="0 160 160" to="360 160 160" repeatCount="indefinite"/> */}
            </svg></div>
        )
    }
}