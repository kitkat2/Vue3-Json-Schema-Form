import { inject, Ref } from 'vue'
import { CommonFieldType, CommonWidgetType, Theme } from './types'

export const SchemaFormContextKey = Symbol()

export const useVJSFContext = () => {
  const context:
    | {
        theme: Theme
        SchemaItem: CommonFieldType
        formatMapRef: Ref<{ [key: string]: CommonWidgetType }>
      }
    | undefined = inject(SchemaFormContextKey)
  if (!context) {
    throw Error('SchemaForm should be used')
  }
  return context
}
