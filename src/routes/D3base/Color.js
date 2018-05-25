import React, { Component ,Fragment } from "react";
import D3ColorC from 'components/D3Color';
import styles from './Array.less';

export default class D3Color extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3ColorC></D3ColorC>
        </div>) 
        
    }
} 