import { defineComponent, Ref, ref, reactive, watchEffect } from 'vue'

import MonacoEditor from './components/MonacoEditor'

import demos from './demos'
import SchemaForm, { ThemeProvider } from '../lib'

import { createUseStyles } from 'vue-jss'

import themeDefault from '../lib/theme-default/index'
import format from './plugins/customFormat'

type Schema = any
type UISchema = any

// 对象转化为Json字符串，含tab键，tab为两个space
function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
})

interface SchemaType {
  schema: Schema | null
  data: any
  uiSchema: UISchema | null
  schemaCode: string
  dataCode: string
  uiSchemaCode: string
  customValidate?: (data: any, error: any) => void
}
export default defineComponent({
  components: {
    MonacoEditor,
  },
  setup() {
    const selectedRef: Ref<number> = ref(0)
    const demo: SchemaType = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d: any = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
      demo.customValidate = d.customValidate
    })
    const classesRef = useStyles()

    const handleChange = (v: any) => {
      console.log('value', v)
      demo.data = v
      demo.dataCode = toJson(v)
    }
    const handleCodeChange = (
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) => {
      try {
        console.log('value--', value)
        const json = JSON.parse(value)
        demo[field] = json
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        // do something
        console.log('err', err)
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)
    const validateForm = () => {
      contextRef.value.doValidate().then((res: any) => {
        console.log(res)
      })
    }
    const contextRef = ref()
    return () => {
      const classes = classesRef.value
      const selected = selectedRef.value
      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProvider theme={themeDefault}>
                <SchemaForm
                  uiSchema={demo.uiSchema || {}}
                  schema={demo.schema}
                  onChange={handleChange}
                  value={demo.data}
                  contextRef={contextRef}
                  customValidate={demo.customValidate}
                  customFormats={format}
                />
              </ThemeProvider>

              {/* <SchemaForm
                schema={demo.schema!}
                uiSchema={demo.uiSchema!}
                onChange={handleChange}
                contextRef={methodRef}
                value={demo.data}
              /> */}
              <button onClick={validateForm}>校 验</button>
            </div>
          </div>
        </div>
      )
    }
  },
})
