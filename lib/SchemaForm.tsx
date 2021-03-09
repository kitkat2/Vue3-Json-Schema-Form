import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
  ref,
} from 'vue'
import { Schema, UISchema, CustomFormat, CommonWidgetType } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator'
import { computed } from 'vue'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}
const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
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
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
  },
  name: 'SchemaForm',
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }
    })
    const validateResolveRef = ref()
    const validateIndex = ref(0)
    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )
    const doValidate = async () => {
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      if (index !== validateIndex.value) return
      errorSchemaRef.value = result.errorSchema
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            async doValidate() {
              console.log('valid')
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )
    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          console.log(result)
          return result
        }, {} as { [key: string]: CommonWidgetType })
      } else {
        return {}
      }
    })
    const context = {
      SchemaItem,
      formatMapRef,
    }
    provide(SchemaFormContextKey, context)
    return () => {
      const { schema, value, uiSchema } = props
      const errorSchema = errorSchemaRef.value
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchema}
          uiSchema={uiSchema || {}}
        />
      )
    }
  },
})
