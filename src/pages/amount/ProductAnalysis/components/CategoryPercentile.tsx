import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress, Liquid } from '@ant-design/charts';
import { Col, Row, Tooltip, Image, Descriptions } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Seller, Statistic, SellerScore } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { getLocale, FormattedMessage } from 'umi';

import { Column, Bar } from '@ant-design/plots';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const changeLocals = (value: string) =>{
  return <FormattedMessage id = {value} />
}

function translate_groupName(x: string): string
{
  let t: string;

  if((getLocale() === 'zh-CN')||(getLocale() === 'zh-TW')) {
    switch (x) {
      case "low": 
        t = "低"; break;
      case "relative_low": 
        t = "偏低"; break;
      case "median": 
        t = "中"; break;
      case "relative_top": 
        t = "偏高"; break;
      case "top": 
        t = "高"; break;
      default:
        t = x;
    }
  }
  else
  {
    switch (x) {
      case "low": 
        t = "low"; break;
      case "relative_low": 
        t = "rlow"; break;
      case "median": 
        t = "min"; break;
      case "relative_top": 
        t = "rtop"; break;
      case "top": 
        t = "top"; break;
      default:
        t = x;
    }
  }
  return t;
}

function translate(listItem: any): any
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

const CategoryPercentile = ({ loading, product_percentile}: 
  { loading: boolean; product_percentile: any }) => {
  //console.log(product_percentile)
/*
  let price = [ {x: '低', y: product_percentile?.price.low, type: '价格'},
                {x: '相对低', y: product_percentile?.price.relative_low, type: '价格'},
                {x: '中', y: product_percentile?.price.median, type: '价格'},
                {x: '相对高', y: product_percentile?.price.relative_top, type: '价格'},
                {x: '高', y: product_percentile?.price.top, type: '价格'},
              ];

  let price_cat = generate_cat(product_percentile?.price_cat);
  console.log(price_cat);
*/    
  return  (
    <div>
      <Row {...topColResponsiveProps} gutter={16}>
        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_price'/>}  //"选品数量 - 类别价格"
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.price)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.price_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}          
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>

        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_sales'/>}  //'选品数量 - 类别销售额'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.revenue)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.revenue_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}           
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>    
      </Row>

      <Row {...topColResponsiveProps} gutter={16}>
        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_otb_sales'/>}  //'选品数量 - 类别销售数量'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.sales)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.sales_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}          
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>

        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_rank'/>}  //'选品数量 - 类别排名'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.rank)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.rank_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}           
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>    
      </Row>

      <Row {...topColResponsiveProps} gutter={16}>
        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_score'/>}  //'选品数量 - 类别评分'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.rating)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.rating_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}          
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>

        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_commentary'/>}  //'选品数量 - 类别评论'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.review)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.review_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}           
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>    
      </Row>

      <Row {...topColResponsiveProps} gutter={16}>
        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_retention'/>}  //'选品数量 - 类别评论留存率'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.review_rate)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.review_rate_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}          
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>

        <Col span={12}>
          <ChartCard
            bordered={false}
            title={<FormattedMessage id='pages.product_analysis.category.title_views'/>}  //'选品数量 - 类别访问量'
            loading={loading}
            contentHeight={120}
          >        
            <Row gutter={24} align = {"middle"}>
              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.visit)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  yAxis={{
                    tickInterval:1,
                  }}
                />
              </Col>

              <Col span={12}>
                <Column
                  height={120}
                  autoFit
                  data={translate(product_percentile?.visit_cat)}
                  isGroup={true}
                  xField="x"
                  yField="y"
                  seriesField='category'
                  columnStyle = {{
                    radius: [20, 20, 0, 0],
                  }}           
                />
              </Col>
            </Row>        
          </ChartCard>
        </Col>    
      </Row>

    </div>
);}

export default CategoryPercentile;

