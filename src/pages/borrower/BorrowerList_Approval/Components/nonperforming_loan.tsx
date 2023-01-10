import { Card, Col, Row, Tabs, Collapse, List, Space, Statistic } from 'antd';
const { Panel } = Collapse;

import { Column, BidirectionalBar, Liquid } from '@ant-design/charts';
import styles from '../style.less';
import { FormattedMessage } from 'umi';

const { TabPane } = Tabs;

const topColResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: { marginBottom: 24 },
  };

function panel(plan_name:string, plan:any, key:string){

    return(
        <TabPane tab={plan_name} key={key}>
            <Row gutter={24}>
                <Col span={6}>
                    <Card
                        bordered={true}
                        title= '贷款额度'
                    >
                        <Statistic title="金额 (美元)" value={plan?.credit_amount} />
                        <Statistic title="贷款额度 / 月均流水" value={plan?.shop_credit} />
                    </Card>                        
                </Col>
                <Col span={6}>
                    <Card
                        bordered={true}
                        title= '收益率'
                    >
                        <Liquid
                        percent={plan?.rate_of_return}
                        height={120}
                        />
                    </Card>                        
                </Col>
                <Col span={6}>
                    <Card
                        bordered={true}
                        title= '不良贷款率'
                    >
                        <Liquid
                        percent={plan?.NPL_rate}
                        height={120}
                        />
                    </Card>                        
                </Col>
                <Col span={6}>
                    <Card
                        bordered={true}
                        title= '违约概率'
                    >
                        <Liquid
                        percent={plan?.probability_of_default}
                        height={120}
                        />
                    </Card>                        
                </Col>
            </Row>
        </TabPane>       
    )
}

const Nonperforming_Loan = ({
    dict_nonperforming_loan, name_cn
}:{
    dict_nonperforming_loan: any;
    name_cn: string
}) => {
    return(
    <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card
            title={"不良贷款计算(" + name_cn + ")"}
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            //style={{ width: 500 }}
            >
                <Tabs
                    size="large"
                    type="card"
                    tabBarStyle={{ marginBottom: 24 }}
                >
                    {panel("标准信用额度及年利率", dict_nonperforming_loan?.plan_1, "1")}
                    {panel("信贷额度矩阵", dict_nonperforming_loan?.plan_2, "2")}
                    {panel("年利率矩阵", dict_nonperforming_loan?.plan_3, "3")}
                </Tabs>                
            </Card>
        </Space>
    </>
)};
      
export default Nonperforming_Loan;