import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Result } from 'antd';
import { Fragment } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="error"
        title="提交失败"
        subTitle=""
        extra={
          <Button type="primary">
            <span>返回修改</span>
          </Button>
        }
        style={{ marginTop: 48, marginBottom: 16 }}
      >

      </Result>
    </Card>
  </GridContent>
);
