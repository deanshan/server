## 循环遍历

|              名称              |                           遍历对象                           |                             缺点                             |                     优点                     |
| :----------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------------------------: |
|              for               |                         数组和类数组                         |                      嵌套多层，难以维护                      |                                              |
|            forEach             |                        数组(自带方法)                        | 无法中间跳出循环（不支持==break==、==continue==操作，如若数组成员很多，将无法终止遍历来节省资源 |                                              |
|             for-in             | 所有可枚举属性（包括对象自身的和原型上添加的和继承的）(不含Symbol属性)，能够遍历==对象==、==数组==、==字符串==，支持==break==、==continue==操作 | 会遍历原型上可枚举属性，需要通过==obj.hasOwnProperty(attr)==来过滤掉 |                                              |
|             for-of             | Array（数组）, String（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等 |                                                              |                                              |
|         Object.keys()          | 获取到对象实例的所有可枚举属性，其返回值为一个数组，数组元素为对象的==键名== | 因为它是es5的写法，所以只能遍历对象，非对象（如字符串）就会报错，但es6不会报错 | 它不会获取对象自身不可枚举属性和原型上的属性 |
|  Object.getOwnPropertyNames()  |        获取==键名==数组，能够获取对象的不可枚举的属性        |                                                              |                                              |
|        Object.entries()        |                      获取==键值对==数组                      |                                                              |                                              |
|        Object.values()         |                   获取对象的==属性值==数组                   |                                                              |                                              |
| Object.getOwnPropertySymbols() | ==获取Symbol属性名==，以上几种方法都无法遍历Symbol类型的对象，只能通过此方法来获取 |                                                              |                                              |

### for-of

+ 语法

  ```js
  for(variable of iterable){statement}
  //variable：每个迭代的属性值被分配给该变量。
  //iterable：一个具有可枚举属性并且可以迭代的对象。
  ```

+ 示例

  + 数组

    ```js
    const iterable = ['mini', 'mani', 'mo'];

    for (const value of iterable) {
      console.log(value);	//	'mini', 'mani', 'mo'
    }
    ```

  + Map对象

    ```js
    const iterable = new Map([['one', 1], ['two', 2]]);

    for (const [key, value] of iterable) {
      console.log(`Key: ${key} and Value: ${value}`);
    }
    // Key: one and Value: 1
    // Key: two and Value: 2
    ```

  + Set对象

    ```js
    const iterable = new Set([1, 1, 2, 2, 1]);

    for (const value of iterable) {
      console.log(value);// 1	2
    }
    ```

  + String

    ```js
    const iterable = 'javascript';

    for (const value of iterable) {
      console.log(value);	//	'j' 'a' 'v' 'a' 's' 'c' 'r' 'i' 'p' 't'
    }
    ```

  + Arguments Object(参数对象)

    ```js
    function args() {
      for (const arg of arguments) {
        console.log(arg);	//	a	b	c
      }
    }
    args('a', 'b', 'c');
    ```



## 数组去重

- 方法一：利用indexOf()或lastIndexOf()或includes()来筛选

  ```js
  (function unique (arr) {
      let temp = []
      //遍历目标数组（也可用for循环，forEach,filter）
      arr.map((v,k) => {
          // 利用空数组来判断某个元素是否存在，若存在，直接跳过，否则添加至空数组中
          // IE8以下不支持数组的indexOf方法
          if (temp.indexOf(v) === -1) temp.push(v)
          //if (temp.lastIndexOf(v) === -1) temp.push(v)
          //if (!temp.includes(v)) temp.push(v)
      })
      return temp
  })([2,2,3,3,'2','4'])
  ```

- 方法二：

  - 利用对象属性是否存在的特性筛选，但也有例外（如obj[1],obj['1']会被误认为是一样的）
  - 筛选相同数值，不同数据类型，通过indexOf来判断

  ```js
  (function (arr) {
      let obj = {}, temp = []
      //遍历目标数组（也可用for循环）
      arr.map((v,k) => {
          let type = typeof v
          if (!obj[v]) {
              obj[v] = [type]
              temp.push(v)
          } else if (obj[v].indexOf(type) === -1) {
              obj[v].push(type)
              temp.push(v)
          }
      })
      return temp
  })(['2',1,2,5,1,5,'1'])
  ```

- 方法三：利用splice(k,1)来删除重复值

  ```js
  (function (arr) {
      for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
              if (arr[i] === arr[j]) {
                  arr.splice(j, 1)
                  j--
              }
          }
      }
      return arr
  }(['2',1,2,5,1,5,'1']))
  ```

- 方法四：es6写法

  ```js
  (function unique (arr) {
      return Array.from(new Set(arr))
  })(['2',1,2,5,1,5,'1'])
  ```
