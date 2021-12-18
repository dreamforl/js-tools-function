#个人私用 方法

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

### canvas图片灰度

可以将彩色图片转化为灰色图片
传入canvas元素，或者是canvas元素的选择器

```javascript
tools.pictureGray(el)
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

<img src="C:\Users\10334\AppData\Roaming\Typora\typora-user-images\image-20211218105901832.png" alt="image-20211218105901832" style="zoom: 80%;" />



### D 



