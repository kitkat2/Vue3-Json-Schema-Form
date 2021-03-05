import { mount } from '@vue/test-utils'

import JsonSchemaForm, { NumberField, StringField } from '../../lib'
import { Schema } from '../../lib/types'

describe('Object Field', () => {
  let schema: Schema
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })
  it('should render properties to correct fields', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: '',
        onChange: () => {},
      },
    })
    const strFiled = wrapper.findComponent(StringField)
    const numFiled = wrapper.findComponent(NumberField)

    expect(strFiled.exists()).toBeTruthy()
    expect(numFiled.exists()).toBeTruthy()
  })
  it('should change value when sub fields trigger onChange', async () => {
    let value: { name: string; age: number } = { name: '', age: 0 }
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    const strFiled = wrapper.findComponent(StringField)
    const numFiled = wrapper.findComponent(NumberField)

    await strFiled.props('onChange')('1')
    expect(value.name).toEqual('1')
    await numFiled.props('onChange')(1)
    expect(value.age).toEqual(1)
  })
})
