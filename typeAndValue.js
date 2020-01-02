// 类型和值
/* 
	七大内置类型
		null
		undefined
		boolean
		number
		string
		object 除对象之外，其他统称为“基本类型”
		symbol
*/

// 例子1
console.log(typeof null) // object

var a = null
console.log(!a && typeof a === 'object') // true
/* 
	1.正确的返回结果应该是"null"，但这个bug由来已久，在JavaScript中已经存在了将近二十年，也许永远也不会修复
	2.null是“假值” 也是唯一一个用typeof检测会返回"object"的基本类型值。

	类数组转数组：
		1.Array.prototype.slice.call(arguments)
		2.Array.from(arguments)

	精度问题
		Number.EPSILON
	
	Number.MAXVALUE
	Number.MINVALUE

	Number.MAXSAFEINTEGER
	
	整数的检测
		Number.isInteger()
		Number.isSafeInteger()

*/

// reverse
'foo'.split('').reverse().join('')

//不过对于．运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别为数字字面量的一部分，然后才是对象属性访问运算符。
// 42.toFixed(3) // 无效
(32).toFixed(0) // 有效
0.32.toFixed(0) // 有效
32..toFixed(0) // 有效
32 .toFixed(9) // 有效

// polyfill Number.EPSILON
if (!Number.EPSILON) { // ES6支持
	Number.EPSILON = Math.pow(2, -52)
}

function numbersCloseEnoughToEqual(n1, n2) {
	return Math.abs(n1 - n2) < Number.EPSILON
}

var a = 0.1 + 0.2
var b = 0.3

console.log(numbersCloseEnoughToEqual(a, b)) // true
console.log(numbersCloseEnoughToEqual(0.0000001, 0.0000002)) // false

// polyfill : Number.isInteger
if (!Number.isInteger) {
	Number.isInteger = function(num) {
		return typeof num == 'number' && num % 1 == 0
	}
}
// polyfill : Number.isSafeInteger
if (!Number.isSafeInteger) {
	Number.isSafeInteger = function(num) {
		return Number.isInteger(num) && Math.abs(num) <= Number.MAXSAFEINTEGER
	}
}

// 例子2
/*
	undefined类型只有一个值，即undefined。
	null类型也只有一个值，即null。
	它们的名称既是类型也是值。

	undefined
		1.永远不要重新定义undefined。

	void 
		1.void______没有返回值，因此返回结果是undefined

	NaN  
		1.执行数学运算没有成功，这是失败后返回的结果”
		2.不要使用window.isNaN，用Number.isNaN
		3.NaN是JavaScript中唯一一个不等于自身的值。
*/
window.isNaN('foo') // true !!!!居然是true
// polyfill : Number.isNaN
if (!Number.isNaN) {
	// Number.isNaN = function(n) {
	// 	return typeof n === 'number' && window.isNaN(n)
	// }
	Number.isNaN = function(n) {
		// NaN是JavaScript中唯一一个不等于自身的值。
		return n !== n
	}
}

Number.isNaN('foo') // false

/* 
	负零
	Object.is() 判断两个值是否绝对相等
*/
/*
	作用：有些应用程序中的数据需要以级数形式来表示（比如动画帧的移动速度），
			数字的符号位（sign）用来代表其他信息（比如移动的方向）。
			此时如果一个值为0的变量失去了它的符号位，它的方向信息就会丢失。
			所以保留0值的符号位可以防止这类情况发生。
*/

// 判断是否为负零
function isNegZero(n) {
	n = Number(n)
	return (n === 0) && (1 / n === -Infinity)
}

console.log(isNegZero(-0))
console.log(isNegZero(0 / -3))
console.log(isNegZero(0))

// Object.is() 判断两个值是否绝对相等

console.log(Object.is(2 / 'foo', NaN))
console.log(Object.is(-0, 0))
console.log(Object.is(-0, -0))

// polyfill : Object.is()
if (!Object.is) {
	Object.is = function(v1, v2) {
		if (v1 === v2 && v2 === 0) { // 判断-0
			return 1 / v1 === 1/ v2
		}
		if (v1 !== v1) { // 判断NaN
			return v2 !== v2
		}
		return v1 === v2 // 其他
	}
}

// ***************值*********************
// 引用
/*
	1.简单值（即标量基本类型值，scalar primitive）总是通过值复制的方式来赋值/传递
	2.对象（包括数组和封装对象，参见第3章）和函数，则总是通过引用复制的方式来赋值/传递
	3.由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。
*/
// 例子1
function foo(x) {
	x.push(4)
	console.log(x)

	// x = [4, 5, 6]
	// x.push(7)
	// console.log(x)

	x.length = 0
	x.push(4, 5,6, 7)
	console.log(x)
	console.log(x.length) // 用了push才是4， 5， 6， 7
}

var a = [1, 2, 3]
foo(a)

console.log(a) // [1, 2, 3, 4]

// 例子2
function foo(wrapper) {
	wrapper.a = 42
}

var obj = {
	a: 2
}

foo(obj) 
console.log(obj.a) // 42