// console.log('test')
// promise


function foo(x) {
	return new Promise(function(resulve, reject) {
		// 
	})
}

var p = foo(42)

bar(p)
baz(p)

function bar(fooPromise) {
	fooPromise.then(function() {

	}, function() {

	})
}

function baz(fooPromise) {
	fooPromise.then(function() {

	}, function() {
		
	})
}

// 鸭子类型检测
if (
	p !== null &&
	(
		typeof p === 'object' ||
    typeof p === 'function'
	) &&
  typeof p.then === 'function'
) {
  // 这是thenable
} else {
  // 不是thenable
}

p.then(function() {
  p.then(function() {
    console.log('C')
  })
  console.log('A')
});

p.then(function() {
  console.log('B')
})

/*
  回调栈：
  p1
  p2
  p3
*/
var p3 = new Promise(function(resolve, reject) {
  resolve('B')
})

var p1 = new Promise(function(resolve, reject) {
  resolve(p3)
})

var p2 = new Promise(function(resolve, reject) {
  resolve('A')
})

// A B 
p1.then(function(v) {
  console.log(v)
})

p2.then(function(v) {
  console.log(v)
})


function timeoutPromise(delay) {
  return new Promise(function(resolve, rejct) {
    setTimeout(function() {
      reject('Timeout!')
    }, delay)
  })
}

Promise.race([
  foo(),
  timeoutPromise(3000)
])
.then(function() {
  // 
}, function(err) {
  // 拒绝或者超时
})

var p = new Promise(function(resolve, reject) {
  foo.bar() // 出错
  resolve(42)
})

p.then(function fulfilled() {
  // 这里执行不到
}, function rejected(err) {
  // 然后执行到这里
})

// ----
var p1 = new Promise(function(resolve, reject) {
  resolve(42)
})

var p2 = Promise.resolve(42)

var p1 = Promise.resolve(42)
var p2 = Promise.resolve(p1)

p1 === p2 // true

var p = {
  then: function(cb, errcb) {
    cb(42)
    errcb('evil laugh...')
  }
}

p.then(function fulfilled(val) {
  // 
}, function rejected(err) {
  // 
})

foo(42).then(function(v) {
  console.log('v', v)
})

Promise.resolve(foo(42))
.then(function(v) {
  console.log(v)
})

var p = Promise.resolve(21)

p.then(function(v) {
  console.log('v:', v) // 21
  return v * 2
})
.then(function(v) {
  console.log(v) // 42
})

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, time)
  })
}
































