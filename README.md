# 个人私用 方法

# yarn安装

yarn add js-tools-function

# npm安装

npm install js-tools-function



# 使用

需要开启服务才可以使用

```javascript
import tools from 'js-tools-function'
```



# 工具库

将用到的方法存起来备用

### 函数节流

```javascript
tools.throttleAtonce(function,timeout)
```

```javascript
tools.throttleLatter(function,timeout)
```

### 函数防抖

```javascript
tools.debonce(function,timeout)
```

### 格式化日期

根据所传的格式日期的字段，来格式化日期，不传time默认返回当前时间

不传str默认样式为:  YYYY-MM-DD hh:mm:ss

```javascript
tools.format(str,time)
```

### base64转png

```javascript
tools.base64ToBlob(base64)
```

### 将制定内容复制到剪切板

```javascript
tools.copyToBoard(str)
```

### 返回参数的类型字符串（小写）

```javascript
tools.type(any)
```

### 列表导出excel

```javascript
//一级表头示例
let options = {
    data:list,
    name:'可以不带后缀，默认xlsx',
    header:[
        {label:'序号',key:'index'},  //label为表头名称，key为表的值，可以采用a.b.c的方式(a必须是list中对象的属性)
        {label:'姓名',key:'name',length:100},  //可以设置宽度(number)，默认渲染为100px
        {label:'性别',key:'sex'},
    ]
}
tools.exportExcel(options)
```

```javascript
//二级表头示例
let options = {
  deep: 2, //二级表头要设置deep为2，并且设置rowspan
  name: '分布表.xlsx',
  data: list,
  header: [
    {
      label: '序号',
      key: 'index',
    },
    {
      label: '分布数',
      colspan: 3, 		//要设置colspan，表示下面有几个子表头
      children: [		//子表头 
        {
          label: '小孩',
          key: 'child',
        },
        {
          label: '成人',
          key: 'adult',
        },
        {
          label: '老人',
          key: 'old',
        },
      ],
    },
    {
      label: '性别',
      key: 'sex',
    },
  ],
}
tools.exportExcel(options)
```




### 其他语言的sleep
sleep
```javascript
sleep(1000).then(()=>{console.log('过了100ms')})
```

### 深拷贝

deepCopy

解决：函数、对象、数组、正则、日期、循环依赖等的深拷贝

```js
import { deepCopy } from 'js-tools-function'
const newObject = deepCopy({
  name: 1,
  show: () => {
    console.log(1)
  },
})
```

### 拦截器

支持请求拦截器，解析响应前拦截、解析后拦截，统一请求头配置

```js
import { zwFetch } from 'js-tools-function'
zwFetch.interceptor.options.headers['zzzz'] = 'qaq' // 配置统一请求头
// 请求拦截器
zwFetch.interceptor.request.use(options => {
  // 全局请求加上时间戳
  const t = Date.now()
  options.params.t = t
  return options
})
// 解析响应前拦截
zwFetch.interceptor.response.noTransform.use(res => {
  const { status } = res
  if (status === 401 || status === 403) {
    return console.log('重新登陆')
  } else if (status === 404) {
    return console.log('没有找到')
  }
  return res
})
// 解析响应前拦截
zwFetch.interceptor.response.transform.use(res => {
  const { data } = res
  return data
})
// 挂载在window上面
window.fetch = zwFetch
```

## string

```js
import { string } from 'js-tools-function'
```

### 转化为小驼峰

将字母前面有-或者_的转化为大写字母

```js
string.camelCase(string);
// eg
string.camelCase('font-size')
// fontSize
```



## dom

``` js
import { dom } from 'js-tools-function'
```

### 获取元素样式

```js
dom.getStyle(el,key) // key可以使用-和_会自动转化为小驼峰
```

### 设置元素样式

```js
dom.setStyle(el,key,value) // key可以使用-和_会自动转化为小驼峰
```

