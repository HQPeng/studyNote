<template>
   <div>
    <div class="nav">
        <Nav></Nav>
    </div>

   </div>
</template>

<script>
import Nav from './nav.vue'; 

  export default({
    data(){
      return{
        mes:'这是总首页'
    }
  },
  components:{
    Nav
  }
})

</script>
  <style lang='scss' scoped>

  </style>