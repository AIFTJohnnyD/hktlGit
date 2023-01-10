import { Card, Col, Row, Tabs, Collapse, List, Space, Descriptions } from 'antd';
const { Panel } = Collapse;

import { BidirectionalBar } from '@ant-design/charts';
import styles from '../style.less';
import { FormattedMessage } from 'umi';

import { TinyArea, TinyColumn, Progress, Liquid } from '@ant-design/charts';
import { RadialBar, Column } from '@ant-design/plots';

const topColResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: { marginBottom: 24 },
  };

function panel(plan:any){
    /*
    const header:string = plan_name + ": " + 
                    "组别123: " + plan?.npl_credit_123.toString() + "倍月流水, " + plan?.interest_rate_123 + "年利率; " +
                    "组别456: " + plan?.npl_credit_456.toString() + "倍月流水, " + plan?.interest_rate_456 + "年利率; " +
                    "组别789: " + plan?.npl_credit_789.toString() + "倍月流水, " + plan?.interest_rate_789 + "年利率"; 
    
    const list_total_statistics = [
        "总贷款金额(百万美元): " + plan?.total_credit_amount?.toString(),
        "平均拒绝率: " + plan?.total_rate_of_return,
        "平均不良贷款率: " + plan?.total_reject_rate,
        "总收益率: " + plan?.total_NPL_rate,
    ]
    */
    return(
        <>
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <Row>
                        <Col span={12}>
                            <Card
                                bordered={true}
                                title={"总贷款金额(百万美元): " + plan?.total_credit_amount.toString()}
                            >
                                <Column
                                    data={plan?.sum_revenue_mean_npl_rate}
                                    xField={"x"}
                                    yField={"卖家收入分布(百万美元)"}
                                    height={120}
                                >

                                </Column>
                            </Card>                        
                        </Col>
                        <Col span={12}>
                            <Card
                                bordered={true}
                                title= '平均不良贷款率'
                            >
                                <Liquid
                                percent={plan?.total_NPL_rate}
                                height={120}
                                />
                            </Card>                        
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Card
                                bordered={true}
                                title= '总收益率'
                            >
                                <Liquid
                                percent={plan?.total_rate_of_return}
                                height={120}
                                />
                            </Card>                        
                        </Col>
                        <Col span={12}>
                            <Card
                                bordered={true}
                                title= '平均拒绝率'
                            >
                                <Liquid
                                percent={plan?.total_reject_rate}
                                height={120}
                                />
                            </Card>                        
                        </Col>
                    </Row>

                </Col>

                <Col {...topColResponsiveProps}>
                    <Card
                    title="卖家不良贷款率"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <BidirectionalBar
                            height={400}
                            autoFit
                            data={plan?.sum_revenue_mean_npl_rate}
                            xField="x"
                            xAxis={{
                                position: 'bottom',
                            }}
                            yField={['卖家收入分布(百万美元)', '不良贷款率 (%)']}
                        >
                        </BidirectionalBar>
                    </Card>                    
                </Col>
            </Row>
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <Card
                    title="贷款额度与收益率"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <BidirectionalBar
                            height={400}
                            autoFit
                            data={plan?.sum_credit_amount_sum_netincome_credit_amount_rate}
                            xField="x"
                            xAxis={{
                                position: 'bottom',
                            }}
                            yField={['贷款额度(百万美元)', '收益率 (%)']}
                        >
                        </BidirectionalBar>
                    </Card>                     
                </Col>
                <Col {...topColResponsiveProps}>
                    <Card
                    title="卖家拒绝率"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <BidirectionalBar
                            height={400}
                            autoFit
                            data={plan?.seller_num_reject_rate}
                            xField="x"
                            xAxis={{
                                position: 'bottom',
                            }}
                            yField={['卖家数量', '拒绝率 (%)']}
                        >
                        </BidirectionalBar>
                    </Card>                     
                </Col>
            </Row>
        </>        
    )
}

function get_plan_company(shop_type: number, shop_credit: number, shop_interest_rate: number){
    return "组别" + shop_type?.toString() + ": " + 
            shop_credit?.toString() + "倍月流水, " + 
            shop_interest_rate + "年利率";
}

const Nonperforming_Loan = ({
    nonperforming_loan
}:{
    nonperforming_loan: any;
}) => {
    const onChange = (key: string | string[]) => {
        //console.log(key);
    };
    //console.log(dict_nonperforming_loan);

    return(
    <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card
            title="不良贷款计算(普通贷款)"
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            //style={{ width: 500 }}
            >
                {panel(nonperforming_loan)}
            </Card>
        </Space>
    </>
)};
      
export default Nonperforming_Loan;

/*                    
                    <Card
                    title="汇总"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <List
                        size="large"
                        bordered
                        dataSource={list_total_statistics}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        />                        
                    </Card>
*/