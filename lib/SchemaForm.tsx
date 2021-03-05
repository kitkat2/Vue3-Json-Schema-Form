import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import { Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
}
const defaultAjvOptions: Options = {
  allErrors: true,
  jsonPointers: true,
}
export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
  },
  name: 'SchemaForm',
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context = {
      SchemaItem,
    }
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              console.log('valid')
              const result = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
                props.customValidate,
              )
              errorSchemaRef.value = result.errorSchema
              return result
            },
          }
        }
      },
      {
        immediate: true,
      },
    )
    provide(SchemaFormContextKey, context)
    return () => {
      const { schema, value } = props
      const errorSchema = errorSchemaRef.value
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchema}
        />
      )
    }
  },
})
