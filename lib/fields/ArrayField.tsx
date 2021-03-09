import { defineComponent, PropType } from 'vue'
import { FieldPropsDefine, Schema, SelectionWidgetNames } from '../types'
import { useVJSFContext } from '../context'

import { createUseStyles } from 'vue-jss'

import { getWidget } from '../theme'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  PlusOutlined,
  DeleteFilled,
} from '@ant-design/icons-vue'
// import SelectionWidget from '../widgets/Selection';

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    marginBottom: 10,
  },
  actions: {
    backgroundColor: '#eee',
    color: '#888',
    fontSize: '18',
    padding: 5,
    textAlign: 'right',
  },
  action: {
    '&+&': {
      marginLeft: 10,
    },
    '&:hover': {
      color: '#40a9ff',
    },
  },
  content: {
    padding: 10,
  },
})

/**
 * {
 *    items: {type: string}
 * }
 *
 * {
 *    items: [
 *      {type: string}
 *      {type: boolean}
 *    ]
 * }
 *
 * {
 *  items: {type : string, enum: ['1','2']}
 * }
 */
const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleDown = () => props.onDown(props.index)
    const handleUp = () => props.onUp(props.index)
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <PlusOutlined
              title="添加"
              class={classes.action}
              onClick={handleAdd}
            />
            <DeleteFilled
              title="删除"
              class={classes.action}
              onClick={handleDelete}
            />
            <CaretUpOutlined
              title="上移"
              class={classes.action}
              onClick={handleUp}
            />
            <CaretDownOutlined
              title="下移"
              class={classes.action}
              onClick={handleDown}
            />
            {/* <button class={classes.action} onClick={handleDown}>
              下移
            </button> */}
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }
    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      if (index === 0) return
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }
    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)
    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const SchemaItem = context.SchemaItem
      const isMultiType = Array.isArray(schema.items) // 判断items是否为数组
      const isSelect = schema.items && (schema.items as any).enum
      const arr = Array.isArray(value) ? value : []
      const SelectionWidget = SelectionWidgetRef.value

      if (isMultiType) {
        const items: Schema[] = schema.items as Schema[]
        return items!.map((s: Schema, index: number) => {
          const itemsUiSchema = uiSchema.items
          const us = Array.isArray(itemsUiSchema)
            ? itemsUiSchema[index] || {}
            : itemsUiSchema || {}
          return (
            <SchemaItem
              uiSchema={us}
              schema={s}
              key={index}
              rootSchema={rootSchema}
              errorSchema={errorSchema[index] || {}}
              value={arr[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
            />
          )
        })
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onDown={handleDown}
              onUp={handleUp}
            >
              <SchemaItem
                schema={schema.items as Schema}
                uiSchema={(uiSchema.items as any) || {}}
                errorSchema={errorSchema[index] || {}}
                value={v}
                key={index}
                rootSchema={rootSchema}
                onChange={(v: any) => handleArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          )
        })
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({
          key: e,
          value: e,
        }))
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
            errors={errorSchema.__errors}
            schema={schema}
          />
        )
      }
    }
  },
})
