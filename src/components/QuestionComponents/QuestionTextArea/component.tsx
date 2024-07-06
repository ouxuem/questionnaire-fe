import { Input, Space, Typography } from 'antd'
import React from 'react'

export type QuestionTextAreaProps = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionTextAreaProps) => void
  disabled?: boolean
  isRequired?: boolean
}

export const QuestionTextAreaDefaultProps: QuestionTextAreaProps = {
  title: '多行文本输入框标题',
  placeholder: '请输入...',
  isRequired: false,
}
const QuestionTextArea: React.FC<QuestionTextAreaProps> = (props) => {
  const { title, placeholder, isRequired } = { ...QuestionTextAreaDefaultProps, ...props }
  return (
    <div>
      <Space align="baseline">
        {isRequired && <Typography.Text type="danger">*</Typography.Text>}
        <Typography.Paragraph strong>{title}</Typography.Paragraph>
      </Space>

      <div>
        <Input.TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextArea
