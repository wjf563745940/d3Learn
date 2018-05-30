import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var width=600,height=600;
        var svg=d3.select("#chart")
        var g = svg.append("g").attr("transform", "translate(40,0)");

        var dataset={
            name:"中国",
            children:[
                {name:"浙江",
                 children:[
                     {name:"杭州"},
                     {name:"台州"}
                 ]   
                },
                {
                    name:"广西",
                    children:[
                        {name:"桂林",
                          children:[
                              {name:"七星区"}
                          ]  
                        },
                        {name:"南宁"}
                    ]
                }
            ]
        }
        var cluster=d3.cluster();
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
        var root = tree(d3.hierarchy(dataset))//转化数据层次 并生成树根节点

        //.id(function(d) { console.log(d);return "path"; })
        //.parentId(function(d) { return "aasd"; })
        console.log(root)
        console.log(root.descendants())
        var link = g.selectAll(".link")
        .data(root.descendants().slice(1))//出来跟节点都要生成连线
      .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);
        var node = g.selectAll(".node")//生成节点
        .data(root.descendants())
      .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
        console.log(node)
        node.append("circle")
        .attr("r", 2.5);

        node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { console.log(d);return d.data.name; });

      function diagonal(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      }
    };
    render() {

        return (
            <div className={styles.chartCon}><svg className={styles.chart} id="chart" width="600" height="600"></svg></div>
        )
    }
}