import { Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { QuestionTextAreaProps } from './component'
const PropComponent: React.FC<QuestionTextAreaProps> = ({ title, placeholder, onChange, disabled, isRequired }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder, isRequired })
  }, [title, placeholder, isRequired])
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} form={form} layout="vertical" initialValues={{ title, placeholder, isRequired }}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
      <Form.Item name="isRequired" valuePropName="checked">
        <Checkbox>是否必填</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
