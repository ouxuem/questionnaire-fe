import { Checkbox, Space, Typography } from 'antd'
import React from 'react'

export type CheckboxOptionType = {
  value: string
  text: string
  checked: boolean
}
export type QuestionCheckboxProps = {
  title?: string
  isVertical?: boolean
  list?: CheckboxOptionType[]

  onChange?: (newProps: QuestionCheckboxProps) => void
  disabled?: boolean
  isRequired?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxProps = {
  title: '多选标题',
  isVertical: false,
  list: [
    {
      value: '选项1',
      text: '选项1',
      checked: false,
    },
    {
      value: '选项2',
      text: '选项2',
      checked: false,
    },
    {
      value: '选项3',
      text: '选项3',
      checked: false,
    },
  ],
}
const QuestionCheckbox: React.FC<QuestionCheckboxProps> = (props) => {
  const { title, list = [], isVertical, isRequired } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div flex="~ col">
      <Space align="baseline">
        {isRequired && <Typography.Text type="danger">*</Typography.Text>}
        <Typography.Paragraph m="0" strong>{title}</Typography.Paragraph>
      </Space>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((item) => {
          const { value, text, checked } = item
          return (
            <Checkbox checked={checked} key={value} value={value}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckbox
