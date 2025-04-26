import React, { useState } from 'react';
import { Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Button } from 'antd';
import '../src/App.css'
import { Typography } from 'antd';
import { useUsersContext } from './context/usersContext';
import { EditFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import { ActionType, UserProps } from './types/userInterfaces';
import ModalComponent from './components/ModalComponent';
import { deleteUserRequest } from './api/users';




const App: React.FC = () => {

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
      // render: (phone: string) => {
      // const phoneWithExt = phone.split('x');
      // const phoneNumber = phoneWithExt[0];
      // const extenstion = phoneWithExt[1];

      // const digits = phoneNumber.replace(/\D/g, "");
      // const countryCode = digits
      // return digits;
      // }
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (url) => {
        if(url) {
          return <a className='user__website' target='_blank' href={`${url}`}>{`${url}`}</a>
        }

        return <span>-</span>
       
      }
  
    },
    {
      title: 'Settings',
      key: 'settings',
      render: (user: UserProps) => (
        <Space size="small">
          <Button onClick={() => showModal(user)} icon={<EditFilled />} iconPosition='start' type='primary'>Edit</Button>
          <ModalComponent
            actionType={ActionType.Edit}
            isModalOpen={isModalOpen}
            onCancel={hideModal}
            user={selectedUser}

          />
          <Popconfirm
            placement='bottom'
            title="Delete the user"
            description="Are you sure to delete this user information?"
            onConfirm={() => handleDeleteUser(user)}
            onCancel={() => { return null }}
            okText="Yes"
            cancelText="No"
          ><Button icon={<DeleteFilled />} type='primary' danger>Delete</Button></Popconfirm>
        </Space>
      ),
    },
  ];

  const { Title } = Typography;

  const { users, deleteUser } = useUsersContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProps | undefined>(undefined);


  const showModal = (user?: UserProps) => {
    setIsModalOpen(true);
    if (user) {
      setSelectedUser(user);
     
    } else {
      setSelectedUser(undefined);
    }
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };


  const handleDeleteUser = async (user: UserProps) => {
    if (!user.id) return;
    const success = await deleteUserRequest(user.id);
    if (success) {
      deleteUser(user.id);
    } else {
      console.error('Failed to delete user');
    }
  }


  return (
    <div className='container'>
      <div className="container__title">
        <Title className='heading' level={2}>User Information</Title>
        <Button onClick={() => showModal()} type='primary'>Add user</Button>
        <ModalComponent
          actionType={ActionType.Create}
          isModalOpen={isModalOpen}
          onCancel={hideModal}
          user={selectedUser}

        />
      </div>


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