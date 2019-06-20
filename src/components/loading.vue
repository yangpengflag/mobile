<template>
    <div id="loading" v-show="showFlag">
        <div class="ico">
            <img src="../images/loading.gif" alt="">
        </div>
        <p>加载中...</p>
    </div>    
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import router from '../router'
    export default {
        name: 'loading',
        data(){
            return {
                
            }
        },
        computed:{
            ...mapState([
               'showFlag'
            ])
        },
        methods:{
            
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    #loading{
        position: fixed;
        left:50%;
        top:50%;
        margin-left: -50px;
        margin-top: -50px;
        z-index: 999999999;
        width: 160px;
        height: 160px;
        background-color: #fff;
        -webkit-box-shadow: 0 0px 12px 0px rgba(100,100,100,0.36);
                box-shadow: 0 0px 12px 0px rgba(100,100,100,0.36);
        text-align: center;
    }
    #loading .ico{
        width: 80px;
        height: 80px;
        margin:15px auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    #loading p{
        font-size: 24px;
    }    
</style>