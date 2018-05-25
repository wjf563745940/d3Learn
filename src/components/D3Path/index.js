import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import Line from './Line'
import Area from './Area'
import Arcs from './Arcs'
import Chord from './Chord'
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
                        <TabPane tab="line" key="1" className={style.leftPanel}>
                            <Line></Line>
                        </TabPane>
                        <TabPane tab="area" key="2" className={style.leftPanel}>
                            <Area></Area>
                        </TabPane>
                        <TabPane tab="弧" key="3" className={style.leftPanel}>
                            <Arcs></Arcs>
                        </TabPane>
                        <TabPane tab="符号" key="4" className={style.leftPanel}>
                            <Arcs></Arcs>
                        </TabPane>
                        <TabPane tab="弦" key="5" className={style.leftPanel}>
                            <Chord></Chord>
                        </TabPane>
                    </Tabs>
               
            </div>
        );
    }

}
