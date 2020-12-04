<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FieldPropsDefine } from '../types'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: FieldPropsDefine,
  setup(props) {
    const value = ref(props.value)
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    watch(
      () => props.value,
      (newVal) => {
        value.value = newVal as string
      },
    )
    return {
      // schema,
      value,
      handleChange,
    }
  },
})
</script>

<style></style>
