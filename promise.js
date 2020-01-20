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
// ------
function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, time)
  })
}

delay(100)
.then(function STEP2() {
  console.log('step 2 (after 100ms)')
  return delay(200)
})
.then(function STEP3() {
  console.log('step 3 (after 200ms)')
})
.then(function STEP4() {
  console.log('step 4 (next Job)')
  return delay(50)
})


// ----
function request(url) {
  return new Promise(function(resolve, reject) {
    ajax(url, resolve)
  })
}

request('http://url.com/1')
.then(function(response1) {
  return request('http://url.com/2' + response1)
})
.then(function(response2) {
  console.log(response2)
})
// ----
function foo(cb) {
  setTimeout(function() {
    try {
      var x = baz.bar()
      cb(null, x)
    } catch(err) {
      cb(err)
    }
  }, 100)
}

foo(function(err, val) {
  if (err) {
    console.error(err)
  } else {
    console.log(val)
  }
})
// ----
// 竟态
Promise.race([
  foo(),
  timeoutPromise(3000)
])
.then(function() {

},function(err) {
  // err 
})

// ---- Promise.abserve
if (!Promise.observe) {
  Promise.observe = function(pr, cb) {
    pr.then(function fulfilled(msg) {
      
      Promise.resolve(msg).then(cb)
    
    }, function rejected(err) {
      
      Promise.resolve(err).then(cb)
    
    })

    return pr
  }
}

Promise.race([
  Promise.abserve(
    foo(),
    function cleanup(msg) {
      // ....
    }
  ),
  timeoutPromise(3000)
])

// Promise first
if (!Promise.first) {
  Promise.first = function(prs) {
    return new Promise(function(resolve, reject) {
      prs.forEach(function(pr) {
        Promise.resolve(pr)
        .then(resolve)
      })
    })
  }
}

if (!Promise.map) {
  Promise.map = function(vals, cb) {
    return Promise.all(
      vals.map(function(val) {
        return new Promise(function(resolve) {
          cb(val, resolve)
        })
      })
    )
  }
}

var p1 = Promise.resolve(21)
var p2 = Promise.resolve(42)
var p3 = Promise.reject('Oops')

Promise.map([p1, p2, p3], function(pr, done) {
  Promise.resolve(pr)
  .then(function(v) {
    done(v * 2)
  }, done)
})
.then(function(vals) {
  console.log(vals)
})
// ----


{
  "success": true,
  "code": 200,
  "msg": "成功",
  "data": {
    "totalNum": 100,
    "pageNo": 1,
    "pageSize": 15,
    "brandList": [
      {
        "brandStoreName": "娃哈哈",
        "brandStoreSn": 100,
        "brandVendorList": [
          {
            "vendorCode": "vendor001",
            "vendorName": "供应商1",
            "weight": 30,
            "weightPercent": 33
          },
          {
            "vendorCode": "vendor002",
            "vendorName": "供应商2",
            "weight": 60,
            "weightPercent": 66
          }
        ],
        "totalWeight": 90
      },
      {
        "brandStoreName": "娃哈哈2",
        "brandStoreSn": 101,
        "brandVendorList": [
          {
            "vendorCode": "vendor001",
            "vendorName": "供应商1",
            "weight": 30,
            "weightPercent": 33
          },
          {
            "vendorCode": "vendor002",
            "vendorName": "供应商2",
            "weight": 60,
            "weightPercent": 66
          }
        ],
        "totalWeight": 90
      }
    ],
    "vendorWeightConfInfoList": [
      {
        "brandSN": "100022",
        "vendorCode": "3464522264,346433564,34643569,34643560,34643561,34643562",
        "vendorName": "耐克,耐克2,耐克3,耐克4,耐克5,耐克6",
        "weight": 40
      }
    ]
  }
}





{
  "code": 200,
  "data": {
    "totalNum": 55,
    "pageNo": 1,
    "pageSize": 20,
    "brandList": [{
      "brandStoreSn": 555,
      "brandStoreName": "品牌5",
      "totalWeight": 200,
      "brandVendorList": [{
        "vendorCode": "3470382421150292",
        "vendorName": "供应商0382421157119",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470382693079395",
        "vendorName": "供应商0382693086648",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470382929911608",
        "vendorName": "供应商0382929918435",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470383154922690",
        "vendorName": "供应商0383154930371",
        "weight": 50,
        "weightPercent": 25
      }]
    }, {
      "brandStoreSn": 444,
      "brandStoreName": "品牌4",
      "totalWeight": 150,
      "brandVendorList": [{
        "vendorCode": "3470382636249135",
        "vendorName": "供应商0382636256389",
        "weight": 50,
        "weightPercent": 33
      }, {
        "vendorCode": "3470382865682582",
        "vendorName": "供应商0382865689835",
        "weight": 50,
        "weightPercent": 33
      }, {
        "vendorCode": "3470383106428150",
        "vendorName": "供应商0383106434550",
        "weight": 50,
        "weightPercent": 33
      }]
    }, {
      "brandStoreSn": 333,
      "brandStoreName": "品牌3",
      "totalWeight": 200,
      "brandVendorList": [{
        "vendorCode": "3470382305178113",
        "vendorName": "供应商0382305185366",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470382590421240",
        "vendorName": "供应商0382590428493",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470382836430553",
        "vendorName": "供应商0382836437379",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470383071702032",
        "vendorName": "供应商0383071708858",
        "weight": 50,
        "weightPercent": 25
      }]
    }, {
      "brandStoreSn": 222,
      "brandStoreName": "品牌2",
      "totalWeight": 200,
      "brandVendorList": [{
        "vendorCode": "3470382156105401",
        "vendorName": "供应商0382156114788",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470382533210397",
        "vendorName": "供应商0382533218077",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470382796689435",
        "vendorName": "供应商0382796696688",
        "weight": 50,
        "weightPercent": 25
      }, {
        "vendorCode": "3470383029184616",
        "vendorName": "供应商0383029191443",
        "weight": 50,
        "weightPercent": 25
      }]
    }, {
      "brandStoreSn": 111,
      "brandStoreName": "品牌1",
      "totalWeight": 250,
      "brandVendorList": [{
        "vendorCode": "3470382025432967",
        "vendorName": "供应商0382025458140",
        "weight": 50,
        "weightPercent": 20
      }, {
        "vendorCode": "3470382478306522",
        "vendorName": "供应商0382478312922",
        "weight": 50,
        "weightPercent": 20
      }, {
        "vendorCode": "3470382741151538",
        "vendorName": "供应商0382741157938",
        "weight": 50,
        "weightPercent": 20
      }, {
        "vendorCode": "3470382981132099",
        "vendorName": "供应商0382981138926",
        "weight": 50,
        "weightPercent": 20
      }, {
        "vendorCode": "3470383215484120",
        "vendorName": "供应商0383215490093",
        "weight": 50,
        "weightPercent": 20
      }]
    }]
  }
}
























