export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: '密码',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: '确认密码',
      },
    },
  },
  customValidate(data: any, errors: any) {
    if (data.pass1 !== data.pass2) {
      errors.pass2.addError('密码必须相同')
    }
  },
  uiSchema: {},
  default: 'finn',
}
