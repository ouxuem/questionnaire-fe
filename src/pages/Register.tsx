import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, FormProps, Input, Space, Typography, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_URL } from '../router'
import { api_user_register } from '../api/user'
import { useRequest } from 'ahooks'

type FieldType = {
  username: string
  password: string
  remember?: string
  confirmPassword: string
  nickname?: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { run: user_register } = useRequest(
    async (values: FieldType) => {
      const { username, password, nickname } = values
      return await api_user_register(username, password, nickname)
    },
    {
      manual: true,
      onSuccess: (_, params) => {
        message.success('注册成功！')
        navigate(LOGIN_URL, {
          state: { username: params[0].username },
        })
      },
    }
  )

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    user_register(values)
  }
  return (
    <div bg="#fff" flex="~ col items-center" justify="center" h="[calc(100vh-145px)]">
      <div>
        <Space>
          <Typography.Title level={2}>
            <UserAddOutlined />
          </Typography.Title>
          <Typography.Title level={2}>注册新用户</Typography.Title>
        </Space>
      </div>
      <div>
        <Form onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              { type: 'string', min: 5, max: 15, message: '用户名长度为5-15位！' },
              // 只能是数字字母下划线
              { pattern: /^\w+$/, message: '用户名只能包含数字字母下划线！' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { type: 'string', min: 6, message: '密码长度至少6位！' },
              {
                validator: (_, value) => {
                  if (value && !/^(?=.*[a-zA-Z\W])[\w\W]*$/.test(value)) {
                    return Promise.reject('请包含字母或特殊字符！')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            rules={[
              { required: true, message: '请再次输入密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码输入不一致！'))
                },
              }),
            ]}
            dependencies={['password']}
            label="确认密码"
            name="confirmPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_URL}>已有账户？登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
