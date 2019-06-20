<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default {
    name: 'app',
    data(){
      return{
        transitionName:"fade-left"
      }
    },
    computed:{
        ...mapState([
            
        ])
    },
    created(){
      
    },
    methods:{
      ...mapActions([
          
      ])
    },
    watch:{
      '$route' (to,from,next){
          var _this=this;
          _this.$navigation.on('forward', (to, from) => {
            _this.transitionName = 'vux-pop-in';
          })
          _this.$navigation.on('back', (to, from) => {
            _this.transitionName = 'vux-pop-out';
          })
          _this.$navigation.on('replace', (to, from) => {
            _this.transitionName = 'fade';
          })   
      } 
    }
  }
</script>

<style>
  #app{
    width: 100%;
    max-width: 750px;
    margin:0 auto;
    background-color: #f5f5f5;
  }
</style>
