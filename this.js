// this

// 1.强制this指向foo函数对象
// ******例子1*******
function foo(num) {
  console.log('foo: ', num)

  this.count ++
}   

foo.count = 0

var i

for (i = 0; i < 10, i ++) {
  if (i > 5) {
    foo.call(foo, i)
  }
}

console.log(foo.count)  // 4

/*
  apply call bind:的区别
  bind不会立即执行，apply call会立即执行
  apply第二个参数是数组，call是一个个参数
*/
    
// 2.作用域 this在任何情况下都不指向函数的词法作用域

/*
  1.之前我们说过this是在运行时进行绑定的，
  并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。

  2.每个函数的this是在调用时被绑定的，
  完全取决于函数的调用位置（也就是函数的调用方法）。
*/

// 3.绑定规则

/*
  1.默认绑定
  2.隐式绑定
  3.显式绑定
    硬绑定 
      bind,bind(null, ..)可以对参数进行柯里化
      如果函数并不关心this的话，你仍然需要传入一个占位值，这时null可能是一个不错的选择
    API顶用的上下文 apply call
  4.new绑定
    new的过程：
      1)．创建（或者说构造）一个全新的对象。
      2)．这个新对象会被执行[[Prototype]]连接。
      3)．这个新对象会绑定到函数调用的this。
      4)．如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
    DMZ
      如果我们在忽略this绑定时总是传入一个DMZ对象，
      那就什么都不用担心了，因为任何对于this的使用都会被限制在这个空对象中，
      不会对全局对象产生任何影响。
*/
// ******例子2*******
function foo(a, b) {
  console.log('a: ', a, 'b: ', b)
}

var ø = Object.create(null)

foo.apply(ø, [2, 3])

var bar = foo.bind(ø, 2)// 柯里化
bar(3) 

// ******例子3*******
function foo() {
  console.log(this.a)
}

var a = 2
var o = { a: 3, foo: foo }
var p = { a: 4}

o.foo() // 3
;(p.foo = o.foo)() // 2
/*
  赋值表达式p.foo = o.foo的返回值是目标函数的引用，
  因此调用位置是foo()而不是p.foo()或者o.foo()。
  根据我们之前说过的，这里会应用默认绑定。
*/

// 4.软绑定
// ******例子4*******
// 软绑定 ??
if (!Function.prototype.softBind) {
 Function.prototype.softBind = function(obj) {
   var fn = this
   var curried = [].slice.call(arguments, 1)
   var bound = function() {
     return fn.apply((!this || this === (window || global) ? obj : this), curried.concat.apply(curried, arguments))
   }

   bound.prototype = Object.create(fn.prototype)

   return bound
 }
}

function foo() {
  console.log('name: ', this.name)
}

var obj = { name: 'obj' },
    obj2 = { name: 'obj2' },
    obj3 = { name: 'obj3' }

var fooOBJ = foo.softBind(obj)

fooOBJ() // name: obj

obj2.foo = foo.softBind(obj)
obj2.foo()

fooOBJ.call(obj3)

setTimeout(obj2.foo, 10)

// 5.箭头函数

// ******例子4*******
function foo() {
  return a => {
    console.log(this.a)
  }
}

var obj1 = {
  a: 2
}

var obj2 = {
  a: 3
}

var bar = foo.call(obj1)
bar.call(obj2) // 2 !!!箭头函数的绑定无法被修改
/*
  箭头函数用更常见的词法作用域取代了传统的this机制
  1．只使用词法作用域并完全抛弃错误this风格的代码；
  2．完全采用this风格，在必要时使用bind(..)，尽量避免使用self =this和箭头函数。

*/
 

/*
  小结：
    1．由new调用？绑定到新创建的对象。
    2．由call或者apply（或者bind）调用？绑定到指定的对象。
    3．由上下文对象调用？绑定到那个上下文对象。
    4．默认：在严格模式下绑定到undefined，否则绑定到全局对象。
*/