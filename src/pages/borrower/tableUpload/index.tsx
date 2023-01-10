import { DownOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Dropdown, Menu, Popconfirm, Space } from 'antd';
import React from 'react';

import type { UploadChangeParam } from 'antd/lib/upload';
import type { RcFile, UploadFile } from 'antd/lib/upload/interface';

import { submitForm } from './service';

export type Member = {
  country: string;
  avatar: string;
  nickName: string;
  outUserNo: string;
};

export type RoleMapType = Record<
  string,
  {
    name: string;
    desc: string;
  }
>;

export type RoleType = 'admin' | 'operator';

const tableListDataSource: Member[] = [];

const nickNames = ["商业登记证(BR)","公司注册证书(CI)","周年申报表(NAR1)","公司章程","公司股东/实控人(超过25%股份)身份证明文件","董事身份证明文件+手持证件照片","公司股东/实控人(超过25%股份)地址证明","公司股东/实控人人行信贷报告","香港公司财务报表(审计报表/管理报表)","其他文件",];
const country = ['china', ];
for (let i = 0; i < nickNames.length; i += 1) {
  tableListDataSource.push({
    outUserNo: `${102047 + i}`,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    country:country[0],
    nickName: nickNames[i],
  });
}

const MemberList: React.FC = () => {
  const renderRemoveUser = (text: string) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否">
      <a>{text}</a>
    </Popconfirm>
  );

  const columns: ProColumns<Member>[] = [
    {
      dataIndex: 'avatar',
      title: '地区',
      valueType: 'avatar',
      width: 300,
      render: (dom, record) => (
        <Space>
          {record.country}
        </Space>
      ),
    },
    {
      dataIndex: 'avatar',
      title: '文件清单',
      valueType: 'avatar',
      width: 300,
      render: (dom, record) => (
        <Space>
          <a href={'http://localhost:8000/api/loan_application/download_proof_file?file_name=32_3_还款凭证.png'}>
          {record.nickName}
          </a><br/>
          {/* <span>{dom}</span> */}
          
        </Space>
      ),
    },
    {
      dataIndex: 'email',
      title: '文件上传',
      width: 300,
      render: (dom, record) => (
        <Space>
          {/* <span>{dom}</span> */}
          <ProFormUploadButton 
            label="" 
            name="upload"
            fieldProps={{
              onChange: (info: UploadChangeParam<UploadFile>) => {
                console.log("uploadTableOnChange中的参数e",info);
                submitForm(info);
                //
                // console.log("uploadTableOnChange中的参数info.file.response.data.filePath",info.file.response.data.filePath);
              },
            }}
            action="upload.do"
             />
        </Space>
      ),
      
    },
  ];
  return (
    <ProTable<Member>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="outUserNo"
      pagination={{
        showQuickJumper: true,
      }}
      toolBarRender={false}
      search={false}
      // submitText="提交"
      // onSubmit = ()=> void
      // onSubmit={(params) => {
      //   // setSearchParams({...params, page: +searchFormValues.page})
      // }}
    />
  );
};

export default MemberList;