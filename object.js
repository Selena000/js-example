/*
	内置对象：
		String
		Number
		Boolean
		Object
		Function
		Array
		Date
		RegExp
		Error

		注意：在对象属性名中数字会被转换成字符串

	对象属性的可配置：Object.defineProperty
		writable
		configurable	单项操作
		enumerable
				enumerable为false时：
					1.object.a可访问
					2.in可访问
					3.object.hasProperty可访问
					4.Object.getOwnPropertyNames(object)可访问
					
					5.object.propertyIsEnumerable为false

					6.for in 不可访问
					7.Object.keys(object)不可访问
					8.Object.getOwnPropertyNames(object)可访问

		不变性
			1.结合writable:false和configurable:false
			就可以创建一个真正的常量属性（不可修改、重定义或者删除）
			2.禁止拓展：Object.preventExtensions
			3.密封：Object.seal()
						调用Object.preventExtensions(..)
						并把所有现有属性标记为configurable:false。
			4.冻结：Object.freeze() --->深度冻结，级别最高的不可变性
						调用Object.seal(..)
						并把所有“数据访问”属性标记为writable:false

		getter、setter(访问描述符)
			JavaScript会忽略它们的value和writable特性，
			取而代之的是关心set和get
			（还有configurable和enumerable）特性。
			
		
	总结：
		许多人都以为“JavaScript中万物都是对象”，这是错误的。
		对象是6个（或者是7个，取决于你的观点）基础类型之一。

*/

// 例子1 复制
var someObj = {
	a: {
		b: {
			c: {
				d: 10
			}
		}
	}
}
// 深复制
console.log(JSON.parse(JSON.stringify(someObj)))
// 浅复制
console.log(Object.assign({}, someObj))

// 例子1
var myObject = {
	get a() {
		return 2
	},
	set a(val) {
		this.a = val * 2
	}
}

Object.defineProperty(myObject, 'b', {
	get: function() {
		return this.a * 2
	},
	enumerable: true
})

console.log('a:::', 'a' in myObject)
console.log('b:::', myObject.hasOwnProperty('b'))
console.log('c:::', myObject.hasOwnProperty('c'))

var myObject = {}

Object.defineProperty(myObject, 'a', {
	enumerable: true,
	value: 2
})

Object.defineProperty(myObject, 'b', {
	enumerable: false,
	value: 3
})

console.log('myObject.b', myObject.b)
console.log('b in myObject', 'b' in myObject)
console.log('myObject.hasOwnProperty(b)', myObject.hasOwnProperty('b'))

for (var k in myObject) {
	console.log('k: ', k, 'myObject[k]:', myObject[k])
}

console.log('myObject.propertyIsEnumerable(a)',myObject.propertyIsEnumerable('a'))
console.log('myObject.propertyIsEnumerable(b)', myObject.propertyIsEnumerable('b'))

console.log('Object.keys(myObject)', Object.keys(myObject))
console.log('Object.getOwnPropertyNames(myObject)', Object.getOwnPropertyNames(myObject))

/*
	enumerable为false时：
		1.object.a可访问
		2.in可访问
		3.object.hasProperty可访问
		4.Object.getOwnPropertyNames(object)可访问
		
		5.object.propertyIsEnumerable为false

		6.for in 不可访问
		7.Object.keys(object)不可访问
		8.Object.getOwnPropertyNames(object)可访问

*/

// 例子2 手动添加迭代器
var myObject = {
	a: 2,
	b: 3
}

Object.defineProperty(myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		var o = this;
		var idx = 0;
		var ks = Object.keys(o)

		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				}
			}
		}
	}
})

var it = myObject[Symbol.iterator]()

console.log('it.next', it.next())
console.log('it.next', it.next())
console.log('it.next', it.next())

for (var v of myObject) {
	console.log(v)
}