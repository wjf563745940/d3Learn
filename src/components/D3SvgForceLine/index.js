import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';
import smt from 'assets/miserables.json';
export default class D3SvgLine extends Component {
   
    componentDidMount() {
        var self=this;
        var canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;
    
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.5))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        // .alphaDecay(0);
    
    d3.select("input[type=range]")
        .on("input", inputted);
   
    var graph=smt;
   // d3.json("/static/miserables.json", function(error, graph) {
     // if (error) throw error;
    
      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);
    
      simulation.force("link")
          .links(graph.links);
    
      function ticked() {
        context.clearRect(0, 0, width, height);
    
        context.beginPath();
        graph.links.forEach(drawLink);
        context.strokeStyle = "#aaa";
        context.stroke();
    
        context.beginPath();
        graph.nodes.forEach(drawNode);
        context.fill();
        context.strokeStyle = "#fff";
        context.stroke();
      }

   // });


   function inputted() {
    simulation.force("link").strength(+this.value);
    simulation.alpha(1).restart();
  }
  
  function drawLink(d ) {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  }
  
  function drawNode(d) {
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
  }
    };

   


    render() {

        return (
            <div className={styles.chartCon}>
            <canvas  width="960" height="600"></canvas>
            <svg className={styles.chart} id="chart" width="960" height="600"></svg>
            </div>
        )
    }
}