<template>
    <div id="goHome" @click="goBackHome">
        <img src="../images/goHome.png" />
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import router from '../router'
    export default {
        name: 'goHome',
        data(){
            return {
                
            }
        },
        computed:{
            ...mapState([
               
            ])
        },
        methods:{
            goBackHome(){
                this.$router.replace({
                    path:"/"
                })
            },
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    #goHome{
        width: 100px;
        height: 100px;
        position: fixed;
        right: 40px;
        bottom: 160px;
        z-index: 10001;
        img{
        	width: 100%;
        	height: 100%;
        	vertical-align: top;
        }
    } 
</style>