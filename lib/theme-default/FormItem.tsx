import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, FieldPropsDefine } from '../types'
import { createUseStyles } from 'vue-jss'
const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    marginTop: 5,
    marginBottom: 5,
    padding: 0,
    listStyle: 'none',
    color: 'red',
    fontSize: 12,
  },
})
const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      const { schema, errors } = props
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      )
    }
  },
})

export default FormItem
// 高阶组件
export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} />
          </FormItem>
        )
      }
    },
  }) as any
}
