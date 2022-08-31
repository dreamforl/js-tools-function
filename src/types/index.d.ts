import { Options } from './exportExcel'
import { FetchOptions } from './fetch'
export default interface tools {
  strToBuffer(str: string): Uint16Array
  bufferToStr(buf: ArrayBuffer): String
  Uint8ArrayToString(buf: Array<number>): String
  stringToUint8Array(str: String): Uint8Array
  deepCopy(obj: unknown): unknown
  exportExcel(options: Options): void
  zwFetch(url: String, options: FetchOptions): void
}
