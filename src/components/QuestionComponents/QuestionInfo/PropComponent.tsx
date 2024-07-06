import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { QuestionInfoProps } from './component'
const PropComponent: React.FC<QuestionInfoProps> = ({ title, desc, onChange, disabled }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} form={form} layout="vertical" initialValues={{ title, desc }}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题！' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
