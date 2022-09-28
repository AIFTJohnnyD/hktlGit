import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { TinyArea } from '@ant-design/charts';
import React from 'react';
import numeral from 'numeral';
import type { DataItem, StatisticData } from '../data.d';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '搜索关键词',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '用户数',
    dataIndex: 'count',
    key: 'count',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: '周涨幅',
    dataIndex: 'range',
    key: 'range',
    sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
    render: (text: React.ReactNode, record: { status: number }) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
  },
];

const TopSearch = ({
  loading,
  searchData = [],
  sponsorKeywordSearchData = [],
  organicKeywordSearchData = [],
  statisticData,
}: {
  loading: boolean;
  searchData?: DataItem[];
  sponsorKeywordSearchData?: DataItem[];
  organicKeywordSearchData?: DataItem[];
  statisticData: StatisticData;    
}) => (
  <Card
    loading={loading}
    bordered={false}
    title="关键字搜索"
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              赞助搜索
              <Tooltip title="当天的搜索量">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          total={numeral(statisticData?.sponsored_keyword_search_number).format('0,0')}
          status={statisticData?.sponsored_keyword_search_daily_ratio > 0 ? 'up' : 'down'}
          subTotal={`${statisticData?.sponsored_keyword_search_daily_ratio * 100}%`}
          gap={8}
        />
        <TinyArea height={45} autoFit smooth data={sponsorKeywordSearchData.map((item) => item.y)} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              普通搜索
              <Tooltip title="当天的搜索量">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          total={numeral(statisticData?.organic_keyword_search_number).format('0,0')}
          status={statisticData?.organic_keyword_search_daily_ratio > 0 ? 'up' : 'down'}
          subTotal={`${statisticData?.organic_keyword_search_daily_ratio * 100}%`}
          gap={8}
        />
        <TinyArea height={45} autoFit smooth data={organicKeywordSearchData.map((item) => item.y)} />
      </Col>
    </Row>
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
