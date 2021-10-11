#个人私用 方法

# 安装 

yarn add js-tools-function

## 或者

npm install js-tools-function



# 使用

需要开启服务才可以使用

```javascript
import tools from 'js-tools-function'
```



# 工具库

**函数节流**
```javascript
tools.throttleAtonce(function,timeout)
```

```javascript
tools.throttleLatter(function,timeout)
```

**函数防抖**
```javascript
tools.debonce(function,timeout)
```

**格式化日期**

根据所传的格式日期的字段，来格式化日期，不传time默认返回当前时间

不传str默认样式为:  YYYY-MM-DD hh:mm:ss

```javascript
tools.format(str,time)
```

**base64转png**

```javascript
tools.base64ToBlob(base64)
```

**将制定内容复制到剪切板**

```javascript
tools.copyToBoard(str)
```

**canvas图片灰度**

```javascript
tools.pictureGray(el)
```

**返回参数的类型字符串（首字母是大写）**

```javascript
tools.type(any)
```









