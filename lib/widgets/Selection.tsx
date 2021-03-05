import { SelectionWidgetPropsDefine, SelectionWidgetType } from '../types'
import { defineComponent, ref, watch } from 'vue'
const SelectionWidget: SelectionWidgetType = defineComponent({
  name: 'Selection',
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
})
export default SelectionWidget
