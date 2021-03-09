import { CommonWidgetPropsDefine, CommonWidgetType } from '../types'
import { defineComponent, computed } from 'vue'
import { withFormItem } from './FormItem'
import 'ant-design-vue/lib/input/style/css'
import AInput from 'ant-design-vue/lib/input'
const TextWidget: CommonWidgetType = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      const styleRef = computed(() => {
        return {
          color: (props.options && props.options.color) || 'black',
        }
      })
      return () => {
        const { schema } = props
        console.log('schema --->', schema)
        return (
          <AInput
            type="text"
            value={props.value as any}
            style={styleRef.value}
            placeholder={schema.placeholder || '请输入'}
            onChange={handleChange}
          />
        )
      }
    },
  }),
)

export default TextWidget
