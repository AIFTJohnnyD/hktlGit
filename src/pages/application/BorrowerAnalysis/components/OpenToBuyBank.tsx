import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress, Liquid, Gauge, Bullet } from '@ant-design/charts';
import { Col, Row, Tooltip, Image, Descriptions } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { OtbPlanBank } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

import { Column } from '@ant-design/plots';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const OpenToBuyBank = ({ loading, otb_plan_bank }: 
  { loading: boolean; otb_plan_bank: OtbPlanBank }) => (
  <div>
    <Row gutter={24}>
{/*      
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '贷款利率'
          loading={loading}
          contentHeight={120}
        >
          <Liquid
            percent={otb_plan_bank?.interest_rate}
            height={120}
          />
        </ChartCard>
      </Col>
*/}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '毛利率 (GP/GMV)'
          loading={loading}
          contentHeight={120}
        >
          <Gauge
            percent={otb_plan_bank?.profit_margin}
            range = {{
              color: '#30BF78',
            }}
            indicator = {{
              pointer: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
              pin: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
            }}
            axis = {{
              label: {
                formatter(v) {
                  return Number(v) * 100;
                },
              },
              subTickLine: {
                count: 3,
              },
            }}            
            statistic = {{
              content: {
                style: {
                  fontSize: '18px',
                  lineHeight: '18px',
                  color: '#30BF78',
                },
              },
            }}
            height={120}          
          />
          {/*
          <Liquid
            percent={otb_plan_bank?.profit_margin}
            height={120}
          />
          */}
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '资产收益率 (ROA)'
          loading={loading}
          contentHeight={120}
        >
          <Column
            height={120}
            autoFit
            data={[ {x: '资产收益率 (ROA)', y: otb_plan_bank?.average_rate_of_return},
                  ]}
            xField="x"
            yField="y"
            xAxis={{
              title: null,
            }}
            yAxis={{
              title: null,
            }}
            meta={{
              y: {
                alias: '比率',
              },
            }}
            color = '#30BF78'
          />            
        </ChartCard>
      </Col>      

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '现金比率'
          loading={loading}
          contentHeight={120}
        >
          <Gauge
            percent={otb_plan_bank?.cash_ratio}
            range = {{
              color: '#30BF78',
            }}
            indicator = {{
              pointer: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
              pin: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
            }}
            axis = {{
              label: {
                formatter(v) {
                  return Number(v) * 100;
                },
              },
              subTickLine: {
                count: 3,
              },
            }}            
            statistic = {{
              content: {
                style: {
                  fontSize: '18px',
                  lineHeight: '18px',
                  color: '#30BF78',
                },
              },
            }}
            height={120}          
          />          
          {/*
          <Liquid
            percent={otb_plan_bank?.cash_ratio}
            height={120}
          />
          */}
        </ChartCard>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '速动比率 / 流动比率'
          loading={loading}
          contentHeight={120}
        >
          <Column
            height={120}
            autoFit
            data={[ {x: '速动比率', y: otb_plan_bank?.quick_ratio},
                    {x: '流动比率', y: otb_plan_bank?.current_ratio},
                  ]}
            xField="x"
            yField="y"
            xAxis={{
              title: null,
            }}
            yAxis={{
              title: null,
            }}
            meta={{
              y: {
                alias: '比率',
              },
            }}
          />            
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '存货周转率 / 营运资金周转率'
          loading={loading}
          contentHeight={120}
        >
          <Column
            height={120}
            autoFit
            data={[ {x: '存货周转率', y: otb_plan_bank?.inventory_turnover},
                    {x: '营运资金周转率', y: otb_plan_bank?.working_capital_turnover},
                  ]}
            xField="x"
            yField="y"
            xAxis={{
              title: null,
            }}
            yAxis={{
              title: null,
            }}
            meta={{
              y: {
                alias: '比率',
              },
            }}
          />            
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '债务与税息折旧及摊销前利润比'
          loading={loading}
          contentHeight={120}
        >
          <Liquid
            percent={otb_plan_bank?.debt_to_EBITDA_margin}
            height={120}
          />
        </ChartCard>
      </Col>
{/*
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title= '利息覆盖率'
          loading={loading}
          contentHeight={120}
        >
          <Column
            height={120}
            autoFit
            data={[ {x: '利息覆盖率', y: otb_plan_bank?.interest_coverage_ratio},
                  ]}
            xField="x"
            yField="y"
            xAxis={{
              title: null,
            }}
            yAxis={{
              title: null,
            }}
            meta={{
              y: {
                alias: '比率',
              },
            }}
          />            
        </ChartCard>
      </Col>
*/}
    </Row>
  </div>
);

export default OpenToBuyBank;


{
/*
          <Gauge
            percent={otb_plan_bank?.profit_margin}
            type = {'meter'}
            innerRadius = {otb_plan_bank?.profit_margin}
            range = {{
              ticks: [0, 1 / 3, 2 / 3, 1],
              color: ['#F4664A', '#FAAD14', '#30BF78'],
            }}
            indicator = {{
              pointer: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
              pin: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
            }}
            statistic = {{
              content: {
                style: {
                  fontSize: '18px',
                  lineHeight: '60px',
                },
              },
            }}            
            height={120}          
          />
*/  
}