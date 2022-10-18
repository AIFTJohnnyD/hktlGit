import { DingdingOutlined } from '@ant-design/icons';
import { Button, Card, Steps, Result, Descriptions } from 'antd';
import { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';

import styles from './index.less';


const extra = (
  <Fragment>
    <a href="/">
    <Button type="primary">返回主页</Button>
    </a>
  </Fragment>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title="提交成功"
        subTitle=""
        extra={extra}
        style={{ marginBottom: 16 }}
      >
      </Result>
    </Card>
  </GridContent>
);
