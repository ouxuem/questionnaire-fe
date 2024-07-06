import Component, { QuestionRadioDefaultProps } from './component.tsx'

import PropComponent from './PropComponent.tsx'
import StatComponent from './StatComponent.tsx'
export * from './component.tsx'

export default {
  title: '单选框',
  type: 'questionRadio',
  Component,
  defaultProps: QuestionRadioDefaultProps,
  PropComponent,
  StatComponent,
}
