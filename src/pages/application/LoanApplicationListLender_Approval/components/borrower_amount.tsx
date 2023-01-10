import { Card, Col, Row, Tabs } from 'antd';

import ProForm, {
    ProFormDateRangePicker,
    ProFormDependency,
    ProFormDigit,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormMoney,
    ProFormDatePicker,  
  } from '@ant-design/pro-form';

import { FormattedMessage } from 'umi';

const Borrower_Amount = ({
    dict_borrower_amount
}:{
    dict_borrower_amount:any
}) => {
    return(
    <>
        <ProForm
	        layout="vertical"
	        // value={dataSource_company}
	        initialValues={dict_borrower_amount}
	        name = "dict_borrower_amount"

          submitter={{
            // 配置按钮文本
            searchConfig: {
              resetText: '',
              submitText: '',
            },            
          }}    
        >
          <Card
            title="风险评估"
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            //style={{ width: 500 }}
          >
            <Row gutter={16}>
              <Col span={6} push={1}>
                <ProFormMoney
                  name="approved_amount"
                  label={<FormattedMessage id='pages.amount.borrower_list.approved_amount'/>}
                  width="md"
                  locale="en-US"
                  disabled
                  fieldProps={{ precision: 2 }}
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="approved_number"
                  label={<FormattedMessage id="pages.amount.borrower_list.approved_number" />}
                  width="md"
                  disabled
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormMoney
                  name="delinquent_amount"
                  label={<FormattedMessage id="pages.amount.borrower_list.delinquent_amount" />}
                  width="md"
                  locale="en-US"
                  disabled
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6} push={1}>
                <ProFormText
                  name="delinquent_number"
                  label={<FormattedMessage id="pages.amount.borrower_list.delinquent_number" />}
                  width="md"
                  disabled
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormMoney
                  name="repay_amount"
                  label={<FormattedMessage id="pages.amount.borrower_list.repay_amount" />}
                  width="md"
                  locale="en-US"
                  disabled
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="repay_number"
                  label={<FormattedMessage id="pages.amount.borrower_list.repay_number" />}
                  width="md"
                  disabled
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6} push={1}>
                <ProFormMoney
                  name="available_amount"
                  label={<FormattedMessage id="pages.amount.borrower_list.available_amount" />}
                  width="md"
                  locale="en-US"
                  disabled
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormDigit
                  name="probability_of_default"
                  width="md"
                  label={<FormattedMessage id="pages.amount.borrower_list.probability_of_default" />}
                  disabled
                  fieldProps={{ precision: 2 }}
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormDigit
                  name="loss_given_default"
                  width="md"
                  label={<FormattedMessage id="pages.amount.borrower_list.loss_given_default" />}
                  disabled
                  fieldProps={{ precision: 2 }}
                />
              </Col>
            </Row>
          </Card>
        </ProForm>    
    </>
)};
      
export default Borrower_Amount;