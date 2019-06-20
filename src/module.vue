<template>
    <div id="proInfo">
        <pageHead></pageHead>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import pageHead from "../components/head.vue"
    export default {
        name: 'orderList',
        components:{
            pageHead
        },
        computed:{
            ...mapState([
                'basePath'
            ])
        },
        methods:{
            ...mapMutations([
                
            ])
        }
    }
</script>

<style lang="less" scoped>
    #proInfo{
        
    }
</style>