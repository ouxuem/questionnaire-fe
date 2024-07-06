import { Radio, Space, Typography } from 'antd'
import React from 'react'

export type RadioOptionType = {
  value: string
  text: string
}
export type QuestionRadioProps = {
  title?: string
  isVertical?: boolean
  options?: RadioOptionType[]
  /** 默认选中 */
  value?: string

  onChange?: (newProps: QuestionRadioProps) => void
  disabled?: boolean
  isRequired?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioProps = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      value: '选项1',
      text: '选项1',
    },
    {
      value: '选项2',
      text: '选项2',
    },
  ],
  value: '',
  isRequired: false,
}
const QuestionRadio: React.FC<QuestionRadioProps> = (props) => {
  const { title, options = [], value, isVertical, isRequired } = { ...QuestionRadioDefaultProps, ...props }
  return (
    <div flex="~ col">
      <Space align="baseline">
        {isRequired && <Typography.Text type="danger">*</Typography.Text>}
        <Typography.Paragraph m="0" strong>{title}</Typography.Paragraph>
      </Space>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((item) => {
            const { value, text } = item
            return (
              <Radio value={value} key={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
