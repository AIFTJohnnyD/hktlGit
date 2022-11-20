import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message, Button } from 'antd';
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
  const { data, error1, loading } = useRequest(() => {
    return request('/api/borrower/get_borrower');
  });
  console.log("valueserrorInfoget_borrower_data",data);

  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
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
      formRef={formRef}
      initialValues={{  }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      request={async () => {           
        const { data, error, loading } = await request('/api/borrower/get_borrower');
        return data;
      }}
    >
      <PageContainer content="">
        <Card title={<FormattedMessage id='pages.borrower_form.basic_information_cn'/>} className={styles.card} bordered={false} 
        extra={ <Button type="primary" onClick={submitInfo}>提交</Button>}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.basic_information_cn.location_cn" />}
                name="location_cn"
                rules={[{ required: false, message: 'Please input the location_cn.' }]}
                placeholder="Please input the location_cn."
                valueEnum={{
                  中国大陆: '中国大陆',
                  中国香港: '中国香港',
                }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.basic_information_cn.company_type_cn" />}
                width="md"
                name="company_type_cn"
                rules={[{ required: false, message: 'Please input the company_type_cn.' }]}
                valueEnum={{
                  电商: '电商',
                  非电商: '非电商',
                }}
                placeholder="Please input the company_type_cn."
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information_cn.credit_code_cn'/>}
                width="md"
                name="credit_code_cn"
                rules={[{ required: false, message: '' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information_cn.name_cn'/>}
                width="md"
                name="name_cn"
                rules={[{ required: false, message: '请输入公司名称' }]}
                placeholder="Please input the company_name."
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information_cn.address_cn'/>}
                width="md"
                name="address_cn"
                rules={[{ required: false, message: '请输入企业经营地址' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information_cn.post_code_cn'/>}
                  width="md"
                  name="post_code_cn"
                  rules={[{ required: false, message: '请输入公司地址邮编' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information_cn.establishment_date_cn'/>}
                width="md"
                name="establishment_date_cn"
                rules={[{ required: false, message: '请输入成立日期' }]}
              /> 
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information_cn.company_link_cn'/>}
                width="md"
                name="company_link_cn"
                rules={[{ required: false, message: '请输入公司网址' }]}
              /> 
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information_cn.contact_cn.position'/>}
                  width="md"
                  name={['contact_cn', 0, 'position']}
                  rules={[{ required: false, message: '请输入企业联系人职位' }]}
                /> 
            </Col>
          </Row>
          <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information_cn.contact_cn.name'/>}
                  width="md"
                  name={['contact_cn', 0, 'name']}
                  rules={[{ required: false, message: '请输入企业联系人姓名' }]}
                /> 
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information_cn.contact_cn.phone'/>}
                  width="md"
                  name={['contact_cn', 0, 'phone']}
                  rules={[{ required: false, message: '请输入企业联系人电话' }]}
                /> 
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                    label={<FormattedMessage id='pages.borrower_form.basic_information_cn.contact_cn.email'/>}
                    width="md"
                    name={['contact_cn', 0, 'email']}
                    rules={[{ required: false, message: '请输入公司联系人邮箱' }]}
                />
              </Col>
            </Row>
        </Card>
        <Card title={<FormattedMessage id='pages.borrower_form.shareholder_info_cn'/>} className={styles.card} bordered={false} 
        extra={ <Button type="primary" onClick={submitInfo}>提交</Button>}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info_cn.lear_name" />}
                name="lear_name"
                rules={[{ required: false, message: '请输入法人名称' }]}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info_cn.lear_nationality" />}
                name="lear_nationality"
                rules={[{ required: false, message: '请输入法人国籍' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info_cn.lear_mobile" />}
                name="lear_mobile"
                rules={[{ required: false, message: '请输入电话号码' }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info_cn.lear_email" />}
                name="lear_email"
                rules={[{ required: false, message: '请输入电邮' }]}
                placeholder="请输入电邮"
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                label={<FormattedMessage id="pages.borrower_form.shareholder_info_cn.lear_address" />}
                name="lear_address"
                rules={[{ required: false, message: '请输入住宅地址' }]}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>
        </Card>
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
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
