import { FieldPropsDefine } from '../types'
import { defineComponent, PropType, watch } from 'vue'
export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    console.log('---value---', props.value)
    let value: number = props.value as number
    const handleChange = (e: any) => {
      console.log('e', e.target.value)
      const value = e.target.value
      if (isNaN(value)) {
        props.onChange(undefined)
      } else {
        props.onChange(parseInt(value))
      }
    }
    watch(
      () => props.value,
      (newVal) => {
        console.log(newVal, '--------------')
        value = newVal as number
      },
    )
    return () => {
      return <input type="number" onChange={handleChange} value={value} />
    }
  },
})
