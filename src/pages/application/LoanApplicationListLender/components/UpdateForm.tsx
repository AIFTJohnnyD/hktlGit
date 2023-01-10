import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
} from '@ant-design/pro-form';
import type { TableListItem, TableListPagination, ProductListItem } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic, Table } from 'antd';
import styles from './style.less';

import { FormattedMessage } from 'umi';
import { useAccess } from 'umi';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

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


//function translate_status(status: string) {
//  return <FormattedMessage id={'pages.application.' + status}/>;
//}

function translate_index_name(index_name: string) {
  return <FormattedMessage id={'pages.application.index_name.' + index_name}/>;
}

const columns: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.order_details.product_id'/>),
    dataIndex: 'key',
  },

  {
    title: (<FormattedMessage id='pages.order_details.product_asin'/>),
    dataIndex: 'asin',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.order_details.product_name'/>),
    dataIndex: 'name',
    valueType: 'textarea',
  },    
  {
    title: (<FormattedMessage id='pages.order_details.product_price'/>),
    dataIndex: 'price',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_num'/>),
    dataIndex: 'sales_num',
    valueType: 'digit',
  },    
  {
    title: (<FormattedMessage id='pages.order_details.product_amount'/>),
    dataIndex: 'amount',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_cost'/>),
    dataIndex: 'cost',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_stock'/>),
    dataIndex: 'stock',
    valueType: 'digit',
  }
];

const columns_index: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.application.index_table.parameter_name'/>),
    dataIndex: 'parameter_name',
    valueType: 'textarea',
    render: (text, record, index) => {
      return (translate_index_name(record?.parameter_name))
    },    
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.parameter_value'/>),
    dataIndex: 'parameter_value',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.threshold_green'/>),
    dataIndex: 'threshold_green',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.threshold_amber'/>),
    dataIndex: 'threshold_amber',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.color_flag'/>),
    dataIndex: 'color_flag',
    valueType: 'textarea',
    render: (text, record, index) => {
      //console.log(text, record);
      switch (record?.color_flag) {
        case "GREEN":
          return (<CheckCircleTwoTone twoToneColor="#52c41a" />);
        case "AMBER":
          return (<ExclamationCircleTwoTone twoToneColor="#fa8c16" />);
        case "RED":
          return (<CloseCircleTwoTone twoToneColor="#f5222d" />);
  
        default:
          return (<p></p>);
      }
    },
  },
];

const columns_sales_through: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.order_details.product_id'/>),
    dataIndex: 'key',
  },

  {
    title: (<FormattedMessage id='pages.order_details.product_asin'/>),
    dataIndex: 'asin',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.order_details.product_name'/>),
    dataIndex: 'name',
    valueType: 'textarea',
  },    
  {
    title: (<FormattedMessage id='pages.order_details.product_price'/>),
    dataIndex: 'price',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_num'/>),
    dataIndex: 'sales_num',
    valueType: 'digit',
  },    

  {
    title: "5折最短销售时间",
    dataIndex: '5_sales_through_month_shortest',
    valueType: 'digit',
  },
  {
    title: "5折最长销售时间",
    dataIndex: '5_sales_through_month_longest',
    valueType: 'digit',
  },

  {
    title: "5折3倍价格最短回本时间",
    dataIndex: '5_pay_back_month_3x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "5折3倍价格最长回本时间",
    dataIndex: '5_pay_back_month_3x_price_longest',
    valueType: 'digit',
  },

  {
    title: "5折5倍价格最短回本时间",
    dataIndex: '5_pay_back_month_5x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "5折5倍价格最长回本时间",
    dataIndex: '5_pay_back_month_5x_price_longest',
    valueType: 'digit',
  },

  {
    title: "7折最短销售时间",
    dataIndex: '7_sales_through_month_shortest',
    valueType: 'digit',
  },
  {
    title: "7折最长销售时间",
    dataIndex: '7_sales_through_month_longest',
    valueType: 'digit',
  },

  {
    title: "7折3倍价格最短回本时间",
    dataIndex: '7_pay_back_month_3x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "7折3倍价格最长回本时间",
    dataIndex: '7_pay_back_month_3x_price_longest',
    valueType: 'digit',
  },

  {
    title: "7折5倍价格最短回本时间",
    dataIndex: '7_pay_back_month_5x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "7折5倍价格最长回本时间",
    dataIndex: '7_pay_back_month_5x_price_longest',
    valueType: 'digit',
  },

];

/*
const columns_company_index: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.application.index_table.parameter_name'/>),
    dataIndex: 'parameter_name',
    valueType: 'textarea',
    render: (text, record, index) => {
      return (translate_index_name(record?.parameter_name))
    },     
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.parameter_value'/>),
    dataIndex: 'parameter_value',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.threshold_green'/>),
    dataIndex: 'threshold_green',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.threshold_amber'/>),
    dataIndex: 'threshold_amber',
    valueType: 'digit',
  },  
  {
    title: (<FormattedMessage id='pages.application.index_table.color_flag'/>),
    dataIndex: 'color_flag',
    valueType: 'textarea',
    render: (text, record, index) => {
      //console.log(text, record);
      switch (record?.color_flag) {
        case "GREEN":
          return (<CheckCircleTwoTone twoToneColor="#52c41a" />);
        case "AMBER":
          return (<ExclamationCircleTwoTone twoToneColor="#fa8c16" />);
        case "RED":
          return (<CloseCircleTwoTone twoToneColor="#f5222d" />);
  
        default:
          return (<p></p>);
      }
    },
  },
];
*/
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const access = useAccess();

  var dictStatus:any = {};

  var bApproved:boolean = false;

  switch (props.values.status) {
    case 'CREATED':
      dictStatus = {
        CREATED: <FormattedMessage id='pages.application.CREATED'/>,

        PENDING: <FormattedMessage id='pages.application.PENDING'/>,
    
        APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
        UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };    
      break;

    case 'CANCELLED':
      dictStatus = {
        CANCELLED: <FormattedMessage id='pages.application.CANCELLED'/>,
      };    
      break;
  
    case 'UNAPPROVED':
    case 'PENDING':
      dictStatus = {
        PENDING: <FormattedMessage id='pages.application.PENDING'/>,
    
        APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
        UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };    
      break;

    case 'APPROVED':
      dictStatus = {
        APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,

        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    case 'ACCEPTED':
      dictStatus = {
        ACCEPTED: <FormattedMessage id='pages.application.ACCEPTED'/>,
      };

      if (access.canAdmin == true) {
        dictStatus['GOODS_RECEIVED'] = <FormattedMessage id='pages.application.GOODS_RECEIVED'/>;
        dictStatus['ACCOUNT_RECEIVABLE_CONTROL'] = <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_CONTROL'/>;
      }
      
      bApproved = true;

      break;

    case 'GOODS_RECEIVED':
      dictStatus = {
        GOODS_RECEIVED: <FormattedMessage id='pages.application.GOODS_RECEIVED'/>,

        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,
      };
      
      bApproved = true;

      break;
      
    case 'ACCOUNT_RECEIVABLE_CONTROL':
      dictStatus = {
        ACCOUNT_RECEIVABLE_CONTROL: <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_CONTROL'/>,

        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,
      };
      
      bApproved = true;

      break;

    case 'DRAWDOWN':
      dictStatus = {
        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,
        
        REPAID: <FormattedMessage id='pages.application.REPAID'/>,
        DELINQUENT: <FormattedMessage id='pages.application.DELINQUENT'/>,
      };
      
      bApproved = true;

      break;

    case 'REPAID':
    case 'DELINQUENT':
      dictStatus = {
        REPAID: <FormattedMessage id='pages.application.REPAID'/>,
        DELINQUENT: <FormattedMessage id='pages.application.DELINQUENT'/>,

        LIQUIDATED: <FormattedMessage id='pages.application.LIQUIDATED'/>,
        LOAN_SETTLEMENT: <FormattedMessage id='pages.application.LOAN_SETTLEMENT'/>,
    
        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    case 'LIQUIDATED':
    case 'LOAN_SETTLEMENT':
      dictStatus = {
        LIQUIDATED: <FormattedMessage id='pages.application.LIQUIDATED'/>,
        LOAN_SETTLEMENT: <FormattedMessage id='pages.application.LOAN_SETTLEMENT'/>,    
      };
      
      if (access.canAdmin == true) {
        dictStatus['GOODS_DELIVERY'] = <FormattedMessage id='pages.application.GOODS_DELIVERY'/>;
        dictStatus['ACCOUNT_RECEIVABLE_RELEASE'] = <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_RELEASE'/>;
      }

      bApproved = true;

      break;

    case 'GOODS_DELIVERY':
      dictStatus = {
        GOODS_DELIVERY: <FormattedMessage id='pages.application.GOODS_DELIVERY'/>,
    
        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    case 'ACCOUNT_RECEIVABLE_RELEASE':
      dictStatus = {
        ACCOUNT_RECEIVABLE_RELEASE: <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_RELEASE'/>,    
    
        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    default:
      break;
  }

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={1300}
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
          key: props.values.key,
          borrower_id: props.values.borrower_id,
          borrower_name: props.values.borrower_name,

          loan_id: props.values.loan_id,
          loan_name: props.values.loan_name,

          amount: props.values.amount,
          currency: props.values.currency,

          start_date: props.values.start_date,
          end_date: props.values.end_date,

          annual_interest_rate: props.values.annual_interest_rate,
          number_of_installments: props.values.number_of_installments,
          
          purpose: props.values.purpose,
          created_date: props.values.created_date,
        }}
        title={<FormattedMessage id='pages.loan_application.loan_info'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="key"
                label={<FormattedMessage id='pages.loan_application_list.loan_application_id'/>}
                width="md"
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="borrower_id"
                label={<FormattedMessage id='pages.loan_application_list.company_id'/>}
                width="md"
                disabled
              />              
            </Col>
          </Row> 

          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="borrower_name"
                label={<FormattedMessage id='pages.borrower_list.borrower.name'/>}
                width="md"
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="created_date"
                label={<FormattedMessage id='pages.loan_application_list.created_date'/>}
                width="md"
                disabled
              />                            
            </Col>
          </Row> 

          <Row gutter={16}>
            <Col span={12}>
              <ProFormMoney
                name="amount"
                label={<FormattedMessage id='pages.loan_application.application_amount'/>}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the amount.',
                  },
                ]}
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                allowClear={false}
                name="currency"
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                }}
                disabled
              />              
            </Col>
          </Row> 

          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="purpose"
                label={<FormattedMessage id='pages.loan_application_list.purpose'/>}
                width="md"
                disabled
              />              
            </Col>
            <Col span={12}>              
            </Col>
          </Row> 

          <Row gutter={16}>
            <Col span={12}>
              <ProFormDatePicker
                name="start_date"
                width="md"
                label={<FormattedMessage id='pages.util.start_date'/>}
                rules={[
                  {
                    required: true,
                    message: 'Please select the start date',
                  },
                ]}
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormDatePicker
                name="end_date"
                width="md"
                label={<FormattedMessage id='pages.util.end_date'/>}
                rules={[
                  {
                    required: true,
                    message: 'Please select the end date',
                  },
                ]}
                disabled
              />              
            </Col>
          </Row> 

{/*
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                name="annual_interest_rate"
                label={<FormattedMessage id='pages.loan_application_list.annual_interest_rate'/>}
                width="md"
                disabled
              />              
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                name="number_of_installments"
                label={<FormattedMessage id='pages.loan_application_list.number_of_installments'/>}
                width="md"
                disabled
              />              
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>            
          </Row>
*/}                    
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.order_details.table_name'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              columns={columns} 
              dataSource={props.values.list_product} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.application.otbplan_index.table_name'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              columns={columns_index} 
              dataSource={props.values.list_otb_plan_index} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.application.sales_through_index.table_name'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              columns={columns_sales_through} 
              dataSource={props.values.list_price_elasticity} 
              size={"small"}
              pagination={false}
            />
            <p>*时间单位为 月</p>
          </div>		
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.application.financial_index.table_name'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              columns={columns_index} 
              dataSource={props.values.list_financial_index} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.application.company_index.table_name'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              columns={columns_index} 
              dataSource={props.values.list_company_index} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          amount_approved: props.values.amount_approved,
          currency: props.values.currency,

          start_date_approved: props.values.start_date_approved,
          end_date_approved: props.values.end_date_approved,

          annual_interest_rate_approved: props.values.annual_interest_rate_approved,
          number_of_installments_approved: props.values.number_of_installments_approved,          
        }}
        title={<FormattedMessage id='pages.loan_application_list.loan_approval_details'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormMoney
                name="amount_approved"
                label={<FormattedMessage id='pages.loan_application_list.amount_approved'/>}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the amount.',
                  },
                ]}
                disabled={bApproved}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                allowClear={false}
                name="currency"
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                }}
                disabled={bApproved}
              />              
            </Col>
          </Row> 

          <Row gutter={16}>
            <Col span={12}>
              <ProFormDatePicker
                name="start_date_approved"
                width="md"
                label={<FormattedMessage id='pages.util.start_date'/>}
                rules={[
                  {
                    required: true,
                    message: 'Please select the start date',
                  },
                ]}
                disabled={bApproved}
              />
            </Col>
            <Col span={12}>
              <ProFormDatePicker
                name="end_date_approved"
                width="md"
                label={<FormattedMessage id='pages.util.end_date'/>}
                rules={[
                  {
                    required: true,
                    message: 'Please select the end date',
                  },
                ]}
                disabled={bApproved}
              />              
            </Col>
          </Row> 

          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="annual_interest_rate_approved"
                label={<FormattedMessage id='pages.loan_application_list.annual_interest_rate_approved'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              />              
            </Col>
            <Col span={12}>
              <ProFormText
                name="number_of_installments_approved"
                label={<FormattedMessage id='pages.loan_application_list.number_of_installments_approved'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              />                          
            </Col>
          </Row> 
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          status: props.values.status,
          remark: props.values.remark,
        }}
        title={<FormattedMessage id='pages.loan_application_list.loan_approval'/>}
      >            
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.status'/>}
                width="md"
                name="status"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictStatus}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>

          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="lg"
                name="remark"
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
