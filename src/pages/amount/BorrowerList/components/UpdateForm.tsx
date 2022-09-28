import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import type { TableListItem } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import styles from './style.less';

import { FormattedMessage } from 'umi';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<boolean>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={1200}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title={<FormattedMessage id='pages.util.update_info'/>}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >

      <StepsForm.StepForm
        initialValues={{
          amount_status: props.values.amount_status,
          amount_remark: props.values.amount_remark,
        }}
        title={<FormattedMessage id='pages.util.review_info'/>}
      >            
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.amount.borrower_list.amount_status'/>}
                width="md"
                name="amount_status"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  NORMAL: (<FormattedMessage id='pages.amount.borrower_list.amount_status.NORMAL'/>),

                  ABNORMAL_LOAN_OVERDUE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_LOAN_OVERDUE'/>),
                  ABNORMAL_PD_LGD_DECREASE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_PD_LGD_DECREASE'/>),
                  ABNORMAL_SHOP_CLOSE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_SHOP_CLOSE'/>),
                  ABNORMAL_ACOUNT_CHANGE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_ACOUNT_CHANGE'/>),
                  ABNORMAL_DIRECTOR_CHANGE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_DIRECTOR_CHANGE'/>),
                }}
              />            
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
            </Col>

          </Row>
  
          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="lg"
                name="amount_remark"
                rules={[{ required: false, message: '' }]}
              />            
            </Col>            
          </Row>
        </Card>
      </StepsForm.StepForm>      
    </StepsForm>
  );
};

export default UpdateForm;
