// [[Prototype]]

// 例子1
var anotherObject = {
	a: 2
}

var myObject = Object.create(anotherObject)

console.log(myObject.a) // 2
// 对于默认的[[Get]]操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的[[Prototype]]链

/*
	尽头： 所有普通的[[Prototype]]链
		  最终都会指向内置的Object.prototype
*/

// 例子2
function Foo(name) {
	this.name = name
}

Foo.prototype.myName = function() {
	return this.name
}

function Bar(name, label) {
	Foo.call(this, name)

	this.label = label
}
// 凭空创建一个新对象，并把新对象内部的prototype关联到指定的对象中
Bar.prototype = Object.create(Foo.prototype)
ES6
Object.setPrototypeOf(Bar.prototype, Foo.prototype)

Bar.prototype.myLabel = function() {
	return this.label
}

var a = new Bar('a', 'obj a')

console.log('a.myName()', a.myName())
console.log('a.myLabel()', a.myLabel())

//  polyfill 手动实现Object.create()方法
if (!Object.create) {
	Object.create = function(o) {
		function F() {}
		F.prototype = o

		return new F()
	}
}

/*
	类：
		1.JavaScript中只有对象。
			在JavaScript中，类无法描述对象的行为，
			（因为根本就不存在类！）
			对象直接定义自己的行为。
		2.所有的函数默认都会拥有一个名
			为prototype的公有并且不可枚举的属性
		3.类和类之间的关联：通过prototype
			new之后的对象中有.contructor属性，但是这个属性是构造函数的.prorotype.constructor的，是因为在当前对象找不到.constructor,所以按原型链往上找，才找到的
			同理,.__proto__属性也是一样的
			实际上，new会劫持所有普通函数并用构造对象的形式来调用它。
			“constructor并不表示被构造”。
		4.调用Object.create(..)会凭空创建一个“新”对象
			并把新对象内部的[[Prototype]]关联到你指定的对象（本例中是Foo.prototype）。
		

	方法/属性
		Object.create(Foo.prototype)
		Object.setPrototypeOf(Bar.prototype, Foo.prototyep)
		Object.getPrototypeOf(a)
		a instanceof Bar
		Bar.prototype.isPrototypeOf(a)
		b.isPrototypeOf(c)
		非标准：a.__proto__ === Foo.prototype


	总结：
		1.【【Prototype】】属性只有在函数才有
		2.new出来的对象.contructor、.__proto__实际上是从原型链里获取的，并没有复制给这个新对象
		3.JavaScript中只有对象，没有类！和传统的其他语言不一样，是真正的面向对象
		4.了解一些其他方法

		重要的是了解这个过程是怎么样的
*/