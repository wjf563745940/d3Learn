import React, { Component ,Fragment } from "react";
import D3AxisC from 'components/D3Axis';
import styles from './Array.less';

export default class D3Scale extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3AxisC></D3AxisC>
        </div>) 
        
    }
} 