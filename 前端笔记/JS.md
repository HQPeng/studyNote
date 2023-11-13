# 基础、数据类型

- `<script>`标签把他当做是外链式使用时候，这一个script里再写其他代码就没意义了
- 输出：document.write（）：显示在网页上，可解析HTML结构  
  - prompt（）：返回值是输入的内容   
- ndefined：只有一个值，就是它本身本来有个值，但是实际却没有  
  - null：只要一个值就是它本身，有值，是个空值
- 数据类型转换：
  - Number（数据）、  parseInt（数据）：一个个数字转换  
  - parseFloat（数据）：一个个转换，认识小数点，不认识布尔
  -  数字.toString(进制)：十进制数字转成想要的进制数
  - isNaN(数据)：  检测数据是不是一个非数字，TRUE表示数据不是数据类型
  - String（数据）：所有数据都可以转  数据。
  - toString（）空数据类型不行   
  - BOOlean（数据）除了空字符以及 NAN undefined，null 其余的都是TRUE
- Switch（条件）{case（情况1）:}  **条件必须跟情况是===关系  在满足一个case后，如果这个case里面没有break，那么下一个case不管满足不满足，都是会执行代码，知道某个case里面有break**

# 函数

- 函数的arguments：函数的实参，复杂数据类型   arguments【0】
- 函数里使用了return后，return后面的代码就不执行了，打断函数  同时return后面返回的东西就是函数的返回值

# 对象

-    增：对象名.成员=值  删：delete 对象名.成员  查：对象名.成员
  - 对象还有一种数组式的写法 对象【变量】  这种写法，里面要么是一个变量===对象的某一个成员名字   要么就是字符串类型的成员名字

# 数组

- 以下是动源数据的
  - 数组.push（数据）:在末尾追加一条数据，，返回最新长度            
  - 数组.pop（）：删除末尾一个数据，，返回被删除的那个数据
  - 数组.unshift（数据）：在数组最前面加一个数据，，返回最新长度     
  - 数组.shift（数据）：删除最前面一个数据，，返回被删的数据
  - 数组.reverse（）:将原数组反转，，返回值是反转后的数组       
  - 
    数组.sort（function（a ，b）{a-b}）：将原数组升序排      换成b-a就是降序排   如果不想动原数组: 数组.toSorted（）
  -  数组.splice(开始索引 ， 多少个  / 开始索引，多少个，数据1 ，数据2，。。。)：从开始索引删除多少个数据/从开始索引插入多少个数据  数据1，数据2   返回值是删除的数据组成的数组  
  
- 不会动源数据，返回新数组
  - 数组.concat（数据/数组）：把数据/数组拼接在一起 返回值是拼好的数组    
  - 数组.join（字符串）：把数组每一项中间插入字符串拼好，返回值是拼好的字符串
  - 数组.slice（开始索引，结束索引）：包前不包后的截取数据  返回值就是截取的数据组成的新数组
  - 数组.indexOf（数据 ，数字）：从这个数字的索引开始往后找数据在数组中的索引  返回值是该数据索引，如果没有，就是-1 
  - 数组.map(function(当前数据 ， 当前数据索引 ， 数组本身){处理过程，要有返回return})  ：按照这个函数处理数组的每个数据，一定要有返回值，不然没意义
  - 数组.fliter（同上）：把数组里的数据满足条件的过滤组成一个新的数组，这个过滤的条件一定要用return或者使用箭头函数（隐士返回）来写
  - 数组.every（同上）：数组的每个数据都要满足条件，才会返回TRUE 否则就是false   同上
  - 数组.some（同上）：数组里只要有一些满足，就返回TRUE   同上

- 数组其他高级方法：

  - 数组.reduce(function （par1 ， par2）{return} ， par3)

    - 作用就是会对数组的每一项进行积累操作，第一个参数是一个回调函数，回调函数的第一个参数是上一次处累积操作的结果，第二个参数就是本次处理的数据。第二个参数表示从这个数据开始处理

      ~~~js
      基础用法
      const a =[1 , 2 , 3]
      a.reduce( (par , par2)=>par1 + par2 , 0 )//把数组里的所有数据相加，第一个数据开始是0
      
      高级点用法：把数组数据按奇偶分
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const groupedNumbers = numbers.reduce((accumulator, currentNumber) => {
        const groupKey = currentNumber % 2 === 0 ? "even" : "odd";
        if (!accumulator[groupKey]) {     //第一次检测到奇数或者偶数时候，给它们设置成一个空的数组
          accumulator[groupKey] = [];
        }
        accumulator[groupKey].push(currentNumber);
        return accumulator;
      }, {});                         //这里的初始值类型很重要，因为这就是规定了最后返回的是什么类型东西
      
      console.log(groupedNumbers);
      // 输出：{ even: [2, 4, 6, 8, 10], odd: [1, 3, 5, 7, 9] }
      ~~~

      

- # 字符串

- 字符串也有length   字符串也有索引，写法是跟数组一样的  字符串[]  只读不能改 所以字符串也可以遍历

  - 字符串.chatAt(索引):对应索引位置的字符    
  - 字符串.substr（开始索引 ， 多少个）：截取字符串的一部分，返回值就是截取后的字符串
  - 字符串.indexOf(字符串片段) 查找指定字符串的索引，没有的话就是返回-1
  - 字符串.subString（开始索引 ，结束索引）/slice(开始 ， 结束)：包前不包后的截取字符串  返回值截取后的字符串
  - 字符串.replace(指定字符串 ， 要替换的字符串)  用后面的替换掉前面的字符串，只能替换第一个，想要替换全部 用replaceAll
  - 字符串.split(字符串片段)  按照字符串片段，把原来字符串切割成一份份的，返回值是一份份组成的数组，如果里面没有你写的字符串片段，就是整个原字符串
  - 当做一个组成数组，如果是空字符串，就是把原字符串一个个切，总之，切割后的字符串里一定没有你写的字符串片段

    
    

- 保留小数位  数字.toFixed（小数位）：保留几位小数位

- 时间对象.getHourse()   时间对象.setFullYear(2008)  设置时间：时间对象.setMonth(3)

# BOM
- BOM 的顶级对象就是Windows，就是当前窗口。所有的dom操作都是windows.  这个可以省略，因为window是全局对象，访问全局对象下的内让你更不需要window

- 获取浏览器窗口尺寸（包滚动条）：innerWidth  innerHeight 
- BOM对象里的有 
  - location.href="地址"（跳转效果）  
  - location.reload（）（刷新当前页面）        
  - history.back()：回退一下    
  - history.forward()(前进一下)  
  - history.go（整数）  正数表示前进，0表示刷新 负数表示后退

- 浏览器事件：
  - `windows.onload()=function(){}`:浏览器在加载完所有资源后执行  
  -  onresize（）：尺寸变化时候  
  -  onscroll（）：滚动条滚动时候
  - 卷去的高度:`document.documentElement.scrollTop||document.body.scrollTop   `
  - 卷曲宽度`document.documentElement.scrollLeft||document.body.scrollLeft`
  - 滚动到： `window.scroolTo({ top：数字，  left：数字，behavior：‘instant/smooth’})`

# DOM
- dom的顶层是document 它不是一个元素标签，只是承载了所有元素的载体，，dom的最大标签是html

- 获取特殊DOM元素
  - document.documentElement 得到html元素    
  - document.head得到head元素  
  - document.body得到body

- 获取常规元素：**注意加了s的是返回的伪数组**

  - getElementById（“ID”）   

  -  getElementsByClassName（“class名”）  

  - getElementsByTagName（“”标签名）  

  - getElementsByName（“name属性”）

  - querySelector（“选择器”）：里面写啥选择器就选择其中第一个  

  - querySelectorAll（‘选择器’）选择所有的    

    

- 文本操作 
  -  innerHTMl=“值”  可以解析html结构
  - textContent=’值‘    ：内容
  - innerText=“值”不可以解析结构，都是完全覆盖式的书写  
  - value  专门给表单元素用的

- 元素类名的操作：
  - 1、直接操作，元素.className  这是获取到这个元素的所有类名字符串，如果想要添加或者删除，就是用字符串的方式，这会完全替换
  - 2、用类对象classList操作  
    - 元素.classList.add（“类名”）  
    - 元素.classList.remove（“类名”）  
    - 元素.classList.toggle("类名")

- 元素样式的操作：
  - 元素.style.样式名=值   **这操作、设置的都是行内样式  这是个行内样式对象**
  - 获取元素的所有样式： window.getComputedStyle(元素)  一个对象，里面是所有的样式，行内和非行内都有，**只能读，不能写**

- 元素的属性： 
  - 原生属性：例如 div.id="值"   注意**：class和style有单独的设置方式**   
  -  非原生属性：setAttribute（“属性名” ， 属性值）  getAttribute（“”属性名）  removeAttribute（“属性名”）

- 节点的操作：
  - 父节点.childNodes 获取所有下一级节点  
  - 父节点.chlidren ：获取所有下一级节点的元素节点
  - 节点.nextSibling  获取到下一个节点   
  - 节点.nextElementSibling  获取到下一个元素节点
  -  节点.previousSibling 获取到上一个节点  
  - 节点.previousElementSibling：获取到上一个元素节点
  - 节点.parentElement  获取到父元素节点
  - 
    创建节点：document.createElement("标签名“)
  - 插入节点：父节点.appendChild（子节点）在父节点结尾插入子节点      
  - 父节点.insertBefore（要插入的子节点 ， 哪个子节点前面）
  - 删除节点：节点.remove()
  - 替换节点：父节点.replace(新节点 ， 旧节点)
  - 克隆节点：节点.cloneNode()  里面写TRUE就是表示也克隆他的所有子节点

- 元素节点的偏移量：元素.offsetLeft 、 元素.offsetTop 他的偏移参考对象是，假如这个元素有绝对定位，绝对定位的参考是什么，偏移量就也是按照这个参考来
- 元素的尺寸：元素.offsetwidth  元素.offsetHeight 这是包括边框的   元素.clientWidth  元素.clientHeight  不包括边框的
- 获取浏览器窗口尺寸：innerWidth innerHeight ：包括滚动条的尺寸    document.documentElement.clientWidth  不包含滚动条的

- 事件类型：
  - contextmenu右键    
  -  mouseover/mouseout 事件会冒泡，在元素里一直移动一直触发 
  -  mouseenter/mouseleave 不会事件冒泡，只在进出瞬间触发
  - load 所有资源加载完毕  
  - scroll 滚动条滚动   
  - resize：浏览器尺寸发生变化
  - focus：表单聚焦时候  
  - blur：表单失焦时候触发 
  - input：表单内容有变化就会一直触发   
  - change：表单内容发生变化（聚焦时候获取一次，失焦时候获取一次，不同才会触发） 

- 事件对象:鼠标事件对象中：clientX/clientY鼠标相对于窗口的位置    pageX鼠标相对于页面位置  offsetX鼠标相对于你点击的元素左上角位置

- **事件冒泡只跟html结构有关，只要是父子级结构，不管后续定位啥的，都会保持网上冒泡  阻止事件传播：e.stoPropagation（）**

- 浏览器默认行为：右键 、 submit标签  、 a标签    阻止的话就是  e.preventDefault()

- 事件监听器：document.addEventlistener（“事件名” ， 事件处理函数 ，true/false冒泡/捕获，默认不写是冒泡）
          解绑：removeEventlistener（“事件类型” ， 处理函数）**这个处理函数必须是函数名的形式，不能直接写函数内容的那种**

- 自调用函数：自调用函数在定义时候会自动执行一次，但是后续再调用，不会自动执行

  - （function（）{}）（）    

  -  ~function（）{}（）  
  -  ！function（）{}（）  

- **改变this的指向**

  - 函数.call（改变后的this指向 ， 参数1 ， 参数2） 会立即执行这个函数 

  - 函数.apply（改变后的this指向， 数组或者伪数组） 会立即执行这个函数 ，还有个作用，**就是改变函数的传递参数的方式，**数组里的数据就是一个个参数
  -  函数.bind(改变后的this指向 ， 参数1， 参数2)    不会立即执行，会返回一个新的函数，改好this后的心新函数

- 正则：**字面量创建的正则不可以拼接，说白了就是创建好后就不能动了，内置构造函数创建的可以拼接**

  - \d 数字  \D 非数字  \s空格 \S 非空格  \w  数字、字母下划线任意一个   \W非数字字母下划线   
  -  ^ 字符串开头   $字符串结尾  i 忽略大小写
  - *0到多次 、 {?}0到1次 、 {n}指定出现次数 、 {n ,m}指定出现n到m次
  - () 当做一个整体   | 或   【】任意一个都行， 只能是一个，只占一个字符   - 到、至 常和前面一起用  例如 [1-9]表示这个位置1到9里的任何一个

  - 检测是否符合正则：  正则.test(字符串) 有就是TRUE，没就是false 

  - 字符串.search(正则) 字符串里有符合的就返回索引，否则就是-1
  - 正则.exec（字符串）从字符串中，把符合正则的字符串拿出来
    - 如果正则有全局标识g  返回值是个数组 那么只能拿出来符合的第一个片段，再怎么执行都只能拿第一个，也就是数组里只有一个值
    - 如果没有全局标识   那么每次执行一次，都会从上次执行找到的地方接着执行 同样每次都是返回数组，且只要一个数据
    - 如果正则里有小括号，那么 返回的数组里，第一个数据【0】是整体满足的总字符串，然后接下来依次把这个数据按照每个小括号里规则一个个当成数组的一个个数据

- json转换成js数据：JSON.parse(JSON数据)     

-  js转成JSON数据：JSON.stringify（js数据）

- 点点点运算：

  - 就是可以把可迭代的东西（数组、对象、伪数组、字符串）拆开
  - 用在箭头函数参数位置，解决箭头函数参数没有arguements问题，这时候它就是所有实参组成的数组

- 解构赋值：就是快速获取对象或者数组里的内容方式   

  - 对象：var {name}=obj  就是等价于 var name =obj.name    多个的话就是  var {name ，age} 等价于  var name =obj.name  var age=obj.age。如果不想用跟对象一样的名字，那就是  var{name1：name}=obj  等价于  var name1=obj.name1
  -  数组：跟对象差不多，但是拿的数据就是只能从数组里按顺序一个个拿了  var【a】=arr  就是等价于 var a=arr【0】   如果是多个数据，就是一次从数组里拿
      技巧，，两个变量交换   var a=1，b=2     交换： var【b , a】=[a ,b]

- 在对象内写函数时候，可以不写function和冒号   比如  var object={a（）{}}  等价于{a：function（）{}}

- **数据类型的检测方式**

  - typeof(数据)：只能检测基本数据类型和函数 
  -  constructor：访问一个数据的constructor时候，就是去找——proto-上面找，而这个指的就是数据本身所属的构造函数。所以 数据.constructor就行  但是不能检测undefined和null
  - 顶级原型object上面有个toString方法，作用就是返回“object 数据类型， 具体使用 Object.protype.toString.call(数据)，所有数据都可以检测到

- cookie

  - :跟随域名的、大小4kb  、会被自动带到服务端 、 时效性，关闭浏览器就删了  
  - 获取：document.cookie  设置 document.cookie=“名字=值”

-   同源策略：是浏览器的行为，比如用get时候，其实请求是发送过去了的，但是相应回来时候，被浏览器挡住了，因此对于同源策略，对应的方法就生成了，

  - 一个是服务端返回数据的时候 在响应头里告诉浏览器，他接受发送端的地址，这就是cros方式   
  - 还有一个就是代理方式proxy了

- promise： 

  - const p1= new Promise(function(reslove , reject){ 这里是异步代码，如果在地方有同步代码在异步代码之前，同步代码还是会自动同步执行的，不会等异步结束再执行 

  - 异步代码中，肯定要根据情况执行resolve（参数1） 或者执行reject（参数2），这两个只可能执行一个})
     .then(function（参数1）{} ， function（参数2）{})这里就是详细写上面这两个函数的具体内容，实际参数也是上面里的，两个函数分别代表 resolve和reject

  -   或者这样写前面一样，到了.then 时候，不写两个了，分开写，就很清楚

    `.then(function(参数1){})
     .catch(function(参数2){})`

  -  重点：promise返回值是状态函数的参数  例如  const p=new promise（function（resolve，reject）{....reject(1)}）  这时候，就是表明promise对象已经是resolve了，这时候如果这个promise对象返回值就是 1 

  ```js
  //至于promise的链式调用，就是在第一个then函数里，也就是成功的函数里再写返回一个promise，这样就可以这样写了
  new Promise（function（resolve ，reject）{
    resolve（参数1 ）
  }）.then(function（参数1）{.... return new Promise（resolve ， reject）{ ... resolve(参数3)} }).then(functionn（参数3）{。。。return new  Promise...})
    .catch(function(参数){})
  //最后只要写一个catch就可以了，这个捕获穿透
  ```

- promise的其他两个方法： 

  - const p=Promise.all（【promise对象1 ， promise对象2】） 这个传递参数是一个数组，数组里是promise对象，只有里面的所有promise都是resolve时候，返回的东西才会是一个resolve的promise，反之就是返回reject的promise
  - const p=Promise.race（【promise对象1 ， promise对象2】）这是意思是里面的promise对象中哪个先 处理玩，就用这个最先处理完的promise状态，

- async：

  - 如果一个函数前面加了async 那么这个函数返回值一定一定是个promise对象的，然后，再判断这个promise返回的是resolve还是reject ，**reject的情况基本就是这个函数里的代码 里面自己写了抛出一个异常了，如果是这样的话，那么这个promise是reject，那么这个函数的返回值就是reject的值，也就是里面写的抛出的异常**
      如果不是这个情况，那么这个promise就是resolve，那么它的返回值就是里面代码该咋样就返回啥

- await：

  - 一定时写在async函数里面的，如果await后面是一个promise对象，那么这个promise对象只能是resolve，那么这时候这个await promise的返回值就是这个promise的reject值（具体看上面的重点）
  - 如果await后面的promise是reject，那么要想有输出，就必须要try  catch了，这时候catch里面的参数，就是这个promise的reject时候的返回值（具体看上面重点）
  - 如果await后面不是promise对象，那么就该返回啥返回啥

- 闭包：

  - 闭包是一个函数和它外部变量的组合  它可以提升变量，也就是可以在函数外访问这个函数内部的变量  它也可以防止这个变量被污染、随意修改（因为是在另一个函数里定义的）

  - 但是因为它可以让外部使用这个函数内部的变量，所以会导致内存不会被清除，容易导致了内存泄漏

    ~~~js
    function out(){
      let i=0
    return  function in(){
      	console.log(i)
       return i
      }
    	}
    外面使用里面变量i，只能读，无法写的
    const tem=out（）
    console.log(tem())
    
    ~~~

- **柯理化函数**：就是把只能传入一个参数的函数写成可以多次传参的函数，但是函数作用效果是一样的。所以它的核心思想就是函数里再返回函数

  - 常用场景：为函数预制通用参数，供多次使用

  ~~~js
  
  //基础：两个数相加 a+b
  function add(a , b){
    return a+b
  }
  add(a,b)
  柯理化后
  function add（a）{
  	return function(b){
      return a+b
    }
  }
  add(a)(b)
  //场景：为函数提供预制通用参数，供多次使用
  需求：需要一个函数来判断某个数据是不是某个数据类型。这就是第一步需要第一个函数可以生成一个检测数据的函数，至于是可以检测什么数据
  根据传入的参数决定，然后这个函数返回一个具体的检测数据的函数了，再在这个函数里传入想要检测的数据，就可以检测出最后结果了，形式上面
  就是传了两次参数，也就是function（a）（b）
  function testType(type){
    	return tem(data){
        return typeof data===type
      }
  }
  testType('string')(11)  //false
  ~~~

- **原型：Protype  ：只有函数有**
  - 所有的函数（eg：Array）都有一个属性叫Protype，它是个对象（Array.protype={}），这个对象里有个属性constructor，它也

- **隐式原型：-proto-  :只有对象有**

  - **所有的对象(test={})，都有一个属性-proto-（test.-proto-） 它指向的是这个对象构造函数的Protype，也就是**

    **`test.-proto-===Object.proype`**

  - **所以，拿到一个对象，一定可以拿到它的构造函数   test.-proto-.constructor  就是这个构造函数**
  - **所以，对象在读取属性或者方法时候，如果本身没有，就去自己的隐式原型上面去找，也就是构造函数的Protype里面**
  - **隐式原型也是一个对象，所以如果没有在自己的隐式原型上面找到，就去隐式原型的隐式原型上面找....这就是原型链**
  - **猴子补丁：就是利用一个对象，在它的隐式对象里加东西，这样以后所有的对象，都有这个东西了，污染原型**

​				

- Class类

  - ES6的新语法

    ~~~js
    class Test{
      name           
      static age=9    //静态属性，只能使用类名.使用   eg：const tem=Test.age
    	#do(){}					//私有方法或属性  只能这个类内部自身使用，在外面用不了，但是可以用闭包的方式读取到
    	constructor（par）{ //构造器，在创建对象时候，这里的方法都会执行的
      	xxx
      }
    	fun（）{
      	return this.#do      //这里可以使用类似闭包的原理获取到私有属性
      }
    }
    const tem=new Test()
    tem.fun()   //9
    ~~~

  

- **继承**

  - 原型链继承，就是在子类构造函数上的Protype等于父类的一个实例 ，问题有两个，在创建子类的时候，虽然可以继承下了父类原型链上的方法，但是却不能给这个方法传参；第二个就是第一个子类继承的父类的属性，跟第二个子类继承的父类属性是一样的，修改一个，另一个也跟着改了
  - 构造函数继承，就是在子类的构造函数里写属性时候，再写一个父类构造函数进去，但是这时候就是把父类的构造函数当做一般函数 ，同时改变它的this指向，这样父类构造函数里写的所有属性都给到了子类上面，缺点就是没有办法把父类构造函数的方法也整上去
  -   组合继承：就是用到上面两个一起用，缺点是会访问父类构造函数访问了两次，内存浪费
  - 拷贝继承：就是搞一个父类实例，把它的Protype上面的所有方法拷贝下来，然后放进一个新的对象，再把这对象给子类的Protype  这样就只会访问一次父类了，但是，挺，，离谱的感觉
  - **类继承**（最好用）：class son extends Father{
            constructor（子类参数1 ， 子类参数2）{
                super（给父类构造函数的参数）
                this.name=name  子类本身的
            }   
        }

- **数据劫持（代理）**：简单理解就是动态绑定，就是某个对象被监控的数据变换或者被调用了，需要执行的动作，必须被监控的数据是对象的属性

  ~~~js
  const obj={a:1 ， b:2}
  object.defineProperty(obj , 'a' , {
  	get:function(){ return this.a }  //这里的set方法是被添加到了obj对象的a属性上面去了，所以这里的this指的就是obj对象。。或者这个set函数的参数也是整个对象
    set：function(newValue){ this.a=newValue } //get方法的参数就是想要修改成的数据
  })
  ~~~

  

- *map数据类型：跟对象类似，它会自动去重。它的成员名可以是任何数据类型 它创建时候，是要用二维数组创建格式，就是先搞的最大的[]，表示在这里创建，然后每组数据再用[] 括起来  然后每组数据写就是[ a , b]前面是键，后面是值，

  -  `const map=new MPA（[ [“a” , 4 ] , [ {a:2，b：2} ，5 ] ，[ [3,3,3]，4] ]）`  就是在【】里面，不管你里面第一个数据是什么类型，都是成员名，第二个就是具体值

  - 利用map数据会自动去重的特性，常用于去重

    ~~~js
    const arr = [9,7,5,8,4,8,9,7]//去重
    const tem1=arr.map((item)=>{[item ,item] }) tem1=【[9,9] , [7,7] 。。。】
    const map=new Map(tem1).values()   //values()方法就是获取到map数据的每一项的值的迭代器对象形式 {9 ， 7}
    const result=Array.from(map) //去重后的数组
    ~~~

- **Set数据类型：**跟数组类似 `const set=new([1,2,3])`里面是个数组形式，它也有自动去重，它的去重方法才是常用的

  ~~~js
  const arr=[9 ,85,8,4,8,4,7]//去重
  const result=[...new Set(arr)] //set就基本上把它看成一个有自动去重功能的数组
  ~~~

# jQuery

-   jQuery的入口函数$(function(){代码写的地方})  入口函数的作用主要就是说让页面DOM树和资源加载完后再执行代码

- jquery不是像Dom一样，每个元素就是单纯的每个元素，它每个元素其实是个jQuery对象，然后jQuery所有的方法，都要在这个jQuery对象时候才可以用，也就是说，如果你是个单纯的纯dom元素，用不了的
-  jquery 的选择器选出来的元素，不管几个 返回值是一个元素集合，，当这时候用和这个元素集合后面再添加点什么的时候，，一般都是会作用在所有的元素里  除了方法 html（）时候
- jQuery专门的选择器
  - $('div').eq(2) 选中元素集合里的第二个元素
  - **$('div').get(2)选中里面第二个元素，但是，这时候返回的是一个纯的dom元素的**
  - 操作样式： $('div').css({width:"100px" ,backgroundColor:"red"}) 或者 $（“div”）.css(‘width’ , "100px")
  - 操作类名：$("div").addClass("active").remove("active").toggleClass("active")
- jQuery事件绑定
  -  $('div').on("事件名" ， function（）{})    
  - 处理函数带参数：`$('div').on('事件名', {参数1 ， 参数2 } ，function（e）{})`  这时候事件对象里有个data成员，就是你传递来的参数,而且这个参数必须是对象方式
  - 常用的事件被封装成函数了  `$('div').click(function(){}).horver(fn1 , fun2):horver `是唯一一个特殊的情况，里面传入两个函数，分别就是移入移出时候触发，如果只要一个，那移入移出都触发这一个  
- Query元素属性操作：
  - 写 .attr("属性名" ， “属性值”)    
  - 读：.attr('属性名') 不管你设置的是什么数据类型，读出来的一定是字符串类型  
  - 删：.removeAttr('属性名')  只能删。attr设置的属性和原生属性
-  jquery操作节点
  - 创建一个节点 ：$('html结构')  
  - 插入节点：
    - 父节点.append(子节点)   
    - 已知节点.before（要插入的几点）：
    - 要出入的.insertBefore(已知的)：插在已知的前面
  - 删节点：remove（） 或者。empty（）：变成一个空标签，只一对标签名，下面的子标签也全噶
  - 替换标签：  被替换的.replaceWith（替换后的）
-  jQuery偏移量
  - .offset() 一个对象，里面是相对于页面的值     .offset(left:xxx ,top:xxx):设置偏移量，同样这个值一定是相对于当前页面的
  - .positon()  定位父级跟结构父级一样时候，拿到的就是距离父级的数据
- ​        jQuery的Ajax：

~~~js
$ajax({
  url : 
  method：
  dateType：            //“数据类型”  意识是期望喉管返回的数据是什么类型，这个值是JSON，同时后端返回的也确实是JSON 那么会自动解析，也就是执行 JOSN.parse()
data:{a:1 , b:2}  
success（e）{}          //成功后的返回值，这里的第一个参数 ，就是后端返回的东西
})

//简写：
get  $get("地址" ， 参数 ，成功的回调函数 ， dateType类型)
post： $post（“地址” ， 参数 ，成功的回调 ，期望的数据类型）

//上面的这三个方法其实都是promise方式的，，所以他们的回调函数可以用then来写，这时会只要把里面的回调函数写成null，然后再再后面.then 书写回调函数

//jQuery的Ajax钩子函数，其实之前的success就是其中一个钩子函数，还有几个常见的 beforSend(){}  error(){}   complete(){}这是不管请求失败或成功，只要请求完成就执行  
这些函数的写法，位置跟success一模一样 
~~~






​     
​    
​          