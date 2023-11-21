<template>
    <div class="total">

        <!-- 导航栏 -->
        <div class="navTotal">
            <div class="icon"> <router-link to="/" tar="div">图标</router-link> </div>
            <div class="nav">
                <el-menu  
                    class="el-menu-demo el" 
                    mode="horizontal" 
                    text-color="#000000"
                    menu-trigger="click"
                    active-text-color="#FA9D35"
                   
                    >
                    <el-menu-item class="el" v-for="(item ,Index) in nav" :index=item :key=Index>{{ item }}</el-menu-item>
                   
                </el-menu>
    
            </div>
        </div>


    </div>
</template>


<script>



export default ({
    data() {
        return {

        //导航栏数据
        nav:['菜单1' , '菜单2' , '菜单3']
        }
    },
    methods:{
       
    }
})

</script>
<style  scoped>

/*字体 */
@font-face {
  font-family: "navFont";font-weight: 400;
  src: url("../../assets/font/navFont/AlimamaDongFangDaKai-Regular.woff2") format("woff2"),
  url("../../assets/font/navFont/AlimamaDongFangDaKai-Regular.woff") format("woff");
  font-display: swap;
}
    .total{
        height: 1000px;
        background: url(../../assets/image/nav/banner.png);
        background-size: cover;
        
    }
    
    .navTotal{
        display:flex;
       font-family: navFont;
    }
    .navTotal .icon{
        flex:1;
        display: flex;
       justify-content: center;
       line-height: 61px;
    }
    .navTotal .icon div{
        user-select: none;
    }
    .navTotal .nav{
        display: flex;
        flex:2;
        justify-content: center;
    }
    .navTotal .nav .el{
        background-color: rgba(240, 240, 187, 0);
        border: none;
        user-select: none;
    }
    
    
</style>