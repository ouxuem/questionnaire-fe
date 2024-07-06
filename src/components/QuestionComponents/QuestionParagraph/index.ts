import Component, { QuestionParagraphDefaultProps } from './component.tsx'
import PropComponent from './PropComponent.tsx'

export * from './component.tsx'

export default {
  title: '段落',
  type: 'questionParagraph', // 后端统一
  Component,
  defaultProps: QuestionParagraphDefaultProps,
  PropComponent,
}
