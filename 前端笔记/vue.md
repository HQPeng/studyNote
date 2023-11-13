# 一、vue指令

## 1.1、v-cloak

- 消除抖动（闪烁）用的特殊指令。在vue中，数据加载和vue渲染之前，页面就可能已经到了渲染它的地步了，这时候没有对应的数据内容给到页面，就会出现空白闪烁

    ~~~jsx
    //html中
    <div v-cloak>  </div>  //绑定在闪烁的元素上
    
    //css中
    [v-cloak]{
        display:none   //在css中定义，原理就是这个绑定的元素在没有被vue渲染完成后，是display：none的
    }
    ~~~
    
    

## 1.2、v-text

- 纯文本填写

    ~~~jsx
    <span v-text={mes} ></span>
    ~~~

## 1.3、v-once

- 绑定的效果只有一次，后续数据绑定不会再由动态改变的效果

    ~~~vue
    <span v-once></span>  //只要这个绑定了，它本身以及下面所有的子标签，不管在标签上还是标签内，动态效果都没有了
    ~~~

## 1.4、v-bind

- 让一般的属性变成动态

    ~~~jsx
    <image v-bind:href='mes'></image>//不要用来绑定class，class有特定的处理方法
    <image :href="mes"></image>    //这是简写方法
    ~~~

## 1.5、v-on

- 事件监听器

    ~~~jsx
    <button v-on:click='num++'></button>  //常规调用data里面的数据
    <button @click='num++'></button>   //常规调用的简写
    <button @click='fun'></button>    //无参函数的调用，如果定义时候，写了一个参数，那个参数就是事件对象
    <button @click='fun(par)'></button> //有参数的正常调用
    <button @click='fun(par , $event)'></button>//如果想只用事件对象，这里调用的时候最后一个参数仅仅只能写这个，在methods里面定义这个函数时候，最后一个参数，就是事件对象
    ~~~

- 事件修饰符

    ~~~jsx
    <!-- 停止冒泡 -->
    <button @click.stop="doThis"></button>
    <!-- 阻止默认行为 -->
    <button @click.prevent="doThis"></button>
    ~~~

- 按键修饰符

    ~~~jsx
    <!-- 只有在 `key` 是 `Enter` 回车键的时候调用 -->
    <input v-on:keyup.enter="submit">
    
    <!-- 只有在 `key` 是 `Delete` 回车键的时候调用 -->
    <input v-on:keyup.delete="handle">
    ~~~

    

## 1.6、v-for

- 循环，一般是用在数组和对象上面。这个是循环整个标签的，不是单纯的循环数组里面的数据

    ~~~jsx
    //做循环数组的时候，两个参数分别是arr的数据，和index。 只要做循环，那么在里面一定要写动态属性key 值是唯一值就可以
    <div v-for='(item , index) in arr' :key:index></div> 
    
    //循环对象：其中value是属性值，key才是属性名字
    <、:key:index ></div>
    ~~~

## 1.7、v-if 、v-else 、v-show

- 控制这个标签是否显示，如果值是TRUE，就显示，否自不显示，这个TRUE是真就可以，说白了，扔个数字2给他，都是属于TRUE

    ~~~jsx
    <div v-if='mes>2'></div>  //注意如果是真就显示，入股显示了，下面的就不会走了，不是说每个条件是真都会显示，按顺序下来，只会执行一个的
    <div v-else="mes>1"></div>
    ~~~

- v-show：控制元素显示。它的原理就是给元素加不加display：none

    ~~~jsx
    <div v-show='mes>2' ></div> //条件是真就显示，否则不显示
    ~~~

- v-if跟v-show的区别就是，v-if这一套如果不显示，不会渲染元素，v-show是会渲染元素的，只不过给它加了个display：none的样式

## 1.8、v-model

- 双向绑定，也就是我们改变数据，让date里数据跟着改变。主要针对的是input框，因为一般只有输入框，才会改变数据

    ~~~jsx
    //input框，输入框里的数据会自动更新到date里面的mes
    <input type=text v-model='mes'></input> 
    
    //一个复选框，v-model是个布尔值，是TRUE的话就是选中，反之就是没有选中
    <input type=checkbox v-model='mes'></input>
     
    //多选的复选框，每个框必须有value值，然后v-model的值是个数组，这个数组里有value的值，那就是选中了，反之没选中
    <input type=checkBox value='mes1' v-model='arr'></input>
    <input type=checkBox value='mes2' v-model='arr'></input>
    
    //单选按钮 以前的单选按钮必须有name属性做关联，现在不用，但是要有value ，它的值跟v-nodel值一样的话就是选中，反之没选择
    <input type=radio value='mes1' v-model='mes1'></input>
    
    //文本域 跟input框差不多，v-model的值就是内容
    <input type=textarea v-model='mes1'></input>
    
    //下拉框：select里面的v-model值跟option标签里的内容一样，就是选中哪个
    <select v-model='mes'>
        <option>{{mes}}</option> 
         <option></option>
    </select>
    ~~~

## 1.9、样式绑定class

- class开关类型toggle。也就是控制某个样式有或者没有

    ~~~jsx
    //先在css里面定义好样式，样式只能是class样式
    .sty1{
        color:red
    }
    //再用对象形式动态绑定class，这里面的属性名，就是上面的样式名字，属性值是TRUE类型就是表示有这个属性，反之没有
    <div :class={sty1:mes}></div>  //这个mes就可以是date里面的数据了
    ------------------------------------------------------------------------------
    //数组类型：多一层嵌套，把css里定义好的类，名字写进date里面，用哪些的时候，直接写在标签的class里
    //在css里定义类
    .sty1{
        color:red
    }
    .sty2{
        fontSize:3px
    }
    
    //在vue里，把类引入到自己date里
    date：{
        style1：sty1
        style2：sty2
    }
    
    //在标签里使用时候，用哪个，放进去class的数组里就行
    <div :class="[style1 , style2]" ></div>
    ~~~



- 正常其他样式style写法

    ~~~jsx
    ///对象形式，直接书写，如果不加引号，就是默认是data里面的数据
    <div :style={color:sty1， fontSize：'20px' }></div> 
    
    //data里面的数据
    data：{
        sty：red
    }
    ---------------------------------------------
    //数据写法，就是把css里的样式，完全搬到data里面，用的时候，用数组形式
    //data数据
        data:{
            sty1:{
                color:"red"
                background:"yellow"
            },
            sty2:{
                fontSize:"40px"
                width:"30px"
            }
        }
    //标签里使用时候，就是放在style数组里
    <div :style='[sty1 , sty2]'></div>
    ~~~

# 二、vue常用特性

## 2.1、自定义指令-directive

- 自定义指令分成全局指令跟局部指令，全局指令是定义在vue实例的外面，在vue工程化中，全局指令不能定义在vue根实例里面或者其他的组件里面的

- 自定义指令有几个常用的钩子函数

    - bind：在指令第一次绑定到元素时候调用，这里是获取不到父节点的
    - inserted：被绑定的元素插入父节点时候调用，这里可以获取到父节点
    - update：数据更新时候调用
    - componentUpdated：元素以及子节点更新完成后触发
    - unbind：取消绑定后触发

    所有的钩子函数都有两个个参数，分别是被绑dom元素el、传入实参的集合binding

- 全局自定义指令

    ~~~jsx
    Vue.directive('指令名' ， {
                  钩子函数名：function（el , bind）
                  })
    //使用
    <div v-指令名='mes'></div>  这个时候就是传实参mes了，这个值在bing里面
    ~~~

- 自定义指令

    ~~~jsx
    //在vue实例里的directive属性中写
    directive：{
    	指令名：{
            钩子函数1，
            钩子函数2
        }
    }
    ~~~

##  2.2、计算属性

- 计算属性一般就是把data里面的数据固定方法处理后，再返回出去，哪个地方需要用这个处理后的数据，哪个地方就用，用的时候把它当做data数据用。

- 计算属性里用的data数据只要发生变化，自己会自动更新数据，如果数据没有变化，那么多次使用，是从缓存里拿，不会重新计算

- 必须有return，return里面一般必须有data数据，才有意义

- 写法跟methods一模一样，但是使用的时候，不能加（）

    ~~~jsx
    computed：{
      	get(){ xxx },   //数据被读取时候执行
        set(){ xxx} ,   //有人要设置（修改）这个数据时候执行
        fun1(){
            return this.data.mes+1 //比如这里就是把mes数据加1处理了
        }，
        fun2（）{
            return this.data.mes2+1
        }
    }
    
    <div> {{fun1}} </div> //使用计算属性，记得不能加小括号
    ~~~
    
    

##  2.3、watch监听

- 监听data里面的某一个数据，只要这个数据发生变化，就会执行对应的函数，特别适用于异步，数据验证等

- 它默认不可以深度监听，也就是默认不能监听数组或对象里某一个，需要其他配置

    ~~~jsx
    data：{mes：1}
    watch：{
        mes：function(par1 , par2){}// 这里两个参数，第一个是被监听数据变化后的新值，第二个是变化前的旧值
    }
    -------------------------------------------------------
     //深度监听，也就是监听数组或者对象，这里是只能监听整个，不可以监听里面的某一个固定值,如果想要监听某一个值，可以配合computed
       data:{
           obj:{
               a:2,
               b:2
           }
       }
    watch:{
        obj:{
            function(par1 ,par2){},
            deep:true          //这里添加一个deep属性就行          
        }
    }
    ~~~

计算属性跟watch都是实现对数据的监控，计算属性有缓存机制，watch没有，计算属性更适用于展示数据，watch更适用于逻辑处理

## 2.4、filter过滤器

- 分为全局的跟局部的，作用就是有点像计算属性，就是对数据做简单处理的，比如大小写转换等等，vue3里面没有了

  ~~~jsx
  //全局写法
  Vue.fliter("过滤器名字" ， function(par){  //这里的函数必须有个参数，就是要表示后面调用它的时候，被处理的数据
      return    					// 必须也要有返回值,注意这里是对源数据处理后返回个新数据，不是说把源数据改了返回源数据
  })
  //局部写法
  fliter:{
      filter1：function(par){  //过滤器名字：处理函数
          return 
      }
  }
  //使用
  <div> {mes|filter1} </div>  //竖号前面表示的就是传入这个过滤器的数据
  <div>{mes|filter1|filter2}</div>  //支持链式调用
  ~~~

## 2.5、混入mix

-  这个的作用就是相当于把vue中的data啊，methods等等这些属性单独写在外面了，到时候，哪些组件需要，就再引入，实现复用

  ~~~jsx
  //局部混入：先定义好要混入进vue组件的属性
  const mixdata={
      data：{mes1:1}
  	methods：{ fun（）{}}
  }
  //需要这些内容的组件或vue实例用属性mix将定义好的内容加到自己里，如果数据跟本身组件有重名冲突，优先使用自己本身的数据
  New Vue({
      el:'#app',
      data:{mes:'本身的数据'}
      mix：[mixdata]  //这里是数组，不是对象了
  })
  
  ---------------------------------------------------------------------------------
   //全局混入
      vue.mixin({   //全局混入表示，所有的组件都会被强制添加，因为这是调用vue来实现的，相当于写在vue原型上了
      data:{
          mes:'数据'
      }
  })
  ~~~

# 三、生命周期

- beforeCreate：初始化之前，组件实例的属性、数据还没有生成
- created：组件实例化完成了，可用this拿到组件里的data了
- beforMount：组件挂载在DOM之前，这是很好是拿不到被挂载的标签的
- mounted：组件实例挂载到了DOM了，可用访问dom，异步操作等等
- beforUpDate：组件实例数据变化之前
- upDate：组件实例数据变化后执行
- beforDestroy：组件在被销毁之前 **这个一般用于在组件被切换时候，把自己一些数据带出去，比如在这个组件里有个异步代码，然后用户点击后，由于网络原因，数据一直没有返回，这时候用户等不了，关闭了页面，这时候就可以在这个组件销毁前把请求关掉，不然请求还在等的**
- destroy：销毁后，所有的事件监听和定时器被移除

# 四、组件

- 组件说白了其实也是vue实例，只不过它要求有几点
  - 组件里的data数据，必须是一个函数，函数必须有返回值return，返回的是一个对象，里面就是data数据
  - 组件里的template属性就是该组件展示的部分，里面只能有且一个最大的父级标签
  - 在使用组件时候，也就是写用这个组件名字写标签时候，**首字母如果大写要转成小写，后面只要是大写字母都要转小写，并在转换后的小写子母前面加-**

## 4.1、组件的定义和使用

~~~jsx
//全局组件
Vue.component（'组件名1' {
    data:function(){
        return{mes:2}
    },
    template:'<div>组件展示的内容</div>'
}）
//使用全局组件
直接在需要的地方写全局组件的<组件名>就可以
-------------------------------------------------------------------
//局部组件：
const tem={
    data:function(){
        return{ mes :2}
    },
    template:'<div>{{mes}}</div>'
}

//使用局部组件
new Vue({
    el:'app'
    data:mes
    components:{    //通过属性components添加，里面把局部组件注册进来
    	组件名1:tem
}
})
~~~

## 4.2、组件间传值

1. **父传子props传值**

   > 也就是在父组件的template里面，会写上子组件的，然后在子组件标签上面用v-bind动态绑定一个自定义属性，值就是父想要传给子的值，后续在子组件里的props里面，可以获取到，子组件里使用props数据，就当做是自己组件里的data数据使用方式一样

   ~~~jsx
   //父组件传值
   template:<div> <child :mes1=1 :mes2=2></child> </div>//父组件通过自定义属性方式传值
   
   //子组件收数据，子组件先要定义好props，等级跟data一样的
   //数组定义
   data：{}，
   props：{'mes1' ,'mes2'}  //这里的数组的值，就是父传来时候的定义的属性名,而且必须要是字符串形式，使用的时候再当成变量形式
   //对象定义
   props：{            //对象形式定义，可以针对每个数据定义默认值，就是如果父没有传这个属性数据，就用默认值，如果传来的数据类型                      不一样，也是用默认值
       mes1:{
           default:0,
           type:Number
       }
   }
   //子组件使用数据
   mounted（）{
       console.log(this.mes1)//不可以直接用props，就像在这里直接打印data一样，读取不到的，想用哪个数据，就把它当做data里数据一样，直接this.用就行
     	console.log(this.$props)//直接获取到本组件的props
   }
   ~~~

2. **子传父，$emit 自定义事件**

   > 原理就是通过这个$emit('事件名' ，par){} 这个方法，可以在子组件上面触发一个自定义事件，这个自定义事件的第二个参数就是到时候的处理函数的参数，也就是子要传给父的数据，然后这个自定义事件的处理函数写在父组件里，因为是父子结构，子组件里这个自定义事件触发后，在本身组件里找不到的话，就会往上找，这样就实现了子传父

   ~~~jsx
   //在子组件里面通过$emit方法**触发**一个自定义事件，并传递数据
   data:{mes:1}
   mounted(){
       $emit('event1' , this.mes)
   }
   //父组件里写子组件时候，子组件上面会触发这个事件(事件只能写在子组件上面，里面都不行)，这个事件所指的处理函数，在父组件里写就行，
   //并且会默认带定义这个自定义事件时候写的第二个参数数据给到这个处理函数的形参,
   methods：{
       handler(par){
           console.log(par)
       },
       components:{
           child
       }
   }
   template:<div>
       	<Child @evet1=handler>  //这里自定义事件处理函数写在父里面就行，这里不写参数都行，只要处理函数那里写了就行，而且那参数就是对应刚开始定义的数据
   		</div>
   ~~~

3. **eventBus**

   > 这个跟子传父原理一模一样，只不过是把所有的自定义事件放在一个全局的eventBus里，也就是个vue实例，这个eventBus在全局里定义好，const  evenCenter=New Vue  谁要传数据，就自定义$emit 事件放数据，谁要拿数据，就$on（’事件名‘ ， 事件处理函数）。没有父子级限制关系了。然后如果用完了某个自定义事件的数据，要销毁eventCente.$off(’事件名‘)，否则会占用内存

   ~~~jsx
   //在全局中个，定义一个eventbus中心
   const eventCenter=new Vue（）
   
   //组件1要传数据
   data:{mes1:1},
   mounted(){
       eventCenter.$emit('event1' ， this.mes)//这里传递数据，这个事件会放在eventCenter中心里
   }
   //组件2要取用组件1的数据
   data ：{mes2:2}
   mounted(){
      eventCenter.$on("evnet1" , (par)=>{  //这里的参数就是传过来的数据
           console.log(par)
       })
   }，
   destory(){
       eventCenter.$off('event1')//这就是表示这时候事件被销毁了，也就不会传递数据了
   }
   
   
   ~~~

4. **ref传值:有点变态的获取方式......**

   > 这个严格意义上来说不算传值了，是获取，是只要在子组件，或者组件下的任何标签里，写一个ref属性，值是啥都行。
   >
   > 这样在这个组件中，就可以通过this.$refs.值  拿到这个组件整个或者整个dom级标签

   ~~~jsx
   //组件里的子组件或者标签里定义一个固定属性ref
   <template>
       <child ref='tem1'></child>
       <input ref='tem2'></input>
   </template>
   export default{
       data(){
           return{mes:'组件本身数据'}
       }，
       mounted(){
           cobsole.log(this.$refs.tem1) //这拿到的就是子组件child的整个，里面有data数据，methods等等所有的信息
           console.log(this.$refs.tem2)//这拿到的就是input框的dom级别，可以操作正常dom操作了
       }
   }
   ~~~

5. **动态组件**

   > 所谓动态组件，其实就是在一个固定的地方，到底显示哪个组件。固定的地方就是用vue内置标签<component :is=''>决定，至于具体显示哪个组件，就是这里的内置属性is的值决定，值是哪个组件就显示哪个
   >
   > 这个标签一般还会被另一个内置标签<keep-alive>包裹，意思就是在这个component里切换过的组件，下次再切换回来的时候，是走的缓存，不是重新渲染，**这也是要注意，也就是说再次切换回来某个组件时候，这个组件里的生命周期函数不会走的**
   >
   > 同时这个<keep-alive>标签还提供给里面所有切换标签两个生命周期函数activated（）和deactivated（）函数。这两个生命周期函数是写在被切换的组件里的，意思是，切换到某个组件之前，会调用这个组件里的activated（）函数，在切换到其他组件显示时候，会调用这个组件的deactivated（）函数。
   >
   > 为什么会有这两个函数：因为如果这个组件是被第二次切换，它里面不会执行生命周期函数的，所以这时候就要用这两个函数了

   ~~~jsx
   data:{mes:},
   component:{com1 , com2 , com3}//这是需要显示的三个组件
   template:<div>
             	<keep-alivd>
                   <component is='com1'></component> //这时候就在这地方显示com1组件，当切换到显示com2租件时候，会触发                                                     com1的deactivated（）和com2的actived（）钩子函数
              </keep-alivd>
         	</div>
   ~~~

6. **匿名插槽**

   > 也就是只有一个插槽。插槽的使用原理是：在一个组件里定义插槽<solt>,然后这个插槽里的内容，就是以后这个组件使用时候写的标签对里的所有内容

   ~~~jsx
   //在一个组件tem1里面定义插槽
   data:{mes1:1},
   template:"<div>
   			<solt></solt>  //定义一插槽
   		</div>"
   //另一个组件使用了tem1组件
   data:{mes2:2},
   component:{tem1}
   templata:"<div>
   			<tem1>mes2</tem1> //这里使用了带有插槽的组件，那么这个插件组件的标签对里所有东西就会放到插槽里，然后再回来显示
   		</div>"
   ~~~

7. **具名插槽**

   > 就是一个组件里放几个插槽，然后再定义个属性name，然后就不是根据这个组件了，是去找哪个标签里的属性solt的值跟它name值一样，那么这个标签就相当于整个剪切黏贴到solt的位置去了

   ~~~vue
   //定义几个具名插槽
   data:{mes1:1},
   template:<div>
       		<solt name='a'></solt>
       		<solt name='b'></solt>
   		</div>
   //使用插槽的标签，只要这个标签上的属性solt的值跟name值一样，就把标签对里的数据放在插槽位置
   //另一个组件里
   data：{mes2:2}
   template：<div>
     				<Child></Child>   //必须要使用一下带有插槽的组件，不然无法做关联
       		  <span solt='a'>数据1</span>  //这里就是把标签对里数据传给了name值是a的插槽
   			    <div solt="b">{{mes}}</div>
          	</div>
   ~~~

   

8. **作用域插槽**

   > 插槽的作用本来是一般用于父数据传给子的，也就是用标签对里的内容代替插槽的位置。作用域插槽的作用是完全不一样的，它实现了子传父。它是把插槽当做了传递数据的方式了，，定义插槽时候，在插槽里定义自定义属性，值就是想传给父的数据。父组件里写子组件，写在子组件里的哪个标签上面写了属性slot-scope，那么这个标签下面就可以使用定义插槽时候写的自定义属性和对应的值了。数据就是放在了slot-scope的值里了
   
   ~~~vue
   //定义插槽并把这个插槽当做传数据的方式
   <template>
   <div>
   	<slot :a=1></slot> //传数据a=1,动态绑定
   </div>
   </template>
   
   //父组件里通过有slot-scope的标签，决定在哪里可以使用传来的数据
   //父组件里
   
   <template>
   <div>
       <Child>    //这个作用域插槽起作用的范围，一定要在定义插槽的组件下才可以。同时，这只能在template组件或者其他组件下使用，其他标签不行                                                        里组件里面所有内容不会替换插槽位置了，插槽失去了原来作用的
           <template slot-scope='tem'>     //这个template没有特殊意思，就是跟div一样的效果，它有slot-scope属性就行
               <div>
               	   {{tem.a}}           //这里就可以获取到传来的数据，
       		</div>
   		</template>
       
       </Child>
    </div>
   </template>
   ~~~
   

# 五、工程化

## 5.1、脚手架 vue-cli

- 它是一个vue工具，跟vue不是一个概念的东西，基于命令行的开发工具
- npm i -g @vue/cli   全局安装
- 创建项目： vue create 项目名字
- 启动项目：npm run serve

## 5.2、单文本组件

- 必须要有<template>和<script>标签

- <style>标签可以没有，如果有的话，在其上面加一个属性scoped表示这个style是对当前组件有用，不会影响到子组件

## 5.3、路由

-  一种映射关系，根据不同的url请求，返回去对应不同的资源

- 前端路由：根据不同的事件来显示不同的页面内容：通过监听地址栏的变化事件来实现资源的动态显示

  - hash模式：hash路由模式是这样的：http://xxx.abc.com/#/xx。 有带#号，后面就是hash值的变化。改变后面的hash值，它不会向服务器发出请求，因此也就不会刷新页面。并且每次hash值发生改变的时候，会触发hashchange事件。因此我们可以通过监听该事件，来知道hash值发生了哪些变化。

  history模式

  - > HTML5的History API为浏览器的全局history对象增加了该扩展方法。它是一个浏览器（bom）的一个接口，在window对象中提供了onpopstate事件来监听历史栈的改变，只要历史栈有信息发生改变的话，就会触发该事件。

    ~~~javascript
    history.pushState({},title,url); // 向历史记录中追加一条记录
    history.replaceState({},title,url); // 替换当前页在历史记录中的信息。
    window.addEventListener('popstate', function(event) {
    	console.log(event)
    })
    ~~~

    >注：浏览器地址没有#， 比如(http://localhost:3001/a); 它也一样不会刷新页面的。但是url地址会改变。**但它在服务器没有配置的情况下，不能手动刷新，否则返回404页面**

### 5.3.1、vue-router

- 安装：在项目文件夹下：npm i -S vue-router
- 使用
  - 引入router
  - 将VueRouter引入到vue类中
  - 定义路由规则
  - 创建路由实例
  - 把路由挂载到跟vue实例中
  - 添加路由组件<router-view>到对应的组件中（占坑）：表示路由对应的组件显示的位置
- 在实际的项目中，结合模块化思想，一般处理过程是
  - 先定义一个文件夹，一般叫router，在里面新建一个根路由文件index.js，也就是项目中所有的路由都走它。。
  - 再在router文件里，也就是和和index.js文件同级建立新文件夹routers，再在这个routers里面根据项目要求建立不同的文件夹，这些不同文件夹里放的就是不同场景划分好的不同路由规则
  - 然后再在项目的根目录下把总的router配置上，
  - 最后路由显示的地方会根据<router-view>这个组件放置的位置来

- **路由规则**：

~~~js
//建立两个场景的路由规则
import com1 from '...'                       //引入路由对应的组件
import com11 from '..'
import com2 from '...'
//A场景路由规则定义
const a ={
	path:'/index'，                          //这里定义路由地址
  //path:/index/:id     动态路由传参方式，而且这个写法是实际访问时候，不用写':' ,但是实参必须要在后面写一个实参:index/333
    			         //获取：在路由对应的组件中，this.$route.params.id
    component:com1 ,   //定义路由对应的组件
  	component：()=>import(../../)//路由懒加载的方式，只有在这个路由被访问到时候，才会加载它对应的组件
    ----------------------------上面两个必须有-------------------
     name:'in',      //路由别名，后面导航方式上面写路由地址时候，可以写这个别名，后续这个路由地址改了，别名不改，导航那都不用动的
    
    redirect:'/change'，                    //路由重定向，表示访问path指的地址后，强制变成了访问这个路由地址
    
    children：[						//路由嵌套（在父路由组件里面再加上显示子路由的内容，加在父路由的<router-view>处）
     {path:'index1' , component:com11}   //这里访问的地址是 /index/index1 子路由path不能写'/' ,否则就是从根开始了，                             访问了这个地址后，看到的内容是父组件内容，以及子组件内容，子组件内容是在父组件的<router-view>处
    ]， 
}
export default a
=--------------------------------
//B路由规则定义
const b=[           //一个场景里有很多个路由情况，这时候用数组
    {path:'...'},
    {path:'....'}
]

export default b
~~~

- 所有规则写好后，把这些都配置到index.js路由总入口文件里去

  ~~~js
  import Vue from "vue"
  import Vueroute from 'vue-route' //引入route插件
  import a from '....'		//把其他所有路由文件到进来
  import b from '....'		//b是很多个路由，里面写的是数组格式
  import {index ，404page} from ...          //引入根路由规则的组件，404路由组件等等
  
  // 引用到路由类里面
  Vue.use(Vueroute)
  
  const routersss=[                    //把所有的路由规则都放在这里,读取时候，是从长往下读取路由的，所以404路由要放最后一个
      {path:'/' ， component：'index'} ， //这里可以继续写些根路由、首页啥的路由地址规则
      a，                                //场景A的路由
      ...b							   //场景B的规则，因为场景B里面好多路由，是用数组形式的，这里的格式必须是对象形式，                                          需要展开  
      {path：'*' ，component：404page’}                       //匹配到这的时候，说明上面的都不匹配了，这里就走404页面
  ]
  
  const router = new VueRouter({    //创建路由，名字其实随便取，不一定非要是router，
      mode: "history",              //这里是项目的总路由的配置，这里配置整个项目的路由是用哪种模式（一个项目只会用一种）
   
      routes：routersss,		//配置所有的路由规则，这里的属性值，必须只能是ruoters
      
      base: process.env.BASE_URL,   //process.env.BASE_URL是一个环境变量，它通常会根据你的项目配置自动设置。基本URL是                                     你的应用程序部署到服务器上时的根URL。例如，如果你的应用程序部署在                                                     https://example.com/myapp/下，那么基本URL应该设置为'/myapp/'。这有助于Vue                                       Router正确处理路由链接。
  });
  export default router
  ~~~

- 根组件挂载router

  ~~~js
  import routerssss from //'引入router文件(index.js)'
  
  const app = new Vue({
    router:routerssss  //这里的属性名，必须是router
  }).$mount('#app')
  
  //添加路由组件渲染容器
  <div id="app">
  	<router-view> </router-view>     //也就是所有路由的展示位置
  </div>
  ~~~

  

### 5.3.2、路由导航和参数

- 声明式导航：就跟html中，a标签一样，通过点击标签的形式访问地址

  ~~~vue
  //通过route中的内置组件<route-link>实现
  <router-link to="path">xxx</router-link>             
  <router-link :to="{path:'path'}">xxx</router-link>  //动态绑定访问地址
  <router-link to="path" tag="p">xxx</router-link> //这个tag意思是这个点击的标签会变成什么html中什么标签，默认的是a标签
  ~~~

- 编程式导航

  ~~~js
  this.$router.push("/login");
  this.$router.push({ path:"/login" });
  this.$router.push({ path:"/login",query:{username:"jack"} });
  // 不要将path属性与params属性一起使用，这样会导致params路由参数获取不到
  // name属性可以与params属性传参一起使用
  this.$router.push({ name:'user' , params: {id:123} });
  this.$router.go( n );//n为数字  负数为回退
  this.$router.back();
  
  ~~~


- 路由参数：只要路由挂载到了根实例上面，任何组件里都是 this.$route.params可获取到当前路由参数

### 5.3.4、路由守卫

- 也就是在访问某个路由地址时候，在访问之前、离开这个路由之前、之后做的操作等等。比如验证操作，离开路由后清除在等待的请求操作等待

- 全局路由设置，也就是所有路由都会走，组件内路由，路由守卫是写在组件内，访问到组件对应的路由时候，会走组件里的路由守卫

  ~~~js
  //全局路由：因为是全局的，所以是写在路由入口文件index.js里面的，在创建好路由后，直接再后面写路由守卫方法
  const route =new VueRoute({...})
  route.beforEach(to ,from ,next){     //进入路由前触发：to:路由准备去的地址 from：现在当前的路由 
      ....
      next()							//next如果不写，或者不调用，那么路由就不会走了，不会访问to这个地址了
      								//其他配置 next({
                                      //     path: '/dashboard',   重定向了
                                      //      params: { id: 123 }, 
                                      //      query: { search: 'keyword' },
                                      //      hash: '#section1'
                                      //   })
  }  
  router.afterEach(to , from next){} //离开路由后，这里不用next了，因为路由都已经走到了to里面去了
  
  --------------------------------------------------------------------------------------
  //组件路由：在对应的路由组件内写，对应路由在被访问时候，触发
  beforeRouteEnter(to , from , next){} //在进入路由之前，比如验证操作，这里获取不到组件实例
  beforRouteUpdata(to ,from , next){} //在路由参数发送变化时候，比如路由地址是 index/:id 访问时候，带不同参数，就触发
  beforeRouteLeave（to , from ,next）{}//路由离开之前，比如消除还在等待回应的请求
  ~~~

  

## 5.1、VueX

- 这个玩意就是一个提供给各个组件间传递数据的
- 下载 npm i -s Vuex
- src文件夹下面创建一个文件夹叫store，里面写一个总的store入口文件index.js以及一个文件夹stores，里面放各个不同场景的数据
- 最后再在根组件里引入store即可，然后整个项目的组件都可以用**this.store**拿到数据
- store里面的数据，是不可以在其他组件里修改的，想要修改tore里的数据，只能在定义这个store的时候，在里面通过自带的方法写好修改的逻辑，如果组件里使用数据时候，想要修改，只能是用这个数据文件里已经写好的修改方法

~~~ js
//1.在stores文件下下面写好不同场景所需要的数据，以及数据的处理方式

export defautl {           
    namespaced:true，      //表示开启空间命名，因为一个项目里，不同的人处理的场景时候所给数据命名，可能会存在一样的名字，添加了空间命名后，后续在使用这个文件里数据及方法时候，需要加上这个前缀名字，具体的名字是什么，后续在引入到入口store时候再取
    
    state：{mes1：1}，             //数据，这里的格式跟vue实例的数据是一样格式
    
    mutations：{                 //这里的方法集合，就是对上面数据不同的处理情况，这里只能写同步代码
        fun1（par1， par2）{}，   //参数1就是上面的数据state 参数2才是调用时候你要传的形参
        fun2（）{}
    }，
    
    actions：{
        fun1（par1， par2）{}，         //这里可以写异步代码，组件的逻辑中有些异步代码需要用到这里数据，就可以把组件里的异步代码写这里
        fun2（）{}
    }，
    
    getters：{
        fun1（par1， par2）{}，        //这个属性是单纯的对state数据进行简单加工，有点像vue中的计算属性，一般会有return
        fun2（）{}
    }        
-------------------------------------------------------------------------------------------------------
    
//然后是写sotre的入口文件index.js，这其实跟上面的写法差不多，就是这个文件是把所有的数据整合在一起了，然后再一起导根组件
      
import vue from 'vue'
import Vuex from 'vuex'  //引入vuex
import a  from '...'     //引入所有不同场景的store数据文件

Vue.ues(Vuex)            //相当于告诉本项目的vue，我要使用vuex，挂载vuex到vue上面

export default new Vuex.store({        //用vuex创建一个store实例
    state：{mes1}     //这里还可以接着写一些项目公共的数据
    mutations：{}	//对公共数据的处理
    ....
    modules：{
        moudleA：a    //这里就是把子数据模块引入到了入口文件，同时前面的属性名就是子模块的别名，在使用时候注意
    }
})  
----------------------------------------------------------------------
//最后再组件中，如何使用这些数据及方法，一把的有两种方法

//state使用
this.$store.state.空间名.xxx      //直接在组件里这样调用就可以了，跟或许路由参数很像

//直接获取store里面多个数据，并把这些数据映射在本身的state里面，引用vuex里面一个映射方法 mapState，而且这个方法只能写在本组件的computed里面
import {mapState} from 'vuex'  //引入映射所需要的方法
computed：{
    mpaState( '空间名' ， ['par1' ，'par2'])   //数组写法，要哪些直接拿，拿了后，这些数据就是相当于放在自己的state里了，不过key跟value值是固定一模一样的
    mpaState( '空间名' ， {a:'par1' , b:'par2'}) //对象写法，可以自定义映射过来的数据名字，注意，这里的属性值是要用字符串形式
}

//mutations使用
this.$store.commit（'空间名/方法名'，参数）
//映射的方式
import {mapMutations} from 'vuex'
methods:{
    ...mapMutations( '空间名' ，['fun1' ， 'fun2']) //直接当做methods方法用，用的时候该传参就fun1（参数）
}

//actions使用
this.$store.dispatch('空间名/方法名' ， 参数)
//映射的方式
import {mapActions}
methods:{
    mapActions('空间名' ， ['fun1' ， 'fun2'])  //也是写在methods里
}

//getters使用
this.$store.getters('空间名/方法名')
//映射方法
import {mapGetters}
computed：{
    mapGetters（'空间名' ， ['fun1' ， 'fun2']）
}


~~~

# 六、vue3+vite

- 需要node版本16以上，脚手架是vite
- 安装`npm init vue@latest`   ：安装最新脚手架vite并且初始化项目    `npm run dev`:启动项目 
- vue3更偏向于把所有的东西，包括这个组件要使用的数据方法都放在一起 ，就像原生js那样，vue2是把所有的东西分类了

## 6.1、组合式API

- vue的api叫选择式api，组合式api的标识是setup，

  ~~~vue
  //setup的基础写法，它是在beforCreate（）执行的，最早的
  <script>
  	export default{
    	setup(){      //如果这样写setup 那么里面定义的数据或者方法，必须最好要return出去，外面才可以用
      	                
      }
    }
  </script>
  //语法糖写法  <script setup></script>  语法糖的原理就是把上面的写法简洁了而已
  ~~~

### 6.1.1、reactive（）和ref（）

- reactive（）：里面的参数是一个对象形式，返回一个响应式对象，用的时候直接当做data里的数据

- ref（）：里面参数是对象或者简单数据类型（数字啊，字符串啊）都行，如果是简单数据类型，那么会被自动保诚一个对象形式，数据的值被默认成是value属性，但是如果在template里面使用的话，就又会自动去掉外层对象，直接用

  ~~~vue
  <script setup>
    const tem1=reactive({a:1 , b:2})   //reactive定义数据
    const tem2=ref(1)                  //ref定义简单数据类型，实际这个tem2已经是一个对象数据类型了
    console.log(tem2.value)           //在非template中使用时候，需要.value才可以获取到值
  </script>
  
  //使用数据
  <template>
  				{{tem.a}}  //可以直接使用reactive
  				{{tem2}}  //在这里，就可以直接使用tem2的，不用点value，因为这里vue默认已经处理了外层的对象结构了
  </template>
  ~~~


 ### 6.1.2、computed计算属性



- 跟vue2中基本上一样，功能同样式主要用于对于数据的固定计算并返回

  ~~~vue
  <script setup>
    import {computed} from 'vue'//从vue中引入创建computed的方法
    const com1=computed(()=>{
    	return  xxx            //函数返回的形式，返回的值是处理好的。只要这里使用到的数据变化，计算属性就会自动更新
    })
    
  //计算属性可以设置get和set方法，就是在获取和修改用到的数据时候，给的具体反应，只不过这时候，需要用对象形式
    const com2=computed({
    			set：（val）{xxx},  //val是新想要设置的值
          get:(){xxx}           //在获取数据时候的回调
    })
  </script>
  ~~~

### 6.1.3、watch监听

~~~js
import watch from vue
//监听单个数据
const tem1=ref({a:1 , b:2})
const wat1=watch（
			tem1 ,                        //注意，这里的第一个参数，也就是被监听的数据是一个ref对象
      (newvalue , oldvalue)={xxx},    //监听一个数据，参数是值变化后的数据和之前的数据
      {																//第三个参数是一个配置对象
        immediate:true,								//立即执行一次监听程序
        deep:true											//深度监听
      }
）
//深度监听
																										 



//监听多个数据，用数据形式表示被监听的数据
const wat2=watch([tem1,tem2], (newvalue , oldvalue)=>{xxx})  //注意，这里的newvalue参数是数组，只要被监视的数组里任何一个数据变了
																																都会触发监听的
~~~



## 6.2、生命周期函数

- 以前created的代码写在setup里。以前销毁前的代码写在onUnmounted里面

- 生命周期函数可以写多个，执行时候顺序一个个执行的

  ~~~js
  <script upset>
    
  import {onMouted} from vue
  onMonuted(){ console.log(1)}
  onMounted(){console.log(2)}
  
  </script>
  ~~~

  ​		![image-20231030184646972](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231030184646972.png)



## 6.3、父子间传值

- 父传子：跟vue2一样，利用props传值，只不过在setup中，没有props的，所有利用‘编译器宏’ defineProps来定义props。它的原理是一个编译标识，在编译时候遇到，就会进行固定的编译转换

  ~~~js
  //父组件传递数据
  <script setup>
    const tem=ref(3) 
  </script>
  
  <template>
    <Child :mes1=tem></Child>  //通过自定义属性传递数据，响应式数据，就用动态传递的方式
  </template>
  
  //子组件接收数据
  <script setup>
  		const props=defineProps({     //这个不需要引入的，直接用
      	mes1:String								//这里的写法跟之前定义传过来的数据规则一样，属性要是传过来数据的属性
      })
  console.log(props.mes1)    //在setup里使用
  </script>
  <template>
    {{mes1}}               //在template中使用时候，不用加props的
  </template>
  ~~~

- 字传父：跟vue2一样，是利用emit的自定义事件传递的，只不过写法上面有点不同。要先在子组件定义好后续想要利用的自定义事件

  ~~~js
  //子组件中传递数据
  <script setup>
   const emit=defineEmits(['eve1','eve2'])//这个也是不需要引入，里面是个数组，里面的数据就是后续需要用到的自定义事件 
   const mes1=ref(3)
  emit('eve1', mes1)   //写了这个emit就是表示这里触发了事件eve1，并且传递了参数mes1
  </script>
  
  //父组件中接收这个自定义事件的处理函数，也就是同时接收到了传过来的参数
  <script setup>
  	<Child></Child @eve1=handler>  //子组件上面绑好这个自定义事件，啥时候触发，就看子组件里面啥时候写了上面的emit了，
  	handler(par){
    	console.log(par)             //一但自定义事件触发了，它触发时候传递的参数就是这里的par，也就是说emit就是调用了这里的函数
    }
  </script>
  ~~~

## 6.4、ref获取dom

- 跟vue2一样，也是定义一个ref对象后，绑定在标签上，可以获取到DOM级的该标签，绑定在子组件上面，，可以获取到子组件，但是跟vue2不同的是，如果想要获取到子组件里面的数据或者方法，需要子组件自己本身设置了编译宏defineExpose函数才行

  ~~~js
  //子组件
  const tem1=ref(1)
  defineExpose({   //利用编译器宏，定义好哪些数据可以对外暴露
  	tem1
  })
  //父组件获取
  const ref1=ref（null）//定义一个ref对象
  const mes1=ref1.value.tem1  //这样父组件才可以获取到。.value是获取到组件了，.tem1就是获取到defineExpose给暴露出的数据
  <template>
  <Child ref='ref1'><Child> //把ref对象绑定在子组件身上      
  </template>
  ~~~

## 6.5、provider和inject

- 用来跨组件传值，但是属于高级向低级传值，比如祖自己向孙组件传值，不可以孙 组件向祖组件传值。

- 方式很简单，传值一方provider好数据，接收方直接inject接收。

  ~~~js
  //提供数据的一方，父组件及以上
  import {provide}from vue //引入传递数据的方法
  const mes1=ref(1)
  provide('data1' , mes1) //这就表示传递了一个ref数据，传ref数据是响应式的，第一个参数就是接收时候的数据名称
  provide('fun1' , ()=>{})  //这里也可以传递一个函数，可以用来修改传递参数的修改或者其他逻辑。
  
  //子组件接收数据
  import {inject} from vue
  const tem1=inject('date1')//这里的名字就是传入数据时候的第一个参数名字，接收到了数据
  const fun1=inject（‘fun1’）//接收传来的函数
  ~~~

## 6.6、pinpa

- https://pinia.vuejs.org/zh/core-concepts/
- 挂载到根组件上面

~~~js
import {createPinia} from 'pinia'
const pinia=createPinia() //执行方法，创建一个pinia实例
APP.use(pinia)            //在实例上面挂载
~~~

- 使用：它是每一个场景的数据创建一个store仓库，里面包含了对这个场景数据的方法等等

~~~js
import {defineStore} from 'pinia' //导入定义store的方法，这个方法执行后，返回值是一个方法，在使用组件放回值的方法后，就相当于创建了这个store实例
export const useTest1Store=defineStore('Test1' , ()=>{        // 第一个参数是定一下这个store的唯一标识符（名字）
  																															//第二个参数是个函数，定义store的数据，方法等等，
  
  		const mes1 = ref(1)    //定义state数据
      const funMes1=()={ mes.value++ }    //定义action里的方法，可以定义多个，方法里获取对应的state数据，直接拿
      
      const getter=computed(()=>{mes.value+1 })      //computed就是相当于以前的getters
      
      return{              //最后一定要把上面定义的数据，，方法return才能被使用
      		mes1 ， 
        	funMes1,
        	getter
      }
          
  })

//组件里使用store
import {useTest1Store} from '' // 引入想要用的数据store,因为store导出的是一个方法，所以这里就是个方法
import {storeToRefs} from 'pinia'  //引入解构基本数据后还依旧有响应式的方法
const Test1Store=useTestStore() //执行一下这个方法，就是相当于把这个仓库实例化了

使用store里面的基础数据
const data1=Test1Store.mes1       //直接调用，不可以解构出来再用，如果结构出来，就没有响应式了
const {mes1} = storeToRefs（Test1Store）//这样解构出来的mes1才可以保持着响应式

使用store里面的方法：这个没有响应式一说，所以结不结构都没关系
~~~

- pinia数据持久化插件：pinia-plugin-persistedstate
- 就是可以帮助自动实现把数据存下，如果数据没更新，就拿存的数据
- 配置插件

~~~js
//main.js 使用 
import persist from 'pinia-plugin-persistedstate' 
 app.use(createPinia().use(persist))  //给pinia实例使用这个插件，不是给根实例用的

store里配置，在使用defineStore定义store的时候，第三个参数是个对象。里面就是配置的相关信息
具体配置，详见https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html
~~~

## 6.7、vue3路由

- 在vue3中，路由的写法总体跟vue2差不多，只有少量区别。在vue3中，总的路由实例定义的时候有区别

- 基本配置

  ~~~js
  import { createRouter, createWebHistory } from 'vue-router'
  
  // createRouter 创建路由实例，===> 之前的vue2的new VueRouter()
  // 1. history模式: createWebHistory()   http://xxx/user
  // 2. hash模式: createWebHashHistory()  http://xxx/#/user
  
  // vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
  // import.meta.env.BASE_URL 是Vite 环境变量
  // 其他信息参考地址https://cn.vitejs.dev/guide/env-and-mode.html
  
  // 如果将来你部署的域名路径是：http://xxx/my-path/user
  // vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: []
  })
  
  export default router
  
  ~~~

- **获取路由信息以及路由参数**

  ~~~js
  //在vue2中，编程式导航是this.$router.push() 获取参数是this.route.params
  //在vue3，在template中，这样写可以，但在setup函数里没有this，获取路由对象信息以及参数通过useRouter和useRoute两个函数获
  import {useRouter , useRoute} from 'vue-route'
  <script setup>
    const router=useRouter() //获取到的就是当前路由的信息对象里面包括什么push等等
  	const route=useRoute（） //获取到的就是路由参数
  </script>
  ~~~

  

## 6.8、vue3项目配置

- **Eslint和prettier配置**

>  vue3项目的搭配一般都是用eslint和prettier，eslint是代码修复，规范的。prettier是格式化代码的，让代码更好看的。用这个时候，要关闭编辑器自带的

1. `pnpm create vue`就会创建项目，选择默认配置好eslint和pretter。同时会在根目录生成selintor.cjs和prettier.jsc.json配置文件

2. 在vsCode中安装eslint插件，并且在设置文件（user.settion.json）中配置如下

   ~~~js
   //eslint插件+vscode配置，实现自动化修复
       "editor.codeActionsOnSave": {
           "source.fixAll": true
       },
   
       //关闭自动格式化代码后保存，因为我们要用自己的格式化插件
       "editor.formatOnSave": false
   ~~~

3. 在eslintrc.cjs文件里，添加如下配置代码

   ~~~js
     ecmaVersion: 'latest'
     },
   
     rules: {
       'prettier/prettier': [
         'warn',
         {
           singleQuote: true, // 单引号
           semi: false, // 无分号
           printWidth: 80, // 每行宽度至多80字符
           trailingComma: 'none', // 不加对象|数组最后逗号
           endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
         }
       ],
       'vue/multi-word-component-names': [
         'warn',
         {
           ignores: ['index', 'Test'] // vue组件名称多单词组成（忽略index.vue）
         }
       ],
       'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
       // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
       'no-undef': 'error'
     }
   ~~~

- **基于 husky  的代码检查工作流**

  > 主要作用就是用于在代码被提交到git仓库之前做检测。所以用这个的前提是代码需要被git管理的。
  >
  > 注意：这里的执行过程是提叫到仓库之前，所以你的add到暂存区，是肯定可以的，只不过后面commit之前，检查！！

  1. git初始化 git init

  2. 初始化 husky 工具配置  https://typicode.github.io/husky/

     ~~~js
     pnpm dlx husky-init && pnpm install 
     ~~~

     命令执行完后，会生成一个husky文件夹,里面有个配置文件precommit文件，就是说这里就是在commit之前会执行这里的命令，这里的命令也就是package.json里面的命令，在我们安装了husky时候，就默认给package里面添加了一个检查代码的命令了，就是`"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",`也就是执行了pnpm lint 后就会按照你的eslint规则，检查整个项目所有这些文件。所以，只需要将precommit里的命令，换成pakage.json里面的这个指令就行  `pnpm lint`

  3. 配置好后，在以后的这个项目在git提交到commit之前，都会全盘检查几乎所有代码的问题！！！这不好，费时间、浪费。最好的状态就是只检查我当前修改的文件里有没有错误，一般的，修改了的代码，我们都是会提交到暂存区的。所以，用另一个插件lint-staged，它的作用就是检测暂存区的代码有没有错误，而不会整个检测仓库
  
  4. 安装`pnpm i lint-staged -D`
  
  5. 同样的理论，只要配置一个在commit之前执行的命令，就可以，只不过这次，这个命令的内容和对应的指令都是需要我们自己在package里面自己配置了
  
     ~~~js
     {
       // ... 省略 ...
       "lint-staged": {         //这是指令执行的具体内容
         "*.{js,ts,vue}": [
           "eslint --fix"
         ]
       }
     }
     
     {
       "scripts": {
         // ... 省略 ...
         "lint-staged": "lint-staged"  //这是指令
       }
     }
     ~~~
  
  6. 所以，，接下来还是在之前的procommit文件里配置，那也就是说，前面那个指令不要了，换成`pnpm lint-staged` 即可
  
     ~~~js
     //Procommit里面
     
     pnpm lint-staged
     ~~~
  
     































# vue中的Tips

1. 虚拟dom和dif算法
   - 传统的dom操作，只要有收到dom操作请求，就会直接操作dom，并不会知晓后续还有没有新的dom更新，这会导致每次都会更新都会重新加载、渲染，而且还有可能会导致dom坐标随着多次的变化发生变化，以至于后续的更新很难找到对应的dom结构
   - 虚拟dom是通过轻量级的虚拟dom树来构建页面的，它会通过diff算法，把每次的操作进行统计，比较，最终合并成一次改动最小的更新，这大大的减少了对dom的访问，提高性能。
   - 虚拟dom是将视图和状态分离开的，大大提高了延展性和可维护性
   - 虚拟dom可以在不同平台运行，包括浏览器和服务器

2. vue中双向数据的绑定原理
   - vue创建时候，会创建一个watch对象，同时会把所有的数据及相关属性通过object.definedPorperty()把它们转成getters和setter，也就是数据劫持和数据映射
   - 然后将模板编译成dom树，同时建立dom树和数据的关联
   - 当有数据发生变化时候，会通过watch捕获到并记录，再通过diff算法，比较新、旧dom树的差异部分，也就是需要 更新的部分，更新到实际的dom中，而不会更新整个页面

3. 组件中，引入css文件  在组件中，如果要引入css文件，语法是直接import     import‘路径.css’  

4. 懒加载插件

   ~~~js
   //插件懒加载 安装vue-lazyload  然后再引入、配置，配置就一步，就是指定到时候懒加载时候用啥照片替换原照片 
   import VueLazyload from 'vue-lazyload'
   Vue.use(VueLazyload, {
       loading: "懒加载的图片	",
   });
   //最后再使用这个插件自带的指令 v-lazy 代替掉原来图片img标签的src  值不变哈，还是最后要展示的图   <img v-lazy="最后该显示的图片"/>
   ~~~

5. vue在使用中，经常会用到：key=‘唯一值’    比如在循环时候，就会在被循环的标签里加一个这，这个的主要思想就是，因为：key是动态绑定的，根据diff算法，只要这个值变了，就会重新渲染，所以主要作用就是让vue重新渲染，这在以后的项目中经常用到，用来处理一些bug

6、 在vue项目创建的时候，render函数接收一个函数，这个函数的参数也是一个函数，这个参数函数就是可以渲染出一个虚拟DOM节点，然后返回，就像 render：function（par）{ return par（‘div’） }  相当于渲染出了一个div节点的虚拟DOM。如果par函数的参数是一个单组件文本，就是相当于渲染出这个单组件文本为虚拟DOM。然后再挂载到真实DOM上面 .$mount()
