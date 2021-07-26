##### #自定义js函数，包括手写函数以及常用工具库

# 安装 

yarn add js-tools-function

## 或者

npm install js-tools-function



# 使用

需要开启服务才可以使用

```javascript
import fun from 'js-tools-function'
```



# 目前包含的函数有

## 手写函数部分

### 		改变this指向

1. call(fn , obj , ...args)

2. apply(fn , obj , args)

3. bind(fn , obj , ...args)

### 函数防抖

1. debonceAtonce(fn,time)://函数防抖-立即执行版(时间戳版本)

2. debonceLatter(fn,time)://函数防抖---延迟执行版(定时器版本)
  
3. deepClone(fn)://深拷贝 （只能拷贝简单对象）

### 数组部分

1. **forEach**(list , callback) :遍历数组

   ​	callback(item , index , list)

2. **map**(list , callback):遍历数组，返回新数组

   ​	callback(item , index , list)

3. **filter**(list , callback)：遍历数组，返回符合条件的数组

   ​	callback(item , index , list)

4. **every**(list , callback)：遍历数组，判断是否所有元素都满足条件

   ​	callback(item , index , list)

5. **some**(list , callback)：遍历数组，判断是否有元素满足条件

   ​	callback(item , index , list)

6. **find**(list , callback)：遍历数组，返回第一个符合条件的元素，没有的话返回undefined

   ​	callback(item , index , list)

7. **findindex**(list , callback)：遍历数组，返回第一个符合条件元素的下标，没有的话返回-1

   ​	callback(item , index , list)

8. **reduce**(list , callback , initValue)：遍历数组，将结果结合为一个值输出（常用与累加、累乘之类的）

   ​	callback(total,item , index , list)

   ​	**total**是上一次运算的结果，如果没有指定**initValue**的话，那么total的初始值是数组的第一个元素。

   

​	





### 工具库部分





