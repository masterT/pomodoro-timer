import Button, { DEFAULT_TYPE, TYPES } from '@/components/Button.vue'

export default {
  title: 'Components/Button',
  component: Button,
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
  components: { Button },
  template: '<Button v-bind="$props">Button</Button>'
})

export const Default = Template.bind({})
Default.args = {
  type: DEFAULT_TYPE,
  disabled: false
}

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  disabled: false
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary',
  disabled: false
}

export const Danger = Template.bind({})
Danger.args = {
  type: 'danger',
  disabled: false
}

export const Link = Template.bind({})
Link.args = {
  type: 'link',
  disabled: false
}
