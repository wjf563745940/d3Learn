import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import Statistics from './Statistics';
import Search from './Search';
import Transformations from './Transformations';
import Nest from './Nest';

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
            console.log(key);
        }
        const TabPane = Tabs.TabPane;
        const arrfun = [{ name: "d3.min", funname: "min" }]
        return (
            <div>
        
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Statistics" key="1" className={style.leftPanel}>
                            <Statistics></Statistics>
                        </TabPane>
                        <TabPane tab="Search" key="2" className={style.leftPanel}>
                            <Search></Search>
                        </TabPane>
                        <TabPane tab="Transformations" key="3">
                            <Transformations></Transformations>
                        </TabPane>
                        <TabPane tab="Nest" key="4">
                            <Nest></Nest>
                        </TabPane>
                    </Tabs>
               
            </div>
        );
    }

}
