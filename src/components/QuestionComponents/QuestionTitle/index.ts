import Component, { QuestionTitleDefaultProps } from './component.tsx'
import PropComponent from './PropComponent.tsx'

export * from './component.tsx'

export default {
  title: '标题',
  type: 'questionTitle', // 后端统一
  Component,
  defaultProps: QuestionTitleDefaultProps,
  PropComponent,
}
