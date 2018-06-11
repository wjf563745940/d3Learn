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
export const deepClone =function deepClone(target,data){
    var type = getType(data);
    var obj=target;
    if(type === 'array'){
        obj = [];
    } else if(type === 'object'){
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if(type === 'array'){
        for(var i = 0, len = data.length; i < len; i++){
            obj.push(deepClone(data[i]));
        }
    } else if(type === 'object'){
        for(var key in data){
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}
function getType(obj){
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
       '[object Boolean]'  : 'boolean', 
       '[object Number]'   : 'number', 
       '[object String]'   : 'string', 
       '[object Function]' : 'function', 
       '[object Array]'    : 'array', 
       '[object Date]'     : 'date', 
       '[object RegExp]'   : 'regExp', 
       '[object Undefined]': 'undefined',
       '[object Null]'     : 'null', 
       '[object Object]'   : 'object'
   };
   if(obj instanceof Element) {
        return 'element';
   }
   return map[toString.call(obj)];
}
    // createScale,
    // createAxis
