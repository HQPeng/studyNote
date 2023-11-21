# 基础

- 属性值可以带双引号，也可以不带（包括单标签）

- &copy；版权 、  &reg：商标 、  &nbsp：空格 、 &lt ：大于 、& gt：小于号 

- href：
  - 外部样式导入时候
  - 锚点时候 href='#'
  
- url:
  - import引入样式时候
  - background-image
  
- src：

  - <imgage> , <video>
  
- 在使用img标签的时候，图片跟html文件必须在一个盘符里 

-  </table>
  - table标签中的aline=center是让整个表格居中
  - valign是控制行里面内容位置
  - align是控制列的位置
  - 合并行colspan    合并列rowspan

- 类型浮动

  - **在非浮动元素眼里，浮动元素会被完全无视，也就是说，到时候的非浮动元素的margin值根本不会以是以浮动元素为基准的**

  - 一个元素浮动后，后面的盒子如果没有浮动，就会盖住这个浮动的盒子，但是不会盖住浮动里面的文字，文字是会环绕这个浮动盒子显示
  - 清楚浮动：clean：left  意思是如果这个盒子的左边有浮动元素，那么这个盒子本身会下降一个，不会动浮动元素盒子一点

- 元素只会默认继承父元素的宽度

- padding
  - padding会撑大盒子，可以用box-sizing：boderbox设置，让它不会撑大，这就是固定死了盒子的大小
  
- margin
  - margin：0 auto：只有在设置了本身数值后才会有效果

- text-align：justify ：文件两端对齐，只有在多行时候才有效

- **font是 style、weight 、font-size /line-height 、famliy的缩写，顺序不能变，最后两个必须写才能生效**

- background-attachment：固定背景图，但是显示还是显示在元素内

- background-position（left  top）定位在左上，可以写像素，也可以写百分比

  - background-size：cover：表示一张图一直等比例放大，知道把整个容易盛满，这基本上都会造成图片放大的 
  - content也是等比例放大，但是它是只有长宽有一个碰到了容器边了，就不会继续放大了

- overflow：auto：内容超出就显示滚动条，没超就不显示

- 隐藏的方式
  - display：none：啥都没有，不会渲染的
  - opacity：透明度
  - visiblity：内容隐藏了，但是位置还在的

- 动态伪类
  - a标签的四种状态：link ， hover ， active ， visited  一般设置顺序是：link ，visited ，hover ，active
  - input：focus：聚焦状态
  
- vertical-align：这是行内块元素的专属，它的四个值 middle、top、bottom、baseline都是相对于行高来的

- 固定定位：fixed ，

- 粘性定位 sticky : **显示还是一直在父元素里面，但是位置它是跟着父元素中，最近的一个具有滚动条的父元素来的，如果没有，那就是默认浏览器的。**

  ~~~html
  div{
  	overflow:auto  //必须要有滚动条出来，不能是hidden
  }
  li{
  	position:sticky
  	top:30px        //当这个li距离div30px时候，就不会往上滚了，
  }
  
  <div>
  	<li></li>
  </div>
  ~~~

  

  

- 伪对象选择器：：：after和 ：：before 这两个必须跟content一起使用 
  -  ：：fist-line和：：first-litter：一般用于增加箭头符号和首字特殊处理
  -   ：：selection：选中之后的样式

- zoom：是缩放属性，比1大就是放大，0-1之间就是缩小：放大效果只是视觉上面感觉，实际的数据没有变的，而且都是一起放大缩小的，不可能一个数据放大缩小

- 表单：要有提交功能，一定要有  form 标签  

  - ~~~html
     单选：
    <label for="box1">姓名：</label><input type="text" id="box1" />  这两个是绑定在一起的
    
    下拉框
    <select>    
        <option>北京</option>         
        <option>南京</option>
    </select>   
    
    单选按钮： 其中的value不是选项文字，是提交到后台的数据  name必须写
        学习<input type="radio" name="aa" checked="checked" value="学习"/>
        睡觉<input type="radio" name="aa" value="睡觉"/>
    
    多选按钮： 同样的是用name来连接的 name可以不写
        喝汤<input type="checkbox" name="吃饭" />
        吃米饭<input type="checkbox" checked="checked" name="吃饭" value="吃米饭"/>
    
    滑动块
        <input type="range" min="1" max="10" step="2"> 
    
    文本域
        <textarea cols="字符宽度" rows="行数">内容 </textarea>
    ~~~



- **BFC**
  
  -  触发条件： 根元素 、 浮动元素 、overflow不为visibility、 position为absolute或fixed等等 
  - 特性： 在垂直方向上同属于一个BFC的两个相邻box会发生重叠  、 BFC跟浮动盒子不会和浮动盒子发生重贴（自适应两栏、三栏）  、计算BFC高度时候，浮动元素也参与计算 
  
- 字体的引入：@font-face{
      font-family：   
      src：url（）
  }

- 文字阴影：text-shadow：水平（可以给负值） 垂直 模糊度 阴影颜色
  盒子阴影：box-shadow：水平  垂直  模糊度 阴影半径 颜色 内阴影/外阴影（insert/outsert）

- 圆角：border-radius：左上水平 右上水平 左下水平 右下水平/左上垂直 右上垂直 坐下垂直 右下垂（可以写数字，也可以写百分比）
  - 如果没有写斜号，就是表示水平垂直方向是一样的   如果只有两个值而且也没有斜号，就是表示左上右下是第一个数据，右上左下是第二组数据

- 属性选择器： input【value】【checked】 ：表示标签是input且有value跟checked的属性的    
  - input【value=“1”】：表示标签是impute 且value值就是1 ，必须一模一样的 

- 结构伪类选择器：

  - ul li：first-child{}  ：选择父元素ul下的第一个子元素，且子元素必须是

  - ul li：nth-child（n）：选择父元素ul下的所有子元素li    
  -   ul li：nth-child（2n） ：选择父元素下，li是偶数的    其中的n是默认从0开始取的，然后选中的那个如果不是li 就算是没有选中               
  - ul li：nth-of-type（2）：ul下的第二个li 
  - **ul状态伪类：input：checked{}  ：input框被选中的情况下发生的变化**

- 线性渐变：background：linear-gradient（方向（也可以用角度） ，颜色1，颜色2）  background：linear-gradient(to left top ，pink ，green） ：从右下到左上

- 过渡：transition：过渡，加在过渡的元素上面，写法 transition：检测的属性/all  过渡时间  过渡效果 过渡延迟`-  
  - `translation:height 1s linear `     这个过渡就是后面只要有动作让transition监测的属性height发生了变化，就会有效

- 转换 
  - transform：translate（X方向上，Y方向上）  这是2D平移效果
  - transform： rotateX（角度） ：这是沿着X轴旋转，同理Y、Z轴

- 动画：keyframes{
      from {初始状态}  to{结束状态}
  }  
  或者  keyframes{
      0%{}
      10%{}
      ...
      100%{}
  }
- animation的属性：animation：name  运行时间s 循环次数 有去有回的循环方式（从后到前，常用于抽屉效果）

- 弹性盒子：
  - 在侧轴上 的宽\高如果没有设置，则会自动撑满,但是此时如果还设置了侧轴的对齐方式（align-items），这时候这效果就没了。
  - 主轴的方向：flex-direction：row、column 、row-reverse 、row-reverse
  - 主轴的对齐方式：justify-content：flex-end 、center、space-between、space-evenly（所有之间的间距是相等的）
  - 侧轴的对齐方式：align-items:end、center    侧轴有多行的时候（前面那个没有这几个值）align-content:space-between、space-evenly
  - order：数字   数字越小，这个子元素就会排到越前面，会改变结构显示
  - flex-grow：添加在子元素上面，如果父元素还有剩余空间（主轴），则所有有这个属性的子元素按照数字，等分剩余空间，就比如，三个盒子，如果只有中间盒子有，那么就是自适应三栏了。贼快
  - flex：它是一种简写，就理解成，不写高度/宽度时候，几个子元素按照比例分了父元素的数据。也就是自适应几拦的感觉，但是跟上面相比，没有最低值
  - align-self:flex-start、flex-end、center   这是调整单个子元素的位置
- 瀑布流/多列布局：
  -  column-count：分成几列   column-width：每一列的宽度，  这两个只能存在一个
  -  column-gaps：每列之间的间隙
  -  column-rule：1px solid red  每一个的边框
  -  break-inside：同一个元素内的内容不要被断开  多列布局时候，有时候会让一个元素里的两个元素分成在了不同的列里面
- 响应式布局：
  - 就是显示屏幕在变换时候，显示按照设定好的来显示
  - @media screen and （min-width:100px） and (max-width:200px) {...}  最小100最大200时候怎么样，，其中的每个条件间必须有空格
- 移动布局：
  - em：相对于父元素的字体大小   rem相对于根元素html的字体大小   dpr：设备像素/css像素  vh/vw：是视图的宽高，100vh也就是设备的高度，它跟100%高度的区别是包括了滚动条
  - 在写移动端用rem的时候，比如根据设计稿测量的某个数据是10px  则用rem就是  10/（dpr*根元素字体大小的px）

- Gird布局：

  - grid-template-column：100px 200px设置了两列/ repeat(3 ,100px 200px 300px)设置了九列 / repeat（3 ，1fr 2fr）设置了6列

  - grid-gap：20px 30px  :行，列的间距分别是20 ，30

  - place-items:center center（star end）：设置每个格子里面的内容水平跟垂直方向的对齐方式

  -  place-content:center space-between（space-evenly，center，end...）  设置整个网格在这个容器里的水平垂直方向的位置
    grid-template-areas：“1 2 3

  -  1 4 5   ”  把网格设置成需要的格式，使用的时候，谁占用该区域，就在该子元素上面加 grid-area：1
     place-self：单个设置水平垂直方向上的对齐方式

    

# html常见问题

- margin塌陷问题（现在没有了）：父元素内，第一个子元素的margin-top跟最后一个子元素的margin-bottom会直接作用在了父元素身上。就理解成父子元素没有区分开，所以解决办法，给父元素加边框或者让父元素变成BFC即可

- 浮动引起的高度塌陷问题：

  - 本质：浮动元素不占位导致

  - 办法1，因为BFC原理，它在计算高度时候，是会计算浮动元素的高度的，所以解决办法一就是把浮动元素的父元素变成BFC

  - 办法2,上面的办法，改成BFC基本上都是要改变结构的，可以利用清楚浮动的办法，也就是在浮动元素下面，添加一个空块级标签，并且对这个元素进行浮动清除，那么它就不会覆盖在上面的浮动元素上面了，也就把父元素撑开了，但是直接添加空标签也是属于改变了结构，所以，最终办法是利用伪元素after添加，伪元素在渲染的时候，属于表现行为，不是结构，但是伪元素是属于行内元素，要变成块元素，所以最终办法就是在父元素上面添加一个伪元素 

    ~~~html
    .father::after{
    	content:'';    //伪元素必须有这个content属性，表示添加的内容
    	clean:both;			//清除浮动
    	display:block			//把伪元素变成块级元素
    	
    }
    ~~~


- 文字，不管有没有设置点击事件，在点击文字后，会有光标，想要去除的话，通过css样式 user-select：none




​        



​        



​    




​    




​    




​    




​    















