const Ajv = require('ajv')
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test', // format 只针对string类型和number类型
      // testk: true,
      errorMessage: {
        type: '必须是字符串',
        format: '电子邮箱格式不正确'
      }

    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      }
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}
const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true
})
require('ajv-errors')(ajv)

// 自定义format
ajv.addFormat('test', (data) => {
  console.log(data, '====')
  return data === 'haha'
}) // ajv库的addFormat 方法拓展校验规则 此方法并不是json schema官方规定的

// 自定义关键字
// keywords
ajv.addKeyword('testk', {
  // 1. validate
  validate: function func(schema, data) {
    console.log(schema, data)
    func.errors = [{
      keyword: 'testk',
      dataPath: '.name',
      schemaPath: '#/properties/name/testk',
      params: {
        keyword: 'testk'
      },
      message: '这是一条自定义的错误信息'
    }]
    return data.length < 5
  }
  // 2. compile
  // compile(schema, parentSchema) {
  //   console.log(schema, parentSchema)
  //   return () => true // 必须返回函数
  // },
  // metaSchema: {
  //   type: 'boolean'
  // },
  // 3. macro
  // macro(schema, parentSchema) {
  //   return {
  //     minLength: 10,
  //   }
  //   // macro 里的schema会被加入到parentSchema中，对数据进行校验
  // }
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'finn@123.com',
  age: 16,
  pets: ['mimi'],
  isWorker: true
})
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}