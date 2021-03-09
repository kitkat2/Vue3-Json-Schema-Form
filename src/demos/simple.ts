export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        title: 'firstName',
        type: 'string',
        default: 'Chuck',
        minLength: 10,
      },
      lastName: {
        title: 'lastName',
        type: 'string',
        minLength: 10,
      },
      telephone: {
        title: 'telephone',
        type: 'string',
        minLength: 10,
      },
      staticArray: {
        type: 'array',
        items: [
          { type: 'string', minLength: 10, title: 'string' },
          { type: 'number', title: 'number' },
        ],
      },
      singleTypeArray: {
        title: 'singleTypeArray',
        type: 'array',
        items: { type: 'string', title: 'singleTypeArray Item' },
      },
      singleEnumArray: {
        type: 'array',
        title: 'singleEnumArray',
        placeholder: '请选择一个数字',
        items: {
          type: 'string',
          enum: ['123', '456', '789'],
        },
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    singleTypeArray: ['pp'],
  },
}
