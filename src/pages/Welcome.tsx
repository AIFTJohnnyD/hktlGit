import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage, useModel } from 'umi';
import styles from './Welcome.less';


export default (): React.ReactNode => {
  const intl = useIntl();
  const initialState = useModel('@@initialState');
  
  var href_newuser = "/borrower/borrower-form";
  if (initialState.initialState?.currentUser?.access == "new_lender") {
    href_newuser = "/lender/lender-form";
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
      </PageContainer>
    );
  }
};
