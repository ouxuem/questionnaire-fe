import Component, { QuestionCheckboxDefaultProps } from './component.tsx'

import PropComponent from './PropComponent.tsx'
import StatComponent from './StatComponent.tsx'
export * from './component.tsx'

export default {
  title: '多选选框',
  type: 'questionCheckbox',
  Component,
  defaultProps: QuestionCheckboxDefaultProps,
  PropComponent,
  StatComponent,
}
