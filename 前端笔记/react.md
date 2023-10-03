

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
- 同样的，如果我的父组件给这个方法写的时候，我在函数里写了this.setState（）方法，并且还设置了参数，到时候这个参数由子组件用this.props。方法名（实参）调佣时候传递实参，那也就是实现了 父组件获取到了子组件的数据，并且还渲染到了父组件本身的state里面了

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

- 



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

   > 这个方法主要是写在子组件里。解决的问题就是，如果一个父组件里写了两个子组件，由于每次修改其中一个子组件的时候，是相当于修整个父组件的render重新渲染的。所以这时候那个没动的另一个子组件也会被重新渲染了，这浪费内存了，所以这时候如果在这个子组件里写这个方法，根据props数据判定，这个方法返回值是false就是不渲染，TRUE就是渲染。
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

> 这两个一般形容的都是input框类型的，受控组件是指imput的值是收react的state管理的，可以用onChange事件来做到双向数据绑定
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
      render( <div defaultValut={this.state.mes} ref={this.aaa}></div> 
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

-  这个的作用就是跟vue的store的作用一样，也是弄一个全局的仓库，然后谁用谁调取

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
        state={mes:store.get().mes1} //这里就是把store里面的数据mes1复制给了本身组件的mes
        
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
        
         //使用store.setState方法，这个方法是store里数据只要变化，就会执行
         store.setState(function(){ 
            this.setState(()=>{  
                return{
                    mes:store.getState().mes1
                }
            })
        })
    }
    ~~~

    

​	   

























# react重要知识：

- 在使用类组件的时候，或者实际中存在了一个组件里使用了另一个组件，也就是一个组件的render里面使用了另一个组件标签，或者也叫父子关系时候，这时候父组件在自己的return里写在里面子组件上面的数据，也就是在子组件标签上面自定义属性跟数据时候，这时候的子组件如果不写类的构造器，其实这个时候，react是自动默认写了的

  ~~~jsx
  //子组件
  class child extends react.component{
      constructor(props){      //这个constructor，如果没有其他函数了，其实是不应该写的，因为如果  									不写react也会自动执行这段代码的
          super(props)
      }
      render(){
          return <div> {this.props.a} </div>
      }
  }
  //父组件的render
  render(){
      return (<div> <child a=1 b=2></child> </div>)
  }
  ~~~
  
  
  
  
  
   



