const ffi = require('ffi')
const ref = require('ref')
const Struct = require('ref-struct')
const refArray = require('ref-array')
const { DTypes: DT } = require('win32-api')

const iconv = require('iconv-lite')

const time_t = ref.types.ulong

const MAX_ADAPTER_NAME_LENGTH = 256
const MAX_ADAPTER_DESCRIPTION_LENGTH = 128
const MAX_ADAPTER_ADDRESS_LENGTH = 8

const IP_ADDRESS_STRING = Struct({
  String: refArray(ref.types.char, 4 * 4)
})
const IP_MASK_STRING = IP_ADDRESS_STRING

const IP_ADDR_STRING = Struct({
  // Next: PIP_ADDR_STRING,
  IpAddress: IP_ADDRESS_STRING,
  IpMask: IP_MASK_STRING,
  Context: DT.DWORD
})
const PIP_ADDR_STRING = ref.refType(IP_ADDR_STRING)
IP_ADDR_STRING.defineProperty('Next', PIP_ADDR_STRING)

const __IP_ADAPTER_INFO = Struct({
  // Next: PIP_ADAPTER_INFO,
  ComboIndex: DT.DWORD,
  AdapterName: refArray(ref.types.char, MAX_ADAPTER_NAME_LENGTH + 4),
  Description: refArray(ref.types.char, MAX_ADAPTER_DESCRIPTION_LENGTH + 4),
  AddressLength: DT.UINT,
  Address: refArray(DT.BYTE, MAX_ADAPTER_ADDRESS_LENGTH),
  Index: DT.DWORD,
  Type: DT.UINT,
  DhcpEnabled: DT.UINT,
  CurrentIpAddress: PIP_ADDR_STRING,
  IpAddressList: IP_ADDR_STRING,
  GatewayList: IP_ADDR_STRING,
  DhcpServer: IP_ADDR_STRING,
  HaveWins: DT.BOOL,
  PrimaryWinsServer: IP_ADDR_STRING,
  SecondaryWinsServer: IP_ADDR_STRING,
  LeaseObtained: time_t,
  LeaseExpires: time_t
})
const IP_ADAPTER_INFO = Struct()
const PIP_ADAPTER_INFO = ref.refType(IP_ADAPTER_INFO)

IP_ADAPTER_INFO.defineProperty('Next', PIP_ADAPTER_INFO)
IP_ADAPTER_INFO.defineProperty('ComboIndex', DT.DWORD)
IP_ADAPTER_INFO.defineProperty('AdapterName', refArray(ref.types.char, MAX_ADAPTER_NAME_LENGTH + 4))
IP_ADAPTER_INFO.defineProperty('Description', refArray(ref.types.char, MAX_ADAPTER_DESCRIPTION_LENGTH + 4))
IP_ADAPTER_INFO.defineProperty('AddressLength', DT.UINT)
IP_ADAPTER_INFO.defineProperty('Address', refArray(DT.BYTE, MAX_ADAPTER_ADDRESS_LENGTH))
IP_ADAPTER_INFO.defineProperty('Index', DT.DWORD)
IP_ADAPTER_INFO.defineProperty('Type', DT.UINT)
IP_ADAPTER_INFO.defineProperty('DhcpEnabled', DT.UINT)
IP_ADAPTER_INFO.defineProperty('CurrentIpAddress', PIP_ADDR_STRING)
IP_ADAPTER_INFO.defineProperty('IpAddressList', IP_ADDR_STRING)
IP_ADAPTER_INFO.defineProperty('GatewayList', IP_ADDR_STRING)
IP_ADAPTER_INFO.defineProperty('DhcpServer', IP_ADDR_STRING)
IP_ADAPTER_INFO.defineProperty('HaveWins', DT.BOOL)
IP_ADAPTER_INFO.defineProperty('PrimaryWinsServer', IP_ADDR_STRING)
IP_ADAPTER_INFO.defineProperty('SecondaryWinsServer', IP_ADDR_STRING)
IP_ADAPTER_INFO.defineProperty('LeaseObtained', time_t)
IP_ADAPTER_INFO.defineProperty('LeaseExpires', time_t)

console.log(Object.keys(IP_ADAPTER_INFO))
console.log(Object.keys(IP_ADAPTER_INFO.size))
console.log(Object.keys(IP_ADAPTER_INFO.fields))

const ipHelper = ffi.Library('iphlpapi', {
  GetAdaptersInfo: [DT.ULONG, [PIP_ADAPTER_INFO, DT.PULONG]]
})

const adapterInfo = new IP_ADAPTER_INFO
const infoSize = ref.alloc(DT.ULONG)

console.log('before calling GetAdapatersInfo')
const errCode = ipHelper.GetAdaptersInfo(adapterInfo.ref(), infoSize);
console.log('call GetAdaptersInfo: ' + errCode)
console.log('infoSize: ' + infoSize.deref())

console.log(iconv.decode(Buffer.from(adapterInfo.AdapterName), 'utf-8'))
