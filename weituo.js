// 委托
// 例子1
// 1.prototype机制
function Widget(width, height) {
	this.width = width || 50
	this.height = height || 50

	this.$elem = null
}

Widget.prototype.render = function($where) {
	if (this.$elem) {
		this.$elem.css({
			width: this.width + 'px',
			height: this.height + 'px'
		}).appendTo($where)
	}
}

function Button(width, height, label) {
	Widget.call(this, width, height)

	this.label = label || 'Default'
	this.$elem = $('<button>').text(this.label)
}

Button.prototype = Object.create(Widget.prototype)

Button.prototype.render = function($where) {
	Widget.prototype.render.call(this, $where)

	this.$elem.click(this.onClick.bind(this))
}

Button.prototype.onClick = function(evt) {
	console.log('Button ', this.label, ' clicked!')
}

// 2.class
class Widget {
	constructor(width, height) {
		this.width = width || 50
		this.height = height || 50
		this.$elem = null
	}

	render($where) {
		if (this.$elem) {
			this.$elem.css({
				width: this.width + 'px',
				height: this.height + 'px'
			}).appendTo($where)
		}
	}
}

class Button extends Widget {
	constructor(width, height, label) {
		super(width, height)
		this.label = label || 'Default'
		this.$elem = $('<button>').text(this.label)
	}

	render($where) {
		super.render($where)
		this.$elem.click(this.onClick.bind(this))
	}

	onClick(evt) {
		console.log('Button ', this.label, 'clicked!')
	}
}

$(document).ready(function() {
	var $body = $(document.body)
	var btn1 = new Button(123, 30, 'Hello')
	var btn2 = new Button(269, 30, 'World')

	btn1.render($body)
	btn2.render($body)
})

// 3.对象委托
var Widget = {
	init: function(width, height) {
		this.width = width || 50
		this.height = height || 50
		this.$elem = null
	},
	insert: function($where) {
		if (this.$elem) {
			this.$elem.css({
				width: this.width + 'px',
				height: this.height + 'px'
			}).appendTo($where)
		}
	}  
}

var Button = Object.create(Widget)

Button.setup = function(width, height, label) {
	this.init(width, height)
	this.label = label || 'Default'
	this.$elem = $('<button>').text(this.label)
}

Button.build = function($where) {
	this.insert($where)
	this.$elem.click(this.onClick.bind(this))
}

Button.onClick = function(evt) {
	console.log('Button', this.label, 'clicked!')
}

$(document).ready(function() {
	var $body = $(document)
	
	var btn1 = Object.create(Button)
	btn1.setup(124, 12, 'hello')

	var btn2 = Object.create(Button)
	btn2.setup(123,23, 'World')

	btn1.build($body)
	btn2.build($body)
})

// 例子2

// 父类
function Controller() {
  this.errors = []
}

Controller.prototype.showDialog = function(title, msg) {
  // 显示标题和消息
}

Controller.prototype.success = function(msg) {
  this.showDialog('Success', msg)
}

Controller.prototype.failure = function(err) {
  this.errors.push(err)
  this.showDialog('Error', err)
}

// 子类
function LoginController() {
  Controller.call(this)
}

LoginController.prototype = Object.create(Controller.prototype)

LoginController.prototype.getUser = function() {
  return document.getElementById('login username').value
}

LoginController.prototype.getPassword = function() {
  return document.getElementById('login password').value
}

LoginController.prototype.validateEntry = function(user, pw) {
  user = user || this.getUser()
  pw = pw || this.getPassword()

  if (!(user && pw)) {
    return this.failure('Please enter a username & password!')
  } else if (pw.length < 5) {
    return this.failure('Please must be 5+ characters!')
  }

  return true
}

LoginController.failure = function(err) {
  Controller.prototype.failure.call(this, 'Login invalid:', err)
}

// 子类
function AuthController(login) {
  Controller.call(this)

  this.login = login
}

AuthController.prototype = Object.create(Controller.prototype)

AuthController.prototype.server = function(url, data) {
  return $.ajax({
    url: url,
    data: data
  })
}

AuthController.prototype.checkAuth = function() {
  var user = this.login.getUser()
  var pw = this.login.getPassword()

  if (this.login.validateEntry(user, pw)) {
    this.server('/check-auth', {
      user: user,
      pw: pw
    })
    .then(this.success.bind(this))
    .fail(this.failure.bind(this))
  }
}

AuthController.prototype.success = function() {
  Controller.prototype.success.call(this, 'Authenticated!')
}

AuthController.prototype.failure = function(err) {
  Controller.prototype.failure.call(this, 'Auth Failed: ', err)
}

var auth = new AnthController(
  new LoginController()
)

auth.checkAuth()

// 委托的方式
var LoginController = {
  errors: [],
  getUser: function() {
    return document.getElementById('login username').value
  },
  getPassword: function() {
    return document.getElementById('login password').value
  },
  validateEntry: function(user, pw) {
    user = user || this.getUser()
    pw = pw || this.getPassword()

    if (!(user && pw)) {
      return this.failure('Please enter a username & password!')
    } else if (pw.length < 5) {
      return this.failure('Please must be 5+ characters!')
    }

    return true
  },
  showDialog: function(title, msg) {
    // 
  },
  failure: function(err) {
    this.errors.push(err)
    this.showDialog('Error ', 'Login invalid: ', err)
  }
}

var AuthController = Object.create(LoginController)

AuthController.errors = []
AuthController.checkAuth = function() {
  var user = this.getUser()
  var pw = this.getPassword()

  if (this.validateEntry(user, pw)) {
    this.server('/check-auth', {
      user: user,
      pw: pw
    })
    .then(this.accepted.bind(this))
    .fail(this.rejected.bind(this))
  }
}

AuthController.server = function(url, data) {
  reutrn $.ajax({
    url: url,
    data: data
  })
}

AuthController.accepted = function() {
  this.showDialog('Success', 'Authenticated')
}

AuthController.rejected = function() {
  this.failure('Auth Failed: ', err)
}

AuthController.checkAuth()

var controller1 = Object.create(AuthController)
var controller2 = Object.create(AuthController)

/*
  class总结：
    1.class基本上只是现有[[Prototype]]（委托！）机制的一种语法糖。
    2.class并不会像传统面向类的语言一样在声明时静态复制所有行为。

*/

// 例子3
class C {
  constructor() {
    this.num = Math.random()
  }

  rand() {
    console.log('Random: ', this.num)
  }
}

var c1 = new C()

c1.rand()

C.prototype.rand = function() {
  console.log('Random: ', Math.round(this.num * 1000))
}

var c2 = new C()

c2.rand()
c1.rand() // 改变了

// 例子4
class P {
  foo() {
    console.log('P.foo')
  }
}

class C extends P {
  foo() {
    super()
  }
}

var c1 = new C()

c1.foo() // 'P.foo'

var D = {
  foo: function() {
    console.log('D.foo')
  }
}

var E = {
  foo: C.prototype.foo
}
// 把E委托到D
Object.setPrototypeOf(E, D)

E.foo() // P.foo
// super并不像this一样是晚绑定（latebound，或者说动态绑定）的，它在[[HomeObject]].[[Prototype]]上，[[HomeObject]]会在创建时静态绑定。