import { Checkbox, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { QuestionTitleProps } from './component'
const PropComponent: React.FC<QuestionTitleProps> = ({ text, level, isCenter, onChange, disabled }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} form={form} layout="vertical" initialValues={{ text, level, isCenter }}>
      <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题内容！' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
