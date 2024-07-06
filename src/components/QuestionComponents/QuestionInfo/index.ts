import Component, { QuestionInfoDefaultProps } from './component.tsx'
import PropComponent from './PropComponent.tsx'

export * from './component.tsx'

export default {
  title: '问卷信息',
  type: 'questionInfo', // 后端统一
  Component,
  defaultProps: QuestionInfoDefaultProps,
  PropComponent,
}
