








// const obj = {
//   user:{
//     name:"tom",
//     age:6,
//   }
// }
// /* let user = obj.user
// let name = user.name
// let age = user.age */
// //使用es6重构代码

// let {user,user:{name,age}} = obj
// console.log(user,name,age);




/* const obj = {
  name:"tom",
  age:6,
  a:[1,{br:2}]
}
let {a:[x,{br}]} = obj
console.log(x,br);
 */


// let name;//不能先定义

// ({name} = obj)//解决不能先定义的问题

/* const name = obj.name
const age = obj.age
let {age:a,name} = obj
console.log(name,a);

let [a,b,c,d] = [1,2,{name:'tom',age:6}]
console.log(c,d);
let a = b;
let b;
 */
// let a=1, b=2, c=3;
/* var a;
 a = 11
let b= 33
b = 62

var c = function () {
  console.log("这是c");
};
*/
/* let [a,b=33,c = function () {
  console.log("这是c");
}] = [11,62]
console.log(a,b);
c() */




/*let str = "欢迎来到ES6课堂"

console.log("hello "+str);

var html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="src/demo.js"></script>
</head>
<body>
  <div class="btn"> ${str} </div>
</body>
</html>`

//includes  判断字符串是否存在
console.log(html.includes(str));
//repeat  重复数次N次
console.log(str.repeat(2));
//判断是否以什么开头或结尾
console.log(str.startsWith('欢'));
console.log(str.endsWith('堂'));

var tmp = 123;
{
  let tmp;
  tmp = "bb";
  tmp = 3;
  console.log(tmp);
}
let tmp = "aa"

console.log(tmp);

let a = 100, b="hello";
let tmp = a;
a=b;
b=tmp;
console.log(a,b);


function fn() {
  if(false){
    let num = 1
  }else{
    console.log(num);
  }
}
fn()

var arr = []
for(let i = 0; i< 9; i++){
  arr.push(
    function () {
      console.log(i);
    }
  )
}
// 0 1 2 3 4 5 6 7 8
arr.forEach(function(fun) {
  fun()
}) */





/* const PI = 3.14
// PI = 6666
console.log(PI);

const obj = {
  name: "tom",
  age: 6
}
obj.age = 1
console.log(obj);

const arr = []
arr[0] = 100
arr.name = "tom"
console.log(arr);
arr = "hello" */

