const ffi = require('ffi-napi')
// const ref = require('ref-napi')
// const Struct = require('ref-struct-napi')
// const refArray = require('ref-array-napi')
// const { DTypes: DT } = require('win32-api')

const EVENT_MODIFY_STATE = 0x0002

const kernel32 = ffi.Library('kernel32.dll', {
  GetTickCount: ['int', []]
  // OpenEventW: [DT.HANDLE, [DT.DWORD, DT.BOOL, DT.LPCTSTR]],
  // SetEventW: [DT.BOOL, [DT.HANDLE]]
})

console.log('GetTickCount: ', kernel32.GetTickCount())

const handle = kernel32.OpenEventW(EVENT_MODIFY_STATE, false, 'mosq2256_reload')
const result = kernel32.SetEventW(handle)
console.log('SetEvent result: ', result)
