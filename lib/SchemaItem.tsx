import { computed, defineComponent } from 'vue'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
import ArrayField from './fields/ArrayField'
import ObjectField from './fields/ObjectField'
// import NumberField from './fields/NumberField.vue'
// import StringField from './fields/StringField.vue'
import { FieldPropsDefine, SchemaTypes } from './types'

import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value) // 把这个遍历的函数放在computed中，可以不必每次都调用，可以节省开销
      // computed return的是一个ref的对象
    })
    return () => {
      const { schema, rootSchema, value } = props
      const retrievedSchema = retrievedSchemaRef.value
      // TODO: 如果type没有指定我们需要猜测type
      const type = schema.type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
