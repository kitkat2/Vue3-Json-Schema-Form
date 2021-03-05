import { defineComponent, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine, SelectionWidgetType } from '../types'
import { withFormItem } from './FormItem'
const Selection: SelectionWidgetType = withFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
    setup(props) {
      const crtValueRef = ref(props.value)
      watch(crtValueRef, (newValue) => {
        if (newValue !== props.value) {
          props.onChange(newValue)
        }
      })
      watch(
        () => props.value,
        (newVal) => {
          if (newVal !== crtValueRef.value) {
            crtValueRef.value = newVal
          }
        },
      )
      return () => {
        const { options } = props
        return (
          <select multiple={true} v-model={crtValueRef.value}>
            {options.map((op) => (
              <option value={op.value}>{op.key}</option>
            ))}
          </select>
        )
      }
    },
  }),
)

export default Selection
