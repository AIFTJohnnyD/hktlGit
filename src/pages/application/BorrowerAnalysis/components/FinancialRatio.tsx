import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress, Liquid } from '@ant-design/charts';
import { Col, Row, Tooltip, Image, Descriptions } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Seller, Statistic, SellerScore } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

import { Column, Bar } from '@ant-design/plots';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

function translate_groupName(x : string) : string
{
  let t = ""
  switch (x) {
    case "low": 
      t = "低"; break;
    case "relative_low": 
      t = "相对低"; break;
    case "median": 
      t = "中"; break;
    case "relative_top": 
      t = "相对高"; break;
    case "top": 
      t = "高"; break;
    default:
      t = x;
  }
  return t;
}
function translate(listItem : any) : any
{
  var list_chinese = [];
      
  for (let i = 0; i < listItem?.length; i++) {
    let item = listItem[i]
    item.x = translate_groupName(item.x)
    if (i == 0) {
      list_chinese = [item];
    } else {
      list_chinese.push(item);
    }
  }

  return list_chinese;
};

const FinancialRatio = ({ loading, financial_ratio}: 
  { loading: boolean; financial_ratio:any }) => {
  console.log(financial_ratio)
    
  return  (
    <div>
      <Row {...topColResponsiveProps} gutter={24}>
        <Col span={6}>
          <ChartCard
            bordered={false}
            title='流动比率'
            loading={loading}
            contentHeight={120}
          >        
            <Column
              height={120}
              autoFit
              data={financial_ratio?.current_ratio?.hist}
              isGroup={true}
              xField="x"
              yField="y"
              seriesField='name'
              color = {['#5B8FF9', '#ff0000']}
              columnStyle = {{
                radius: [20, 20, 0, 0],
              }}          
            />
          </ChartCard>
        </Col>

        <Col span={6}>
          <ChartCard
            bordered={false}
            title='营运资金周转率'
            loading={loading}
            contentHeight={120}
          >        
            <Column
              height={120}
              autoFit
              data={financial_ratio?.working_capital_turnover?.hist}
              isGroup={true}
              xField="x"
              yField="y"
              seriesField='name'
              color = {['#5B8FF9', '#ff0000']}
              columnStyle = {{
                radius: [20, 20, 0, 0],
              }}          
            />       
          </ChartCard>
        </Col>    

        <Col span={6}>
          <ChartCard
            bordered={false}
            title='存货周转率'
            loading={loading}
            contentHeight={120}
          >        
            <Column
              height={120}
              autoFit
              data={financial_ratio?.inventory_turnover?.hist}
              isGroup={true}
              xField="x"
              yField="y"
              seriesField='name'
              color = {['#5B8FF9', '#ff0000']}
              columnStyle = {{
                radius: [20, 20, 0, 0],
              }}          
            />         
          </ChartCard>
        </Col>

        <Col span={6}>
          <ChartCard
            bordered={false}
            title='资产收益率 (ROA)'
            loading={loading}
            contentHeight={120}
          >        
            <Column
              height={120}
              autoFit
              data={financial_ratio?.average_rate_of_return?.hist}
              isGroup={true}
              xField="x"
              yField="y"
              seriesField='name'
              color = {['#5B8FF9', '#ff0000']}
              columnStyle = {{
                radius: [20, 20, 0, 0],
              }}          
            />         
          </ChartCard>
        </Col>    
      </Row>
    </div>
);}

export default FinancialRatio;

