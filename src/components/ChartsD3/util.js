import * as d3 from "d3";
export const createScale = function (params,invert) {
    var xScale, yScale;
console.log(params)
if(params.x.type=="value"){
    xScale = d3.scaleLinear()
    .domain([params.x.domainfrom, params.x.domainto])
    .range([params.x.rangefrom, params.x.rangeto])
}else if(params.x.type=="category"){
    xScale =d3.scaleBand()
    .domain(params.x.domainto.map(function(d) { return d; }))
    .range([params.x.rangefrom, params.x.rangeto])
    .padding(0.1);
}
   if(invert){
    yScale = d3.scaleLinear()
    .domain([params.y.domainfrom, params.y.domainto*1])
    .range([ params.y.rangeto,params.y.rangefrom])
   }else{
    yScale = d3.scaleLinear()
    .domain([params.y.domainfrom, params.y.domainto*1])
    .range([params.y.rangefrom, params.y.rangeto])
   }
   

    return { xScale, yScale }
}
export const createAxis = function (params) {
    console.log(params)
    var xAxis = createAxisDir(params.x.position)
        .scale(params.x.xScale)
       // .ticks(50)
       .tickValues(params.x.tickValues);
       // .tickArguments([40]);
    //  .tickFormat(d3.format("d"))
    var yAxis = createAxisDir(params.y.position)
        .scale(params.y.yScale);
    return { xAxis, yAxis }
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
export const deepClone = function deepClone(target, data) {
    var type = getType(data);
    if(target==undefined){
        target={};
    }
    if (type == "object") {
        for (var key in data) {
            if (getType(data[key])=="object") {
                target[key]= deepClone(target[key],data[key])
            }else if(getType(data[key])=="array"){
                target[key]= deepClone(target[key],data[key])
            }else{
                if(!(getType(target[key])=="object" || getType(target[key])=="array")){
                    target={};
                }
                target[key]=data[key]
            }
        }
    }
    else if (type == "array") {
            for(let i=0;i<data.length;i++){
                if (getType(data[i])=="object") {
                    target[i]= deepClone(target[i],data[i])
                }else if(getType(data[i])=="array"){
                    target[i]= deepClone(target[i],data[i])
                }else{
                    target[i]=data[i]
                }
            }
    } else {
        return target;
    }

    return target;
}
export const getType= function getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}
    // createScale,
    // createAxis
