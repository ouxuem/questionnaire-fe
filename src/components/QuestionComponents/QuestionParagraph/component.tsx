import { Typography } from 'antd'
import React from 'react'

export type QuestionParagraphProps = {
  text?: string
  isCenter?: boolean
  onChange?: (newProps: QuestionParagraphProps) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphProps = {
  text: '一行段落',
  isCenter: false,
}
const QuestionParagraph: React.FC<QuestionParagraphProps> = (props) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  const textList = text.split('\n')
  return (
    <Typography.Paragraph mb="0" style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Typography.Paragraph>
  )
}

export default QuestionParagraph
