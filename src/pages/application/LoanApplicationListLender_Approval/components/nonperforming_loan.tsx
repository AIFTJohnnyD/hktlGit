import { Card, Col, Row, Tabs, Collapse, List, Space } from 'antd';
const { Panel } = Collapse;

import { Column, BidirectionalBar } from '@ant-design/charts';
import styles from '../style.less';
import { FormattedMessage } from 'umi';

const topColResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: { marginBottom: 24 },
  };

function panel(plan_name:string, plan:any, key:string){
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

    return(
        <Panel header={header} key={key}>
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <Card
                    title="卖家不良贷款率分析"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <BidirectionalBar
                            height={300}
                            autoFit
                            data={plan?.sum_revenue_mean_npl_rate}
                            xField="x"
                            xAxis={{
                                position: 'bottom',
                            }}
                            yField={['卖家收入分布(百万美元)', '不良贷款率']}
                        >
                        </BidirectionalBar>
                    </Card>                    
                </Col>
                <Col {...topColResponsiveProps}>
                    <Card
                    title="贷款额度与收益率分析"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <BidirectionalBar
                            height={300}
                            autoFit
                            data={plan?.sum_credit_amount_sum_netincome_credit_amount_rate}
                            xField="x"
                            xAxis={{
                                position: 'bottom',
                            }}
                            yField={['贷款额度(百万美元)', '收益率']}
                        >
                        </BidirectionalBar>
                    </Card>                     
                </Col>
            </Row>
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <Card
                    title="卖家拒绝率分析"
                    className="styles.card"
                    bordered={false}
                    size= "small"
                    headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
                    >
                        <BidirectionalBar
                            height={300}
                            autoFit
                            data={plan?.seller_num_reject_rate}
                            xField="x"
                            xAxis={{
                                position: 'bottom',
                            }}
                            yField={['卖家数量', '拒绝率']}
                        >
                        </BidirectionalBar>
                    </Card>                     
                </Col>
                <Col {...topColResponsiveProps}>
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
                </Col>
            </Row>
        </Panel>        
    )
}

function get_plan_company(shop_type: number, shop_credit: number, shop_interest_rate: number){
    return "组别" + shop_type?.toString() + ": " + 
            shop_credit?.toString() + "倍月流水, " + 
            shop_interest_rate + "年利率";
}

const Nonperforming_Loan = ({
    dict_nonperforming_loan, name_cn
}:{
    dict_nonperforming_loan: any;
    name_cn: string
}) => {
    const onChange = (key: string | string[]) => {
        //console.log(key);
    };
    //console.log(dict_nonperforming_loan);
    const list_plan_company = [
        "计划1: " + get_plan_company(dict_nonperforming_loan?.plan_1?.shop_type, dict_nonperforming_loan?.plan_1?.shop_credit, dict_nonperforming_loan?.plan_1?.shop_interest_rate),
        "计划2: " + get_plan_company(dict_nonperforming_loan?.plan_2?.shop_type, dict_nonperforming_loan?.plan_2?.shop_credit, dict_nonperforming_loan?.plan_2?.shop_interest_rate),
        "计划3: " + get_plan_company(dict_nonperforming_loan?.plan_3?.shop_type, dict_nonperforming_loan?.plan_3?.shop_credit, dict_nonperforming_loan?.plan_3?.shop_interest_rate),
    ];

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
                <Collapse accordion onChange={onChange}>
                    {panel("计划1", dict_nonperforming_loan?.plan_1, "1")}
                    {panel("计划2", dict_nonperforming_loan?.plan_2, "2")}
                    {panel("计划3", dict_nonperforming_loan?.plan_2, "3")}
                </Collapse>
            </Card>

            <Card
            title={"不良贷款计算(" + name_cn + ")"}
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            //style={{ width: 500 }}
            >
                <List
                size="large"
                bordered
                dataSource={list_plan_company}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </Card>
            
        </Space>
    </>
)};
      
export default Nonperforming_Loan;