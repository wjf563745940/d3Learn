import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var width=960,height=900;
        var svg=d3.select("#chart")
        var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 + 20) + ")");

        var dataset={
            name:"中国",
            children:[
                {name:"浙江",
                 children:[
                     {name:"杭州"},
                     {name:"台州",
                     children:[
                         {name:"玉环",children:[{
                             name:"楚门"},
                               { name:"驻港"} 
                            ]},
                         {name:"温岭"},
                         {name:"路桥"},
                         {name:"椒江***"} ]
                    },
                     {name:"宁波"},
                     {name:"温州"},
                     {name:"绍兴"},
                     {name:"绍兴"},
                     {name:"绍兴"},
                     {name:"绍兴"},
                     {name:"绍兴"},
                 ]   
                },
                {
                    name:"广西",
                    children:[
                        {name:"桂林",
                          children:[
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},
                              {name:"七星区"},


                          ]  
                        },
                        {name:"南宁"},
                        {name:"南宁"},
                        {name:"南宁"},
                        {name:"南宁"},
                        {name:"南宁"},
                        {name:"南宁"},
                        {name:"南宁"},
                    ]
                }
            ]
        }
        var cluster=d3.cluster()
        .size([360, width / 2 - 120]);
        var tree =d3.tree()///初始化树结构布局
        .size([width,height-200])
        .separation((a,b)=>{
            return (a.parent==b.parent?1:2)//比较2个节点
        })
        console.log(tree)
        console.log( d3.hierarchy(dataset,d=>{return d.children}))
        console.log(tree(d3.hierarchy(dataset)))
        console.log(cluster(d3.hierarchy(dataset)))
        // var stratify = d3.stratify()
        // .parentId(function(d) {console.log(d) ;return d.name; });
        //如果不是json数据可以使用d3.stratify将表格数据（如逗号分隔值（CSV））生成对应的数据格式
        var root = cluster(d3.hierarchy(dataset))//转化数据层次 并生成树根节点 群集布局产生树状图

        //.id(function(d) { console.log(d);return "path"; })
        //.parentId(function(d) { return "aasd"; })
        console.log(root)
        console.log(root.descendants())
    //     var link = g.selectAll(".link")
    //     .data(root.descendants().slice(1))//出来跟节点都要生成连线
    //   .enter().append("path")
    //     .attr("class", "link")
    //     .attr("d", diagonal);
        var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + project(d.x, d.y)
            + "C" + project(d.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, d.parent.y);
      });

        var node = g.selectAll(".node")//生成节点
        .data(root.descendants())
      .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) {console.log(d) ;return "translate(" + project(d.x, d.y) + ")"; });
      
        node.append("circle")
        .attr("r", 2.5);

        node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
      .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
      .text(function(d) { console.log(d);return d.data.name; });

      function diagonal(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      }
      function project(x, y) {
          
        var angle = (x - 90) / 180 * Math.PI, radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
      }
    };
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="960" height="900"></svg></div>
        )
    }
}