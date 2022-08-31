export interface Options {
  name: string
  header: Array<HeaderOPtion>
  data: Array<{
    index: number
  }>
  deep: 2 | undefined
}
interface HeaderOPtion {
  label: string
  key: string
  length: number
  value: string | undefined
  children: undefined | Array<Child>
  rowspan: 1 | 2
  colspan: number
}
export interface Child {
  label: string
  key: string
  length: number
  value?: string | number
}
