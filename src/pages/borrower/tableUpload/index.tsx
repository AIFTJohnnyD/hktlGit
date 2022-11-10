import { DownOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Dropdown, Menu, Popconfirm, Space } from 'antd';
import React from 'react';

export type Member = {
  country: string;
  avatar: string;
  realName: string;
  nickName: string;
  email: string;
  outUserNo: string;
  phone: string;
  role: RoleType;
  permission?: string[];
};

export type RoleMapType = Record<
  string,
  {
    name: string;
    desc: string;
  }
>;

export type RoleType = 'admin' | 'operator';

const RoleMap: RoleMapType = {
  admin: {
    name: '管理员',
    desc: '仅拥有指定项目的权限',
  },
  operator: {
    name: '操作员',
    desc: '拥有所有权限',
  },
};

const tableListDataSource: Member[] = [];

const realNames = ['马巴巴', '测试', '测试2', '测试3'];
const nickNames = ['企业征信', '公司章程', '企业简介', '财务合并报表'];
const country = ['china', ];
const emails = ['baba@antfin.com', 'test@antfin.com', 'test2@antfin.com', 'test3@antfin.com'];
const phones = ['12345678910', '10923456789', '109654446789', '109223346789'];
const permissions = [[], ['权限点名称1', '权限点名称4'], ['权限点名称1'], []];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    outUserNo: `${102047 + i}`,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    role: i === 0 ? 'admin' : 'operator',
    realName: realNames[i % 4],
    country:country[0],
    nickName: nickNames[i % 4],
    email: emails[i % 4],
    phone: phones[i % 4],
    permission: permissions[i % 4],
  });
}

const roleMenu = (
  <Menu
    items={[
      {
        label: '管理员',
        key: 'admin',
      },
      {
        label: '操作员',
        key: 'operator',
      },
    ]}
  />
);

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
      width: 150,
      render: (dom, record) => (
        <Space>
          {record.country}
        </Space>
      ),
    },
    {
      dataIndex: 'avatar',
      title: '成员名称',
      valueType: 'avatar',
      width: 150,
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
      title: '账号',
      render: (dom, record) => (
        <Space>
          {/* <span>{dom}</span> */}
          <ProFormUploadButton label="upload" name="upload" action="upload.do" />
        </Space>
      ),
      
    },
    // {
    //   dataIndex: 'role',
    //   title: '角色',
    //   render: (_, record) => (
    //     <Dropdown overlay={roleMenu}>
    //       <a>
    //         {RoleMap[record.role || 'admin'].name} <DownOutlined />
    //       </a>
    //     </Dropdown>
    //   ),
    // },
    // {
    //   dataIndex: 'permission',
    //   title: '权限范围',
    //   render: (_, record) => {
    //     const { role, permission = [] } = record;
    //     if (role === 'admin') {
    //       return '所有权限';
    //     }
    //     return permission && permission.length > 0 ? permission.join('、') : '无';
    //   },
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'x',
    //   valueType: 'option',
    //   render: (_, record) => {
    //     let node = renderRemoveUser('退出');
    //     if (record.role === 'admin') {
    //       node = renderRemoveUser('移除');
    //     }
    //     return [<a key="edit">编辑</a>, node];
    //   },
    // },
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
      // onSubmit = ()=> void
      onSubmit={(params) => {
        // setSearchParams({...params, page: +searchFormValues.page})
      }}
    />
  );
};

export default MemberList;