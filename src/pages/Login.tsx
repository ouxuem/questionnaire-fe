import { UserAddOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, FormProps, Input, Space, Typography, message } from 'antd'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MANAGE_LIST_URL, REGISTER_URL } from '../router'
import { api_user_login } from '../api/user'
import { useRequest } from 'ahooks'
import { util_setToken } from '../utils/user-token'

type FieldType = {
  username: string
  password: string
  remember: boolean
}
const Login: React.FC = () => {
  const location = useLocation()
  const [form] = Form.useForm<FieldType>()
  useEffect(() => {
    const username = (location.state as { username?: string })?.username
    if (username) {
      form.setFieldsValue({ username })
    }
  }, [location.state, form])
  const { run: user_login } = useRequest(
    async (values: FieldType) => {
      const { username, password, remember } = values
      return await api_user_login(username, password, remember)
    },
    {
      manual: true,
      onSuccess: (data) => {
        util_setToken(data.access_token, data.refresh_token)
        message.success('登录成功！', 1, () => {
          window.location.href = MANAGE_LIST_URL
        })
      },
    }
  )

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    user_login(values)
  }
  return (
    <div bg="#fff" flex="~ col items-center" justify="center" h="[calc(100vh-145px)]">
      <div>
        <Space>
          <Typography.Title level={2}>
            <UserAddOutlined />
          </Typography.Title>
          <Typography.Title level={2}>用户登录</Typography.Title>
        </Space>
      </div>
      <div>
        <Form form={form} initialValues={{ remember: true }} onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item<FieldType> rules={[{ required: true, message: '请输入用户名！' }]} label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> rules={[{ required: true, message: '请输入密码！' }]} label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
            {/* 
            后端采用jwt 如果选了记住我，采取refresh_token的方式，延长时间
            如果没有选，则不需要refresh_token，采用短期token的方式，过期时间为1天
            */}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_URL}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
