import TimerButton from '@/components/TimerButton.vue'

export default {
  title: 'Components/TimerButton',
  component: TimerButton
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TimerButton },
  template: '<TimerButton v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  selected: false
}

export const Selected = Template.bind({})
Selected.args = {
  selected: true
}
