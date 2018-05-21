import React, { Component ,Fragment } from "react";
import D3Array from 'components/D3Array';
import styles from './Array.less';

export default class D3baseArray extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3Array></D3Array>
        </div>) 
        
    }
} 