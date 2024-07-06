import React, { useEffect } from 'react'
import { usePageInfoStore } from '../../../store/pageInfo'
import { Form, Input } from 'antd'

const PageSetting: React.FC = () => {
  const { title, desc, js, css, resetPageInfo } = usePageInfoStore()
  const [form] = Form.useForm()
  const handValuesChange = () => {
    resetPageInfo(form.getFieldsValue())
  }

  useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
      js,
      css,
    })
  }, [title, desc, js, css])
  return (
    <Form form={form} onValuesChange={handValuesChange} layout="vertical" initialValues={{ title, desc, js, css }}>
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input.TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <Input.TextArea placeholder="请输入css样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <Input.TextArea placeholder="请输入js脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
