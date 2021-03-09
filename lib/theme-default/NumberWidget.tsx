import { CommonWidgetPropsDefine, CommonWidgetType, Schema } from '../types'
import { defineComponent } from 'vue'
import { withFormItem } from './FormItem'
import 'ant-design-vue/lib/input-number/style/css'
import AInputNumber from 'ant-design-vue/lib/input-number'
const NumberWidget: CommonWidgetType = withFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (value: number) => {
        const val = value
        value = props.value as number
        props.onChange(val)
      }
      return () => {
        return (
          <AInputNumber value={props.value as any} onChange={handleChange} />
        )
      }
    },
  }),
)

export default NumberWidget
