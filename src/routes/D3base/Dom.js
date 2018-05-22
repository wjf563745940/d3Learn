import React, { Component ,Fragment } from "react";
import D3DomC from 'components/D3Dom';
import styles from './Array.less';

export default class D3Dom extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3DomC></D3DomC>
        </div>) 
        
    }
} 