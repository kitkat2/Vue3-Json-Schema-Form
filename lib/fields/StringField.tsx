import { defineComponent, computed } from 'vue'
import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      props.onChange(v)
    }
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })
    return () => {
      const { schema, rootSchema, errorSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value
      return (
        <TextWidget
          {...rest}
          errors={errorSchema.__errors}
          onChange={handleChange}
          schema={schema}
          options={widgetOptionsRef.value}
        />
      )
    }
  },
})
