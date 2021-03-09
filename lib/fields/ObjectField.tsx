import { useVJSFContext } from '../context'
import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import { isObject } from '../utils'
export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleObjectFieldChange = (key: string, v: string) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }
    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const crtValue: any = isObject(value) ? value : {} // crtValue 类型只能给到any 不确定默认值具体是什么

      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
            schema={properties[k]}
            rootSchema={rootSchema}
            errorSchema={errorSchema[k] || {}}
            value={crtValue[k]}
            onChange={(v: any) => handleObjectFieldChange(k, v)}
            key={index}
          />
        )
      })
    }
  },
})
