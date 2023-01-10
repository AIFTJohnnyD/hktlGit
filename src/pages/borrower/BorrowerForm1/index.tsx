import React, {useState } from 'react';
import { Card, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { StepsForm } from '@ant-design/pro-form';
import type { StepDataType } from './data.d';
import styles from './style.less';
import { submitForm } from './service';

import { useRequest, history, FormattedMessage, request } from 'umi';

import UploadDocument from './components/UploadDocument';
import BasicInformation from './components/BasicInformation';
import CompanyInformation from './components/CompanyInformation';
import ContactInformation from './components/ContactInformation';
import ShopInformation from './components/ShopInformation';
import Confirmation from './components/Confirmation';
import { typeList } from 'antd/lib/message';

type BorrowerDataTypeProps = {
  companyForm: StepDataType;
  loading: boolean;
};

const CompanyForm: React.FC<BorrowerDataTypeProps> = () => {
  const { data, error, loading } = useRequest(() => {
    return request('/api/borrower/get_borrower');
  });
  const [stepData, setStepData] = useState<StepDataType>();
  const [current, setCurrent] = useState(0);

  const { run } = useRequest(submitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');
      history.push({
        pathname: '/result/success',
      });      
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    //运行onFinish
    run("full", values);
  };

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <Card bordered={false}>
        <StepsForm
          stepsProps={{
            direction: 'vertical',
          }}
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 6) {
                console.log("submitted");
                return null;
              }
              return dom;
            },
          }}
          onFinish={onFinish}
        >


            {/* <BasicInformation></BasicInformation> */}


          {/* <StepsForm.StepForm<StepDataType>
            title={<FormattedMessage id='pages.borrower_form.shareholder_info'/>}
            stepProps={{
              description: <FormattedMessage id='pages.borrower_form.must_provide'/>,
            }}
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              submitForm('company_info', values);
              return true;
            }}
            request={async () => {           
              const { data, error, loading } = await request('/api/borrower/get_borrower');
              return data;
            }}            
            style={{
              minWidth: 1200,
              marginBottom: 16,
            }}
          >
            <CompanyInformation></CompanyInformation>
          </StepsForm.StepForm> */}

          <StepsForm.StepForm<StepDataType>
            title={<FormattedMessage id='pages.borrower_form.document_upload'/>}
            stepProps={{
              description: <FormattedMessage id='pages.borrower_form.must_provide'/>,
            }}
            initialValues={stepData}
            onFinish={async (values) => {
              //console.log(values);
              setStepData(values);
              return true;
            }}
            style={{
              minWidth: 1200,
              marginBottom: 16,
            }}
          >
            <UploadDocument
              loading={loading}
              data={data}
            ></UploadDocument>
          </StepsForm.StepForm>

          <StepsForm.StepForm<StepDataType>
            title={<FormattedMessage id='pages.borrower_form.contact_info'/>}
            stepProps={{
              description: <FormattedMessage id='pages.borrower_form.must_provide'/>,
            }}
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              submitForm('contact_info', values);
              return true;
            }}
            request={async () => {           
              const { data, error, loading } = await request('/api/borrower/get_borrower');
              return {'contact': data?.contact};
            }}            
            style={{
              minWidth: 1200,
              marginBottom: 16,
            }}
          >
            <ContactInformation></ContactInformation>
          </StepsForm.StepForm>

          <StepsForm.StepForm<StepDataType>
            title={<FormattedMessage id='pages.borrower_form.store_info'/>}
            stepProps={{
              description: <FormattedMessage id='pages.borrower_form.must_provide'/>,
            }}
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              submitForm('shop_info', values);
              return true;
            }}
            request={async () => {           
              const { data, error, loading } = await request('/api/borrower/get_borrower');
              return {'shop': data?.shop};
            }}            
            style={{
              minWidth: 1200,
              marginBottom: 16,
            }}
          >
            <ShopInformation></ShopInformation>
          </StepsForm.StepForm>

          <StepsForm.StepForm<StepDataType>
            title={<FormattedMessage id='pages.borrower_form.confirm_info'/>}
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
            style={{
              minWidth: 1200,
              marginBottom: 16,
            }}
          >
            <Confirmation></Confirmation>
          </StepsForm.StepForm>
        </StepsForm>
      </Card>
    </PageContainer>
  );
};

export default CompanyForm;
