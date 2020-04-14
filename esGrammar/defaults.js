const _ = require('lodash')

function defaults(target, defaultValues) {
  const res = { ...target };
  for (let k in defaultValues) {
    if (res[k] == null) {
      res[k] = defaultValues[k];
    }
  }
  return res;
}

const deft = {
    productModel: 'OT_TEST',
    serialNumber: '30624700',
    profileCreator: '30624700'
}
const data = {
    guid: '4b6e5290-6503-11ea-ab42-896f2e42c9ad',
    name: 'Trump',
    mrNumber: 'TRMP1234',
    age: 50,
    sex: 1,
    phone: null,
    weight: null,
    tall: null,
    birthday: null,
    married: null,
    address: null,
    hospital: null,
    diagnosis: null,
    summary: null,
    data1: { imageUrl: 'static/img/user/3.png' },
    tag: null,
    remark: 'MAGA!!!',
    recordState: 0,
    profileCreator: undefined,
    profileVersion: 0,
    needCommit: 1,
    commitTime: '2020-03-16T08:55:08.475Z',
    createdAt: '2020-03-13T08:19:01.000Z',
    updatedAt: '2020-03-16T08:55:08.373Z'
}

console.log(defaults(data, deft))
console.log(_.defaults(data, deft))
