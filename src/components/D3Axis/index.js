import React ,{Component} from 'react';
import { Tabs,Card } from 'antd';
import Axis from './Axis'
import Axis2 from './Axis2'
import style from './index.less'
export default class D3Axis extends Component{
    render(){
        const TabPane = Tabs.TabPane;
        return (
            <div>
        
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="刻度" key="1" className={style.leftPanel}>
                            <Axis></Axis>
                        </TabPane>
                        <TabPane tab="刻度+柱形" key="2" className={style.leftPanel}>
                            <Axis2></Axis2>
                        </TabPane>
                    </Tabs>
               
            </div>
        )
    }
} 