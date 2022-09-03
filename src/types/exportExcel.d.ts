export interface Child {
  label: string
  key: string
  length: number
  value?: string | number
}
interface HeaderOption {
  label: string
  key: string
  length: number
  value: string | undefined
  children: undefined | Array<Child>
  rowspan: 1 | 2
  colspan: number
}
export interface Options {
  name: string
  header: Array<HeaderOption>
  data: Array<{
    index: number
  }>
  deep: 2 | undefined
}
