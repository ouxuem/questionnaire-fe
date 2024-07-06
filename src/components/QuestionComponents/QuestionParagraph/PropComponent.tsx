import { Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { QuestionParagraphProps } from './component'
const PropComponent: React.FC<QuestionParagraphProps> = ({ text, isCenter, onChange, disabled }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} form={form} layout="vertical" initialValues={{ text, isCenter }}>
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: '请输入段落内容！' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
