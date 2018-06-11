import * as d3 from "d3";
export  const createScale=function(params){
    var xScale,yScale;
    xScale = d3.scaleLinear()
                .domain([params.x.domainfrom, params.x.domainto ])
                .range([params.x.rangefrom ,params.x.rangeto  ])
            yScale = d3.scaleLinear()
                .domain([params.x.domainfrom  ,params.x.domainto ])
                .range([params.x.rangefrom , params.x.rangeto ])
    return {xScale,yScale}
}
export const  createAxis =function (params) {
    console.log(params)
    var xAxis = createAxisDir(params.x)
        .scale(params.xScale)
    // .ticks(5)
    //  .tickFormat(d3.format("d"))
    var yAxis =createAxisDir(params.y)
        .scale(params.yScale);
        return {xAxis,yAxis}
    // svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    //     .call(xAxis)
    // svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    //     .call(yAxis)
}
function createAxisDir(dir) {
    var obj;
    switch (dir) {
        case "bottom":
            obj = d3.axisBottom();
            break;
        case "left":
            obj = d3.axisLeft();
            break;
        default:
            obj = d3.axisBottom();
    }
    return obj
}


    // createScale,
    // createAxis
