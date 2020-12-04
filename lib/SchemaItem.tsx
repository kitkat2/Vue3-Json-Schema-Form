import { defineComponent } from 'vue'
// import NumberFiled from './fields/NumberFiled'
// import StringField from './fields/StringField'
import NumberFiled from './fields/NumberFiled.vue'
import StringField from './fields/StringField.vue'
import { FieldPropsDefine, SchemaTypes } from './types'
export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,

  setup(props) {
    return () => {
      const { schema } = props
      // TODO: 如果type没有指定我们需要猜测type

      const type = schema.type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberFiled
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      return <Component {...props} />
    }
  },
})
