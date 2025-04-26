import '../App.css'
import { Button, Col, Form, Input, Modal, Row, Select, notification } from "antd";
import { EditFilled } from '@ant-design/icons';
import { useEffect } from "react";
import { ActionType, UserProps } from "../types/userInterfaces";
import { useUsersContext } from "../context/usersContext";
import { v4 as uuidv4 } from 'uuid';
import { CheckCircleFilled } from '@ant-design/icons';
import { createUser, updateUser } from "../api/users";


type ModalComponentProps = {
  actionType: ActionType | undefined;
  isModalOpen: boolean;
  onCancel: () => void;
  user?: UserProps;
};


const ModalComponent = ({ actionType, isModalOpen, onCancel, user }: ModalComponentProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const { addUser, editUser } = useUsersContext();

  const [api, contextHolder] = notification.useNotification();

  const initialData: UserProps = {
    id: user?.id,
    name: user?.name,
    username: user?.username,
    email: user?.email,
    company: user?.company,
    phone: user?.phone,
    website: user?.website,
  }

  const formName = `user-${actionType}-${uuidv4()}`;


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="48">+48</Option>
        <Option value="359">+359</Option>
      </Select>
    </Form.Item>
  );

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };


  const openNotification = (message: string, description: string) => {
    api.success({
      message,
      description,
      placement: 'top',
      icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
    });
  };

  const onFinish = async (values: UserProps) => {
    try {
      if (actionType === ActionType.Create) {
        const newUser = { ...values, id: uuidv4() };
        const result = await createUser(newUser);
        if (result) {
          addUser(newUser);
          openNotification('User Created', 'A new user has been successfully added.');
        }
      } else if (actionType === ActionType.Edit) {
        const editedUser = { ...values, id: user?.id };
        const result = await updateUser(editedUser);
        if (result) {
          editUser(editedUser);
          openNotification('Information Updated', 'Your information has been successfully updated!');
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
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && initialData) {
      form.setFieldsValue(initialData);
    }
  }, [isModalOpen, initialData, form]);


  return (
    <>
      {contextHolder}
      {true && (
        <Modal
        forceRender
          title={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1.5rem', }}>
              <EditFilled style={{ color: '#1677FF', margin: 8, fontSize: 48 }} />
              {actionType === ActionType.Edit ? 'Edit User Information' : 'Create User'}
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
            initialValues={actionType === ActionType.Edit ? { ...initialData } : { prefixSelector: '48' }}
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
              rules={[{ pattern: /^[0-9]*$/, message: 'The input is not valid!' }]}
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


