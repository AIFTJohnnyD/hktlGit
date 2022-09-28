import { Card, Radio, Typography } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { PieConfig } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import React from 'react';
import type { DataItem } from '../data';
import styles from '../style.less';

const { Text } = Typography;

const ProportionReview = ({
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  const pieConfig: PieConfig = {
    autoFit: true,
    height: 300,
    data: salesPieData,
    radius: 1,
    innerRadius: 0.64,
    angleField: 'y',
    colorField: 'x',
    legend: false,
    label: {
      type: 'spider',
      formatter: (text, item) => {
        // eslint-disable-next-line no-underscore-dangle
        return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
      },
    },
    statistic: {
      title: {
        content: '评论数量',
      },
    },
  };

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="评论数类别占比"
      style={{
        height: '100%',
      }}
      extra={
        <div className={styles.salesCardExtra}>
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="online">年</Radio.Button>
              <Radio.Button value="stores">月</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
    >
      <div>
        <Text>评论数量</Text>
        <Pie {...pieConfig} />
      </div>
    </Card>
  );
};

export default ProportionReview;
