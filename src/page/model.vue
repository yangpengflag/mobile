<template>
    <div class="home page">
        <pageHeader></pageHeader>
        <pageFooter></pageFooter>
        <!--<goHome></goHome>-->
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import {Swiper,Scroller,SwiperItem,Loading} from 'vux'
    import pageHeader from "../components/header.vue"
    import pageFooter from "../components/footer.vue"
    import goHome from "../components/goHome.vue"
    export default {
        name: 'test',
        components:{
            pageHeader,
            pageFooter,
            goHome
        },
        data(){
            return{
                
            }
        },
        computed:{
            ...mapState([
                
            ])
        },
        methods:{
            ...mapMutations([
                
            ]),
            ...mapActions([
                
            ])
        },
        created(){
            this.wxShare(); 
        },
        mounted(){
            
        }
    }
</script>
<style lang="less" scoped>
     
</style>
