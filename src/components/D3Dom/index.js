import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import Element from './Element';
import ElementData from './ElementData';
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
        function callback(key) {
           
        }
        const TabPane = Tabs.TabPane;
        const arrfun = [{ name: "d3.min", funname: "min" }]
        return (
            <div>
        
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="元素处理" key="1" className={style.leftPanel}>
                            <Element></Element>
                        </TabPane>
                        <TabPane tab="绑定数据" key="2" className={style.leftPanel}>
                            <ElementData></ElementData>
                        </TabPane>
                    </Tabs>
               
            </div>
        );
    }

}
