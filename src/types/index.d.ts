import { Options } from './exportExcel'
import { FetchOptions } from './fetch'
export default interface tools {
  strToBuffer(str: string): Uint16Array
  bufferToStr(buf: ArrayBuffer): string
  Uint8ArrayToString(buf: Array<number>): string
  stringToUint8Array(str: string): Uint8Array
  deepCopy(obj: unknown): unknown
  exportExcel(options: Options): void
  zwFetch(url: string, options: FetchOptions): void
}
