import Rect, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs,Card } from 'antd';
import ScaleLine from './ScaleLine'
import ScaleLog from './ScaleLog'
import ScalePow from './ScalePow'
import Quantize from './Quantize'
import Quantile from './Quantile'
import Threshold from './Threshold'
import Ordinal from './Ordinal'
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
                        <TabPane tab="线性" key="1" className={style.leftPanel}>
                            <ScaleLine></ScaleLine>
                        </TabPane>
                        <TabPane tab="指数" key="2" className={style.leftPanel}>
                            <ScalePow></ScalePow>
                        </TabPane>
                        <TabPane tab="对数" key="3" className={style.leftPanel}>
                            <ScaleLog></ScaleLog>
                        </TabPane>
                        <TabPane tab="量子" key="4" className={style.leftPanel}>
                            <Quantize></Quantize>
                        </TabPane>
                        <TabPane tab="分位" key="5" className={style.leftPanel}>
                            <Quantile></Quantile>
                        </TabPane>
                        <TabPane tab="阀值" key="6" className={style.leftPanel}>
                            <Threshold></Threshold>
                        </TabPane>
                        <TabPane tab="序数" key="7" className={style.leftPanel}>
                            <Ordinal></Ordinal>
                        </TabPane>
                    </Tabs>
               
            </div>
        );
    }

}
