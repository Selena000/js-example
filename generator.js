// var x = 1

// function *foo() {
// 	x++;
// 	yield;
// 	console.log('x:', x)
// }

// function bar() {
// 	x++;
// }

// var it = foo()

// it.next()
// console.log('x---', x)

// bar()
// console.log('x---', x)

// it.next()


// function *foo(x, y) {
// 	return x * y
// }

// var it = foo(6, 7)
// var res = it.next()

// console.log('res', res) // { vlaue: 42, done: true }


// function *foo(x) {
// 	return x * (yield)
// }

// var it = foo(6)

// it.next()

// var res = it.next(7)

// console.log('res', res) // { vlaue: 42, done: true }


// function *foo(x) {
// 	var y = x * (yield 'Hello')

// 	return y
// }

// var it = foo(6)

// var res = it.next()
// console.log('res::', res)

// res = it.next(7)
// console.log('res', res)

// function *foo() {
// 	var x = yield 2

// 	z++
// 	console.log('z::::', z)

// 	var y = yield (x * z)
// 	console.log(x, y, z)
// }

// var z = 1

// var it1 = foo() 
// var it2 = foo() 

// var val1 = it1.next().value // 2
// var val2 = it2.next().value // 2

// console.log('val1:', val1)
// console.log('val2:', val2)

// val1 = it1.next(val2 * 10).value  // 20 * 2 = 40   x: 2 z: 2
// val2 = it2.next(val1 * 5).value  // 40 * 5 * 3 = 600   x: 2 z: 3

// console.log(val1)
// console.log(val2)

// it1.next(val2 / 2) // 600 / 2 = 300
// // 
// it2.next(val1 / 4) // 40 / 2 = 20


// var a = 1
// var b = 2

// function *foo() {
// 	a++;
// 	console.log('a1', a, 'b', b)
// 	yield;
// 	b = b * a
// 	console.log('a2', a, 'b', b)
// 	b = (yield b) + 3
// 	console.log('a3', a, 'b', b)
// }

// function *bar() {
// 	b--; //
// 	console.log('a4', a, 'b', b)
// 	yield;
// 	console.log('a5', a, 'b', b)
// 	a = (yield 8) + b
// 	console.log('a6', a, 'b', b)
// 	b = a * (yield 2)
// 	console.log('a7', a, 'b', b)
// }

// function step(gen) {
// 	var it = gen()
// 	var last;

// 	return function() {
// 		last = it.next(last).value
// 	}
// }

// a = 1
// b = 2

// var s1 = step(foo)
// // function() {
// // 		last = it.next(last).value
// // }
// var s2 = step(bar)

// s1() // a = 2, b = 2
// s1() // a = 2, b = 2 * 2 = 4, last = 4
// s1() // a = 2, b = 4 + 3 = 7

// // a = 2, b = 7
// s2()
// s2() // a = 1, b = 6
// s2() // a = 8 + 6 = 14, b = 6
// s2() // a = 14, b = 14 * 2 = 28


// console.log('a:', a)
// console.log('b:', b)



// a = 1
// b = 2

// var s1 = step(foo)
// var s2 = step(bar)
// s2() // --
// s2() // a = 1, b = 1
// s1() // --
// s2() // last = 8

// s1() // a = 1, b = 1 * 1 = 1, last = 1

// s1() // a = 1 + 3 = 4
// s2() // a = 8 + 4 = 12, b = 4

// console.log('a::::', a)
// console.log('b::::', b)


// 迭代器
var something = (function() {
	var nextVal;

	return {
		[Symbol.iterator]: function() {
			return this
		},
		next: function() {
			if (nextVal === undefined) {
				nextVal = 1
			} else {
				nextVal = (3 * nextVal) + 6
			}

			return {
				done: false, 
				value: nextVal
			}
		}
	}
})();

// for (var v of something) {
// 	console.log(v)

// 	if (v > 500) {
// 		break
// 	}
// }

// for (var ret; (ret = something.next()) && !ret.done;) {
// 	console.log(ret.value)

// 	if (ret.value > 500) {
// 		break
// 	}
// }

// var a = [1, 3, 5, 7, 9]
// // for ... of包含【Prototype】上的属性，Object.keys()不包含
// // for (var v of a) {
// // 	console.log(v)
// // }

// var it = a[Symbol.iterator]()

// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)

// function *foo() {}

// var it = foo() // 迭代器

// function *something() {
// 	var nextVal

// 	while (true) {
// 		if (nextVal === undefined) {
// 			nextVal = 1
// 		} else {
// 			nextVal = (3 * nextVal) + 6
// 		}
// 	}
// }

// 重要的一个例子----start-----
// var it = main()

// it.next()

// function *main() {
// 	try {
// 		var text = yield foo(11, 31)

// 		console.log(text)
// 	} catch(err) {
// 		console.error(err)
// 	}
// }

// function foo(x, y) {
// 	ajax(
// 		'http://url.com/a',
// 		function(err, data) {
// 			if (err) {
// 				it.throw(err) // 
// 			} else {
// 				it.next(data)
// 			}
// 		}
// 	)
// }
/**
	it.next().value
	it.return(value)
	it.throw(err)

*/
// 重要的一个例子----end-----



// function *main() {
// 	var x = yield 'Hello world'

// 	console.log(x)
// }

// var it = main()

// it.next()

// try {
// 	it.throw('Oops')
// } catch(err) {
// 	console.error(err)
// }

/*
	模式：
		我们定义的run(..)返回一个promise，
		一旦生成器完成，这个promise就会决议，
		或收到一个生成器没有处理的未捕获异常
*/
// 生成器 + Promise
function run(gen) {
	var args = [].slice.call(arguments, 1), it

	it = gen.apply(this, args)

	return Promise.resolve()
		.then(function handleNext(value) {
			var next = it.next(value)

			return (function handleResult(next) {
				if (next.done) {
					return next.value
				} else {
					return Promise.resolve(next.value)
						.then(handleNext, function handleErr(err) {
							return Promise.resolve(it.throw(err))
								.then(handleResult)
						})
				}
			})(next)
		})
}















































