// 闭包

// IIFE模式
(function(global) {
	// 立即执行函数 也叫IIFE模式
})(window);

// 1.简单的闭包
function fn1() {
	var a = 2

	function bar() {
		console.log(a)
	}

	return bar 
	// bar()显然可以被正常执行。
	// 但是在这个例子中，它在自己定义的词法作用域以外的地方执行
}

var baz = fn1()
baz() // 这就是闭包 
// !!!!! bar()依然持有对该作用域的引用，而这个引用就叫作闭包。 这里引用的foo的作用域，具体是a这个变量


// 2.定时器
function wait(message) {

	setTimeout(function timer() {
		console.log(message)
	}, 1000)
}

wait('Hello, wait me!')
/*
将一个内部函数（名为timer）传递给setTimeout(..)。
timer具有涵盖wait(..)作用域的闭包，因此还保有对变量message的引用。

wait(..)执行1000毫秒后，它的内部作用域并不会消失，timer函数依然保有wait(..)作用域的闭包。

在引擎内部，内置的工具函数setTimeout(..)持有对一个参数的引用，这个参数也许叫作fn或者func，或者其他类似的名字。
引擎会调用这个函数，在例子中就是内部的timer函数，而词法作用域在这个过程中保持完整。
*/

// 3.jQuery例子
function setupBot(name, selector) {
	$(selector).click(function activator() {
		console.log('Activating: ', name)
	})
}

setupBot('Closure Bot1', '#bot 1')
setupBot('Closure Bot2', '#bot 2')

// 在定时器、事件监听器、Ajax请求、跨窗口通信、WebWorkers或者任何其他的异步（或者同步）任务中，只要使用了回调函数，实际上就是在使用闭包！

// 4.循环和闭包
for (var i = 1; i <=5; i++) {
	setTimeout(function timer() {
		console.log(i) // 6 6 6 6 6
	}, i * 1000)
}
/*
	 延迟函数的回调会在循环结束时才执行。
	 事实上，当定时器运行时即使每个迭代中执行的是setTimeout(..,0)，
	 所有的回调函数依然是在循环结束后才会被执行，
	 因此会每次输出一个6出来

	 尽管循环中的五个函数是在各个迭代中分别定义的，
	 但是它们都被封闭在一个共享的全局作用域中，
	 因此实际上只有一个i。
*/
// 解决办法1，用IIFE
for (var i = 1; i <= 5; i ++) {
	(function(j) {
		setTimeout(function timer() {
			console.log(j)
		}, j * 1000)
	})(i);
}
/*
	在迭代内使用IIFE会为每个迭代都生成一个新的作用域，
	使得延迟函数的回调可以将新的作用域封闭在每个迭代内部，
	每个迭代中都会含有一个具有正确值的变量供我们访问。
*/

// 解决办法2，用let 块级作用域
for (let i - 1; i <= 5; i ++) {
	setTimeout(function timer() {
		console.log(i)	
	}, i * 1000)
}
/*
	每次迭代我们都需要一个块作用域
	let声明，可以用来劫持块作用域
	变量在循环过程中不止被声明一次，每次迭代都会声明。
	随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。
*/

// 5.模块
var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i = 0; i < deps.length; i ++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply(impl, deps); // 将依赖传过去
	}

	function get(name) {
		return modules[name]
	}

	return {
		define: define,
		get: get
	}
})();

MyModules.define('bar', [], function() {
	function hello(who) {
		return 'Let me interoduce: ' + who;
	}

	return {
		hello: hello
	}
})

MyModules.define('foo', ['bar'], function(bar) {
	var hungry = 'hippo';

	function awesome() {
		console.log(bar.hello(hungry).toUpperCase())
	}

	return {
		awesome: awesome
	}
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

console.log(bar.hello('hippo'))

foo.awesome();