import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import Api from './Api';
import Timer from './Timer';
import style from './index.less'

export default class D3Array extends Component {
    static defaultProps = {
        classNmae: '',
        onSubmit: () => { }
    };
    static propTypes = {
        classNmae: PropTypes.string,
        onSubmit: PropTypes.func
    };
    state = {
        active: 'static'
    };

    render() {
   
        const TabPane = Tabs.TabPane;
        return (
            <div>
        
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="语法" key="1" className={style.leftPanel}>
                            <Api></Api>
                        </TabPane>
                        <TabPane tab="动画" key="2" className={style.leftPanel}>
                            <Timer></Timer>
                        </TabPane>
                    </Tabs>
               
            </div>
        );
    }

}
