import TimerTime from '@/components/TimerTime.vue'

export default {
  title: 'Components/TimerTime',
  component: TimerTime
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TimerTime },
  template: '<TimerTime v-bind="$props" />'
})

const time = 25 * 1000 * 60

export const Inactive = Template.bind({})
Inactive.args = {
  time,
  timeRemaining: time,
  size: 120
}

export const Active = Template.bind({})
Active.args = {
  time,
  timeRemaining: time - 60234,
  size: 120
}
