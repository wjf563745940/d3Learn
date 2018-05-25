import React, { Component ,Fragment } from "react";
import D3PathC from 'components/D3Path';
import styles from './Array.less';

export default class D3Color extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3PathC></D3PathC>
        </div>) 
        
    }
} 