function assignArg (arg) {
  while (arg--);
}

function cloneArg (arg) {
  let ct = arg
  while (ct--);
}

const LOOP_TIMES = 10e+7
const TEST_TIMES = 100

let startTime = process.hrtime()
for (let i = 0; i < TEST_TIMES; i++) {
  assignArg(LOOP_TIMES)
}
console.log('assign', process.hrtime(startTime))

startTime = process.hrtime()
for (let i = 0; i < TEST_TIMES; i++) {
  cloneArg(LOOP_TIMES)
}
console.log('clone', process.hrtime(startTime))
