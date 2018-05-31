import React, { Component } from 'react'
import * as d3 from "d3";
import styles from './index.less';

export default class D3SvgLine extends Component {
    componentDidMount() {
        var width=960,height=900;
        var svg=d3.select("#chart")
        console.log(svg)
        var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 + 20) + ")");
        // T.D3Overlay = T.Overlay.extend({

        //     initialize: function (init, redraw, options) {
        //         this.uid = new Date().getTime();
        //         this.init = init;
        //         this.redraw = redraw;
        //         if (options)
        //             this.options = options;
        //         d3.select("head")
        //             .append("style").attr("type", "text/css")
        
        //     },
        
        //     /**
        //      * 地图缩放触发的函数
        //      * @private
        //      */
        //     _zoomChange: function () {
        //         if (!this.redraw)
        //             this.init(this.selection, this.transform);
        //         else
        //             this.redraw(this.selection, this.transform);
        //     },
        
        //     onAdd: function (map) {
        //         this.map = map;
        //         var self = this;
        //         //增加svg容器
        //         this._svg = new T.SVG();
        //         map.addLayer(this._svg);
        //         //根节点
        //         this._rootGroup = d3.select(this._svg._rootGroup).classed("d3-overlay", true);
        //         this.selection = this._rootGroup;
        //         //一些转换参数
        //         this.transform = {
        //             //坐标转容器像素坐标。
        //             LngLatToD3Point: function (a, b) {
        //                 var _lnglat = a instanceof T.LngLat ? a : new T.LngLat(a, b);
        //                 var point = self.map.lngLatToLayerPoint(_lnglat);
        //                 this.stream.point(point.x, point.y);
        //             },
        //             //换算一米转多少像素
        //             unitsPerMeter: function () {
        //                 return 256 * Math.pow(2, map.getZoom()) / 40075017
        //             },
        //             map: self.map,
        //             layer: self
        
        //         };
        //         // this.transform.pathFromGeojson =
        //         //     d3.geoPath().geoProjection(d3.geo.transform({
        //         //         point: this.transform.LngLatToD3Point
        //         //     }));
        //         //D3绘制
        //         this.init(this.selection, this.transform);
        //         //用于确定坐标的
        //         if (this.redraw)
        //             this.redraw(this.selection, this.transform);
        
        //         map.addEventListener("zoomend", this._zoomChange, this);
        
        
        //     },
        
        
        //     onRemove: function (map) {
        //         map.removeEventListener("zoomend", this._zoomChange, this);
        //         this._rootGroup.remove();
        //         map.removeOverLay(this._svg)
        //     },
        
        //     /**
        //      * 图层移动到最上层
        //      * @returns {T.D3Overlay}
        //      */
        //     bringToFront: function () {
        //         if (this._svg && this._svg._rootGroup) {
        //             var el = this._svg._rootGroup.parentNode;
        //             el.parentNode.appendChild(el);
        
        //         }
        //         return this;
        //     },
        
        
        //     /**
        //      * 图层移动到最底层。
        //      * @returns {T.D3Overlay}
        //      */
        //     bringToBack: function () {
        //         if (this._svg && this._svg._rootGroup) {
        //             var el = this._svg._rootGroup.parentNode;
        //             var parent = el.parentNode;
        //             parent.insertBefore(el, parent.firstChild);
        
        //         }
        //         return this;
        //     },
        
        
        // })
        var map;
        var zoom = 12;
        function onLoad() {
            map = new T.Map('mapDiv', {
                projection: 'EPSG:4326'
            });
            map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom);
        }
        onLoad();
      
    };
    render() {

        return (
            <div className={styles.chartCon}>
                <div id="mapDiv" style={{position:'absolute',width:'500px', height:'400px'}}></div>
            <svg className={styles.chart} id="chart" width="960" height="900"></svg></div>
        )
    }
}