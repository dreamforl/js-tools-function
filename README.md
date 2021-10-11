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
throttleAtonce(function,timeout)
```
```javascript
throttleLatter(function,timeout)
```

**函数防抖**
```javascript
debonce(function,timeout)
```

**格式化日期**

根据所传的格式日期的字段，来格式化日期，不传time默认返回当前时间

不传str默认样式为:  YYYY-MM-DD hh:mm:ss

```javascript
format(str,time)
```

**base64转png**

```javascript
base64ToBlob(base64)
```

**将制定内容复制到剪切板**

```javascript
copyToBoard(str)
```









