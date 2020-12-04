<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FieldPropsDefine } from '../../lib/types'
import { defineComponent, watch, ref } from 'vue'
export default defineComponent({
  props: FieldPropsDefine,
  setup(props) {
    const value: any = ref(props.value)
    console.log('ccc', value)
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
        value.value = newVal as number
      },
    )
    return {
      value,
      handleChange,
    }
  },
})
</script>

<style></style>
