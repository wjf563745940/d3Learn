import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import Color from './Color'
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
                        <TabPane tab="Color" key="1" className={style.leftPanel}>
                            <Color></Color>
                        </TabPane>
                        
                    </Tabs>
               
            </div>
        );
    }

}
