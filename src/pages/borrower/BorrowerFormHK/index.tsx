import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message, Space, Button } from 'antd';

import { FC, useRef } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { submitForm } from './service';
import styles from './style.less';
import { FormattedMessage, request, useRequest } from 'umi';

// import data from './cacheData.json';
// console.log("外部引用的json数据",data);



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

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  //初始化数据
  const { data, error0, loading } = useRequest(() => {
    return request('/api/borrower/get_borrower');
  });

  //click 提交按钮后可以得到表单数据 并且上传数据
  function submitInfo(){
    // submitForm(info);
    console.log("submitInfoFunction被调用");
    console.log("submitInfoformRef.current",formRef.current?.getFieldsValue?.());
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
          <div className={styles.errorField}>{fieldLabels[key]}</div>
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

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '董事姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '联系电话',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
      render: (dom, record) => (
        <Space>
          <span>{dom}</span>
        </Space>
      ),
    },
    {
      title: '国籍',
      dataIndex: 'department',
      key: 'department',
      width: '20%',
    },
    {
      title: '证件号码',
      dataIndex: 'country',
      key: 'country',
      width: '20%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
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
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={data}
      formRef={formRef}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="">
        <ProForm.Item 
        name="switch" 
        label="Switch" 
        valuePropName="checked">
          <Card title={<FormattedMessage id='pages.borrower_form.HKbase_info'/>} className={styles.card} bordered={false} 
            extra={ <Button type="primary" onClick={
              submitInfo()
              }>提交</Button>} 
              // loading={true}
              >
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id="pages.borrower_form.HKbasic_information.company_country" />}
                  name="company_country"
                  rules={[{ required: true, message: 'Please input the company_country.' }]}
                  placeholder="Please input the company_country."
                  valueEnum={{
                    中国大陆: '中国大陆',
                    中国香港: '中国香港',
                  }}
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.borrower_form.HKbasic_information.business_registration_certificate_number" />}
                  width="md"
                  name="business_registration_certificate_number"
                  rules={[{ required: false, message: 'Please input the business_registration_certificate_number.' }]}
                  placeholder="Please input the business_registration_certificate_number."
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.company_registration_number'/>}
                  width="md"
                  name="credit_code_cn"
                  rules={[{ required: false, message: '' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.hk_company_name'/>}
                  width="md"
                  name="hk_company_name"
                  rules={[{ required: false, message: '请输入公司名称' }]}
                  placeholder="Please input the company_name."
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.hk_store_link'/>}
                  width="md"
                  name="hk_store_link"
                  rules={[{ required: false, message: '' }]}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.hk_company_address'/>}
                  width="md"
                  name="hk_company_addres"
                  rules={[{ required: false, message: '请输入企业地址' }]}
                /> 
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.hk_company_contact_phone'/>}
                  width="md"
                  name="hk_company_contact_phone"
                  rules={[{ required: false, message: '请输入企业联系电话' }]}
                /> 
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.HKbasic_information.hk_company_contact_email'/>}
                  width="md"
                  name="hk_company_contact_email"
                  rules={[{ required: false, message: '请输入邮箱' }]}
                /> 
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                    label={<FormattedMessage id='pages.borrower_form.HKbasic_information.hk_company_contact_name'/>}
                    width="md"
                    name="hk_company_contact_name"
                    rules={[{ required: false, message: '请输入公司联系人姓名' }]}
                />
              </Col>
            </Row>
          </Card>
        </ProForm.Item>.
        {/* table代码 */}
        <Card title="董事信息" bordered={false} extra={ <Button type="primary">提交</Button>}>
          <ProForm.Item name="members">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
                creatorButtonText: '添加',
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.HKcompanyPublic_account.HKcompanyPublic_account_information_or_private_oneClass_account_information'/>} className={styles.card} bordered={false} extra={ <Button type="primary">提交</Button>}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.HKcompanyPublic_account.HKcompanyPublic_account_name" />}
                name="HKcompanyPublic_account_name"
                rules={[{ required: false, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.HKcompanyPublic_account.HKbank_account" />}
                name="HKbank_account"
                rules={[{ required: false, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.HKcompanyPublic_account.HKbank_name" />}
                name="HKbank_name"
                rules={[{ required: false, message: '请输入银行名称' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.HKcompanyPublic_account.HKcompanyPublic_account_SwiftCode" />}
                name="HKcompanyPublic_account_SwiftCode"
                rules={[{ required: false, message: '请输入企业公户SwiftCode' }]}
                placeholder="请输入企业公户SwiftCode"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              {/* <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.bankKey" />}
                name="bankKey"
                rules={[{ required: false, message: '请输入联行号' }]}
                placeholder="请输入联行号"
              /> */}
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              {/* <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.bank_reserved_phone" />}
                name="bank_reserved_phone"
                rules={[{ required: false, message: '请输入银行预留手机号(仅个人一类户提供)' }]}
              /> */}
            </Col>
          </Row>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.HKultimate_beneficial_owner'/>} className={styles.card} bordered={false} extra={ <Button type="primary">提交</Button>}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.HKultimate_beneficial_owner.HKultimate_beneficial_owner_name" />}
                name="HKultimate_beneficial_owner_name"
                rules={[{ required: false, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.HKultimate_beneficial_owner.HKultimate_beneficial_owner_countryOrDistrict" />}
                name="HKultimate_beneficial_owner_countryOrDistrict"
                rules={[{ required: false, message: 'Please input the company_country.' }]}
                placeholder="Please input the company_country."
                valueEnum={{
                  中国大陆: '中国大陆',
                  中国香港: '中国香港',
                }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.HKultimate_beneficial_owner.HKultimate_beneficial_owner_documentClass" />}
                name="HKultimate_beneficial_owner_documentClass"
                rules={[{ required: false, message: '请选择证件类型' }]}
                options={[
                  {
                    label: '大陆身份证',
                    value: 'mainlandIDCard',
                  },
                  {
                    label: '香港身份证',
                    value: 'HKID',
                  },
                ]}
                placeholder="请选择证件类型"
              />
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton
                name="ultimate_beneficial_owner_document_photo"
                label={<FormattedMessage id='pages.borrower_form.ultimate_beneficial_owner.ultimate_beneficial_owner_document_photo'/>}
                max={2}
                fieldProps={{
                  name: 'ultimate_beneficial_owner_document_photo',
                }}
                rules={[{ required: false, message: '请上传证件照片' }]}
                action="/upload.do"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row> */}
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
