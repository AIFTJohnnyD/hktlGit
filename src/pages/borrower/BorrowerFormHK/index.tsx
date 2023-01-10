import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message, Button, Space } from 'antd';

import { FC, useRef } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { submitForm } from './service';
import styles from './style.less';
import { FormattedMessage, request } from 'umi';


interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  country?: string;
  isNew?: boolean;
  editable?: boolean;
}
type InternalNamePath = (string | number)[];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  // 初始化数据
  function submitInfo(){
    try {
      console.log("valueserrorInfosubmitInfoformRef.current",formRef.current?.getFieldsValue?.());
      submitForm(formRef.current?.getFieldsValue?.());
      message.success('提交成功');
    } catch {
      console.log("onFinisherrorInfo提交失败")
    }
  }

  const formRef = useRef<ProFormInstance>();
  
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    console.log("getErrorInfo",errors);
    
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    console.log("valueserrorInfo",values);
    try {
      await submitForm(values);
      message.success('提交成功');
    } catch {
      console.log("onFinisherrorInfo提交失败")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
    console.log("onFinishFailed中的errorInfo",errorInfo);
    
  };

  const columnsDirector: ProColumnType<TableFormDateType>[] = [
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_name'/>,
      dataIndex: 'director_person_name',
      key: 'director_person_name',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_name_english'/>,
      dataIndex: 'director_person_name_english',
      key: 'director_person_name_english',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_nationality'/>,
      dataIndex: 'director_person_nationality',
      key: 'director_person_nationality',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_position'/>,
      dataIndex: 'director_person_position',
      key: 'director_person_position',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_phone'/>,
      dataIndex: 'director_person_phone',
      key: 'director_person_phone',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_email'/>,
      dataIndex: 'director_person_email',
      key: 'director_person_email',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.director_person_hk.director_person_address'/>,
      dataIndex: 'director_person_address',
      key: 'director_person_address',
      width: '20%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      width: '20%',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              console.log("record.key",record);
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
          // <ProFormUploadButton label="upload" name="upload" action="upload.do" />
        ];
      },
    },
  ];
  const columnsSharholder: ProColumnType<TableFormDateType>[] = [
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_name'/>,
      dataIndex: 'shareholder_person_name',
      key: 'shareholder_person_name',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_name_english'/>,
      dataIndex: 'shareholder_person_name_english',
      key: 'shareholder_person_name_english',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_nationality'/>,
      dataIndex: 'shareholder_person_nationality',
      key: 'shareholder_person_nationality',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_position'/>,
      dataIndex: 'shareholder_person_position',
      key: 'shareholder_person_position',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_phone'/>,
      dataIndex: 'shareholder_person_phone',
      key: 'shareholder_person_phone',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_email'/>,
      dataIndex: 'shareholder_person_email',
      key: 'shareholder_person_email',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_address'/>,
      dataIndex: 'shareholder_person_address',
      key: 'shareholder_person_address',
      width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shareholder_person_hk.shareholder_person_rate'/>,
      dataIndex: 'shareholder_person_rate',
      key: 'shareholder_person_rate',
      width: '20%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      width: '20%',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              console.log("record.key",record);
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
          // <ProFormUploadButton label="upload" name="upload" action="upload.do" />
        ];
      },
    },
  ];
  const columnsEshop: ProColumnType<TableFormDateType>[] = [
    {
      title:<FormattedMessage id='pages.borrower_form.shop.platform'/>,
      dataIndex: 'platform',
      key: 'platform',
      // width: '15%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shop.name'/>,
      dataIndex: 'name',
      key: 'name',
      // width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shop.id'/>,
      dataIndex: 'id',
      key: 'id',
      // width: '20%',
    },
    {
      title:<FormattedMessage id='pages.borrower_form.shop.link'/>,
      dataIndex: 'link',
      key: 'link',
      // width: '20%',
    },
    // 店铺API授权
    {
      title: '店铺授权',
      dataIndex: 'APIButton',
      valueType: 'radioButton',
      key: 'APIButton',
      // width: '20%',
      render: (dom, record) => (
        <Space>
            <Button type="primary" 
                    onClick={() => {
                      window.open("https://sellercentral.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.2364e294-9851-4572-a767-acd37af1187e&version=beta",'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
                    }}
                    >店铺授权</Button>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      // width: '20%',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              console.log("record.key",record);
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
          // <ProFormUploadButton label="upload" name="upload" action="upload.do" />
        ];
      },
    },
  ];

  const columnsWallet: ProColumnType<TableFormDateType>[] = [
    {
      title: '支付公司',
      dataIndex: 'company',
      key: 'account',
      // width: '15%',
    },
    {
      title: '卖家名称',
      dataIndex: 'name',
      key: 'name',
      // width: '20%',
    },
    {
      title: '账户号码',
      dataIndex: 'account',
      key: 'account',
      // width: '20%',
    },
    {
      title: '关联时间',
      dataIndex: 'related_time',
      key: 'related_time',
      // width: '20%',
    },
    {
      title: '账户授权',
      dataIndex: 'APIButton',
      valueType: 'radioButton',
      key: 'APIButton',
      // width: '20%',
      render: (dom, record) => (
        <Space>
            <Button type="primary" 
                    onClick={() => {
                      window.open("https://business.skyee360.com/client/register",'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
                    }}
                    >账户授权</Button>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      // width: '20%',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              console.log("record.key",record);
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
          // <ProFormUploadButton label="upload" name="upload" action="upload.do" />
        ];
      },
    },
  ];

  return (
    <ProForm
      layout="vertical"
      requiredMark
      // submitter={{
      //   render: (props, dom) => {
      //     return (
      //       <FooterToolbar>
      //         {getErrorInfo(error)}
      //         {dom}
      //       </FooterToolbar>
      //     );
      //   },
      // }}
      submitter={{
        resetButtonProps: {
          style: {            
            display: 'none',  // 隐藏重置按钮
          },
        },
        submitButtonProps: {
          style: {            
            display: 'none',  // 隐藏重置按钮
          },
        },
      }}
      formRef={formRef}
      initialValues={{   }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      request={async () => {           
        const { data, error, loading } = await request('/api/borrower/get_borrower');
        return data;
      }}
    >
      <PageContainer content="">
        <ProForm.Item 
        name="basicInfo" 
        label="" 
        valuePropName="checked">
          <Card title={<FormattedMessage id='pages.borrower_form.HKbase_info'/>} className={styles.card} bordered={false} 
            extra={ <Button type="primary" onClick={submitInfo}>提交</Button>} 
              >
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormSelect
                  allowClear={false}
                  label={<FormattedMessage id="pages.borrower_form.HKbasic_information.location_hk" />}
                  name="location_hk"
                  rules={[{ required: false, message: 'Please input the location_hk.' }]}
                  placeholder="Please input the location_hk."
                  valueEnum={{
                    中国: '中国',
                    中国台湾: '中国台湾',
                    中国香港特别行政区: '中国香港特别行政区',
                    中国澳门特别行政区: '中国澳门特别行政区',
                  }}
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.HKbasic_information.br_code_hk" />}
                  width="md"
                  name="br_code_hk"
                  rules={[{ required: false, message: 'Please input the br_code_hk.' }]}
                  placeholder="Please input the br_code_hk."
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.ci_code_hk'/>}
                  width="md"
                  name="ci_code_hk"
                  rules={[{ required: false, message: '' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.name_hk'/>}
                  width="md"
                  name="name_hk"
                  rules={[{ required: false, message: '请输入公司名称' }]}
                  placeholder="Please input the company_name."
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.company_link_hk'/>}
                  width="md"
                  name="company_link_hk"
                  rules={[{ required: false, message: '' }]}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.address_hk'/>}
                  width="md"
                  name="address_hk"
                  rules={[{ required: false, message: '请输入企业地址' }]}
                /> 
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.contact_hk.name'/>}
                  width="md"
                  name={['contact_hk', 0, 'name']}
                  rules={[{ required: false, message: '请输入企业联系人姓名' }]}
                /> 
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.contact_hk.phone'/>}
                  width="md"
                  name={['contact_hk', 0, 'phone']}
                  rules={[{ required: false, message: '请输入企业联系人电话' }]}
                /> 
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                    label={<FormattedMessage id='pages.borrower_form.HKbasic_information.contact_hk.email'/>}
                    width="md"
                    name={['contact_hk', 0, 'email']}
                    rules={[{ required: false, message: '请输入公司联系人邮箱' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.contact_hk.position'/>}
                  width="md"
                  name={['contact_hk', 0, 'position']}
                  rules={[{ required: false, message: '请输入企业联系人职位' }]}
                /> 
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              </Col>
            </Row>
          </Card>
        </ProForm.Item>
        <Card title="董事信息" className={styles.card} bordered={true} extra={ <Button type="primary" onClick={submitInfo}>提交</Button>}>
          <ProForm.Item name="director_person_hk">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
                creatorButtonText: '添加',
              }}
              columns={columnsDirector}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.shareholder_person_hk'/>} 
          className={styles.card} 
          bordered={false} 
          extra={ <Button type="primary" onClick={submitInfo}>提交</Button>}>
          <ProForm.Item name="shareholder_person_hk">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
                creatorButtonText: '添加',
              }}
              columns={columnsSharholder}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
        <Card title={'店铺信息'} 
          className={styles.card} 
          bordered={false} 
          extra={ <Button type="primary"onClick={submitInfo}>提交</Button>}>
          <ProForm.Item name="shop">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
                creatorButtonText: '添加',
              }}
              columns={columnsEshop}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>

        {/* <Card title={'支付钱包'} 
          className={styles.card} 
          bordered={false} 
          extra={ <Button type="primary"onClick={submitInfo}>提交</Button>}>
          <ProForm.Item name="wallet">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
                creatorButtonText: '添加',
              }}
              columns={columnsWallet}
              rowKey="key"
            />
          </ProForm.Item>
        </Card> */}

        <Card title={<FormattedMessage id='pages.borrower_form.corporate_account'/>} className={styles.card} bordered={false} extra={ <Button type="primary" onClick={submitInfo}>提交</Button>}>
          <ProForm.Item name="corporate_account">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.corporate_account.account_name" />}
                  name={['corporate_account', 0, 'account_name']}
                  rules={[{ required: false, message: '请输入' }]}
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.corporate_account.bank_account" />}
                  name={['corporate_account', 0, 'bank_account']}
                  rules={[{ required: false, message: '请输入' }]}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.corporate_account.bank_name" />}
                  name={['corporate_account', 0, 'bank_name']}
                  rules={[{ required: false, message: '请输入银行名称' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.corporate_account.bank_swift_code" />}
                  name={['corporate_account', 0, 'bank_swift_code']}
                  rules={[{ required: false, message: '请输入企业公户SwiftCode' }]}
                  placeholder="请输入银行国际代码"
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.corporate_account.bank_addr" />}
                  name={['corporate_account', 0, 'bank_addr']}
                  rules={[{ required: false, message: '请输入地址' }]}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              </Col>
            </Row>
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
