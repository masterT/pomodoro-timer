import Status, { DEFAULT_TYPE, TYPES } from '@/components/Status.vue'

export default {
  title: 'Components/Status',
  component: Status,
  argTypes: {
    type: {
      controls: {
        type: 'select',
        values: TYPES
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Status },
  template: '<Status v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  type: DEFAULT_TYPE
}

export const Empty = Template.bind({})
Empty.args = {
  type: 'empty'
}
export const Primary = Template.bind({})
Primary.args = {
  type: 'primary'
}
export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary'
}
export const Accent = Template.bind({})
Accent.args = {
  type: 'accent'
}
export const Danger = Template.bind({})
Danger.args = {
  type: 'danger'
}
export const Success = Template.bind({})
Success.args = {
  type: 'success'
}
export const Warning = Template.bind({})
Warning.args = {
  type: 'warning'
}
export const Info = Template.bind({})
Info.args = {
  type: 'info'
}
