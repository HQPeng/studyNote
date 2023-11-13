

react的基本步骤，就是先定义一个渲染器，也就是在哪个地方，也就是在哪个标签里渲染，跟vue的挂载id是APP的标签类似，在body里写个标签，《div id=root》《/div》

##  一、变量的插值表达式使用

- 用单大括号   var a=1  <div> {a} </div>   注释的写法 ： <div> 内容 {/*这里写的都是属于注释*/} </div> 


-  属性的绑定:  `const ss={color：“red”}   《div style={ss}》《/div》`  记得属性的值那里不能加双引号了 

## 二、数组

### 2.1、直接渲染

- 就是直接把这个数组用插值表达式放 ``` var arr=[1,2,3]  <div> {arr} </div> ``  这个显示的效果不好，就直接把所有数据连一起显示一行 123

### 2.2、循环渲染 

- 跟vue的 v-for差不多，只不过是在哪个标签里写循环，最后循环出来的结果就放这，

  > 比如我要循环ul下面的li : ``` <ul>{ arr.map( (item , index)=>{ return <li key={index}> {item} </li> }) } </ul>``` 
  >
  > 这里最外层的大括号必须要写，表示里面是js代码，然后同意的，里面用到前面定义的数据的话，就是用{}  这个map方法就是以前的数组的map方法，只不过这里是return出来一个标签  然后同样的，每个被循环的要加key





## 三、工程化

- 工程化里面的入口文件的名字是index.js  

### 3.1、组件

-  组件名在定义时候，还要在被引入时候用的变量名，都要首字母大写 `import Abcd from "../src/components/test1.jsx"`这里这个名字首字母一定要大写


#### 3.1.1、函数组件

- 跟vue差不多，组件的话后缀名可以写js 也可以写jsx 。推荐写jsx 就跟vue一样。那就在一个jsx文件里，写个函数呗

> ```react
> import react from 'react'   //这里的引入react在高版本可以不写，但是写了肯定没错      
> fucntion Test (){                   //这里的函数名字首字母要大写，不然可能会出错
> 	return (<div>  xxx </div>)      //这里返回值一定要return ，值是个jsx语法
> }
> exports default Test
> 
> ```

#### 3.1.2、类组件

- 用类声明的方式来定义组件，首先要引入react和react里面的总的父类，所有定义的类组件都是要继承于这个react里面的总父类的

  ~~~react
  import react ,{component} from 'react'   //这里引用的东西是引入进来的对象的其中属性时候，                                             要用大括号的形式写
  Class Test extends component {		  //这里也可以直接写 react.component{} 如果这 样写 										，上面的引入只要引入react就可以了
    render(){
       return( <div>内容</div>)              //同样的，这里必须要有return出一个jsx格式
    }
  }
  export default Test
  ~~~



#### 3.1.3、组件间传值（props）

- 首先这是**父传子**，在父组件的return里面肯定要写子组件的标签的，写的时候同是给这个子组件的标签里添加自定义的属性和值，这些所有的属性和值就是组成子组件在定义的时候，那个函数里的参数props，然后子组件就可以拿到整个数据对象了，

  ~~~jsx
  父组件里return时候，在里面写子组件，并传数据
  
  import Child from ....     //引入子组件
  class Father extends component{
    render( return <Clild a=1 b="数据b"></Clild> )   这里的就是子组件props里面数据
  }
  ~~~

  - 如果子组件是类组件，就是用this.props使用

  ~~~jsx
  子组件里用这个props数据
  class Child extends component{
    render( return <div> {this.props.a} </div> )
  }
  export default Child
    
  ~~~

  - 如果子组件是函数组件，就是直接调用参数使用

  ~~~jsx
  const Child =function（props）{
    return <div>{props.a}</div>
  }
  export default Child
  ~~~

- 上面这是利用props传递固定的单纯数据，那么如果在这个子组件的标签上面写的自定义属性值是我父组件里的方法，一样的，这个方法也会被传给子组件，那么这时候如果我在这个方法里写return，而且return的数据是我父组件本身的数据，那么这个子组件到时候就可以通过本身this.porps.方法名，就可以拿到我的父数据了
- 同样的，如果我的父组件给这个方法写的时候，我在函数里写了this.setState（）方法，并且还设置了参数，到时候这个参数由子组件用this.props。方法名（实参）调佣时候传递实参，那也就是实现了 父组件获取到了子组件的数据，并且还渲染到了父组件本身的state里面了，简单就是父传子，**通过props传字符串，父传子，通过props传回调函数**

#### 3.1.4、组件传值参数props

1. **props.children**

   -  在父传子组件传值时候， 父组件想要传的数据是通过写在子组件标签里面自定义属性的方式，那么 子组件（函数组件就是函数参数，类组件就是直接this.props）里接收到的这个props就是对象形式

   - 如果父组件是在子组件的标签对里写了东西 ，如果这个东西只有一个数据，那么子这个东西就是会在子组    件里时候用props.children得到，而且是一个字符串类型

   - 如果标签对里的数据是多个，比如写了两个其他的标签，那么多数据的时候，这时候的props.children就是一个数组格式

2. **props.type和defaultProps**

   这是一个属性，这个属性主要的作用就是规定props的数据格式，所以这个是写在接收数据的一方，也就是子组件里的。这个是react里没有的，要安装引用  `npm i -S  prop-types`

   - 类组件里时候，定义一个静态属性static，**属性名而且是固定的，就是propTypes ，值是个对象**

     ~~~jsx
     在类组件（子组件）
     import type from "prop-type"
     clsass Test extends react.component{
         static propTypes={
             name：type.string.isRequied  //这是写规则，然后最后的isRequired可以不写，写的话就                                      是说这个name的数据一定要由有，不然就报错
         }
         static defauleProps={
             name:"jjjj"               //默认值的定义，就是如果这个属性名没有数据传来，就用默认值
         }
     }
     
     ~~~

   - 在方法组件里的话，是直接调用方法  子组件名.propTypes={ }

     ~~~jsx
     import type from 'prop-type'
     function Test (){  这是组件定义
         return
     }
     Test.propTypes={
         name:type.string.isRequred  //跟类一样的写法
     }
     Test.defaultProps={
         name:"jjj"      //如果没有值，就用这个默认值
     }
     ~~~

#### 3.1.5、组件间传值（ref）

- 父传子：这个需要理解一个概念，就是ref ：这个是在一个组件的constructor用react.createRef()  可以定义一个ref对象，这个时候，只要在这个组件里的的任何其他标签（比如说子组件）上面定义一个属性ref 值就是这个创建出来的ref对象，那么就可以在组件里面拿到被定义标签（组件）的对象 

- 就可以理解成过程是，首先父里面有子，父通过子的函数传给子组件，子再通过拿到的数据渲染自己的本身，然后再在父里面出现

  ~~~jsx
  class Test extends component{
      constructor(props){
          super(props)
          this.aaa=react.createRef()  //创建一个ref对象
      }
      state={
          mes:333
      }
      render(
      	<div> <Child ref=this.aaa></Child> </div>//把定义的ref对象赋值给子组件
      )
      function1(){
          console.log(this.aaa.current)   //这里拿到的就是Child这个组件的对象，因此可以拿到它里面的state数据
      }
  	function2(){
          this.aaa.current.bbb(this.state.mes)//这里，因为是可以拿到子组件的对象，所以当然也可以调用它里面的定义好的方法bbb  并且把自己的数据this.state.mes当做实参传过去，这就是实现了父传子
      }
  }
  
    //这是子组件里面的,只要写好事件就行
  class Child extends component{
      
      bbb(value){
          console.log(value)    .//这里就可以拿到父组件传来的this.state.mes 了，
      }
  }
  
  ~~~

#### 3.1.6、renderProps

- 就是实现跟vue插槽的原理差不多，在A组件标签上面写一个render属性，它的值是一个回调函数，回调函数返回另一个组件B， 

  那么A组件本身里，就可以通过 props获取到这个render属性了，也就是可以获取到这个回调函数了，这时候，在A组件里什么位置调用这个函数也就会在这个地方渲染处理函数里return的组件了 。就可以往里面传A组件里的数据了，那么在回调函数返回的B组件上面，随便写个属性，值就是这个参数，就实现了把A数据传给了B，主要的是实现了类似插槽的功能，也就是我这个函数里返回哪个组件，那么就return出哪个组件就行

  ~~~js
  class Test extends react.component{
    render(){
      return 
      <div>这是组件Test的</div>
      <A render={(par)=><B tem=par></B> </A>}  //这里return处理哪个组件，就会渲染哪个组件
    }
  }
  
  class A extends react.componnets{
    state={mes：1}
    render(){
      return(){
       	<div>这是A组件其他内容</div>
        this.render(this.mes)  //让B组件在这个位置处理，同时给B组件传数据
      }
    }          	
  }
  class B extends react.components{
  		this.props.tem  //接收到A传的数据
  }
  
  ~~~

  


#### 3.1.6、组件传值（context）

- 这个传值过程，就是先用react里面的插件createdContext方法创建一个全局的context对象，然后这个对象里面提供了两个属性，一个名字是provider，一个是consumer 这两个属性用的时候当做两个组件用。

  ~~~jsx
  //这是一个单独的文件，比如就是写在src/context/index.js，这样以后就可以复用
  	import {createContext} from 'react'  //引入
  	export default createContext()  //这个是一个方法，导出时候直接带（）表示导入时候就运行
  ~~~

- 然后哪个组件里需要提供数据，就再哪个组件里面把provider引用进来，然后用在组件的render里面，这个<porvider></provider>标签对下面的标签，都可以用数据了，至于哪些数据可用，由provider标签上面的value决定

- 接收数据的组件，只要定义一个固定名字的静态属性，值就是引入进来的context就可以用

  ~~~jsx
        //提供数据的组件
  import context from ../././   //这就是导入上面的写好的全局context
  var { provider }=context   //结构赋值的写法，定义这个context对象里面的provider成员，这名字一定
  class Test extends react.component{
      state={mes:111}
      render(<div>
                 <provider value={this.state.mes}>  //value定义哪些数据可用被访问
                     <Child1></Child1>         //被provider包的组件，才可以访问数据
                     <Child2></Child2>
                 </provider>
             </div>)
  }
  
        //接收数据的组件
  import context from '../../'  //更上面一样，先引入这个全局的context
  class Child extends react.Component{
      static contextType=context  //这里这个静态属性名字，是定死的
  }
  ~~~

#### 3.1.7、组件样式问题

- 样式一般用类名来控制，引入css文件后，根据css里面写的类名直接写在本身组件标签的className属性上面

  ~~~jsx
  a.css里面
     .class1{
     			color:red
     	}
  组件里面
  import ./a.css
  <div className=‘class1’></div>
  ~~~

  

- 在一个组件中，如果组件里引用了css文件样式，那么如果这个组件里有子组件，那么这个样式很可能也会应用到这个子组件里

- 解决办法是，在命名样式文件.css时候，在.css前面加一个前缀.module，也就是成了 xxx.module.css

- 引入的时候就是把这个css文件当做了模块引入了，使用 import style from '...module.css'  这样这个style就是样式的数组了，然后具体使用的时候，在哪个上面需要样什么样式，就需要写 style.class名字即可

- 注意：一般的，这只常用于class跟id选择器，标签选择器啥的直接使用不能使用 

  ~~~css
  .class1{
    witdh:100px
  }
  这个css文件命名时候，命名为  A.module.css
  
  组件里使用时候
  import style from '../A.module.css'
  <div style.class1></div> 
  ~~~










### 3.2、事件

- 跟之前的html写法基本上一样，一般用on写在标签里的。不过写事件时候，要用小驼峰写法

#### 3.2.1、函数组件内事件写法



~~~jsx
const Test function(){
  return ( <div onClick={handler}></div> ) // 这时候的这个处理函数一定要是写在这个test前面
}
~~~

#### 3.2.2、类组件内事件写法

~~~jsx
class Test extends component{
  render(<div onClick={this.handler}></div>)  //在类里面，是要加this的，方法也就是写在类里面的                                                方法就行
  handler(){xxx}
}
~~~

#### 3.2.3、事件对象

- 在react中，事件对象跟html中一样，在事件处理函数里是默认有的，但是这个是react虚拟出来的，但是跟原生的基本上一样的作用。也就说事件处理函数里没有要传的实参时候，默认的写一个形参就是事件处理对象e 

  ~~~jsx
  class Test extends component{
    render(<div onClick={handler}></div>)
    handler(e){
    	e.target              //这是拿到事件元素的DOM对象，可以像操作dom时候一样操作了
      e.stopPropagation()  //阻止冒泡行为
      e.prevenDefault     //阻止默认行为
  	}
  }
  ~~~

#### 3.2.4、事件函数传递参数

- 在类组件中，事件函数的参数传递是在事件函数后面加一个bind方法，里面的第一个实参一定是this，从第二个开始的实参才是真正要传的参数。然后这是事件函数在定义的时候，形参中不用写this了，直接从实参开始写，如果函数中需要事件对象，那么形参只要比实参多一个，最后一个形参就是事件对象

  ~~~jsx
  class Test extends component{
    render( <div onClick={handler.bind(this , 1 , 2)} )
    handler(item1 , item2 ,e){    //这里的item1,2就是对应的实参1 ，2 ，e就是事件对象
  		xxx  
    }
  }   
  ~~~


#### 3.2.5、事件函数的this问题

- 在JSX事件函数方法中的this，默认不会绑定this指向。如果我们忘记绑定，当我们调用这个函数的时候this的值为undefined。所以使用时一定要绑定好this的指向！

![](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/10/000bb708d55935b83a611f37318ee1d89c32bb26.png?sign=a0d08668cfee717e94664b0682dfaa23&t=5f95992c)

例如，像下面这段代码回调函数中的`this`输出为`undefined`：

~~~jsx
import React, { Component } from "react";

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={this.clickHandler}>
                    老林说
                </button>
            </div>
        );
    }
    clickHandler() {
        console.log(this);
    }
}

export default App;
~~~

解决上面出现的`this`指向问题的方式有以下几种：

- 通过类组件的构造函数进行绑定

~~~jsx
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props)
        // 解决this指向问题
        this.clickHandler = this.clickHandler.bind(this)
    }
    
    render() {
        return (
            <div>
                <button onClick={this.clickHandler}>
                    老林说
                </button>
            </div>
        );
    }
    
    clickHandler() {
        console.log(this);
    }
}

export default App;
~~~

- 使用bind绑定

~~~jsx
import React, { Component } from "react";

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={this.clickHandler.bind(this)}>
                    老林说
                </button>
            </div>
        );
    }

    clickHandler() {
        console.log(this);
    }
}

export default App;
~~~

- 使用箭头函数：方式1

~~~jsx
import React, { Component } from "react";

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.clickHandler()}>老林说</button>
            </div>
        );
    }

    clickHandler() {
        console.log(this);
    }
}
~~~

- 使用箭头函数：方式2

~~~jsx
import React, { Component } from "react";

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={this.clickHandler}>老林说</button>
            </div>
        );
    }

    clickHandler = () => {
        console.log(this);
    }
}

export default App;
~~~

> 后续使用this（特别是在自定义事件处理程序中），一定要注意绑定绑定this指向。



### 3.3、status

#### 3.3.1、基本设置

- 第一种是在类构造函数里面设置

  ~~~jsx
  class Test extends react.component{
      constructor(props){
          super(props)
          this.status={    //这里设置status，是等于号，而是是个对象
              mes:0
          }
      }
      render(){ return <div> {this.status.mes} </div> }  //渲染用的时候直接用
  	fn(){}                    //函数如果想用的
  }
  ~~~

- 第二种是直接在类里面设置

  ~~~jsx
  class Test extends react.component{
     state={
         mes:1      //直接写就行，当做类的自己的本身属性写
     }
      render(<div> {this.state.mes} </div>)
  }
  ~~~

####  3.3.2state的修改方法 setstate

- 它本身就是类里面的一个**方法**，语法： this.setState( 要处理的数据过程 ， [ 回调函数 ] )  这个方法是异步的，但是它的回调函数一般不用

  ~~~jsx
  方法一：用对象的形式写 对象名就是直接写state里面的数据属性名，值就是处理的过程
  class Test extends react.component{
      state={
          mes:1
      }
  	render(<div onClick={this.handler()}></div>)
  	handler(){
      	this.setstate({
              mes: this.state.mes + 1  //不可以写this.state.mes++ 这是属性值，不是赋值
          })
  	}
  }
  方法二：用函数的方式，一定要有返回值，返回值一定要是个对象，跟vue一样
      this.setState( function(value){  //这里可用用箭头函数，这里的这个参数就是数据state这个对象
             return {
                mes:value.mes + 1     //一样的，这里直接写数据的属性名就行，不用this的
             }
         } )
  ~~~


### 3.4、生命周期函数

1. **constructor（props）{super（props）}**：组件的构造函数，挂载之前被调用

2. **2.static getDerivedStateFromProps(nextProps, prevState)**：这是一个静态方法，静态方法一般都是纯粹的，不能在里面用this。**两个参数分别是接收到的新props值，和当前的state对象。必须有返回值，值是date里面数据更新规则，或者是null**

   > 只要接收到的props有变化，就会执行。一般这个方法就是用接收到的props里的数据来更新组件本身的state值，所以这个方法里一般都是些判断，判断如果接收到的props的数据需要更新到date里，返回值就是个对象，对象属性名就是state里哪个要更新数据的名字，值就是数据处理方式，如果不需要动state值，就返回null

   ~~~jsx
   class Test extends component{
       static getDevedStatFromProps(props , state){
           if (props.a===state.a)  //这里的判断一定要是全等，不然会报错
               return null
       }else{
           retuen{ a:props.a }   、//这里的a 就是state里面的a ，千万不可以写state.a:props.a 这                                 里是对象 
       }
   }
   ~~~

3. **render()**：render()方法是必需的，它主要负责组件的渲染，会被重复调用若干次，不建议在此处写异步代码                   （大概率会死循环）

   

4. **componentDidMount**

   - 类似于vue的mounted

   - `componentDidMount`在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。

   - **`通常在这里进行ajax请求`**

   - 如果要初始化第三方的dom库，也在这里进行初始化。只有到这里才能获取到真实的dom.

     

5. **shouldComponentUpdate(nextProps, nextState)**

   > 这个方法主要是、一个子组件的时候，是相当于修整个父组件的render重新渲染的。所以这时候那个没动的另一个子组件也会被重新渲染了，这浪费内存了，所以这时候如果在这个子组件里写这个方法，根据props数据判定，这个方法返回值是false就是不渲染，TRUE就是渲染。
   >
   > **现在被react处理过了，组件继承的时候，继承pureComponent，就可以了，原来就是用了这个方法**

   

6. **getSnapshotBeforeUpdate()**
   - 在react `render()`后的输出被渲染到DOM之前被调用，用于获取渲染之前的DOM信息，**需要配合componentDidUpdate()一起使用。**在vue中，类似于`beforeUpdate()`
   - 

7. **componentDidUpdate(prevProps, prevState, snapshot)**

   - 类似于vue的updated生命周期
   - 在更新发生后立即调用`componentDidUpdate()`。

8. **componentWillUnmount()**

   - 类似于vue的beforeDestory

   - 在组件被卸载并销毁之前立即被调用。在此方法中执行任何必要的清理，例如使定时器无效，取消网络请求或清理在`componentDidMount`中创建的任何监听。

   

### 3.5受控组件/非受控组件

> 这两个一般形容的都是input框类型的，受控组件是指input的值是收react的state管理的，可以用onChange事件来做到双向数据绑定
>
> 非受控组件就是input的值不收react的state管理的，由DOM本身管理

#### 3.5.1、受控组件

- 也就是把state中的值跟input的value值绑定在一起，这个实现方式就是很简单，给value绑定state的值，然后通过input的onChange事件里，通过事件对象`e.targe.value`获取到这个input的最新输入的值，在把这个值通过setState方法赋值给state，就是实现了双向数据绑定

#### 3.5.2非受控组件

- 就是说这个input框的值不跟state绑定。先利用react的内置方法createRef（）方法 在对象的constructor里面创建一个ref对象。然后再input框里面定义一个属性，名字是ref  值就是这个定义好的ref对象。然后input里面不能再写value了，如果写了，就成了受控组件了，这时候这里写defaultValue属性了（如果这个值写了就是个默认值，非受控组件不会实现双向数据绑定），然后再处理函数里面，直接获取一开始创建好的那个ref对象，在里面有个current.value就是当前最新的输入的值了

  ~~~jsx
  class Test extends {
      constructor(props){
          super(props)
          this.aaa=react.createRef()   //创建一个ref对象
      }
      state={ mes : 'ttt' }            
      render( <input defaultValut={this.state.mes} ref={this.aaa}></input> 
            <button onClick={this.handler.bind(this)}></button>)
  	handler(){
          console.log(this.aaa.current.value)  //这里可以通过前面定义的ref对象拿到这个对象放在·												哪个的input框里的最新数据
         	this.setState(state=>{
              return{
                  mes:this.aaa.current.value
              }
          })
      }
  }
  ~~~

-  另一种说法（广义范围的说法），React组件数据渲染是否被调用者传递的 props 完全控制，控制则为受控组件，否则非受控组件。

### 3.6、高阶函数HOC

- 高阶函数就是定义一个可复用的函数，函数有个参数，参数是另一个组件，高阶函数必须返回一个类组件，这个类组件里的render要渲染参数组件

- 高阶函数的意义就是对参数组件做处理，哪个参数组件需要它处理，最后再这个组件的export时候，调用一下这高阶函数就行，有点像复用组件的感觉

  ~~~jsx
  //定义一个高阶函数，在src里面创建一个文件夹HOC，比如在里面定义个在组件末尾加一段文字的功能js文件
  
  import {Fragment} from 'react'  //这个Fargment就是为了符合render里面需要有且一个                               根元素搞得，这是react提供的一个伪标签，也可以简写成 < ></ >  空标签
  
  const endAdd=function(Hoc){         //这是个参数，写啥无所谓，但是首字母要大写
      return class Test extends react.component{
          render(
          return	<Fragment>
                      <Hoc></Hoc>  
                      <div>这里是添加的内容</div>  //这里就是处理传过来的组件
                 </Fragment>
          )
      }
  }
  export default endAdd
      
  //然后比如这时候有个组件需要在组件内加点内容，就可以用高阶组件了，具体用法就是最后在组件导出时候，调用一下这个高阶组件方法
   import addText from '../../xx.js' //把高阶组件引入进来
   class Test extends react.component{
       renter(
       	return <div>这是组件本身内容</div>
       )
   }
   export default addText(Text)  //把本组件传入HOC，它处理后返回一个处理好的类组件
  ~~~

  

### 3.7、redux

-  这个的作用就是跟vue的store的作用一样，也是弄一个全局的仓库，然后谁用谁调取，**redux数据是网页一刷新就没了的**

  1、先在store文件夹里面定义一个store仓库（jsx的格式）

  - 导入redux里的createStore方法，用来最后创建这个仓库

  - 先在外面是定义好默认数据 const defaultDate={mes:1}

  - 再写纯函数 reducer（state=defaultDate ， actions）{return}  ：这两个参数固定的，**必须有return，return 的东西就是会完全覆盖掉上面定义好的默认数据数据 **这个函数的作用就是，根据第二个参数action的规则，返回仓库的新数据

  - 产生仓库store： const store=createStore（reduce）：这是参数是上面的函数，仓库得要有数据吧，这个reduce就是返回仓库数据用的

  - 导出store ：export default Store

    ~~~jsx
    import {createStore} from 'redux'
    const defaultdata={mes1:11 ， mes2:22}  //定义好数据源
    
    function reducer(state=defaultdata , actions){  //定义好reducer函数，参数名字是固定的
        return state  //这里返回的是什么，就是完全代替了数据源 defaultdate
    }
    
    const store =createStore(reducer)  //产生仓库 
    export default store  //导出仓库
    ~~~

    

  2、然后是视图组件，也就是哪个组件要用这个store里面的数据

  - 先引入store仓库  

  - 再用这个仓库自带的方法store.getState()才可以拿到整个仓库里数据 

  - 这时候，这个组件如果要修改store里面的数据，需要写好action任务规则，然后再通过store的自带方法store.dispach(action)  进行派发定义好的任务

    - 这个action规则书写是一个对象形式，这对象里面一定要有个成员叫type，值是啥无所谓，后面的reducer函数就是根据这个type来做不同处理的（因为可能有好多个组件要用这个store，所以到时候会有好多个action）

    ~~~jsx
    //这是需要用数据的组件
    import store from '.../xx.js'  //引入store仓库
    
    class Test extends component{
        state={mes:store.get().mes1} //这里就是把store里面的数据mes1复制给了本身组件的mes，注意如果是有
        
        render(
        	return<div>
             	<button onClick={this.hanler.bind(this)}></button>  //通过点击，把store里												面数据加1赋值给本身组件mes
             </div>
        )
        
        handler(){
            const action={        //定义action，这个名字其实取什么无所谓
                type='add'，      // action规则里面一定要有的type，后面reducer就是根据这个									type来判断处理
                val:1	 	//这里定义其他的东西，都可以，看自己，因为这整个action到时                                候都会被带到reducer的，因为我这里是需要给数据加1，就定义了 个要加的数
            }
            store.dispatch(action)  //通过这个方法，把定义的action发送给reducer方法
        }
    }
    ~~~

    

  - 这时候在store文件里的 reducer函数里，就要写第二个参数的actions的判断，写的判断依据就是actions.style 再去分别处理 ，到这里的处理，最后记得return返回数据

    ~~~jsx
    //这里是reducer方法里，要根据收到的所有acitions来判断处理了
    fucntion reducer(state=default , actions){
        if(actions.type==='add'){
            return{ ...state , mes1:state.mes1 + 1}//因为这里的return的东西是全覆盖的，所有先解构赋值，把原来的数据相当于复制一份出来，然后再再后面写要处理的，所有前面解构处理的同属性名的就会被后面的处理的代替
         if(actions.type==='xxx')  ///这里再处理其他的情况
        }
    }
    注意，到这里，知识修改了store里面的值，但是如果哪个组件的数据用了这store的数据，现在改的数据不会自动同步过去的，还是原来的值
    ~~~

    

  - 到这里，知识修改了store里面的值，如果说在第二步的第二点里面，用了store的数据，而且还把store的数据给到了自己组件的state里面，那么这里还要通过store方法  store.subscribe( function(){} ) 在这个函数里的参数函数里，，再把数据通过本身的this.state()方法设置一下。也就相当于，这个方法是store里面的数据更新时候，这个函数就会触发

    ~~~jsx
    //这里回到组件里，设置同步数据
    import store from 'xxx'  //引入store
    class Test extends component{
        state={mes:store.getState().mes1}   //设置市store里额数据给自己组件
        
         //订阅数据：使用store.subscribee方法，这个方法是store里数据只要变化，就会执行
         store.subScribe(function(){ 
            this.setState(()=>{  
                return{
                    mes:store.getState().mes1
                }
            })
        })
    }
    
    //取消订阅，就是如果这个组件被销毁了，但是订阅的这个操作如果不销毁，还是会一直在的，跟请求类似，如果发送了请求，请求还没回来
    但是这时候你把整个组件关掉了，请求不会停的，还在等着回来，所有一般的这些操作都是在组件被销毁的时候也要跟着去掉，
    取消订阅方法：整个订阅数据会返回一个方法，执行这个方法就是取消订阅了
    const unsubscribe =store。subscribe（xxx）
    unSubscribe（）//执行函数，就是取消订阅
    ~~~


#### 3.7.1、redux的模块化.

- redux的模块化就是把它分成了不同模块，在store文件夹里，分别再建立模块化文件夹

  - state：这个文件夹里放的不同文件（.js）就是不同的情况需要要的数据

    ~~~jsx
    const state={
        mes：1
    }  export default state
    ~~~

  - Type：这个文件夹，不同文件就是放的不同的action里面的**type值**情况，一般的这个文件夹就只有一个文件，把所有人定义的type的值放在一个文件夹里，可以避免有重名的type情况，按需导出

    ~~~jsx
    export const type1 ="aa"
    export const type2 ='bb' //这里是type的值！！！！
    ~~~

    

  - Actions:这个文件夹里的不同文件放的是不同场景的action

    ~~~jsx
    //因为action里面是需要用到type的，所以，每次action文件里，需要哪个type，就导出哪个，但是type文件是一个，而且里面很多个type，导入的时候，如下
    export action1={
        type:actions.type1 //这里就是用了actions里的某一个。因为action要求是个对象，所以这里是个对象形式导出，其实，实际中，更好的是用函数，不过函数返回个含有type的属性对象，这样比较灵活
    }
    
    export action2={   //因为一个场景里可能需要多个action，比如一个场景是处理数据，处理方式有加，                                                        也有减的情况
        type：actions.type2
    }
    
    //函数action的导出形式 :如果用函数的形式，那么type的值就是参数形式了，那么在这个action里，就不用在最上面引入type了，到时候那个reducer里面需要用action，而action最终的实参是在调用它的组件里，所以到时候如果用type的话，是在那个组件里引入下面这行就行
    import * as types from xxx/../.type   //这里的意思是把这个type里的所有可导出的都拿到放到一                    个 types的对象里了，后面想用哪个，就具体的type.里面的名字就行
    export const action1=（a , b ）{
        return {
            type:a,
            mes:b
        }
    }
    ~~~

  - reducers:这个文件夹里就是处理不同action的函数，也就是说，基本上action文件夹里有几个文件，reducer文件夹里就有几个文件对应这几个action文件处理函数

    ~~~jsx
    //引入数据文件
    import data from '..x../state' //引入这个reducer对应的数据
    
    //这里不用引入所需要的actions，这个引入的操作是在处理数据的组件里，用store.dispathch(action)完成了
    
    function reducer(state=date ,actions){
        if(actions.type=''){return}   //这里就是根据一个场景里不同的情况action，来做不同处理
        if(actions.type=''){return}
        。。。
    }
    ~~~

  - 最后在仓库的创建文件里 index.js里面再把不同的场景的reducer进行整合，因为一个store里面只能有一套数据，如果你有两个场景，那不整合的话，数据就会同时存在两份的情况（可以有几份数据，但是不能同时有几份数据）。这个index.js 文件一般就是放在store里面，就是最开始创建store仓库的那个文件

    ~~~jsx
    导入项目中所有场景的reducer
    import { configStore， combineReducer} form 'redux' //combineReducer是内置的reducer整合函数
    import reducer1 from '../../'  //这里导入的是reducer，肯定是不同文件
    import reducer2 from '../../'
    
    const Rootreducer=combineReducer(
        {reducer1:reducer1 ,       
         reducer2:reducer2}   //  combineReducer方法参数是个对象形式，注意如果这里有多个reducer的时候，这时候就是相当于把所有reducer的数据用对象的形式放在了store.getState()方法里，，如果组件要用自己的reducer里的处理后的数据，这时候取数据时候注意需要多一层.reducer.数据
    )
    const sotre=configStore({
        reducer:Rootreducer    产生store仓库，属性名reducer必须要写
    })
    export default store
    
    ~~~


#### 3.7.2、react-redux

- 这是一个插件，先安装。它的作用就是可以把store里面的数据和dispatch（）方法全部、或者按需导入到组件本身的props里面去，放心，这个数据是不会跟父组件传到props里面的数据冲突的，这两个数据共存

  1. 先定义好全局任何组件都可以访问store里面的数据

     > 在项目跟组件里引入redux，，
     >
     > 然后引入react-redux里面的Provider组件，并把根组件包着，表示整个项目的任何组件都可以使用store数据了
     >
     > ~~~jsx
     > import redux from 'redux'
     > import {Provider} from 'react-redux'
     > import store from '/../.'  //引入store的index，也就是引入store数据
     > const root = createRoot(document.getElementById('root'))
     > root.render(
     >         <Provider store={store}> //这里store属性必须有，里面放的是store数据
     >             <Test1></Test1>
     >         </Provider>
     >    ）
     > ~~~

  2. 组件里使用store数据时候，先把所需要的高阶组件connect引入，这个的作用就是调用，把后面用于链接到组件自己props的函数启用。然后如果这个组件需要store的数据，或者想改store里面的数据，就把数据和dispatch通过方法绑到组件自身的props上面。那里用，就哪里调佣就行

     ~~~jsx
     import {connect} from 'react-redux'
     class Test extends react.component{
         sate={mes:'组件本身的数据'}
         render(){
             return <div></div>
         }
     }
     function mapStateToPorps(state){  //这里的参数state就是store里面所有reduce的数据
         return state.reducer1.mes1  //这里必须有返回值，返回的值就会添加到本组件的props里面，而且如果本组件用了这个添加进来的数据，这个数据也是带自动更新的
     }
     function mapDispatchToProps(dispatch){   //这个方法必须有return，里面是方法的集合，这里的方法全部会被一个个添加到本身组件的props上面
        return{ 
            dispacth1(a){       //这个方法会在组件本身的props上面，          
                dispatch（a）{}  //这里面是写dispatch，也就是说，把原来的dispatch方法包装了一下，哪个地方需要，那么就在哪个地方调用上面的dispatch1方法就行
            }，
            dispatch2(b){    //这样可以面对多个不同dispatch时候，可以灵活调用
                dispatch(b){}
            }
        }
     }
     export default connect(mapStateToProps, mapDispatchToProps)(Login);
     因为上面两个只是单纯的方法，这个connect就是相当于把它们调用了，一调用，就会绑在了props上面
     ~~~

#### 3.7.3、redux-thunk

- 说到底很简单，就是原来正常的dispatch只能拿着action对象去找reducer，现在是通过这个中间件的配置，这个dispatch可以传入一个函数，这个函数有固定写法，必须要return一个方法，这个方法里就可以写异步操作。return出来的这个方法有两个参数，一个是dispatch方法，也就是说，最开始的dispatch步骤变到了这里，这时候这里的dispatch方法就可以写在异步操作的结束后的里面了。第二个参数就是getState方法

- 首先定义在store的index文件里，相当于设置告诉store，我需要用到redux-thunk，具体怎么配置，详见后面redux的配置说明

- 然后配置好后，在定义action的时候，action里面就已经写好了将来组件调用它的时候，需要执行的异步操作

  ~~~jsx
  //比如我有个需求，是一个异步操作，在发送请求完成后，我需要把请求的数据再定给设置到store里面某个数据，这时候，在组件里写到这个dispatch（a）时候，这时候的a是个方法了，实际在写的时候，是把异步操作写在了这里
  function act（val1 ,val2）{        //这时候的action一定要有返回值
      return (dispatch ,getState){  //两个参数一个是dispatch方法，一个是store的getState方法，在里面如果用，记得加（）
          dispatch(调用时候要传的action){  //这里就是本来在组件里希望异步后调用这个action执行的程序，这个参数action，一般就是通过最上面的val从组件里带过来
              
          }
      }
      
  }
  //组件里使用这个action时候，就是
  dispatch(act(实参1 ， 实参2))
  //不过这个的意思就是，本来按照原来的理解，这个地方dispatch后，就直接找reducer去了，但是，现在是执行了act里面东西去了，执行完后，act里面会再次新dispatch.这也就是所谓的中间件的意思
  ~~~

#### 3.7.4、redux数据持久化

- 因为redux数据是存在内存中的，所以一刷新页面，数据就会重置了，数据持久化就是把redux数据放在localstorage里面

- 安装插件`npm i redux-persist`

-  在文件中我们需要导入 redux-persist的两个依赖包，persistReducer, persistStore，分别用来配置保存的数据源和保存数据的方法

  ~~~react
  import { createStore } from "redux";
  import han from './chereduce';
  //配置数据的持久化效果
  import { persistReducer, persistStore } from "redux-persist";
  //导入需要配置的数据源，可以选择，storage，cookie,session等
  import storage from "redux-persist/lib/storage";
   
  // let store=createStore(han)
   
  //定义配置的信息
  const persitConfig = {
      key:"root", //这个就是存在storage的key值
      storage:storage,
     // 如果不想将部分state持久化，可以将其放入黑名单(blacklist)中.黑名单是设置
  //   blacklist: ['ll']
    //或者反过来，这里写白名单，也就是白名单里放的数据是会被持久化的
    // whiteList	：[]
    ！！！这里不管是白名单还是黑名单，这里的引号里的是reducer
  }
  //创建持久化的配置persist的信息
  const persist_reducers = persistReducer(persitConfig,han);
  //创建存储对象并且抛出对象，抛出对象时候，要抛出两个
  const store = createStore(persist_reducers);
  const persistor =  persistStore(store);
   
  export { store, persistor };
  ~~~

- 在入口文件中使用 PersistGate 包裹根组件。这将延迟渲染app 视图直到持久化状态取回并保存到redux中导入对应抛出的store对象和persistor对象直接使用配置即可

  ~~~react
  import { persistor, store } from './redux/store';
  import reportWebVitals from './reportWebVitals';
  // import {persistor} from './redux/store'
  const root = ReactDOM.createRoot(document.getElementById('root'));
  store.subscribe(()=>{
     root.render(
        <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>
           <BrowserRouter>
              <App />
           </BrowserRouter>
           </PersistGate>
        </Provider>
      )
  
  ~~~

  

### 3.8、路由（v6以下）

####  3.8.1、路由的使用

- react中，没有像vue中路由配置那种文件，就是如果想用路由，三步，定义路由模式并放置，放置link组件(声明式)、放置route组件

    - 定义路由模式并放置

    ~~~jsx
    //引用这三个路由组件
    //引入router组件时候就要确定好用什么模式，下面就是说明，从react-router-dom里面引入了HashRouter模式，并改名为Router
    
    import {HashRouter as Router} from 'react-router-dom'  
    import {BrowserRouter as Router} from 'react-router-dom'// 这是history模式
    
    //一般的，我们把router引入后，是让它包裹着根组件，这样也就是表示整个项目里里都可以用router了，而且这个跟provider的位置谁包谁无所谓
    root.render(
        <StrictMode >
            <Router>
            <Provider store={store}>
                <Test1></Test1>
            </Provider>
            </Router>
        </StrictMode>)  
    
    
    ~~~
    
    - 用路由的组件引用Link、Router ，两个个组件，Link组件是表示声明式导航，这个组件标签就是相当于a标签，里面的to属性值，就是地址。Router组件标签放在哪个位置，就是路由对应的组件放置的位置，它里面属性path就是表示的地址，component是表示地址对应的组件
    
        ~~~jsx
        //声明式导航
        import {Link , Router}from 'react-router-dom'//引入组件
        import com1 from '...'
        class Test extends componennt{
            render(){
                return <div>
                    	<Link to='/home'></Link> //声明式导航
                    	<Router path='/home' component={Test}></Router>//任何地方访问/home，展示的组件内容，都是在这里
               		  </div>
            }
                      
        }
        -------------------------------------------------------
         //编程式导航:this.props.history.push({
          pathname: "/home",
          search: "from=404",	// 表示传递查询字符串
          state: {				// 隐式传参，地址栏不体现
            username: "admin",
          },
        });
        
        this.props.history.go(-1)
         
        
        ~~~

#### 3.8.2、路由参数

- 路由参数：在Route定义渲染组件时给定动态绑定的参数。

​		React路由传参方式有三种：

- ==动态路由参数（param）==
    - 以“/film/detail/:id”形式传递的数据
    - 在目标页面路由中直接写传递
    - 在落地组件中通过`this.props.match.params`得到
    - 一般用于restful规范下的开发
- 查询字符串（query）
    - 通过地址栏中的 `?key=value&key=value`直接写传递
    - 在落地组件中通过`this.props.location.search`得到
- **隐**式传参（state），通过地址栏是观察不到的
    - 不合适写在声明式导航中，写在编程式导航中更加合适
    - 一般数用于**埋点**数据
        - 简单的讲，埋点是将部分标记隐藏起来，等待用户去触发，因为这个事情不想让用户看到（需要做一些数据的收集，后续做分析），因此会使用隐式传参的方式
    - 在落地组件中通过`this.props.location.state`得到

接收示例：

~~~jsx
constructor(props){
    super(props)
    this.state = {
        // 接收动态路由参数
        news_id: this.props.match.params.id,
        // 接收查询字符串并处理
        query: querystring.parse(this.props.location.search.slice(1)),
        // 接收state
        state: this.props.location.state
    };
}
~~~

实际项目中，如果没有做埋点的需求，上述三种参数的传递方式，建议优先考虑动态路由参数传递。

#### 3.8.3、嵌套路由

- react的路由访问默认是非严格模式的，也就是说，如果你访问index/a/，如果/index这个路由有组件，那么会显示index这个组件的，然后一般的这个index/a路由的组件是会写在index下的，这时候，它会再根据index/a路由对应的组件在index里的哪里，再显示出来。也就是说，如果index/a这个路由没有组件，那么你访问index/xxx/xxxjj后面怎么写，都会只匹配到index/这个路由的

    ~~~jsx
    //父组件里
    render(){
        return <div>
            		父组件本身的内容
        			<router path='index/a/'></router>
        	   </div>
    }
    ~~~
    

#### 3.8.4、重定向

- ~~~jsx
  import { Redirect } from "react-router-dom"  //引入
  
  <Redirect from="/from" to="/to"></Redirect>  //从哪，到哪
  ~~~

#### 3.8.4、Switch（404路由）

- ~~~jsx
  <Switch>  //这里只会匹配一个，按顺序一次匹配
          <Route path="/home" component={Cmp11}></Route>
          <Route path="/news" component={Cmp12}></Route>
          <Route path="/about" component={Cmp13}></Route>
          <Route component={NotFound}></Route>   //不写path，表示匹配所有路由情况，也就是404页面了
      </Switch>
  ~~~

#### 3.8.5、路由拦截（守卫）

- ~~~jsx
  <Route path ='/index' render={()=>{a? <Test1> : <Test2>}}
  ~~~

- 

#### 3.8.5withRouter高阶组件

**作用：把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上**

- 默认情况下，必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，才能执行this.props.history.push('/uri')跳转到对应路由的页面。然而不是所有组件都直接与路由相连的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props。

~~~jsx
// 引入withRouter
import { withRouter} from 'react-router-dom'

// 执行一下withRouter
export default withRouter(Cmp)
~~~

> 该高阶组件是路由包自带的东西，因此只需要引入+使用就可以了，不需要自己定义。



### 3.9、路由（v6）使用方法1

> 路由有两种写法，一种是直接写，跟之前的老版本一样，另一种是跟vue类似，可以把路由规则写成一个**组件形式**，导出，然后哪 个地方需要放置这些路由，就把这个组件放在哪里。这是第一种写法
>
> 主要使用的是react-route-dom里面不同的组件实现不同功能
>
> **引入的组件可以在类组件中使用，引入的方法，只能在函数组件内使用**



#### 3.9.1、基本使用

- 基本使用：一样的，现在根组件引用BrowserRouter/HashRouter,确定项目路由类型，并包裹跟组件

  ~~~js
  import {HashRouter as Router} from 'react-router'
  <Router>   //表示根组件里可以使用hash路由模式了而已，不是指定路由内容放置的位置
    <App></App>
    </Router>
  ~~~
  
- 路由内容展示的位置<Routes>和<Route>

  ~~~jsx
  import {Routes ， Route }  //分别是，路由容器，路由规则，声明式导航方式一
  import Test1 from '...'					//引入需要的组件
  <Routes>                        //没有Switch，用Routes代替了，路由规则一定要用这个包，精准匹配，没有顺序问题了
    <Route path='/index' element={<Test/>}></Route> //这里的element指定组件
  	<Route path='' element={<404/>}></Route>        //设置路径为空，匹配的优先级是默认最低的，可以用于404
    <Route path='/about'></Route>
  </Routes>
  --------------------------------------------------------------
  多级路由
  <Router>
      <SideBar>
          <Routes>
              <Route></Route>
          </Routes>
      </SideBar>
      <Main>
          <Routes>
              <Route></Route>
          </Routes>
      </Main>
  </Router> 
  ~~~

#### 3.9.2、Link和NavLink

- Link:就是基础的声明式导航，

- NAVLink：可以设置导航的激活样式：也就是导航被激活的样式

  ~~~react
  import {Link , NavLink} from 'react-route-dom'  //引入组件
  <Link to='/index'></Link> //基础用法
  <NavLink 
    to='/index' 
    className={({isActive})=>isActive? 'class1':''} //类样式：通过箭头函数接收isActive值（只能是active），函数必须有return，三元表达式确定active时候接收哪个class样式
  ></NavLink>
  
  <NavLink>
    to='/index'
    style={({isActive})=>{ //style样式，也是箭头函数，必须有返回值
      return{
        size:50px,        //导航没有被激活时候也会触发的样式
        color:isActive? 'red':'yellow'  //导航激活时候的专用样式
      }
    }}
  </NavLink>
  
  ！！！！！不管哪种方式，不管激活没有激活，箭头函数都是会执行的，只不过具体激活跟不激活的样式，看里面函数怎么写
  
  ~~~

#### 3.9.3、路由重定向

~~~jsx
//Navigate主要是用于重定向
import {Navigate} from 'react-route-dom'
<Routes>
 	<route path='index' element={<Navigate replace to='index1' />}></route> //必须写在element里面，写了replace，不会有历史记录，返回不到上一层，没写相当于push，有历史记录，可以返回上一个页面
</Routes>
~~~

#### 3.9.4、嵌套路由

- 直接在父组件里面写，地址是相对路径

- 配置好嵌套路由后，被嵌套的路由组件位置，由组件<Outlet>确定

  ~~~jsx
  import{Routes，Route ，Link ，Outlet}
  <Routers>
   	<Route path='/father' element={<Father />}> //直接在父route的里面写子route
      <Route path='childer1' element={<Child></Child>}></Route>  //这里地址不可以加/  这里访问的就是/father/chlider1
      <Route path='childer2' element={<Child></Child>}></Route> 
    </Route>
  </Routers>
  
  //在father的组件里面，用《Outlet》确定被嵌套的路由组件该显示在哪
  <div>
    父组件内容
    <Link to='/father/childer1'></Link>
    子组件的位置放置在 <Outlet>
  </div>
  ~~~

#### 3.9.5、路由配置文件

- 这个就是相当于vue中一样，把所有的路由信息配置到一个*文件**中，然后哪里需要，就用标签的形式放在哪里，里面的配置跟上面所有的基本上一模一样，只有少数不一样

- 使用组件的里面通过useRoutes函数生产一个路由组件 说白了，也就是生成了一个<Routes>

  ~~~jsx
  
  const routeConfig=[
       {
        path;'' ,           //默认的显示组件，这里只能用地址是空这个写法
        element;<Com1 />
      }
      {
        path;'index1' ,
        element;<Com1 />
      }
       {
        path;'index2' ,
        element;<Com2 />
      }
       {
        path;'father' ,   //路由嵌套
        element;<Com3 />,
          children:[     、//子路由的地址依旧是相对路径
            {
              path:'children1',   //这里访问的是father/children1
              elelmnet:<Children />
            }
             {
              path:'children1',
              elelmnet:<Children />
            }
          ]
      }
    ]
  
  export default routesConfig  
  
  ！！！！！！！！！！！！生成的这个配置文件就是相当于是Routers
  
  //使用配置文件的地方，比如跟文件
  import RoutesConfig from ''//引入配置文件
  import {useRoutes} from ‘react-route-dom  //引入可以产生<Routes>的方法
  const Tab =useRoutes(RoutesConfig)   //把配置文件放进去，就生成了
  
  <Tab/>直接使用就行
  
  ~~~

  

#### 3.9.6、编程式导航useNavigate()

~~~jsx
import {useNavigate} from 'react-route-dom'
const navigate=useNavigate()//useNavigate方法生成一个可导航的方法
navigate('/index' ,{replace:true}) //第一个参数是地址，第二个参数可以不写，写的话replace是真表示可以返回到上一页
navigate（-1）//后退
~~~

#### 3.9.6、路由传参

~~~jsx
1.push跳转+携带params参数
navigate(/b/child1/${id}/${title});   //地址栏直接后面带参数

2.push跳转+携带search参数
navigate(/b/child2?id=${id}&title=${title});   //get的问号和&符合传参

3.push跳转+携带state参数
navigate("/b/child2", { state: { id, title }}); //post方式传参

---------------------------------------------------------------------
接收参数：引入 usesearch（）、useSearchParams() 、useLocation()三个方法对应接收参数
import {useSearch , useSearchParams , useLocation} from 'react-route-dom '
export default function(){
  const par1=useSearch()  //接收params参数
  		par1.id
  const par2=useSearchParams()//接收search参数
  		par2.params.get('id')
  const par3=useLocation（）   //接收state参数
}
~~~

#### 3.9.7、路由守卫

- 在6以上的版本中，没有封装好的方法给路由守卫，可以采用高阶函数的方法来设置路由守卫

  ~~~jsx
  定义一个高阶函数
  const fun =(Par)={   //参数是传入进来的组件，注意，这里即使是参数，也要首字母大写，不然里面写组件时候会报错说不符合组件使用规则
    									//这里就是理解成 import 引入组件时候，也是一定要首字母大写
  		const a=2
    	if(a>2){
      	return <Par/>  //满足的话，就正常走传入进来的组件,
      }else{
      	 return <Navigate to="/adrr2" replace/> //不满足的话，就跳转，这里 一定要是用这个，不能用 useNavigate（）的方法
      }
  }
  ~~~

#### 3.9.8、路由懒加载

- **默认情况下，路由的js文件，是一起加载进来的，比如一个页面有好几个路由及子路由，第一次访问时候，会把所有路由的足都加载进来，路由懒加载是路由的js文件在被访问时候才会白加载，优化项目的首次打开时间**

  1. 把引入的js文件，由常用的import换成由react提供的方法lazy动态返回的形式

     ~~~jsx
     以前引入js或者组件
     import Test from "./test"
     
     路由懒加载形式
     import {lazy,Suspense} from “react” //引入lazy方法和suspense组件
     const Test =lazy( ()=>import('./test') )
     
     把路由配置中的组件用Suspense组件包起来
     <Route path='' element={<Suspense fallback={'加载中'}> <Test/> </Suspense} /> 
      //fallback里面可以是个组件，或者动画或者其他内容，表示在未加载完成时候显示的东西                        
     ~~~

     

# 四、react常用插件

## 4.1、react-transition-group（动画）

- 这是一个react的动画插件，官网是http://reactcommunity.org/react-transition-group/transition。

- 它的核心就是给CSSTransition组件标签上面添加不同的类，不同类代表不同动画效果。而CSSanimation网站https://animate.style/

  的动画组件也是控制标签上面加不同类名，所以一般这两个可以联合用，步骤就是先把animation的js文件引入进来，然后根据animation的配置要求<h1 class="animate__animated animate__bounce">An animated element</h1>  ，其中，第一个类名是一定要有的，表示用animation动画，然后再开始加动画类名

~~~jsx
import {CSSTransition , TransitionGroup} from 'react-transition-group'
//动画的配置基本上以下就够用了 其中，CSSTransition组件只能包裹一个标签，只能让一个标签有动画
 <CSSTransition                             
                in={this.state.isShow}   //属性in的值是TRUE或者false，表示显不显示动画
                timeout={1000}           //动画持续事件
                classNames={{						//这里就是给目标标签，根据不同的状态添加动画类
                    enter: "animate__animated",     //刚开始进入的一瞬间，一般不用
                    enterActive: "animate__fadeInDown", //元素显示动画的时候，也就是一般动画类加这里，
                                                        //所以这里如果想用animation的类的话，
                                                         //就应该写成enterActive: "animate__animated 具体动画类名1"
                    exit: "animate__animated",          //元素不显示动画时候瞬间，一般也不用
                    exitActive: "animate__fadeOutDown",	//元素不显示动画时，一般这里用
                }}
                unmountOnExit                           //元素动画结束时，是把这个元素dom级别删除了，如果不想删除，那么把这个属性取消，同时根据文档
                																				//在上面的className里在家一个 exitDone: 'my-done-exit',表示动画结束后，执行的类，这个类里写的是display：none
                >
                <div>玩转React Transition</div>        //这个就是目标组件，被<CSSTransition>组件标签包着的
            </CSSTransition>

~~~

## 4.2、immutable插件

- `npm i -s immutable`：这个插件的主要作用是 解决数组或者对象在使用时候引用传值的问题。就是比如我的源数据是state里的数据，然后我某个地方需要再次用到这个state里的所有数据，如果写`var tem=state`的话，那么后面我改这个tem里面的某个数据的话，原来的state里面数据也会改

- immutable就是把数据定义成了另外的格式，包括list`List`，`Stack`，`Map`，`OrderedMap`，`Set`格式的数据，**每次定义、修改数据，都是会生成一个新的引用的**。数据的修改、读取也是有固定的写法，不过都是通过immutable里面的方法实现的

- map数据和JS数据互转

  ~~~jsx
  //对象类
  state={      //原始JS数据
    		mes1:1,
        mes2:{
      		val1:21
          val2:22
    }
  }
  //js数据转成immutable数据
  import {Map , fromJS}                          from 'immutable' //引入两个方法
  const map1=Map(state)                         //转成了map数据，但是这只会转一层，也就是说，数据里如果还嵌套着对象、数组啥的，还是js类型的    
  const map2=fromJS(state)                     //转成map数据，里面所有的都会转成对应的immutable数据的，一般用这个
  
  //immutable数据还原成js数据:                    toJS()方法这个方法不用导入的，这个方法是在immutable数据的原型上的
  map1.toJS()                                  //将immutable数据还原成js数据  ，
  
  //获取immutable数据                           get方法和getIn方法：不用引入，原型上的
  const map1=Map（state）
  const data1=map1.get('mes1')               //获取数据中名字为mes1 的数据值
  const data2=mapq.getIn(['mes2' , 'val1'])  //参数用数组包着，数组值以此表示第一层的key，第二层的key
  
  //修改set()、upDate（）和setIn（）、upDateIn（）方法原型上的：只能修改一层数据  
  const map=Map（state）
  const change1=map1.set(key ， value)          //分别是被修改的数据和修改后的值
  const change2=map1.set(key ,()={})            //第二个参数是个函数，函数必须有返回值，值就是修改后的值，一般用这个方式
  const change3=map1.setIn([key1 , key1-1] , value)     //修改数据里的对象数据，跟前面一样，数组里是依次的key
  const change4=map1.upDateIn([key1 ,key1-1] , ()={})   //返回值是要修改后的的值
  
  //immutable数组数据类型
  import { List } from "immutable";
  
  const state = ["灞波儿奔", "奔波儿灞"];
  let list = List(state);
  
  // 获取
  console.log(list.get(0));
  
  // 合并
  list = list.concat(["黑鱼精", "鲇鱼怪"]);
  console.log(list.get(3));
  
  // 追加
  list = list.push("乱石山碧波潭");
  console.log(list.get(4));
  
  // 把List对象转成js数组
  console.log(list.toArray());
  
  
  //两个immutable比较
  import {is} from 'immutable'
  console.log(map1 === map2); //全等才是ture
  console.log(map1.equals(map2));// 数据相等就行，不用比价类型
  console.log(is(map1, map2)) //同上
  
  ~~~

- 在redux中使用这个插件，需要安装另一个插件 npm i -S redux-immutable：主要作用是在配置indux数据时候配置以下，步骤如下

  1. 在配置redux文件的合并所有reducers那里，把合并的方法改成用这个插件里的方法。（新方法与之前的是同名的combineReducers）

     ~~~jsx
     import { combineReducers } from 'redux-immutable'//之前从redux里面引入的那个combineReducers就不用了
     const store = createStore(
         // 合并多个reducer（整合数据源）,不合并会报错
         combineReducers({ counter, global }),
     ~~~

  2. 将所有数据源文件那里的数据都设置成immutable对象

     ~~~jsx
     import { fromJS } from "immutable";
     const state = fromJS({
         mes:11
     });
     
     export default state;
     。
     ~~~

  3. 在修改数据的时候，也就是在每个reducers里的时候，修改用immutable方式修改

     ~~~jsx
     function reducer(state=defaultState , actions){
       if (actions.type='yes')
         return state.upDate(state.me1 , ()=state.mes+1) //这里注意，根据immutable数据特性，这里state.upDate（）后是一个新数据，不是在原来的state上面修改的，只不过这个新数据经过返回后，赋值给了原来的state，所以，这里如果用之前写法，先state.update后，再直接return state，数据是没改的
     }
     ~~~

  4. 在组件使用的时候，用react-redux插件把redux的数据跟方法映射到组件自己props上面时候，需要把数据还原成js数据

     ~~~jsx
     function mapStateToProps(state) {
         // console.log(state);
         // 返回props对象
         // 这里可以获取整个仓库的数据：state
         // 也可以只要特定模块的数据，例如：state.global
         return state.toJS().global;   //用toJS方法还原成js数据格式
     }
     ~~~


## 4.3、反向代理

- npm install http-proxy-middleware 

- 在src同级目录下写一个setupProxy.js文件，名字只能是这个

  ~~~js
  const { createProxyMiddleware } = require('http-proxy-middleware'); 
  module.exports = (app) => {
      app.use(
          "/api",     //项目里只要请求发送到这个配置的地址标识符，就是会自动请求到下面的target地址
          proxy({
              // 此处的端口号要与后期数据请求的数据端一致，与后续的mock操作端口号一致即可
              target: "http://localhost:9000",
              changeOrigin: true,
          })
      );
  };
   
  
  ~~~
  

## 4.4css-in-js技术

- CSS-in-JS是一种技术，而不是一个具体的库实现。简单来说CSS-in-JS就是将应用的CSS样式写在JavaScript文件里面，而不是独立为一些css，scss或less之类的文件，这样你就可以在CSS中使用一些属于JS的诸如模块声明，变量定义，函数调用和条件判断等语言特性来提供灵活的可扩展的样式定义。CSS-in-JS在React社区的热度是最高的，这是因为React本身不会管用户怎么去为组件定义样式的问题，而Vue有属于框架自己的一套定义样式的方案。

- styled-components` 应该是CSS-in-JS最热门的一个库，通过`styled-components`，你可以使用ES6的标签模板字符串语法，为需要styled的Component定义一系列CSS属性，当该组件的JS代码被解析执行的时候，styled-components会动态生成一个CSS选择器（比较随意的），并把对应的CSS样式通过style标签的形式插入到head标签里面。动态生成的CSS选择器会有一小段哈希值来保证**全局唯一性**来避免样式发生冲突。

- 通过ES6里面的模版字符串形式写css样式（遵循之前css样式代码的写法）
- 每个样式选择器都会在编译之后自动被添加上一个hash值（全局唯一）

使用`styled-components`前需要安装，安装的命令如下：

~~~shell
npm i -S styled-components
~~~

由于css后期会在模版字符串中编写，默认情况下vscode是没有css样式代码片段的（写样式的时候是没有代码提示的），为了提高css代码在模版字符串中编写的效率，此处强烈建议安装一个vscode的扩展：vscode-styled-components

定义样式与使用

**定义**

~~~javascript
import styled from "styled-components";
const Title = styled.div`
    font-size: 110px;
    color: pink;
    font-family: 华文行楷;
    background-color: black;
`;
export { Title };
~~~

**使用**

~~~jsx
import React, { Component, Fragment } from "react";
// 就像使用常规 React 组件一样使用 Title
import { Title } from "./assets/style/style";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Title>桃之夭夭，灼灼其华。</Title>
            </Fragment>
        );
    }
}

export default App;
~~~

***效果**

![](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/11/0d46a4677c99b01d7caaecc08ec7349d21962da9.png?sign=d576889f41bac254c738e300e5de8c23&t=5fa04de3)

- 样式继承

在`styled-components`中也可以使用样式的继承，其继承思想与`react`的组件继承相似：

- 继承父的样式
- 重载父的样式

~~~javascript
import styled from "styled-components";

const Button = styled.button`
    font-size: 20px;
    border: 1px solid red;
    border-radius: 3px;
`;
// 一个继承 Button 的新组件, 重载了一部分样式
// 继承会合并与父的样式，但是如果遇到样式冲突（相同），会以自己的为准
const Button2 = styled(Button)`
    color: blue;
    border-color: yellow;
`;

export { Button, Button2 };
~~~

**使用**

~~~jsx
import React, { Component, Fragment } from "react";

import { Button, Button2 } from "./assets/style/style";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Button>我是第1个按钮</Button>
                <Button2>我是第2个按钮</Button2>
            </Fragment>
        );
    }
}

export default App;
~~~

## 4.5、classnames库

- 一个js库，可以通过方便控制组件类名的库

  ~~~jsx
  <Test classnames={'类名1' ， {‘类名2’:flag?true:flase } } //所有需要的类名都可以放里面，如果类名需条件判断决定是否有，则用大括号包起来
  ~~~


## 4.6、数据mock

1. npm i -D json-server

2. 创建一个json文件，里面放数据，数据源

3. 在package.json里面添加一个指令

   `server:"json-server json数据地址 --port 端口号"`

4. 启动服务器，npm run server  



# 五、函数组件react (补充)

- jsx的原理就是js+xml 是一个语法糖。原理是利用React.createElement来创建节点，所以基本上在jsx的{}里面可以写所有的js代码，但是只能展示字符串和数字，以及数组的数组直接展示
- **函数组件render函数后，都不可以放其他代码了**
- jsx中控制组件显不显示的的两个方法
  - flag && <Test>   flag是true就显示，false就不显示
  - flag？ <Test1/>  : <Test2/>    flag是真就显示第一个，假的话就显示第二个，
  - 这里的真假不是非要TRUE，只有不是否定类的东西都是真 

## 5.1事件

- react的事件是**复核事件**，其实是绑在了document上面，不是dom上面。然后由同一的事件处理函数派发

- 函数传参：

  - **箭头函数形式：推荐**

    ~~~jsx
    function Test（）{
      handler=(123)=>{}
    	render（）{
        return <>
        						<div onClick={()=>{handler(123)}}   //这里用箭头函数返回一个函数，这个函数就是绑定的函数就行
        				</>
      }
    }
    ~~~

  - 返回函数形式

    ~~~jsx
    handler (){
    	return ()=>{}
    }
    <div onClick={handler()}>
    ~~~

  - 事件对象

    ~~~jsx
    <div onClick={(e)=>handeler(par, e)}/>  事件对象要放在最后一个参数
    handler(par ,e){                     
    }
    ~~~

    

    

## 5.2数组渲染

- 其实就是用的js的数组方法，不过要用有return的方法才行

~~~jsx
1.常用map方法
const arr =[a,b,c]
render(){
  return <ul>
    				{arr.map（(key.index)=><li key={index}>{key}</li>)}
  			</ul>
}
2。用foreach方法
const tem=[]
arr.forEach((key , index)=>tem.push(<li key={index}></li>))
render(){
  return <ul>
    				{tem}   //因为每次foreach后，tem数据就会变化，就会重新渲染
  			</ul>
}
~~~

## 5.3函数组件

- 函数组件一般配合hook使用，hook是react里面的函数，作用是增强函数组件的功能，比如给函数组件提供数据性

### 5.3.1、useState

- **只要数据变化了，那么整个函数组件就会重新渲染**

- 定义数据以及这个数据专属的修改方法

~~~jsx
//函数组件本身没有state数据的，用hook，使其具有state数据
import {useState} from 'react'
const [name , setName]=useState('xiaoming') //useState（）执行后返回值是一个数组，里面有两个数据，第一个是数据就是传进去的数据，第二个是个方法，就是可以专门用来修改这个数据的方法

~~~

### 5.3.2**setState()的严重注意点**

- **数据，不管什么操作，只能是用它的专属方法进行操作，而且这个方法里的二次赋值，是全覆盖的。比如这个数据是个数据，后续需要给这个数组里添加一个数据，不可以直接用这个数据.push()，只能通过它的专属方法实现**

  

- **set方法修改数据是异步的！！！！所以在用set方法修改数据后，再后面紧接着获取，是获取不到修改后的值的，set方法的第二个参数就是一个回调函数，就是在异步修改后执行的操作**

  

- 修改数据方式1：常规修改

  - ~~~react
    import {useState} from 'react'
    const [mes1 , setMes1]=useState('数据1')
    setMes1('数据二' ，()=>{} )   //不写回调函数也没事
    ~~~

- 修改方式二：利用函数返回值修改

  ~~~react
  setMes1((pre)=>{} ， ()=>{}) //利用函数返回值修改，返回的数据就是新数据
  ~~~

  





### 5.3.2、useEffect

- 一个钩子函数，用于处理副作用函数，副作用函数的意思是，组件在渲染的时候，这个副作用函数会做些其他的事情，比如数据获取，订阅，操作DOm以及发送请求等等，它有两个参数，一个是副作用函数，一个是依赖数据组成的数组

- useEffects函数的副作用函数的依赖如果是个空数组，那么里面的副作用函数只会再第一次渲染组件时候执行

- **如果不写第二个参数，那么所有数据只要变，都会执行**

  ~~~react
  import{useEffect} from 'react'
  const Test=()=>{
    useEffect(()=>{
      console.log(1)  //依赖是空数组的时候，里面的副作用函数只会再刚开始渲染时候执行一次
    })
   , []}
  ~~~

- useEffect函数的副作用函数里，return一个**回调函数**，那么这个函数会在**依赖更新之前触发，在组件被销毁前触发**，也就是说，这里一般常常用来处理一些清楚操作，比如组件销毁时候，要记得把它里面的不用的异步操作需要清掉，取消数据订阅等等操作

  ~~~react
  const Test=()=>{
    useEffect(()=>{
      xxx
      return (                     //记得，必须是个函数，不能是 return console。log 不能是一段代码
      console.log('清楚一些')
      )
    })
  }
  ~~~

**注意：**

- **如果依赖数据是个数组或者对象，那么用方法直接修改里面的数据，是不会触发的，只有改变了这个数组或者对象的引用才会触发，所哟这里用方法该数据的时候，用函数返回数据的方式**

  ~~~react
  const [mes ,setMes]=useState({val:1})
  useEffect(()=>{xxx} , [mes])
  setMes(()=>{xxxx})  //这里需要使用这个方法来修改数据
  ~~~

- useEffect和useLayouEffect区别：

- **简单来说就是调用时机不同， useLayoutEffect 和原来 componentDidMount & componentDidUpdate 一致，在**

  **react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而 useEffect 是会在整个页面渲染完才会调用的代码。**

  - **在实际使用时如果想避免页面抖动（在 useEffect 里修改DOM很有可能出现）的话，可以把需要操作DOM的代码**

  **放在 useLayoutEffect 里。在这里做点dom操作，这些dom修改会和 react 做出的更改一起被一次性渲染到屏幕**

  **上，只有一次回流、重绘的代价。**

### 5.3.3、useCallback

- 因为setState的调用或者组件需要重新渲染的时候，所有的内容都会重新渲染，useCallBack就是为了缓存函数的，也就说，如果它的依赖不变，那么它在组件重新渲染的时候，还是上一次缓存的函数状态

- **callback并不能阻止函数创建，，它本质是缓存了数组的引用，通过依赖决定返回新的函数还是旧的函数，避免组件渲染时候对同一函数使用不同引用，它提供缓存了的函数地址，这对于diff算法来说，在渲染函数这部分来说会有所提升。但是callback本身是需要一定内存的，英文它需要对比函数的新旧地址。它一般用于父传给子组件数据是函数组件时候，配合usememo或者react.memo使用**

- **callback缓存的函数，是缓存了里面素有数据，就是如果里面使用的数据再第二次渲染时候，已经被其他东西改变了，callback函数里面的还是之前的数**

  ~~~react
  import {useCallback} from 'react'
  const Test =()=>{
   	const [mes  , setMes]=useState(1)
    const fun1=useCallback(()=>{    //useCallback两个参数，第一个就是要被缓存的函数，第二个是依赖，返回值是一个新函数，函数体就是第一个参数的函数体
      console.log(mes)
    } , [])                     //依赖是空数组，表示只会再组件初次渲染时候渲染，后面组件再渲染，都是一直用的初次渲染的时候
    setMes((pre)=>{pre+1})     //这里怎么改变mes的值，函数里永远只会打印出来刚开始的1  
  ~~~

### 5.3.4、useMemo

- 跟callback基本上一样，只不过它不是返回一个函数，而是把这个函数给执行掉了，所以它很像vue中的计算属性，一帮用来处理一个固定的逻辑，然后给你返回结果，同样的，它也是有缓存的

  ~~~jsx
  import {useMemo} from 'react'
  const tem=useMemo(()=>{return 1} , [])//一般的用它是处理一些固定的逻辑，并有返回值的情况，依赖变化，才会执行
  ~~~

**上面三种方法都是根据依赖是否变化才决定要不要执行，当从不执行到执行的时候，也就是依赖发生了变化的时候，那么这次执行的时候，获取到的数据都是最新的值，不是还用原来的值去处理了**

### 5.3.5、useRef

- 保存变量引用！！这个跟之前类里面的一样的作用，定义好了ref后，放在谁身上，通过ref.current拿到的就是谁，经常用来拿dom对象

  ~~~react
  import {useRef} from 'react'
  const Test=()=>{
    const tem=useRef()
    render(){
      fun1=()={
        console.log(tem.current) //拿到的就是整个Child组件信息
      }
      return <div>
        				<Child ref=tem></Child>
      			</div>
    }
  }
  ~~~

- 面试题：如果保存一个变量：因为函数 组件在数据变化时候，会重新渲染，用const直接定义的变量会每次重新渲染变成初始值

  答：用ref保存  `const tem=useRef(1)  tem.cuttent++` 这时候，如果组件重新渲染了，tem.current的数据是2，

### 5.3.6、useContext

- 跟类组件基本上一模一样。主要的作用用于给子组件传值的情况，先用react的createContext方法创建一个context仓库，

- 然后在父组件里引入这个context仓库，使用里面的context.provider组件包裹着子组件，表示里面的所有子组件可以使用父组件提供的数据了，具体是哪些数据，由整个context.provider组件的属性value决定

- 然后子组件里想要接收这个组件的话，也是需要引入仓库，在里面使用useContext。把这个仓库传入这个函数的参数，返回的值就是父组件提供的value数据

  ~~~jsx
  创建一个context仓库
  import {createContext} from 'react'
  const Context1=creactContext（） //创建
  export default Context
  
  父组件里提供数据
  import Context from ',,.' //引入context的创建文件
  <Context.provider value={mes}>  //提供数据
    <Child></Child>
  </Contest.proveder>
  
  子组件里面使用数据
  import Context from '.....'//引入context创建文件
  import {useContext} from 'react'  //引入方法
  const tem=useCotext(Context)//把context仓库当做参数传入函数，得到的就是这个仓库里的提供者提供的数据
  ~~~

  

## 5.4、新版redux

安装`npm i @reduxjs/toolkit react-redux`

- 新版的redux的书写逻辑是按照场景的分类，一个文件创建一个场景的store，然后再建立一个总的store总文件index，把这个利用react-redux放在项目根目录上面。其中这个子store文件里，写好这个store相关的actions和dispatch方法，分别把这dispatch和actions导出去，其中dispatch一般导出给index，action是哪个组件需要就导入

  1. 写好子场景的store文件

     ~~~js
     import {createSlice} from '@reduxjs/toolkit'  //这个方法生产子store文件
     const store1 =createSlice({
     			name:'tem1' ，           //仓库名字
       		initialState：{
       				mes1：'数据1'      //数据的初始值
     				}，
           reducers：{
               	method1(state , action){},   //这里的reducers里面的方法集就是所谓的action ，后面组件使用dispatch，
       																			//就是dispatch这里方法的执行,实际执行时候，如果传参数了，参数就在
       																		  //这里action参数的payload属性上面  
       					method2(state , action){}
                     }
     })
     
     const {method1 ， method2} = store1.actions //仓库自带的方法，就彻底把写好的方法变成了actions，组件需要时候，
     																						//就执行一下就行,也就是（）一下，就生成了正宗的action
     const store1Reducer=store1.reducer      //同样的，生成reducer
     
     export { method ， methos2}       //按需导出actions
     export default store1Reducer    //默认导出reducer
     
     ~~~

  2. 把所有的子store配置到总的store文件index中

     ~~~jsx
     import store1Reducer from ‘’//引入子reducer
     import {configureStore} from ’@reduxjs/toolkit‘  引入方法，用来配置总的store文件
     const store = configureStore（{
     		reducer:{
         		store1Reducer:store1Reducer  //配置好所有的reducer
         }
     }）
     export default  store   //导出给根组件用
     ~~~

  3. 根组件配置store总文件

     ~~~jsx
     import store from '..'//把总的store文件引入
     import {Provider} from 'react-redux' //用react-redux把store注入react项目中
     <Provider store={store}>
       <APP></APP>
      </Provider>
     ~~~

  4. 组件里使用store数据，用钩子函数useSelector（）

     ~~~jsx
     import {useSelector} from 'react-redux'
     const {data1} =useSelector（(state)=>state.store1Reducer）//这里state是所有子store里面的数据集合
     ~~~

     <img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231025000339528.png" alt="image-20231025000339528" style="zoom:53%;" />

  5. action修改同步数据useDispatch

     ~~~jsx
     import {useDispatch} from 'react'
     import {method1} from '..'  //导入子仓库里导出的action方法，执行一下这方法就是action了
     const dispatch=useDispatch（） //生成dispatch方法
     const mes1='本组件数据'
     dispatch（method1(mes1)） //执行dispatch，并传参 ，参数会挂载在对应子store里的action方法的action参数的payload属性上
     ~~~

  6. **异步操作：@reduxjs/toolkit的configureStore功能已经默认配置好了redux-thunk中间件了，所以可以直接用**

     1. 创建store的写法保持不变，配置好同步修改状态的方法 

     2. 单独封装一个函数，在函数内部return一个新函数，在新函数中 

        - 2.1 封装异步请求获取数据 

        - 2.2 调用同步actionCreater传入异步数据生成一个action对象，并使用dispatch提交

     3. 组件中dispatch的写法保持不变

     ~~~jsx
     例子：比如想把异步请求回来的数据放在原来的数据mes中
     
     //在子store中
     import {createSlice} from '@reduxjs/tootlkt'
     const store2=createSlice({
     				name:'tem2',
       			initialState：{mes：1}  //原始数据
       			dispatch:{
             	methods1(state , actions){ state.mes=actions.payload }
               methods2(state , actions){}
             }
     	})
     
     
     const {methods1} =store2.actions  //把actions生成
     const {store2Reducer} =store2.reducer
     
     //封装一个函数（这个函数最后就是当做actions使用了），内部返回一个函数，并在里面写好异步代码和dispatch一下
     const fun1 = ()=>{											
     			return async (dispatch)=>{                //这里的参数，就是dispatch方法，
           		const req=await axsio.get(url)
               dispatch(methods1（req）)         //这里的dispatch就是相当于以后谁要用这个函数（action）dispatch时候
             																		//就是被这里的dispatch代替的
           }
     }
     export {methods1 ，methods2 ，fun1}  //导出这个经过异步操作的actions
     export default store2Reducer
     
     //组件中使用还是一样的，只不过异步操作一般再useeffect中
     import {fun1} from ’‘
     import {useDispatch} from 'react'
     
     const dispatch=useDispatch()
     useEffects（（）=>{
     		dispatch(fun1())
     },[dispatch]）
     ~~~


## 5.5、路由（第二种方式）

- **就是直接把所有的路由规则写在一个文件里，然后放到根目录下，同时用了Provider标签，表示所有的路由显示就是显示在这个位置的，这个效果就是，所有的路由页面基本上都是一个一个占满全屏的页面**

1. 写好路由总配置文件，在里面生成路由实例

   ~~~jsx
   import Test1 from ''//引入路由所需要的组件
   import {createBrowserRouter} from 'react-route-dom'//引入生成路由实例的方法
   const Routes =createBrowserRouter([      //注意是数组形式，每个数据值是个对象，就是每个路由配置信息
     {
      path :'/index' ,
      element:<Test/> ,  //注意没有引号
      Chlidren:[
        {
          path: 'par1',    //注意这里子路由不能写/  实际的地址是 /index/par1
          element:<Test2/>
        } ，
        {
        		index：true，     //子路由去掉path，写index属性，值为真，表示默认这个子路由是展示的
        		element:<Test3/>
        }
        
      ]
     }，
    {
        path:*,      //配置404路由
        element:<404>                            
      }
   				
   ])
    export default Routes
   ~~~

2. 把路由配置文件挂载到根组件中

   ~~~jsx
   import Routes from ‘../’//引入上面写好的Store配置文件
   import {RouterProvider} from 'react-route-dom' //引入组件，用来注入到根组件里面,这个标签放哪里，路由内容就显示在哪里
   
     <div>
     <RouterProvider route={route：Routes}>
     </div>
   
   
   ~~~


- 路由的拦截：用高阶组件的方式给路由设置拦截，或者叫路由守卫

  ~~~jsx
  import
  ~~~

  

# react其他内容

react的优化：

- 路由懒加载

- CDN加载资源

  - cdn是一种内容分发网络服务，当用户请求网站内容时候，由离用户最近的服务器，将缓存的内容发送给用户

  - 把体积比较大的的非js文件，比如react和react-dom，利用CDN文件在浏览器的缓存特性，加快加载时间
  - 非业务的js文件，不经常做变动，不用频繁更新缓存
  - 做法：把需要CDN缓存的文件排除在打包之外 ，然后以CDN的方式重新引入

1. store配置问题

   - 在store使用时候，浏览器插件需要配置在index，中间件redux-thunk也要配置在index文件，多个配置时候，是把所有配置写在一个内，再配置给store仓库

     ~~~jsx
     //引入必要的文件
     import { createStore, combineReducers , applyMiddleware,compose} from 'redux'
     import thunk from 'redux-thunk'
     
     import reducer1 from './reducers/test1'
     import reducer2 from './reducers/test2'
     
     const composeEnhancers =compose(   //所有的增强器，包括中间件、调试工具配置都放在这里
         applyMiddleware(thunk),		//中间件的
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     );         //为了让redux浏览器调试插件正常使用的
     
     const store=createStore(
         combineReducers({
             reducer1,
             reducer2
         }),              //这里是放根reducer的
         composeEnhancers,  //把所有的配置，再一下配置给store
         )
     ~~~

     









 



