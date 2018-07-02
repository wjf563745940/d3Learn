import * as d3 from "d3";
import {
    createScale,
    createAxis,
    deepClone,
    getType
} from '../util'
import D3Charts from '../common'
var D3ChartsKLine = function (el, options) {
    //this.options = options
    // this.$el = el;
    D3Charts.call(this);
    this.type="kline"
}
D3ChartsKLine.prototype = new D3Charts();
D3ChartsKLine.prototype.constructor = D3ChartsKLine;

// D3ChartsKLine.prototype.draw = function () {
//     this.drawContent();
// }
D3ChartsKLine.prototype.drawContent = function () {
    var svg = this.$el;

    console.log("drwa kline")
   
}
export default new D3ChartsKLine()