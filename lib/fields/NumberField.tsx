import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent } from 'vue'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    const handleChange = (v: string) => {
      const num = Number(v)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    return () => {
      const { schema, rootSchema, errorSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value
      return (
        <NumberWidget
          {...rest}
          errors={errorSchema.__errors}
          onChange={handleChange}
          schema={schema}
        />
      )
    }
  },
})
