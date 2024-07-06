import { Typography } from 'antd'
import React from 'react'

export type QuestionTitleProps = {
  text?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
  onChange?: (newProps: QuestionTitleProps) => void
  disabled?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitleProps = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
const QuestionTitle: React.FC<QuestionTitleProps> = (props) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const genFontSize = (level: number) => {
    switch (level) {
      case 1:
        return '24px'
      case 2:
        return '20px'
      case 3:
        return '16px'
      default:
        return '16px'
    }
  }
  return (
    <Typography.Title mb="0" style={{ textAlign: isCenter ? 'center' : 'left', fontSize: genFontSize(level) }} level={level}>
      {text}
    </Typography.Title>
  )
}

export default QuestionTitle
