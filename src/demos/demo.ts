import PasswordWidget from '@/components/PasswordWiget'

export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: '密码',
        placeholder: '请输入密码pass1',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: '确认密码',
        placeholder: '请确认密码',
      },
      number: {
        type: 'number',
        title: '数字',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
    },
  },
  async customValidate(data: any, errors: any) {
    if (data.pass1 !== data.pass2) {
      errors.pass2.addError('密码必须相同')
    }
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'red',
      },
    },
  },
}
