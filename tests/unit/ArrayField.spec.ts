import { mount } from '@vue/test-utils'

import {
  NumberField,
  StringField,
  ArrayField,
  SelectionWidget,
} from '../../lib'

import TestComponent from './utils/TestComponent'

describe('Array Field', () => {
  it('should render multi type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: [],
        onChange: () => {},
      },
    })
    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)
    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })
  it('should render single type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string' },
        },
        value: ['1', '2'],
        onChange: () => {},
      },
    })
    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)
    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
    expect(strs[1].props('value')).toBe('2')
  })
  it('should render select type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['1', '2', '3'] },
        },
        value: [],
        onChange: () => {},
      },
    })
    const arr = wrapper.findComponent(ArrayField)
    const selection = arr.findComponent(SelectionWidget)
    expect(selection.exists()).toBeTruthy()
  })
})
