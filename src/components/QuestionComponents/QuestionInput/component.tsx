import { Input, Space, Typography } from 'antd'
import React from 'react'

export type QuestionInputProps = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionInputProps) => void
  disabled?: boolean
  isRequired?: boolean
}

export const QuestionInputDefaultProps: QuestionInputProps = {
  title: '输入框标题',
  placeholder: '请输入...',
  isRequired: false,
}
const QuestionInput: React.FC<QuestionInputProps> = (props) => {
  const { title, placeholder, isRequired } = { ...QuestionInputDefaultProps, ...props }
  return (
    <div>
      <Space align="baseline">
        {isRequired && <Typography.Text type="danger">*</Typography.Text>}
        <Typography.Paragraph strong>{title}</Typography.Paragraph>
      </Space>
      <div>
        <Input required={true} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
