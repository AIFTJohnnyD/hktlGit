import { DingdingOutlined } from '@ant-design/icons';
import { Button, Card, Steps, Result, Descriptions, Typography } from 'antd';
import { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';

import styles from './index.less';
import { FormattedMessage } from 'umi';


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
        <Card>
          <Typography.Text strong className={styles.welcomeTxt1}>
              <FormattedMessage id="你已经完成了提交操作，15秒后自动关闭页面。" defaultMessage=""/>
          </Typography.Text>
        </Card>
        <Card>
          <Typography.Text strong className={styles.welcomeTxt1}>
              <FormattedMessage id="下一步操作是" defaultMessage=""/>
          </Typography.Text>
        </Card>
      </Result>

    </Card>
  </GridContent>
);
