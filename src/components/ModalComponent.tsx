import '../App.css'
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { EditFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { ActionType, ModalComponentProps, UserProps } from "../types/interfaces";
import { useUsersContext } from "../context/usersContext";
import { v4 as uuidv4 } from 'uuid';
import { createUser, updateUser } from "../api/users";
import { parsePhone } from '../utils/parsePhone';
import { useNotification } from '../context/notificationContext';



const ModalComponent = ({ actionType, isModalOpen, onCancel, user }: ModalComponentProps) => {
  const { addUser, editUser } = useUsersContext();

  const [form] = Form.useForm();
  const { Option } = Select;

  const { openNotification } = useNotification();

  const [lastActionType, setLastActionType] = useState<ActionType | undefined>(actionType);

  const parsedPhone = user?.phone ? parsePhone(user.phone) : { prefix: '', phone: '', extension: undefined };

  const initialData: UserProps = {
    id: user?.id,
    name: user?.name,
    username: user?.username,
    email: user?.email,
    company: user?.company,
    website: user?.website,
    prefix: parsedPhone.prefix,
    phone: parsedPhone.phone,
    extension: parsedPhone.extension,
  }

  const formName = `user-${actionType}-${uuidv4()}`;
  const modalTitle = lastActionType === ActionType.Edit ? 'Edit User Information' : 'Create User';

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        {actionType === ActionType.Edit && user?.prefix && (
          <Option value={user.prefix}>{`+${user.prefix}`}</Option>
        )}

        {actionType === ActionType.Create || (user && user.prefix !== '48') ? (
          <Option value="48">+48</Option>
        ) : null}

        {actionType === ActionType.Create || (user && user.prefix !== '359') ? (
          <Option value="359">+359</Option>
        ) : null}

      </Select>
    </Form.Item>
  );


  const onCheck = async () => {
    try {
      await form.validateFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      openNotification('warning', 'Warning', 'Fields need to be filled!')
    }
  };

  const onFinish = async (values: UserProps) => {
    try {
      const fullPhone = values.prefix ? `+${values.prefix} ${values.phone}` : values.phone;

      const updatedValues = { ...values, phone: fullPhone };

      if (actionType === ActionType.Create) {
        const newUser = { ...updatedValues, id: uuidv4() };
        const result = await createUser(newUser);
        if (result) {
          addUser(newUser);
          openNotification('success', 'User Created', 'A new user has been successfully added.');
        }
        if (!result) {
          openNotification('error', 'User Not created', 'Error occured!');
          return;
        }
      } else if (actionType === ActionType.Edit) {
        const editedUser = { ...updatedValues, id: user?.id };
        const result = await updateUser(editedUser);
        if (result) {
          editUser(editedUser);
          openNotification('success', 'Information Updated', 'Your information has been successfully updated! Thank you for keeping your details current.');
        }
        if (!result) {
          openNotification('error', 'User Not updated', 'Error occured!');
          return;
        }
      }

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    } else if (isModalOpen && initialData) {
      form.setFieldsValue(initialData);
    }

    if (actionType !== undefined) {
      setLastActionType(actionType);
    }

  }, [isModalOpen, initialData, actionType, form]);



  return (
    <>
      {true && (
        <Modal
          forceRender
          title={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1.5rem', }}>
              <EditFilled style={{ color: '#1677FF', margin: 8, fontSize: 48 }} />
              {modalTitle}

            </div>
          }
          open={isModalOpen}
          footer={null}
          style={{ maxWidth: 450 }}
          closable={false}
          mask={false}
        >
          <p className="form__text">Here, you can update your name, email address, and other information</p>
          <Form
            layout="vertical"
            form={form}
            name={formName}
            onFinish={onFinish}
            initialValues={actionType === ActionType.Edit ? { ...initialData } : { prefixSelector: user ? user.prefix : '' }}
            style={{ maxWidth: 400, maxHeight: 600 }}
            scrollToFirstError>
            <Form.Item
              name="name"
              label="Full Name"
              style={{ marginBottom: '0.6rem' }}
              rules={[{ required: true, message: 'Please input your full name' }]}
            >
              <Input placeholder="Input" />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              style={{ marginBottom: '0.6rem' }}
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input placeholder="Input" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              style={{ marginBottom: '0.6rem' }}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid e-mail!',
                },
                {
                  required: true,
                  message: 'Please input your valid e-mail!',
                },
              ]}
            >
              <Input placeholder="Input" />
            </Form.Item>
            <Form.Item
              name="phone"
              label={<span>
                Phone <span style={{ color: '#999' }}>(optional)</span>
              </span>}
              style={{ marginBottom: '0.6rem' }}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="website"
              label={<span>
                Website <span style={{ color: '#999' }}>(optional)</span>
              </span>}
              rules={[{ type: 'url', message: 'The input is not valid url!', }]}
            >
              <Input placeholder="Input" />
            </Form.Item>

            <Form.Item>
              <Row gutter={20}>
                <Col span={12}>
                  <Button block onClick={onCancel}>Cancel</Button>
                </Col>
                <Col span={12}>
                  <Button block type="primary" htmlType="submit" onClick={onCheck}>Save</Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>)}
    </>
  );
};

export default ModalComponent;


