import { defineComponent, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine, SelectionWidgetType } from '../types'
import { withFormItem } from './FormItem'
import 'ant-design-vue/lib/select/style/css'
import ASelect from 'ant-design-vue/lib/select'
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
      const handleChange = (value: string) => {
        const val = value
        value = props.value as string
        props.onChange(val)
      }
      return () => {
        const { options, schema } = props
        return (
          <div>
            <ASelect
              mode="tags"
              placeholder={schema.placeholder || '请选择'}
              value={crtValueRef.value as any}
              style="width: 100%"
              onChange={handleChange}
            >
              {options.map((op) => (
                <ASelect.Option value={op.value}>{op.key}</ASelect.Option>
              ))}
            </ASelect>
          </div>
        )
      }
    },
  }),
)

export default Selection
