import React, { Component ,Fragment } from "react";
import D3ScaleC from 'components/D3Scale';
import styles from './Array.less';

export default class D3Scale extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3ScaleC></D3ScaleC>
        </div>) 
        
    }
} 