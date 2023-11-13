# 配置操作

> 配置文件的生成： stc --init

- “target” ：“es5”  ：会把代码编译成这个版本的代码

# 一、基础

2.1、基本

~~~js 
基本类型：string、number 、bolean
const str：string

数组
const arr1:number[]=[1,34] //数据里的数据必须全是数字类型
cosnt arr3:(number | string)[]=[1,'a'] //数据类型可以是数据或者字符串
const arr2：Array<number>=[1,2] //同上，不经常用

方法：
const function fun(par1:number， par:string):number {}  //函数的必须有且两个参数，而且必须有返回值，返回值必须是number
const fun1=(par1:number , par:string):number =>{ }  //箭头函数的形式
const fun2:(par1:number , par2:string)=>number=(par1 , par2)=>{}//当函数作为表达式时候，可以用这种
const function fun3(par1:number):void{}  //函数没有返回值
const function fun4(par1?:number):void{} //函数的这个参数可选，但是可选参数，必须必须放在参数的最后，也就是后面不可以再有必选的参数

对象
const obj={name:string ; age:string ，fun:(par:number)=>void=(par)=>{}}={name:'a' , age:'b',fun:(par){}} //声明对象每个成员的类型
const obj1={name?:string ; age:number} //name是可选项

类型别名：type 可以定义任何数据类型
type a=(string | number)[] //直接type关键字定义类似是string或者number数据的数组
cons arr：a=[1 , '3']  //使用

接口：只能给对象定义
interface a{          //直接关键字interface定义
  name:string
  age:number
}
const obj:a={
	name:'xiao'
  age:1
}

接口继承
interface a{name:string}
interface b extends a {age:number}  //继承后就有了上一个的
const obj:b={name:'xiao' , age:1}

//元组：明确数组的个数和每个数据类型
const arr1:[string , number]=['j' , 1] //规定死了数组的个数，数据类型，多一个少一个就不行

类型推论：ts会自动根据情况推断类型的，有了类型推论后，不用写这个位置的数据类型了，但是仅限于两个情况下才有这个
//1、在定义变量时候就初始化好了值，就把初始化的值当做后续的类型判断了
const a =1  //定义时候，并初始化了number类型,建议如果定义时候没有初始值，建议加上类型
a='string'  //会报错的

const b  //定义时候没有初始值，也没有加类型，后面两个代码都不会报错，失去了类型检测功能
b=1
b='string'

//2、函数的返回值一般会默认有自动的类型推论
const fun=(par1:number)=>{}  //这里没有写函数返回值的类型，会根据ts默认决定的

类型断言：
//ts自动推断的类型有时候，太过于广泛，以至于这时候我们是读取不来本身特有的属性的，比如a标签，它具有个独有属性href，但是Ts会默认把
//a标签当做HTMLelement元素来检测的，这样的话，这个元素是拿不到自己特有的属性href的，只能拿到HTMLelement共有的属性
<a href='xxxx' id="a"> 
 const a=document.getElementById('a').href   //这里会报错的，因为a默认是HTMLelement元素，没有href这个属性的
//使用as关键字，把a标签设置成HTMLelement的子类型HTMLanchorElement（锚点元素）
const a=document.getElementById('a') as HTMLanchorElement  //这样再取取特有属性就可以了

查看元素的类型：
//选中元素后，
//控制台打印console.dir（$0）,把元素以js对象形式展示   

字面量类型（任意类型）
//在Ts中，可以指定任何具体的字符串、数组、数字、对象为类型，只不过一但指定了，一般都是定死了
const a:'a'='a'  //这就是指定了a的类型是 'a' 那么这个a的值只能是 ’a'了
let a:2=2     //同样的，a的类型是 2 ，值只能是2了
const a=2    //因为用了const，TS会默认这个值是不能改的了。所以它的类型就是它的值了，也就是2
//一般的配合联合类型一起用，用来表示一组可选的明确的值
function a (par1: '1'|'2'){}  //表示参数par1的实参值只能是 ‘1’或者‘2’其中一个

枚举类型
//使用关键字enum定义好一些数据可以用的数据，放在一个枚举里，
//枚举的规则：如果没有指定初始值，那么上一个数据必须是数子，本身的数据就是上一个数字加1
enum tem（a , b ,c）//枚举出这些数据，如果不规定这些数据的值，那么这些数据默认就是数字，而且从0开始一个个加1
const data1：tem=tem.a// 值是0   获取枚举里的值直接用点
enum tem1（a=1 ，b='sss' , c） //这样会报错

//枚举不仅提供了类型，还提供了数据，所以在编译成代js代码时候，枚举是会执行第一段js代码的，把自身变成值
  
any类型
//定义了any类型，就相当于写js代码了，没有任何类型保护机制了
//如果声明了变量，没有给类型，也没有给初始值，那么这个就是默认的any类型了
//函数的参数如果没有任何声明任何的类型，也是会自动成了any类型了
  const tem1:any=2
  const tem2
  function(par , par2){}

类型检测typeof
//可以检测出数据的类型，主要的作用是可以在【类型上下文】中使用，可以简化类型的书写
const tem1={x:1 , y:2} //它的类型是 {x:number ， y：number} 
function （par:typeof tem1）{} //就是说把检测出来的tem1的类型用作了参数par的类型，那么par1的实参必须满足跟tem1一模一样的类型数据才行
//【typeof只能检测出变量、对象的属性的类型，不能检测函数的类型】

class类型：
//class不仅是可以作为关键字，它也是一个类，也就是所有的实例，它的类型就是对应的class
class A(
		constouctor(par1:number){}  //构造函数不可以写函数的返回值类型，因为构造函数出来的实例的类型已经就是类名本身了
)
const tem=new A(2) //这个tem的类型就是A   

class继承接口interface
//Ts中一个类继承一个接口，就要必须定义好这个接口里所有的东西implements
interface inter1{   //定义一个接口
			a:string;
  		fun1:void()
}
class A implements inter1{  //一个类继承了接口，必须给这个接口上的所有东西写好对应的实例一样，起到约束类的作用
			a:1     
     fun1(){xxx}
}

class修饰符
//public:方法、属性变成公共的，也是默认不加时候
//protected：方法、属性变成保护的，，【只能在本身的类或者子类中获取，任何实例都不可获取到】
//private:私有的，只有本身的类中可以获取，其他任何地方都获取不到
//readonly：只读不可修改，只能指定属性，不能指定方法   可用在接口或者 {} 表示的对象类型

class（对象）类型的兼容性
TS是一个只关注结构化类型的，也就说，对于对象类型（class、对象）来说，只要结构相同，就会兼容，
兼容的意思就是可以赋值，也就是成员多的可以赋值给成员少的
// class A{a:number}
// class B{a:number , b:string}
//interface C {a:number}
//const tem1:A=new B //这里就是A类兼容B类，B可以赋值给符合A类型结构的数据
//const tem2:C=new B //B也可以赋值给兼容的接口，因为接口和类都是对象

函数的兼容：分为三种情况
//一、参数的个数：参数多的兼容参数少的，或者说，参数少的可以赋值给参数多的，跟对象相反
type a=(par1:number)=>void 
type b=(par1:number , par2:string)=>void
const fun1:b
const fun2:a=fun1   //参数少的可以赋值给参数多的

//二、函数参数类型是对象或者接口类型时候，刚好跟正常的对象相反，是成员少的可以赋值给成员多的
type a=(par1:number , par2:string)=>void
type b=(par1;number)=>void
const fun1:b
const fun1:a=fun1
//【注意：在函数以上形式中，只是关注了函数的参数的类型，至于参数是什么无所谓】

//返回值类型：返回值类型是对象时候，多的可以赋值给少的
type a=()=>{a:string}
type b=()=>{a:string , b:number}
let fun1:b
let fun2:a=b
//【但是在这个里面，关注的是函数返回值对象，这里的对象属性名字要一一对应，不能像参数那样无所谓】

交叉类型
//跟继承类似，只不过这个是把几个类型加在一起
interface tem1{a:number}
interface tem2{b:number}
type c=tem1 & tem2    //直接使用一个& 就表示了
//继承重名时候会报错，但是交叉类型重名时候，会使用 | （或语句）保留两个

----------------------------------------------------------------------------------------------

泛型
//主要是为了让多种类型一起复用，常用于函数、类、对象、接口中
泛型函数
//基本使用
//创建泛型函数，其中 type就是相当于一个类型的变量，至于最终的具体是什么类型，取决去这个函数调用时候，
function fun1<Type1>(par1:Type):Type{} 
//这个函数调用时候比如 fun1<number>（3）,这就是表示这是个number类型函数		
//可以隐式调用，比如 直接fun1（3），那么这时候，Ts会根据上下文，自动判断出这个Type的类型，如果根据调用的情况不自动判断不出来了，就要用上面调用方法，写明了类型

//泛型约束
//因为泛型在调用之前是不知道具体的类型的，所有如果在什么泛型时候，调用了具体类型的特有东西，是不行的，比如调用数组的length啊这些
function fun2<Type>(par1:Type):string{
  console.log( par1.length)    //这是会报错的，因为这时候不知道这个par1具体是什么类型，不确定有length这个属性，所以需要给它加约束
}
//约束方式1：
function fun2<Type>（par1：Type[]）:Type{    //表示约束了参数是个数组类型，其他的地方如果用到Type，还是正常用
 console.log(par1.length)                  //约束过了数组类型，就可以拿到数组的东西了，或者使用数组的方法了
} 
//约束方式2：
interface a{length:number}
function fun3<Type extends a>(par1:Type){console.log(par1.length)} //表示，这个类型必须至少要有a类型的所有结构
fun3({lentth:333, a:'随便'})        //这里的实参，必须要有至少符合上面a的类型

//约束方法3：多个变量泛型及约束
function fun4<Type1 , Type2 extends keyof {a:1 , b:3}>(par1:Type1 , par2:Type2)：void{}
//这里表示接收了两个泛型变量Type1和Type2 ，
//typeof关键字：接收一个对象类型，生成这个对象名称（可能是字符串或者数子）的联合类型
//比如上面的Type2的类型格式就是{a:1,b:3}这个对象的名称组成的联合类型，因为对象的属性名是字符串，所以也就是 ‘a’|'b' 
//所以实际传调用这个函数时候就是 fun4('a')

function fun5<Type1 , Type2 extends keyof Type1>(par:Type1 , par2:Type2){}
//这就表示，Type1在调用时候，一定要是个对象或者字符串类型了，不然Type2取不到它的key了

泛型接口
//接口也可以定义泛型
interface a<Type>{  //定义一个泛型，里面的所有地方都可以用
		par1<Type>,
  	fun1(par1:Type):void{}
}
let obj:a<number>={  //使用接口泛型的时候，一定要显示的定义好具体是哪个类型，因为它不能像函数那样会有自动推论的能力
  par1:1,
  fun1(par:number):void{}
}

泛型类
class A<Type>{  //定义泛型类
  name:Type
  fun1:(par1:Type)=>string
}
let a=new A<number>() //跟接口一样，在使用时候，一般是要指定好泛型的具体值
//但是如果类里面写了constructor（par：Type）那么也就说，在创建实例时候，传递实参 这个构造器也会执行，
//这样Ts就可以根据传递的实参确定泛型的具体值,这样的情况可以不用写具体的泛型值

泛型类型工具
//都是内置的工具，直接使用
interface test{   //定义一个接口类型
		a:number
  	b:string
  	c:string[]
}
type type1=partial<test> //新类型是可选状态了
type type2=Readonly<test> //新类型仅读：就是这个类型定义的数据，这个数据是以后一点不能改的，
                          //比如 let obj：type2={a:1,b:'bb'} obj.a=2,想改obj的数据a，报错
type type3=Pick<test , a|b>//从第一个类型变量中，取出其中的一些属性组成新的类型，用中竖线分开  {a:number , b:string}
type type4=Record('a'|'b' , string[])//凭空构造新的【对象类型】，第一个参数就是对象类型的属性，第二个是这写属性的统一的类型{a:string[] , b:string[]}

索引签名
//就是为了确定对象的key和value是什么类型的
interface tem{
	[type1:number]:string  //中括号是固定格式，其中的type只是一个占位符，写啥都行，这个表示的意思是这个对象结构的key只能是number类型，值只能是string类型
                         //但是把这个类型用在对象上面，这样基本上会出错，因为在js中，对象的key最终都是被转成string类型的，也就是说，对象定义的话，中括号的key类型一定是string
  											//数据也是一个特殊对象，只不过数组的key是数字下面，也就是索引，也就说数组用这个的话，，肯定前面中括号定义的key类型一定是number类型
}

映射类型
//利用一个现有的【type】类型，映射它里面所有的值，变成新的【对象类型】的key
//映射类型只能映射type，不能映射interface
//映射一般联合类型
type a=('b' | 'c' | 'd' |) 
type b={ [key in a]:number }//利用关键字key in 形成一个新的对象类型，新对象类型就是{‘b':number , 'c':number , 'd':number}

//映射对象类型
type a={a:number , b:string}
type b={ [key in keyof a]:number }// keyof 的作用就是把后面的类型的key变成联合类型的。所以这结果就是{a:number , b:number}

类型查询
//可以查询对象类型中的具体key的属性
type a={a:string , b:number}
type b=a['a']   //获取到的是a里面key是a的【类型】
type c=a['a' | ’b‘] // string|number
type d=a[keyof a] //keyof的作用就是拿到后面对象类型所有的key的联合类型， （string | number）

第三方模块的类型声明文件
//类型声明文件的后缀是 .d.ts  它里面只能是【声明类型】，不能写其他执行的代码，而且它也不会转成js
//在ts中，我们如果使用第三方软件时候，在我们npm 下载这个包后，这个包里面的源代码是js代码的，但是我们是在ts中用的，所以如果下载的
//这个包里面默认没有对应的【类型声明文件】，那我们在ts中使用这个第三方包是没有类型机制保护而且会报错的。这时候需要去下载一个对应的类型声明
//文件就行，基本上所有的第三方的库对应的类型声明文件都在一个GitHub仓库里 https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
//大多数的情况下，对应的第三方库的对应的类型声明文件就是 @types/包名 ,所以，如果我们下载的第三方库本身没有自带，那么自己npm下载下就好

自己定义类型声明文件
//定义一个 a.d.ts文件
//导入import和导出export 导入时候，后缀名 .d.ts不用写，跟js代码引入一模一样

为已有的js声明类型变量
//在Ts中，【如果引入js文件，那么会自动加载这个js文件同名的 .d.ts类型声明文件】。
//所以我们拿到的代码仅仅只有js，但是后续开发又要转成Ts写，在后续的代码中正常用Ts写，但是如果后续的代码用到了前面这些js文件时候，需要引入
//前面这些js代码时候，就会报错，这时候就先要把之前的js代码写一份同名的【类型声明文件】，写完后，在我们后续的Ts代码中如果再需要前面的js，就直接
//正常引入这些js文件，因为它会自动引入同名字类型声明文件

//比如这是之前的js代码
let tem1 = 2
const tem2 ={a:2 , b:2}
function fun1(par1 ， par2){par + par2}
const fun2=(par2)=>{xxx}

//这时候我们根据上面这些js代码，为它写对应的类型声明文件。在同名的.d.ts里面写如下.
//注意：：我们这是个原来的js各个数据声明类型，不是写逻辑，类型声明文件里也写不了逻辑
declare let tem1:number    //注意，这里的declare关键字的意思是，给对应的文件里的tem1添加了一个类型声明，不是说这里创建了一个新的类型
interface t{a:number , b:number}  
declare const tem2:t
declare function fun1(par:number , par2:number)  //声明式函数就按照声明式定义
declare const fun2:(par:num)=>void
export default {tem1 , tem2 , fun1}//配置后，要导出，之前js对应的肯定都要导出，也可以导出类型声明文件里的interface供其他ts文件使用
//注意，所有的类型声明的时候，至于具体声明成什么类型，比如函数参数具体是什么类型，返回值是啥这些，必须是自己根据原来的js获得。

~~~

#  二、项目中使用Ts

- 在react中，如果是tsx代码，那么

## 2.1创建项目和配置

- 创新新项目时候，react的脚手架工具 create-react-app 默认支持Ts的，但是也是要在创建项目时候说明一下，执行`npx create-react-app 项目名称 --template typescript`即可

1. 在创建后，在项目根目录生成tsconfig.json配置文件   (https://www.typescriptlang.org/tsconfig)

   ~~~js
   {
     // 编译选项
     "compilerOptions": {
       // 生成代码的语言版本
       "target": "es5",
       // 指定要包含在编译中的 library
       "lib": ["dom", "dom.iterable", "esnext"],
       // 允许 ts 编译器编译 js 文件
       "allowJs": true,
       // 跳过声明文件的类型检查
       "skipLibCheck": true,
       // es 模块 互操作，屏蔽 ESModule 和 CommonJS 之间的差异
       "esModuleInterop": true,
       // 允许通过 import x from 'y' 即使模块没有显式指定 default 导出
       "allowSyntheticDefaultImports": true,
       // 开启严格模式
       "strict": true,
       // 对文件名称强制区分大小写
       "forceConsistentCasingInFileNames": true,
       // 为 switch 语句启用错误报告
       "noFallthroughCasesInSwitch": true,
       // 生成代码的模块化标准
       "module": "esnext",
       // 模块解析（查找）策略
       "moduleResolution": "node",
       // 允许导入扩展名为.json的模块
       "resolveJsonModule": true,
       // 是否将没有 import/export 的文件视为旧（全局而非模块化）脚本文件。
       "isolatedModules": true,
       // 编译时不生成任何文件（只进行类型检查）
       "noEmit": true,
       // 指定将 JSX 编译成什么形式
       "jsx": "react-jsx"
     },
     // 指定允许 ts 处理的目录  
     "include": ["src"]
   }
   ~~~

2. 也会在src目录下生成react-app-env.d.ts类型配置文件，内容是`/// <reference types="react-scripts" />`,这段代码表示会自动引入react-script这个类型声明文件，crt+点击 查看这个文件的话，发现这个声明文件里基本上包括了所有其他常用的react内容所需要的模块声明文件了，比如moudle.sass文件的类型声明文件就在里面等等。因为又因为根据上面的tsconfig.json 配置中的include指定了，所以在ts整个项目中，会自动加载这个react-APP-env.d.ts文件

- 如果项目已经存在了，后续要变成ts项目，首先根据官方文档下载对应的ts包https://create-react-app.dev/docs/adding-typescript/

2. 再输入  npx tsc --init 指令生成tsconfig.json 文件，或者自己直接创建也一样。
3. src下手动创建react-app-env.d.ts  
4. 最后把所有的js文件对着写成同名的ts文件

## 2.2、编译项目中单个的ts文件

- 在编译单个的ts文件时候，指令是 tsc -test.ts 表示编译这个ts成js
- 只要是加了具体文件名字的编译，这个文件的单次编译是不会走配好的tsconfig.json配置文件的，只会走默认的一开始的tsconfig.jsono，如果想要对单个文件编译加点配置，只能是 tsc-test.ts --target es6  表示把这个按照es6的规范编译
- 只有tsc后面不带文件名，比如直接tsc后才会走tsconfig.json 配置文件

TS+react编写

~~~js
//函数组件中，一般需要用到类型声明的地方是两个

1、函数组件的参数，
//也就是props,先根据后续会使用的props里的哪些数据，定义好类型
interface pro{
		par1:string
    age?:number
}
//再给props定义这个类型
const Test=(props：par1)=>{
		return(xxx)
}
//或者直接把props结构出来的写法，结构出来的好处是可以写默认值
const Test =( {name='小明'}:par1 )

//2.在事件绑定时候，如果需要用到事件参数e的情况，这个e这个参数就需要定义类型了
//这里就需要给e这个参数写类型，其实这个类型是根据后面的事件类型有关的。具体是什么，简答方法就是在写这个触发事件函数时候，先写一下
// onClick={e=>{}} 先这样写一下，鼠标放在e上面，就会有对应的这个e的类型了
function handler(e：React.MouseEvent<HTMLButtonElement, MouseEvent>){} 
return（
	<button onClick={handler}><>
）

2、类组件中
//类组件中，主要两个地方的类型声明需要注意，一个是props，一个是state
type tem1={name:string}  //给state定义类型
type tem2={age：number}  //给props定义类型
 class Test extends React.Components<tem1 ,tem2>{  //注意：这里直接把类型给，这里的泛型有两个变量，第一个变量就是props，
   																								 //第二个变量是state，所以如果只需要props，只需要写一个 component<tem2>
   																			           //但是如果是只需要state，那么前面的props也要给，因为这个跟位置有关。
   																								//因为props是对象。所以一般写Component<{} , tem1>

}
~~~

