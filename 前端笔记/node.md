# commonJS规范

- 每个js文件就是一个单独的模块，模块之间互不影响，也不会污染全局
- 导出moudle.exports=  
- 导入 require（./）  这里的地址，必须有斜杠，也就是说如果是同级目录，要写./


































​    
​    
​    
​    
​    
    node模块导出：  module.exports    导入模块 require（“地址”）返回值就是这个地址文件里导出出来的对象 module.exports
    
    内置模块：文件异步读取模块  语法 fs.readFile("地址" ， “显示格式” ， 回调函数function（err，data）{})  记住，回调函数里面的第二个参数才是成功后的返回数据
    
             文件同步读取      语法  fs。readFileSync（“地址” ， 格式）
    
             写文件           语法 fs.writeFile（“地址” ， “内容” ，function（e）{}）写完后的回调一定要写，而且这里回调函数参数不是写的内容，而且这还是全覆盖的写入
    
             URL模块：         url.parse("url地址")  把URL地址解析了给你,返回值是一个对象
                              resolvedUrl = url.resolve('https://www.example.com', '/path/file.html') 有点像拼接起来，一般就这么用，但实际没这么简单


            querystring模块：  querystring.parse('a=1&b=2') 转成对象  .stringify（对象） 转成get的URL格式
    
             http模块：       http.createServer(function(req , res){}) 创建了一个服务，只要有请求进来了，就执行这个函数，req和res分代表的就是请求体和响应体 响应体里有个end方法，里面的数据就是给前端的内容
                             server.on('request' , fucntion(req ,res){})  这样也是创建了一个服务器，跟上面一样
    
                            获取到get方法传来的数据，get的数据一般都是带在url的后面的带问号那些
                                   从url角度 url.parse(req.url ,true) 这是把url解析成对象，这个对象里东西可多了，不是单纯的包括url带的参数这些，解析后的query成员里才是数据参数
                                                     所以获取数据就是，url.parse(req.url).query.xxx   xxx就是数据的成员名
                                    从请求的角度直接获取  req.query:获取到的就是参数组成的对象了
    
                                    get数据还有一种就是不是正常的那种&组成的，就是直接再地址后面添加的那种，比如 xxx/222  这时候的222就是参数，对于这样的形式，一般在写路由的时候就会规定好这数据的名字，
                                                比如  router.get("/:id" , ()=>{})  这里就是说这个地址后面必须要有个参数，而这个参数在我服务器里我就把它叫做了id  获取的时候就是 req.params.id
    
                            获取post的参数：post在发送参数时候有两个形式，一个是地址栏看不到的，就比如表单数据，还有一种是可以看到的，就是直接再地址后面写的，比如.../222
                                          这时候的222就是参数
    
                                  res.on("data" , function(data){})这是服务端在接收到发送端发送的数据时候触发，
                                  res.on('end' , fucntion(){})  这是发送端数据全部发送完成后触发  一般的处理post的步骤
                                  req.on("end", () => {
                                                    //     let buffer = Buffer.concat(arr);  拼接，因为数据是一段段的流的形式传来的，buffer专门处理流的对象
                                                           buffer.toString());                拼好后转成字符串
                                                    //    querystring.parse(buffer.toString()); 转好后再机械成对象
                                                
                                                    // });
    
                                  对于第二种的参数，一般就是在服务器端已经用路由的方式规定了这个参数的名字 例如.../:id  那上面那个例子传过来的222的名字就是id 如果不传个数据来，请求过不来的
                                                      这时候入股想要在服务端获取这个数据，就是 req.params    如果路由写的是.../:id?  那就是代表有没有参数都行  
    
                  总的获取请求数据的方式：用express的中间件 app.use(express.urlencode({extended:false}))  这是一般用来处理post请求的数据，会把数据整成一个对象
                                                         app.use(express.json()) 这是把传递来的JOSN数据整成对象
                                                         这连个方法都是整成了对象，然后把数据挂在了req.body上面，这两个方法的意思都是说请求地址来了，还没有到路由时候，然后给解析了，再到路由， 所以这得要放在路由之前
    
                  最最最终获取数据的方式：上面的方法是内置的，有兼容问题的。最终常用的方法是第三方的中间件 body-parser，先npm下载下来，它的代码跟上面那两个基本上一模一样，就是把express换成这个body-parser的接受参数


              express模块：它跟上面一样，都是创建服务器用的，语法是 app.get("url" ，function（req ， res）{ res.send(数据) })  其他的也是一样，它是路由的形式 它的发送数据的函数跟之前不一样，是res.send()


              静态资源管理： app.use(express.static('这是写的内容到时候访问的地址里要写在地址后面的' ， “这是写的是访问当前的文件夹下，不可以访问本身文件的上层”))


                        !!!!!!!!!! 然后一般的访问逻辑就是，你访问得的地址是自己创建的网站检测的端口，至于访问的地址后面的url  就是后端处理的过程了
                                    比如说 访问了 127.0.0.1:8080/index.html   这也就是说，明面上是客户端想要访问index.html这个文件内容，但是后端的服务器其实在做好匹配url（也就是端口以后包括那个斜号）后，
                                    想给什么就给什么的，但是一般的就是给index.html这个文件，然后后端处理，也就是再用fs模块去读取这个文件，读取这个文件时候会在读到里面引入的css文件或者其他的文件，这些个
                                    其实就是都是又向服务端请求的，要再根据请求的url，比如引入的css文件，那它的url肯定是 xxx.css  这时候服务器需要再匹配一下这个url，再用fs读，读完直接返回，也就是res.send(data)就行
                                    然后在匹配地址时候，一般用正则匹配后缀名就行，然后还要注意访问地址的url跟实际到时候要读的文件地址的url做好关联，因为比如客户端的访问地址就是上面那个，那它的url就是 /index.html
                                    但是你服务器去读的时候填写的url，名字基本上就是它那个index，但是位置不一定就是直接的/ 这个位置，有可能是..//html../index
                                      在服务端的时候，服务端看到的url地址中的./  /  . 这三个都是当成一个/的
    
                npm: 安装： npm i 包名 / npm i -g  包名  卸载  npm un 【package】    清楚缓存，有时候下载失败的处理方式：   $ npm cache clear -f
                yarn  跟npm基本上一模一样，但是比它安全、快。 就只有指令一点点不一样  安装是：yarn add 【package】  移除是yarn remove 【package】 
    
                每个路由就是一个功能：路由使用的步骤：获取到route模块化对象  const router= express.Router()
                                              编写路由规则   router.get()。。。。    导出路由对象  module.exports=router
                                              使用路由（另一个文件了）   const a=require("路由的地址")   app.use(a)
    
               中间件： 它一般是写在路由的前面的（除了错误中间件一定要写最后）， 它是在数据发送过来跟返回数据之间的行为 其实就是一个函数，不过这个函数的参数被固定了的 就是 function（req , res ,next）{ ...  next()}
                       自定义中间件：自定义中间件就是单独写一个函数，不过要按照上面的规则写，然后最后在把这个函数被moudle.exports=函数名
                       内置中间件，就是上面提到的获取数据的总方法，
                       错误中间件: 固定语法function（err , req ,res,next） 这个的用法一般是配合路由里写try catch来写，就是  在路由里写的时候，写try catch 在catch里面写好异常后的throw
                                  这时候再在路由下面写个错误中间件，那么这时候里面的err就是你throw出来的东西，然后你在处理。。
                                   为什么要多搞这一步的错误处理呢，是因为，try catch里面写的错误处理方式，是处理不掉异常显示后的那一大段代码，只能改变下第一行的内容
                        !!!!错误中间件一定不能写在最前面，都是要写在所有的路由后面，不然要噶，，，
    
                        cookie中间件：cookie-parser  第三方的，先npm下载， 设置cookie：在路由里 res.cookie('name' , 'value' , {maxAge:毫秒数}})
                                                                         获取：req.cookies
                        session: 它跟cookie的关系就是，cookie中会存着一个sessionid  就是每次访问服务器时候，服务器会检查sessionid做不同处理，
                                 应用场景就是很多时候在一个网站上面长时间没哟操作时候，再操作会让你重新登录 或者就是计算网站被访问的次数
                                 也是一样，先下载 npm i cookie-session  设置是再使用这个中间件的时候就设置了， app.use(cookiesession({ name:'这是到时候cookie记录sessionid的名字'，
                                                                                                                                  secret：“随便什么字符，主要用于sessionid的加密，不然到时候可在cookie中看到sessionid的”                                            
                                                                                                                                     maxAge: 跟cookie一样，设置失效时间 ，
                                                                                                                                     rolling: true,  这是表示动一下后，设置时间就重新计算      
               MongoDB：- show dbs：查看数据库列表
                        - use db：使用/创建数据库
                        - db：查看当前库名
                        - db.表名.insert()：新增数据&可能会创建出一个数据表
                        - show tables / show collections：查看当前库中的表列表
                        - db.表名.drop()：删除指定的表
                        - db.dropDatabase()：删除当前的库
    
                       增： db.表名/集合名.insert([{}, {} ]
                       查： db.表名/集合名.find({key:value})
                            db.表名/集合名.find({$or:[{条件1},{条件2}]})
                            db.表名/集合名.find({字段名:/正则/i})
                       改：# 只修改单条文档
                           db.表名/集合名.updateOne({key:value},{$set:{key:value}})
                           # 修改符合条件所有文档数据
                           db.表名/集合名.updateMany({key:value},{$set:{key:value}})
                     统计：db.表名/集合名.count();		// 统计所有的记录的总数
                           db.表名/集合名.find({}).count();	// 统计符合条件的结果的记录总数
                     分页：db.表名/集合名.find().limit(3);     //limit表示获取的记录的个数（长度）
                           db.表名/集合名.find().skip(1).limit(3)  //skip表示起始位置，也就是从第几个开始
    
              node操作MongoDB：1、安装npm i -S mongosse  和引入require 
                               2、建立链接 mongoose.connect('mongodb://链接的数据库地址，直到数据库名字' ，{useNewUrlParser: true,  useUnifiedTopology: true })第二个是固定配置
                               3、建立建表规则：const Scheam=new Schema（{ name：{        //字段的名字
                                                                                    type：string //类型
                                                                                    required：TRUE //代表是必填的
                                                                                    minlength：   ///最小长度
                                                                                } ，
                                                                          age：{,,,,,}
                                                                        }）
                              4、定义模型：const Model = mongoose.model('User', UserSchema, 'users') 第一个参数是模型名字，一般跟定义的名字一样，第二个就是定义好的schema，第三个是到时候写在库里面的真正的表的名字
                              5、使用model的方法：  Model.insertMany({key:value})
                                                   Model.deleteMany({条件},err=>{})
                                                   Model.deleteOne({条件},err=>{})
                                                   Model.countDocuments({条件})
                                                   Model.find({条件},{可选字段返回:0/1},{skip:0,limit:10})
                                                   Model.findOne({条件},{可选字段返回:0/1})  这返回是个promise对象 .then成功的回调函数的参数就是查询到的数据
                                                   Model.updateMany({条件},{$set:{key:value}},res=>{})
                                                   Model.updateOne({条件},{$set:{key:value}},res=>{})
    
              art-tempelete使用：1、 安装npm i -S art-template express-art-template ，第一个是依赖
                                 2、配置模板引擎：  app.engine("view" , require('express-atr-template')) 第一个参数固定的，，说应用的是视图模板引擎 ，第二个就是引入
                                                  app.set('view' , '地址')  第一个参数还是固定额，第二个我参数是模板在哪个文件夹的位置 （到文件就行，因为具体要哪个文件，后面渲染时候写）
                                                  app.set('view engine'  , 'html')这个是可写可不写，就是说待会儿渲染时候的文件后缀名是html，现在写了的话，渲染时候后缀名就可以不写了
                                 3、使用： 一般是在路由里面写  res.render('test.heml') 这就是说渲染这个文件，以前的方式就是读取文件后，再返回给res，现在直接这样写就行
    
                            语法：在这里的话，就是后端传过去的数据是不被解析的，如果想要被解析，那么就是在前端里面写的时候加个@ 就会解析html了，例如 {{@a}}
                                 直接调用的语法 ：被渲染的那个页面里写 {{后端给的变量名}}   是在写res.render（xxx , {a:3 , } ）的第二个参数里的，而且是要写对象的形式的
    
                                 条件判断语句：{{if 条件}} … {{else if 条件}} … {{/if}}
                                 数组的输出，或者循环可迭代的语音：{{each 循环的数据}}  {{$index}} {{$value}}  {{/each}} 其中这个index就是固定的词，就是代表的是index值，value就是对应的值
                                 模板包含：{{include '被引入文件路径'}}   跟html中引入css一样的功能，就是在html的哪个地方引入了另一个模板，就相当于把另一个模板里的内容黏贴搁这儿
    
                                 模板继承（重点）：主要是用在好几个页面时候，它们的有些地方一模一样，这时候，就可以把这些一模一样的地方搞成一个父页面，然后子页面继承它
                                                用法： 先在父页面里搞坑，然后让子页面根据自己需要填，其他的没搞坑的，那不就是所有子页面公共了
                                                      父页面挖坑 ：  {{block 'content'}}{{/block}}  content是坑的名字，将来子页面要根据名字填的，不然不知道填的是哪个坑
                                                      子页面填肯，先写继承父页面 {{extend '父页面地址'}}   再填坑{{block 'content'}}  子页面填坑的内容    {{/block}}


​                                    



​                                                                                                          