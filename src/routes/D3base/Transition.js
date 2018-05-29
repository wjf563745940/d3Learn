import React, { Component ,Fragment } from "react";
import D3Transition from 'components/D3Transition';
import styles from './Array.less';

export default class D3Scale extends Component{
    render(){
        return (<div className={styles.whiteB}>
        <D3Transition></D3Transition>
        </div>) 
        
    }
} 