import { CommonWidgetPropsDefine, CommonWidgetType } from '../../lib/types'
import { defineComponent } from 'vue'
import { withFormItem } from '../../lib/theme-default/FormItem'
import 'ant-design-vue/lib/input/style/css'
import AInput from 'ant-design-vue/lib/input'
const PasswordWidget: CommonWidgetType = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      return () => {
        const { schema } = props
        return (
          <AInput
            type="password"
            value={props.value as any}
            placeholder={schema.placeholder || '请输入密码'}
            onChange={handleChange}
          />
        )
      }
    },
  }),
)

export default PasswordWidget
