# 一、webpack

- webpack它是一个管理构建工具。它一般是用在项目的构建的时候，也就是开发时候，因为最后项目上线是一个打包后的代码。使用步骤解析。创建一个新的文件夹，在此文件夹下

- webpack运行在node中，为什么不是运行在浏览器中，因为webpack它是要读文件的，node环境里可以读文件

- webpack的编译详细过程：

  1. 初始化过程：将cli（命令后带的参数）参数、配置文件、默认配置全部融合成一个最终的配置对象
  2. 编译：
     - 生成chunk，每个chunk有自己的名字和唯一名字
     - 构建所有的依赖：读取每个chunk入口文件，形成抽象语法树后分析依赖关系，然后转换依赖代码，（如果一个模块前面已经被转换过了，就不会再转换了）最终形成一个模块的列表
     - 产生chunk assets：在生成模块列表后，webpack根据配置，把模块列表生成文件内容并有对应的hash
     - 整合chunk：对所有的chunk资源合并起来，形成一个总的chunk资源assets，并生成一个总的hash
  3. 输出**：利用node环境中的fs模块**，把总的chunks里的文件生成对应的文件即可
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  1. 安装：因为webpack在node环境中，也就是被看做一个包，所以会一样被node的自带的包管理器npm管理
     - `npm install webpack webpack-cli --save-dev`：第一个是主包，第二个是允许webpack在命令行运行的包
  
  2. 打包：`npx webpack`:因为这时候我们没有配置打包指令，只能依托于npx来执行node里面配置webpack打包指令
  
  3. 配置webpack：：**这里要手动写一个webpack配置文件 webpack.json.js    。webpack会自动读取这个配置文件，因为是在node环境里写的这个配置文件，所以这里写法遵循CommonJS规范**
  
     ~~~js
     以下的配置说明了开发环境和生产环境下不同的处理，生要：生成环境需要
     
     其他东西的引入	
     const path=require('path') //获取到node里面的path模块，为后面需要绝对路径的地址做准备
     
     特殊解析器的引入
     const toml = require('toml'); 
     const yaml = require('yamljs'); 
     const json5 = require('json5'); 
     
     插件的引入
       const HtmlWebpackPlugin=require('HtmlWebpackPlugin)//打包html文件：生成一个html文件，把打包的js代码用<script>标签形式放进去
       const miniCssExtractPlugin=require('mini-css-extract-plugin') //把css文件压缩并且导出成一个文件，并用link标签外联式调用。webpack5以上才有
       const CssMinimizerPlugin = require('css-minimizer-webpack- plugin')//把压缩代码用的
       const TerserPlugin = require('terser-webpack-plugin');//压缩、优化js的代码工具，这是内置的不用安装
     	const webpack=require('webpack') //引入webpack包。这里面包含了很多自带的插件，下面用到的时候，直接webpack.插件就可以了
       
     module.exports={
       
     入口
     //一个打包入口
       entry：'./src/index.js'， //打包入口文件，一个文件
       
     //多个打包入口
       entry: {          //这会有两个打包的入口，会打印两个js文件，但是，如果html模板那是没有配置多模板的话，这两个js都会被《script到这一个html上的
       									//如果想要多个html，而且每个上面放些打包的js，可以看下面html模板配置那
     			index1: {     //这里的名字就是后面出口那【name】获取到的名字
               import: './src/index.js', 
               dependOn: 'shared',     //表示还要引入后面share属性值的包
                 },
           index2: { 
               import: './src/test.js', 
               dependOn: 'shared',     //同上
              },
            shared: 'ajax',    //清楚抽离出来的公共的代码文件名
         },
     } 
        
     出口
     	output：{
       	filename：'script/[name]js'   //出口文件的名字,就是使用原来文件的名字，有几个入口就有几个出口文件名字,js文件同意放在script文件下
       //filename:'script/[name][contenthash].js' //【开不，生要】这种写法就是每次修改了内容，什成的文件名字都不一样，这是为了防止浏览器缓存导致的读取不到未改名字但是改了内容的新文件
         path：path.resolve(__dirname , 'dest')//配置出口路径，要是绝对路径，第一个参数路径下的第二个路径，第一个是本文件的绝对路径
       	clean：true ，      //打包后清理之前的打包好的
         assetModuleFilename: 'images/[contenthash][ext][query]' //配置asset资源的统一安放路径和名字
         publicPath:'http:localhost:8080'  //所有的import资源，前面都会加上这个地址【生要，开不】
       }，
       
       devtool: 'cheap-module-source-map',//追踪代码错误，可以追踪到引人的哪个文件下哪个错误，【开要，生不】
       
     模式
     	mode：development, //开发模式的切换
     
     插件的配置：插件必须是要先下载（记得加D，不要全局下载）后，把插件理解成一个个的模块。模块当然需要导入了，最上面导入插件，再实例化插件
       plugins：[ 
         				newHTMLWebpackPlugin({ // htmlwebpackplugin
       						template:'././'   //必须有，指定打包的js文件放在类似于哪个html文件中。并不是真正放进去哈
         					filename：''      //根据上面的模板，生成的html文件叫什么名字
         					 	inject：'body'   //script标签到时候插入到哪个地方，不配的话，默认插到了head里面了
                   chunks：['index1' , 'shared'] //指定上面的多个入口文件的哪些被script到这个html中
       				})，
                newHTMLWebpackPlugin(...) ，//如果需要多个打包后的页面，就是再实例化一个就行，然后这个根据需求，要不要在换一个template，
                                     	 //如果需要换，那么就是在项目里下，再写一个html，，供这个template使用
                                     
                new MiniCssExtractPlugin({ //处理css抽离的插件
               	 filename: 'styles/[name].css' //插件把css文件抽离出来，放在哪里，命名什么的配置
                })，
                
                new webpack.ProvidePlugin({ //webpack自带的插件，作用是让插件在全局下可以使用，不用import的
                	'$':'jQuery'             //这就表示，在代码里，直接用$ 就是代表的query库了，打包的时候会把jQuery打包进去
                })
               ]
     
     devserve配置：这是个插件 npm i webpack-dev-server -D ,这个不用引入，安装后，直接在下面写配置，而且是写在plugin同级
     devServer:{        //【开要，生不】
     	static;'./dist'， //配置服务器的根目录，如果目录里的文件是没有打包过得，那么在浏览器里是打不开的
       compress：true ，//服务器传回数据时候，是否用把文件压缩，如果压缩的话，传过来的速度会快点，这个在响应头里面可以看到是否压缩
       proxy: {        //代理配置
         '/api': 'http://localhost:4001',
       },
       historyApiFallback: { //在使用路由时候，有时候想访问的是路由地址，但是浏览器以为的是访问静态资源地址，会报错，通过这个配置解决问题
           rewrites: [
             { from: /^\/admin/, to: '/admin.html' },
             { from: /^\/user/, to: '/user.html' },
             { from: /./, to: '/index.html' },
           ],
         },
      host:'0.0.0.0', //配置这里主机，局域网就可以访问到这个服务器了
     }，
     
     模块系列的处理
     module：{
     		rules:[
     //asset各种类型处理 ：资源使用时候，当做模块一样，用import引入使用，
           {
           	test:/.(png|jpg|gif|svg)$/   
             type：'asset/rescource'  //引入后，相当于发请求获取整个资源，并返回这个资源的url地址，直接在代码中使用
           //type:'asset/inline'     //引入后，将小文件的DateUrl拿到，不会请求，而是把文件数据嵌入js，常用于图表类的小文件
           //type:'asset/source'  //引入后，拿到的是数据，就是资源里看到的啥，拿到的就是啥，常用于文本、文字类
           //type:'asset/',			//引入后，根据后面的maxSize配置，决定是使用resource还是inline格式
            // parser:{
             //				dataURLCondition：{
             //						maxSize：5*1024*1024 //大于4兆时候用resource，也就是生成一个资源文件引入，否则就用inline格式引入
           	//				}			
             generator:{              //这个是配置asset的文件打包路径跟名字的，可以每一个单独配，也可以在出口哪里配一个统一的，先找自己的，没有的话就用上面统一的
             	filename：'image/[name][ext]'  //这些资源被打包后放的位置就是出口地址下的这个位置，name读到的就是文件名，ext读到的就是文件后缀
           	}
           }，
           
          //一般字体的格式，都是通过resource格式来处理
           {
           	test: /\.(woff|woff2|eot|ttf|otf)$/i, 
             type: 'asset/resource',
           	generator：{}
           }，
           
         //自定义解析parse：将toml、yaml、json5 数组解析成json格式。先安装这三个的解析模块，然后在最上面引用这些模块。本来asset可以解析任何资源类型，但是这种特殊的，就是用它自己特有的解析器去处理
          { 
            test: /\.toml$/i,      //其他两个类似
            type: 'json',					//都是会被自己的解析器解析成json格式
            parser: {
              parse: toml.parse,  //这里配置，就是用自己的解析器的方式了，三个都类似，就搁这儿也换下就行
            }, 
          },
     
     //loader的处理：所有的loader都是需要下载的，表示告诉webpack，在打包时候，遇到import或者require这些文件时候，先用配置好的loader转换一下
     //css的loader  loader支持链式调用，执行是从后往前的。不可以顺序写反
           {
             test:'/\.(css|less)$/i',  //处理css和less的loader
             use:['MiniCssExtractPlugin.loader' , 'css-loader' , 'less-loader'] //用插件里的一个loader，把引入的css单独生成文件，并应link标签引入。插件在上配置好了
           }，
           
     //bable:webpack是默认只会打包js文件的，但是它只会打包，不会把es6语法转成es5语法等等，但是很多情况你依然是在浏览器里可以运行es6代码，那是因为浏览器
     //支持es6，做的支持，如果是低版本，运行打包后的文件，肯定不行，这时候就是用bable-loader了，
     //需要安装几个包
     //  babel-loader : 在webpack里应用 babel 解析ES6的桥梁
     //  @babel/core : babel核心模块
     //  @babel/preset-env : babel预设，一组 babel 插件的集合
     //  @bable/runtime   :运行时需要的包
     //  @babel/plugin-transform-runtime ：编译时候需要的包
           test: /.js$/, 
           exclude: /node_modules/, //对node-modules里的文件不打包
           use: { 
               loader: 'babel-loader', 
                options: { 
               		 presets: ['@babel/preset-env'], 
                    plugins: [ 
                         [ 
                           '@babel/plugin-transform-runtime' 
                         ] 
                       ] 
                   } 
               } 
             },
               
               
         ]
     优化配置
     optimization: { 
       //自动抽离公共文件，当有多个打包入口时候，如果他们有相同的文件，比如引入用了相同的模块，会自动把这些相同的文件生成一个文件，然后自动分别再<script>放入各个文件中
       splitChunks: { 
     		cacheGroups: {   //缓存设置
     			vendor: { 		//配置永久缓存，就是让不常变动的资源，在浏览器读取时候，不用每次都重新加载，这些基本上都是第三方包
     				test: /[\/]node_modules[\/]/, 
     				name: 'vendors', 
     				chunks: 'all', 
     			}, 
     		}, 
       }, 
        minimizer: [
          						new CssMinimizerPlugin(),//压缩css代码【生要，开不】
          						new TerserPlugin（）//压缩、优化js代码的。【生要，开不】
                   ],
          
     },
       
     其他配置
       resolve: { 
         alias: { 
           "@": path.resolve(__dirname, '。src/')  //这就是vue框架里常用的别名的配置，框架给默认配好了
         }, 
         extensions: ['.js', '.json', '.wasm'],    //省略后缀名，并且如果同名的文件话，安装这个顺序读取
       },
     
     }
     ~~~


- webpack的tree-shaking：

  - 在开发模式下，打包代码是不会被压缩的是吧，在这个情况下，webpack5其实是有个自动删除没用代码的功能的，叫tree-shaking，就是如果你的代码中引入了自己的文件，但是没有使用，或者你定义赋值了，但是后面再也没用了这些情况的话，webpack5在打包的时候，会自动的把这些文件无用的代码删除的。但是不会删除第三方的包，比如引入了第三方的包，但是没用使用，webpack是在打包时候不会删除的。

  - 它的这个机制在webpack4是没有的，webpack5的这个机制有一个问题，就是如果我引入的是css文件，或者是全局的文件，这些文件只要引入就是会起作用的，这时候webpack会把这些删除的，就不好了，这里可以在【package.json】文件里指定设置

    ~~~js
    {
      "devDependencies": {xxxx},
      "sideEffect":["*.css"]  //表示只要是css文件，那么就是说明它有副作用，就不要删，
      												//这里还可以设置的是设置的true，表示所有代码都有副作用，就不会删任何代码了
      												//如果是false，它就会自动的判断删除 
    }
    ~~~

    

- import和懒加载、预加载

  - import其实也是一个方法，它的返回值是一个promise对象的，参数就是引入进来的文件内容，利用这点，可以按需加载，就是把import当做一个正常的函数使用，这就是懒加载，不会一开始就会import

  - 预载就是，在使用import函数时候，配置下预加载，会使得这个加载自动在浏览器空闲时候取加载好，更加的优化性能

  ~~~js
  预加载是通过设置注释的方式实现的，如下代码，第一个是指定这个文件被单独打包后生成的文件名字，第二个就是预加载配置，这会生成  <link rel="prefetch" href="math.js">
  并追加到页面头部，指示着浏览器在闲置时间预取 math.js 文件
  const button =document.createElement('button')
  button.addEventListener('click' ,()=>{
  	import((/* webpackChunkName: 'math', webpackPrefetch: true */ '/test.txt').then(par){
    	console.log(par)
    }
  })
  ~~~

# 二、eslint

- 安装 npm i eslint -D

- 初始化：npx eslint --init  选择后，会生成一个eslintrc.json 配置文件

- 如果不安装eslint插件的话，每次检查的时候，都要输入指令 npx eslint 文件夹名   ：这将会eslint检查，安装的话，就不用每次这么麻烦了，会自动根据eslintrc.json文件提示

  ~~~js
  {
      "env": {
          "browser": true,
          "es2021": true
      },
      "extends": "airbnb-base",  //预定义的规则规范，跟后面的rules规则会结合使用的
      "parserOptions": {
          "ecmaVersion": "latest",
          "sourceType": "module"
      },
      "rules": {   //主要配置的
      }
  }
  
  ~~~

- 在不装的情况下，如果还是实现这个情况，就需要在webpack的配置文件webpack.json.js来，配置在处理js的时候用的babel-loader前加一个eslint-loader处理，

# 三、gitHooks提交前检查

- 先git init 项目，让项目被管理起来，
- 在.git/hooks里面的sample文件，就是git自动配置的hooks文件，是在git提交之前或者之后自动进行的文件，我们的需求就是在git提交之前执行一下 npx eslint 文件 的命令。
  1. 操作就是自己在项目根目录创建一个文件夹比如mygithooks，里面创建一个名字是pre-commit的文件，没有后缀名。然后在根目录下对这个文件夹添加githook可执行的命令 `git config core.hooksPath 文件夹名 `，
  2. 然后再在这个文件pre-commit里面写可需要执行的命令 `eslint src`意思是检测src下的代码，然后对这个文件进行权限操作`chmod +x mygithooks/pre-commit ` **注意：这里的指令是git bash下**，**也就是类似Linux下的，如果是windows命令行下的，命令是不一样的**。这样在提交commit之前，会执行里面的命令了

- 上面的方法比较的简单麻烦，一般的我们用工具husky代替如上的操作，在安装这个插件之前我们需要先在package.json中配置一下

  ~~~js
  "sctript": {
    //...others
    "prepare": "husky install"  //意思是安装依赖的时候，会先执行这个指令
  }
  ~~~

- 然后再安装插件，安装后，会有一个.husky文件夹，需要查看一下.git 文件夹下的config文件里面的core.hooksPath是否指向了这个.husky文件夹，如果没有指定，我们输入命令手动指定一下`git config core.hooksPath .husky`
- 这是如果还不行，就看下.husky下面自动生成的这个pre-commit文件有没有执行权限了，如果没有，还是需要手动添加一下`chmod +x mygithooks/pre-commit`

- 但是这样，每次提交后，都会把我们素有的代码都执行检测，真正在项目中，我们希望我们只检测我们修改的代码，也就是只检测缓存区的代码，也是需要用到插件，具体用法，详见vue3的项目配置

# 四、typescript跟webpack

- 在webpack中个，如果使用type，也是原理很简单，就是让webpack解析ts文件，那么就是用到ts文件的loader就可以

  1. 安装ts和tsloader ：`pm install --save-dev typescript ts-loader `

  2. 因为TS有它自己的规则，所以需要手动生成一个ts的配置文件 `npx tsc --init `生成tsconfig.json配置文件

     ~~~js
     {
     "compilerOptions": { 
     "outDir": "./dist/", 
     "noImplicitAny": true, 
     "sourceMap": true,   //追踪代码
     "module": "es6", 
     "target": "es5", 
     "jsx": "react", 
     "allowJs": true, 
     "moduleResolution": "node" 
     	} 
     } 
     ~~~

  3. 然后再webpack.json.js里面配置入口文件、ts的loader、extension

     ~~~js
     module.export={
     	entry: './src/index.ts', //打包入口改成ts文件
       devtool: 'inline-source-map', //如果上面ts的配置文件里开启了这个，webpack的这里也要开启才有作用
       module: { 
     		rules: [ 
     			{
     				test: /.(ts|tsx)$/, 
     				use: 'ts-loader',        //这里使用ts的loader
     				exclude: /node_modules/, 
     			}, 
     		], 
     	},
     	resolve: { 
     		extensions: [ '.tsx', '.ts', '.js' ], //ts项目里引入文件省去写这些后缀，而且如果同名的问，会根据这顺序引入的
     	},
     }
     ~~~

     
