import { FC } from 'react'
import QuestionInputConf, { QuestionInputProps } from './QuestionInput'
import QuestionTitleConf, { QuestionTitleProps } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphProps } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoProps } from './QuestionInfo'
import QuestionTextAreaConf, { QuestionTextAreaProps } from './QuestionTextArea'
import QuestionRadioConf, { QuestionRadioProps } from './QuestionRadio'
import QuestionCheckboxConf, { QuestionCheckboxProps } from './QuestionCheckbox'
import { RadioStatComponentProps } from './QuestionRadio/StatComponent'
import { CheckboxStatComponentProps } from './QuestionCheckbox/StatComponent'
export type ComponentPropsType = QuestionInputProps & QuestionTitleProps & QuestionParagraphProps & QuestionInfoProps & QuestionTextAreaProps & QuestionRadioProps & QuestionCheckboxProps

type ComponentStatPropsType = RadioStatComponentProps & CheckboxStatComponentProps

export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  PropComponent: FC<ComponentPropsType>
  StatComponent?: FC<ComponentStatPropsType>
}

const componentConfigList: ComponentConfigType[] = [QuestionInputConf, QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf, QuestionTextAreaConf, QuestionRadioConf, QuestionCheckboxConf]

export const getComponentConfigByType = (type: string) => {
  return componentConfigList.find((config) => config.type === type)
}

// 组件分组
export const componentConfigGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextAreaConf],
  },
  {
    groupId: 'choose',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]
