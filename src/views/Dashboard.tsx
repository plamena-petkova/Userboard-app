import '../App.css'
import { useState } from 'react';
import { Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Button } from 'antd';
import { Typography } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import { ActionType, UserProps } from '../types/interfaces';
import { parsePhone } from '../utils/parsePhone';
import ModalComponent from '../components/ModalComponent';
import { useUsersContext } from '../context/usersContext';
import { deleteUserRequest } from '../api/users';



const Dashboard = () => {
    const { Title } = Typography;

    const { users, deleteUser } = useUsersContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserProps | undefined>(undefined);
    const [actionTypeString, setActionTypeString] = useState<ActionType>();


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
            render: (fullPhone: string) => {
                const { prefix, phone, extension } = parsePhone(fullPhone);

                if (!phone) return '';

                let formatted = prefix ? `+${prefix} ${phone}` : phone;

                if (extension) {
                    formatted += ` ext ${extension}`;
                }

                return <span>{formatted}</span>;
            }

        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render: (url) => {
                if (url) {
                    return <a className='user__website' target='_blank' href={`https://${url}`}>{`${url}`}</a>
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
                        actionType={actionTypeString}
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

   
    const showModal = (user?: UserProps) => {
        setIsModalOpen(true);
        if (user) {
            setSelectedUser(user);
            setActionTypeString(ActionType.Edit);
        } else {
            setSelectedUser(undefined);
            setActionTypeString(ActionType.Create);
        }
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setSelectedUser(undefined);
        setActionTypeString(undefined)
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
                <Button onClick={() => showModal()} type='primary'>New User</Button>
                <ModalComponent
                    actionType={actionTypeString}
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
};

export default Dashboard;