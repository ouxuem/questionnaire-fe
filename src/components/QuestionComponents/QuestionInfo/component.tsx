import { Typography } from 'antd'
import React from 'react'

export type QuestionInfoProps = {
  title?: string
  desc?: string
  onChange?: (newProps: QuestionInfoProps) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoProps = {
  title: '问卷标题',
  desc: '问卷描述',
}
const QuestionInfo: React.FC<QuestionInfoProps> = (props) => {
  const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descList = desc.split('\n')
  return (
    <div text-align="center">
      <Typography.Title className="!text-[24px]">{title}</Typography.Title>
      <Typography.Paragraph>
        {descList.map((item, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {item}
          </span>
        ))}
      </Typography.Paragraph>
    </div>
  )
}

export default QuestionInfo
