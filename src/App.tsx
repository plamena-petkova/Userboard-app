import React, { useState } from 'react';
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Button } from 'antd';
import '../src/App.css'
import { Typography } from 'antd';
import { useUsersContext } from './context/usersContext';
import { EditFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import { UserProps } from './types/userInterfaces';




const columns: TableProps<UserProps>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => <a className='user__email' href={`mailto:${email}`}>{email}</a>
  },
  {
    title: 'Company Name',
    dataIndex: ['company', 'name'],
    key: 'company',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phoneNumber',
    render: (phone: string) => {
      const phoneWithExt = phone.split('x');
      const phoneNumber = phoneWithExt[0];
      const extenstion = phoneWithExt[1];

      const digits = phoneNumber.replace(/\D/g, "");
      const countryCode = digits
      return digits;
    }
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
    render: (url) => (
      <a className='user__website' target='_blank' href={`https://${url}`}>{`www.${url}`}</a>
    )
  },
  {
    title: 'Settings',
    key: 'settings',
    render: () => (
      <Space size="small">
        <Button icon={<EditFilled />} iconPosition='start' type='primary'>Edit</Button>
        <Button icon={<DeleteFilled />} type='primary' danger>Delete</Button>
      </Space>
    ),
  },
];



const App: React.FC = () => {
  const { Title } = Typography;

  const users = useUsersContext();

  const [currentPage, setCurrentPage] = useState(1);


  return (
    <div className='container'>
      <Title className='heading' level={2}>User Information</Title>
      <Table<UserProps>
        pagination={{
          position: ['bottomCenter'],
          pageSize: 5,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          itemRender: (_page, type, originalElement) => {
            if (type === 'prev') {
              return <a>Previous</a>;
            }
            if (type === 'next') {
              return <a>Next</a>;
            }
            return originalElement;
          },
        }} columns={columns} dataSource={users} rowKey="id" />
    </div>
  )
}

export default App;