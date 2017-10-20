# AMD-CMD-CommonJS
AMD、CMD、CommonJS的区别，AMD的使用

### 1.CommonJS是服务器端模块的规范，Node.js采用了这个规范。Node.JS首先采用了js模块化的概念。

* 在一个模块中，存在一个自由的变量“require”，它是一个函数。

这个“require”函数接收一个模块标识符。

“require”返回外部模块所输出的API。

如果出现依赖闭环(dependency cycle)，那么外部模块在被它的传递依赖（transitive dependencies）所require的时候可能并没有执行完成；在这种情况下，”require”返回的对象必须至少包含此外部模块在调用require函数（会进入当前模块执行环境）之前就已经准备完毕的输出。

如果请求的模块不能返回，那么“require”必须抛出一个错误。

* 在一个模块中，会存在一个名为“exports”的自由变量，它是一个对象，模块可以在执行的时候把自身的API加入到其中。

* 模块必须使用“exports”对象来做为输出的唯一表示。

* 示例

math.js

```
exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
        sum += args[i++];
    }
    return sum;
};
```

increment.js

```
var add = require('math').add;
exports.increment = function(val) {
    return add(val, 1);
};
```

program.js

```
var inc = require('increment').increment;
var a = 1;
inc(a); 
// 2
```

### 2.AMD (Asynchronous Module Definition, 异步模块定义) 指定一种机制，在该机制下模块和依赖可以移步加载。这对浏览器端的异步加载尤其适用。

* 语法

define(id?, dependencies?, factory);
id: 定义中模块的名字，可选；如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。。

依赖dependencies：是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。 依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的长度属性小于3，加载器会选择以函数的长度属性指定的参数个数调用工厂方法。

工厂方法factory，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

* 示例:

```
define('modal', ['jQuery', 'dialog'], function($, Dialog){
    $('.modal').show();
    Dialog.open();
});
```

* 实现AMD的库有｀RequireJS｀ 、｀curl｀ 、｀Dojo｀ 等。

### 3.CMD（Common Module Definition）是 SeaJS推广过程中产生的。

* 在 CMD 规范中，一个模块就是一个文件。代码的书写格式如下：

```
define(factory);
```

* 示例:

math.js

```
define(function(require, exports, module) {
  exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
      sum += args[i++];
    }
    return sum;
  };
});
```

increment.js

```
define(function(require, exports, module) {
  var add = require('math').add;
  exports.increment = function(val) {
    return add(val, 1);
  };
});
```

program.js

```
define(function(require, exports, module) {
  var inc = require('increment').increment;
  var a = 1;
  inc(a); // 2

  module.id == "program";
});
```