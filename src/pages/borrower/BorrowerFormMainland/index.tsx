import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message } from 'antd';

import type { FC } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
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


interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
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

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {


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
      await submitForm("full",values);
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
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
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
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
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
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="">
        <Card title={<FormattedMessage id='pages.borrower_form.base_info'/>} className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.basic_information.company_country" />}
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
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.basic_information.company_business" />}
                width="md"
                name="company_business"
                rules={[{ required: true, message: 'Please input the company_business.' }]}
                valueEnum={{
                  电商: '电商',
                  非电商: '非电商',
                }}
                placeholder="Please input the company_business."
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_unified_social_credit_code'/>}
                width="md"
                name="credit_code_cn"
                rules={[{ required: true, message: '' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_name'/>}
                width="md"
                name="name_cn"
                rules={[{ required: true, message: '请输入公司名称' }]}
                placeholder="Please input the company_name."
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_contact_name'/>}
                width="md"
                name="company_contact_name"
                rules={[{ required: true, message: '请输入公司联系人名称' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_contact_phone'/>}
                  width="md"
                  name="company_contact_phone"
                  rules={[{ required: true, message: '请输入公司联系人电话' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_contact_email'/>}
                width="md"
                name="company_contact_email"
                rules={[{ required: true, message: '请输入企业联系邮箱' }]}
              /> 
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_address'/>}
                width="md"
                name="company_address"
                rules={[{ required: true, message: '请输入办公地址' }]}
              /> 
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_postalcode'/>}
                width="md"
                name="company_postalcode"
                rules={[{ required: true, message: '请输入邮政编码' }]}
              /> 
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton
                name="upload"
                label={<FormattedMessage id='pages.borrower_form.basic_information.business_license'/>}
                max={2}
                fieldProps={{
                  name: 'business_license',
                }}
                rules={[{ required: true, message: '请上传营业执照' }]}
                action="/upload.do"
              /> 
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormDatePicker
                label={<FormattedMessage id="pages.borrower_form.basic_information.mainland_compnay_establishment_date" />}
                width="md"
                name="mainland_compnay_establishment_date"
                rules={[
                  {
                    required: true,
                    message: 'Please select the establishment_date',
                  },
                ]}
              /> 
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                initialValue={"Amazon.com"}
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_store_link'/>}
                width="md"
                name="store_link"
                rules={[{ required: true, message: '请输入店铺链接,无则为亚马逊Amazon.com' }]}
              />
            </Col>
          </Row>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.shareholder_info'/>} className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info.mainland_legal_person_name" />}
                name="mainland_legal_person_name"
                rules={[{ required: true, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info.phone" />}
                name="phone"
                rules={[{ required: true, message: '请选择' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info.nationality" />}
                name="nationality"
                rules={[{ required: true, message: '请输入电话号码' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.shareholder_info.documents_class" />}
                name="documents_class"
                rules={[{ required: true, message: '请选择证件类型' }]}
                options={[
                  {
                    label: '身份证',
                    value: 'IDCard',
                  },
                  {
                    label: '其他证件',
                    value: 'OtherDocuments',
                  },
                ]}
                placeholder="请选择证件类型"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton
                name="documents_photo"
                label={<FormattedMessage id='pages.borrower_form.shareholder_info.documents_photo'/>}
                max={2}
                fieldProps={{
                  name: 'documents_photo',
                }}
                rules={[{ required: true, message: '请上传证件照片' }]}
                action="/upload.do"
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info.email" />}
                name="email"
                rules={[{ required: true, message: '请输入电邮' }]}
              />
            </Col>
          </Row>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.companyPublic_account.companyPublic_account_information_or_private_oneClass_account_information'/>} className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.companyPublic_account_name" />}
                name="companyPublic_account_name"
                rules={[{ required: true, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.bank_account" />}
                name="bank_account"
                rules={[{ required: true, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.bank_name" />}
                name="bank_name"
                rules={[{ required: true, message: '请输入银行名称' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.openAccount_bank" />}
                name="openAccount_bank"
                rules={[{ required: true, message: '请输入开户行全称' }]}
                placeholder="请输入开户行全称"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.bankKey" />}
                name="bankKey"
                rules={[{ required: true, message: '请输入联行号' }]}
                placeholder="请输入联行号"
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.companyPublic_account.bank_reserved_phone" />}
                name="bank_reserved_phone"
                rules={[{ required: true, message: '请输入银行预留手机号(仅个人一类户提供)' }]}
              />
            </Col>
          </Row>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.ultimate_beneficial_owner'/>} className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.ultimate_beneficial_owner.ultimate_beneficial_owner_name" />}
                name="ultimate_beneficial_owner_name"
                rules={[{ required: true, message: '请输入' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.ultimate_beneficial_owner.ultimate_beneficial_owner_countryOrDistrict" />}
                name="ultimate_beneficial_owner_countryOrDistrict"
                rules={[{ required: true, message: 'Please input the company_country.' }]}
                placeholder="Please input the company_country."
                valueEnum={{
                  中国大陆: '中国大陆',
                  中国香港: '中国香港',
                }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.ultimate_beneficial_owner.ultimate_beneficial_owner_documentClass" />}
                name="ultimate_beneficial_owner_documentClass"
                rules={[{ required: true, message: '请选择证件类型' }]}
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
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton
                name="ultimate_beneficial_owner_document_photo"
                label={<FormattedMessage id='pages.borrower_form.ultimate_beneficial_owner.ultimate_beneficial_owner_document_photo'/>}
                max={2}
                fieldProps={{
                  name: 'ultimate_beneficial_owner_document_photo',
                }}
                rules={[{ required: true, message: '请上传证件照片' }]}
                action="/upload.do"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
