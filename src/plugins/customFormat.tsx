import { CustomFormat, CommonWidgetPropsDefine } from '../../lib/types'
import { defineComponent } from 'vue'
import { withFormItem } from '../../lib/theme-default/FormItem'
import { createUseStyles } from 'vue-jss'
const useStyles = createUseStyles({
  color: {
    border: '1px solid #d9d9d9',
    borderRadius: '2px',
    backgroundColor: '#fff',
    '&:focus': {
      borderColor: '#40a9ff',
      borderRightWidth: '1px !important',
      outline: 0,
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
    },
  },
})

const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      props: CommonWidgetPropsDefine,
      setup(props) {
        const handleChange = (e: any) => {
          const value = e.target.value
          e.target.value = props.value
          props.onChange(value)
        }
        const classesRef = useStyles()
        return () => {
          const classes = classesRef.value
          return (
            <input
              class={classes.color}
              type="color"
              value={props.value as any}
              onInput={handleChange}
            />
          )
        }
      },
    }),
  ),
}

export default format
