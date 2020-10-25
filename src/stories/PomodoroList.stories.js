import PomodoroList from '@/components/PomodoroList.vue'

export default {
  title: 'Components/PomodoroList',
  component: PomodoroList
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PomodoroList },
  template: '<PomodoroList v-bind="$props" />'
})

export const WithPomodoro = Template.bind({})
WithPomodoro.args = {
  pomodoro: 4
}

export const WithPomodoroUnderGoal = Template.bind({})
WithPomodoroUnderGoal.args = {
  pomodoro: 4,
  goal: 8
}

export const WithPomodoroOverGoal = Template.bind({})
WithPomodoroOverGoal.args = {
  pomodoro: 8,
  goal: 4
}
