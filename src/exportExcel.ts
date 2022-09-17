interface Child {
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
interface Options {
  name: string
  header: Array<HeaderOption>
  data: Array<{
    index: number
  }>
  deep: 2 | undefined
}

/* eslint-disable */
/**
 * @functionName exportExcel
 * @param { Object } options 配置参数
 * @param { Object } options.name //要导出的文件名
 * @param { Array } options.header  //表头的信息与表头配置
 * @param { Array } options.data //要导出的数据
 * @param { Number } options.deep //如果是二级表头的话，需要设置deep为2------根据是否设置deep来判断当前单元格层级
 * @param { Object } options.header[0]  //表头第一个元素
 * @param { String } options.header[0].label //表头中单元格的名称
 * @param { String } options.header[0].key  //表中单元格在data中查找值的属性名,支持a.b.c的格式获取内部对象
 * @param { Number || String } options.header[0].length //表中单元格的宽度
 * @param { String } options.header[0].value //存在部分值在data中没有值的现象，如果需要展示没有值的某一列单元格，就设置此项
 * @param { String } options.header[0].label //表头中单元格的名称
 * @param { String } options.header[0].children //表头中单元格的下层单元格
 * @param { String } options.header[0].rowspan //表头中单元格的行数（有子单元格就是1，没有子单元格就是2）
 * @param { String } options.header[0].colspan //表头中单元格所占的列数（无子单元格就是1，否则根据子单元格数量来算）
 * @param { String } options.header[0].children[0].label //表头中单元格的名称
 * @param { String } options.header[0].children[0].key //表中单元格在data中查找值的属性名,支持a.b.c的格式获取内部对象
 * @param { String } options.header[0].children[0].length //表中单元格的宽度
 * @Description  //自定义导出excel表格
 * @return { Object }
 */
export function exportExcel(options: Options) {
  let { header, data, name, deep } = options
  let container = document.createElement('div')
  let table = document.createElement('table')
  table.style.fontSize = '14px'
  // 设置左右上下边距为0
  table.setAttribute('cellspacing', '0')
  table.setAttribute('cellspacing', '0')
  table.setAttribute('border', '1')
  let thead = document.createElement('thead')

  // 目前只适配一级和二级表头,根据deep判断，默认是一级
  if (deep === 2) {
    let tr1 = document.createElement('tr')
    let tr2 = document.createElement('tr')
    tr1.style.height = '35px'
    tr2.style.height = '35px'
    header.forEach(item => {
      if (item.children) {
        // 设置上级表头
        let td_father = document.createElement('td')
        td_father.innerText = item.label
        td_father.setAttribute('colspan', item.colspan.toString())
        tr1.appendChild(td_father)
        // 设置二级表头
        item.children.forEach(item_child => {
          let td_child = document.createElement('td')
          td_child.innerText = item_child.label
          if (item_child.length) {
            td_child.style.width = item_child.length + 'px'
          } else {
            td_child.style.width = '100px'
          }
          tr2.appendChild(td_child)
        })
        thead.appendChild(tr1)
        thead.appendChild(tr2)
        table.appendChild(thead)
      } else {
        let td = document.createElement('td')
        if (item.length) {
          td.style.width = item.length + 'px'
        } else {
          td.style.width = '100px'
        }
        td.setAttribute('colspan', '1')
        td.setAttribute('rowspan', item.rowspan.toString(0))
        td.innerText = item.label
        tr1.appendChild(td)
      }
    })
  } else {
    let tr = document.createElement('tr')
    tr.style.height = '35px'
    header.forEach(item => {
      //添加表头
      let td = document.createElement('td')
      if (item.length) {
        td.style.width = item.length + 'px'
      } else {
        td.style.width = '100px'
      }
      td.innerText = item.label
      tr.appendChild(td)
    })
    thead.appendChild(tr)
    table.appendChild(thead)
  }
  // 由于可能存在多级表头，故需要对header中的key提取出来成为数组。然后后续直接从数组中获取值
  let key_list: Array<Child> = []
  header.forEach(item => {
    if (item.children instanceof Array) {
      item.children.forEach(item_child => {
        key_list.push(item_child)
      })
    } else {
      key_list.push(item)
    }
  })
  // 添加表主体内容
  let tbody = document.createElement('tbody')

  data.forEach((data_item, index) => {
    data_item.index = 1 + index
    let tr = document.createElement('tr')
    tr.style.height = '35px'
    key_list.forEach(item => {
      let td
      if (item.value) {
        td = `<td style="mso-number-format:'\@'';">${item.value}</td>`
      } else {
        // 存在有的有效值在对象里面，需要通过a.b.c的方式获取
        if (/\./.test(item.key)) {
          let key = item.key.split('.')
          let value = key.reduce((pre, key_item) => {
            return pre[key_item]
          }, data_item)

          td = `<td style="mso-number-format:'\@'';">${value}</td>`
        } else {
          td = `<td style="mso-number-format:'\@'';">${data_item[item.key]}</td>`
        }
      }
      tr.insertAdjacentHTML('beforeend', td)
    })
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)
  container.appendChild(table)
  let text = container.innerHTML
  //base64转码
  let base64 = function (html) {
    return window.btoa(unescape(encodeURIComponent(html)))
  }
  let uri = 'data:application/vnd.ms-excel;base64,'
  let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body style='text-align:center'>${text}</body></html>`
  let a = document.createElement('a')
  a.setAttribute('target', '_blank')
  //没有后缀就添加后缀.xlsx
  if (!/(\.xlsx$)|(\.xls$)/.test(name)) {
    name = name + '.xlsx'
  }
  a.setAttribute('download', name)
  a.href = uri + base64(html)
  a.click()
}
