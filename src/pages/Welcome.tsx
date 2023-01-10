import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Row, Col, Space } from 'antd';
import { useIntl, FormattedMessage, useModel, useRequest, request } from 'umi';
import styles from './Welcome.less';

import Card_Load_Applicatoin from './components/card_loan_application';
import { result } from 'lodash';

export default (): React.ReactNode => {
  //const intl = useIntl();
  const { data, error, loading } = useRequest(() => {
    return request('/api/loan_application/welcome_remind');
  });

  const initialState = useModel('@@initialState');
  
  var href_newuser = "/borrower/borrower-form";
  if (initialState.initialState?.currentUser?.access == "new_lender") {
    href_newuser = "/lender/lender-formhk";
  }

  if (initialState.initialState?.currentUser?.access == ""
      || initialState.initialState?.currentUser?.access == "new_lender"
      || initialState.initialState?.currentUser?.access == "new_borrower"){
    return (
      <PageContainer>
        <Card>
        <Typography.Text strong>
          <a
            href={href_newuser}
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.input_company" defaultMessage="Please input the company infomation" />
          </a>
        </Typography.Text>          
        </Card>
      </PageContainer>
    )    
  } else {
    return (
      <PageContainer>
{/*        
        <Card>
          <Typography.Text strong className={styles.welcomeTxt1}>
            <FormattedMessage id="pages.welcome.introduction_1" defaultMessage="" />
          </Typography.Text>          

          <br/>
          <br/>
          
          <Typography.Text className={styles.welcomeTxt2}>
            <FormattedMessage id="pages.welcome.introduction_2" defaultMessage="" />
          </Typography.Text> 

        </Card>
*/}
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card>
            <Row gutter={[24,24]}>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <Card_Load_Applicatoin
                  loading = {false}
                  card_name = {"在处理贷款"}
                  list_loan_application = {data?.list_application_progress}
                >
                </Card_Load_Applicatoin>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <Card_Load_Applicatoin
                  loading = {false}
                  card_name = {"已逾期贷款"}
                  list_loan_application = {data?.list_application_expired}
                >
                </Card_Load_Applicatoin>
              </Col>
            </Row>
          </Card>          
        </Space>        
      </PageContainer>
    );
  }
};
