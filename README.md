**js-tools-function 0.1 已经发布 :tada: ！**

### 安装

```shell
yarn add js-tools-function
npm install js-tools-function
```

### 导入

```javascript
// 全量导出
import * as tools from 'js-tools-function' 
// 按需导入
import { debonce } from 'js-tools-function' 
```

## 函数

### 函数节流

```javascript
import { throttleAtonce } from 'js-tools-function'
throttleAtonce(fn, timeout)
```

```javascript
import { throttleLatter } from 'js-tools-function'
throttleLatter(fn, timeout)
```

### 函数防抖

```javascript
import { debonce } from 'js-tools-function'
debonce(fn, timeout)
```

### sleep函数
```javascript
import { sleep } from 'js-tools-function'
sleep(1000).then(()=>{console.log('过了100ms')})
```

### base64转png

```javascript
import { base64ToBlob } from 'js-tools-function'
base64ToBlob(base64)
```

### 复制内容

第一个参数为要复制的内容，第二参数为回调函数

```javascript
import { copy } from 'js-tools-function'
copy(str,()=>{ console.log('复制成功') })
```

### 返回类型

```javascript
import { getType } from 'js-tools-function'
getType('1')
// number
```

### 列表导出excel

```javascript
import { exportExcel } from 'js-tools-function'
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
exportExcel(options)
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
exportExcel(options)
```






### 深拷贝

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

## 缓存

本地可以设置缓存时间 ,过期就返回undefined

```js
import cache from 'js-tools-function'
const { get, set, remove, clear } = cache

// 设置过期时间为10s
set('name','张三',10*1000)

// 读取
get('name')

// 移除某个值
remove('name')

// 清空缓存
clear()
```



## 字符串

### 转化为小驼峰

将字母前面有-或者_的转化为大写字母

```js
import { string } from 'js-tools-function'
string.camelCase(string);
// eg
string.camelCase('font-size')
// fontSize
```

## DOM

### 获取元素样式

```js
import { dom } from 'js-tools-function'
dom.getStyle(el,key) // key可以使用-和_会自动转化为小驼峰
```

### 设置元素样式

```js
import { dom } from 'js-tools-function'
dom.setStyle(el,key,value) // key可以使用-和_会自动转化为小驼峰
```

## Math

```js
import { math } from 'js-tools-function'
```

**四舍五入**

```js
// 取整的四舍五入
math.rounding(1.1) // 1
```



## 请求

### 对象转化为地址栏参数

```js
import { parseObject } from 'js-tools-function'
parseObject({ name: '张三', age: 10 })
// '?name=%E5%BC%A0%E4%B8%89&age=10'
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

## 随机

### 获取随机数

```js
import { random } from 'js-tools-function'
random.getUuid() // 返回符合RFC4122 u4版本的uuid
// 4aa00c56-05db-4354-86ca-2ced34a877e7
```

### 获取给定长度的随机数

```js
import { random } from 'js-tools-function'
random.getRandom(length = 10,list)
// 默认从0~f中随机
// 第二参数为数组，可以传递范围的数组，将会从数组中随机
random.getRandom(5)
// 3fac1
```

## 时间

### 格式化时间

根据所传的格式日期的字段，来格式化日期，不传time默认返回当前时间

不传str默认样式为:  YYYY-MM-DD hh:mm:ss

```js
import { time } from 'js-tools-function'
time.format(str,time)
// 2022-09-19 02:06:57
```

### 计算一个毫秒的时间

对应的天、时、分、秒

```js
import { time } from 'js-tools-function'
time.getTime(99999999)
// {day: 1, hours: 3, minutes: 46, seconds: 39}
```

### 计算两个日期相差的时间

第一个参数可以是时间戳，也可以是日期对象

第二个参数默认为当前时间，可以传递时间戳和日期对象

```js
import { time } from 'js-tools-function'
time.diffTwoTimes(new Date('2022-9-1'))
// {day: 30, hours: 20, minutes: 8, seconds: 26}
```

