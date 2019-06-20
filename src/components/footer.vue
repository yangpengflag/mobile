<template>
    <div id="footer">
        <!--footer<div class="copy-right">浙ICP备 13010397号-2</div>-->
        <div class="bot-group">
            <div>©2018 杭州美撼凡尘文化创意有限公司 保留所有权利</div>
            <!--<div><img src="../images/foot_icon_china.png"><span>浙公网安备 31010602001727号</span></div>-->
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import router from '../router'
    export default {
        name: 'pagefooter',
        data(){
            return {
                showTelFlag:false,
                show:false,
                showWxFlag:false
            }
        },
        computed:{
            ...mapState([
               
            ])
        },
        methods:{
            
        },
        created(){
            
        }
    }
</script>

<style lang="less" scoped>
    #footer{
        background-color: #1B1B1B;
        left:0;
        right: 0;
        bottom: 0;
        height: 120px;
        width: 100%;
        z-index: 10;
        margin:0 auto;
        color:#807D7A;
        padding:0 30px;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 16px;
        line-height: 22px;
        z-index: 999;
        max-width: 750px;
        margin:0 auto;
        .copy-right{
            margin-top: 25px;
        }
        .bot-group{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            img{
                width: 18px;
                height: 19px;
                vertical-align: middle;
                margin-right: 10px;
            }
            span{
                vertical-align: middle;
            }
        }
    }
</style>
