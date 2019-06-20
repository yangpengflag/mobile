<template>
    <div class="articlea page">
        <pageHeader></pageHeader>
        <div class="main">
            <!--<div class="back-group border-bottom">
                <div class="back-btn border-right" @click="back"><img src="../images/back.png">返回</div>
            </div>-->
            <div class="content" ref="content">
                <div class="scroll">
                    <div class="title">{{detail.title}}</div>
                    <div class="info">
                        <span class="recome">来源: {{detail.recome}}</span>
                        <span class="date">发布时间: {{detail.createTime}}</span>
                    </div>
                    <div class="desc">
                        <img :src="item.photo" alt="" v-for="(item,index) in detail.photoList">
                    </div>
                </div>
            </div>
        </div>
        <!--<goHome></goHome>-->
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import {Swiper,Scroller,SwiperItem,Loading} from 'vux'
    import pageHeader from "../components/header.vue"
    import pageFooter from "../components/footer.vue"
    import goHome from "../components/goHome.vue"
    import BScroll from 'better-scroll'
    export default {
        name: 'articlea',
        components:{
            pageHeader,
            pageFooter,
            goHome
        },
        data(){
            return{
                detail:{},
                imgLen:0
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
                
            ]),
            back(){
                this.$router.back();
            },
            initScroll(){
              var _this=this;
              _this.bScroll = new BScroll(this.$refs.content, {
                  click:true
              });
            },
            getDetail(id){
                let _this=this;
                _this.$store.dispatch("showLoading");
                _this.request({
                    url:"WebCMS/GetDetailByID/"+id,
                    data:{},
                    success:function(res){
                        if(res.data.status==1){
                           let detail=res.data.data;
                           let imgList=detail.photoList;
                           _this.detail=detail;
                           for(var i=0;i<imgList.length;i++){
                            var imgObj=new Image();
                            imgObj.src=imgList[i].photo;
                            imgObj.onload=function(){
                                _this.imgLen++;
                                if(_this.imgLen==imgList.length){
                                    _this.initScroll();
                                }
                            }
                            imgObj.onerror=function(){
                                _this.imgLen++;
                                if(_this.imgLen==imgList.length){
                                    _this.initScroll();
                                }
                            }
                           }
                           _this.$nextTick(function(){
                            _this.initScroll();
                           })
                        }
                        _this.$store.dispatch("hideLoading");
                    },
                    error:function(error){
                        _this.$store.dispatch("hideLoading");
                        console.log(error)
                    }
                })
            }
        },
        created(){
            var _this=this;
            var id=this.$route.query.id;
            _this.getDetail(id);
            this.wxShare();
        },  
        mounted(){
            var _this=this;
        }
    }
</script>
<style lang="less" scoped>
    .articlea{
        position: relative;
        .main{
            position: absolute;
            left:0;
            width: 100%;
            top:120px;
            bottom: 0;
            z-index: 80;
            overflow: hidden;
            background-color: #fff;
            .back-group{
                display: flex;
                height: 88px;
                .back-btn{
                    width: 150px;
                    text-align: center;
                    font-size: 24px;
                    color:#1b1b1b;
                    line-height: 88px;
                    img{
                        width: 20px;
                        height: 20px;
                        vertical-align: middle;
                    }
                }
            }
            .content{
                position: absolute;
                top:0;
                left:0;
                bottom: 0;
                overflow:hidden; 
                width: 100%;
                .scroll{
                    overflow:hidden;
                    width: 100%;
                }
                .title{
                    font-size: 34px;
                    color:#222;
                    line-height: 48px;
                    margin-top: 40px;
                    text-align: center;
                    padding:0 30px;
                }
                .info{
                    font-size: 20px;
                    color:#999;
                    margin-top: 30px;
                    text-align: center;
                    .date{
                        margin-left: 40px;
                    }
                }
                .desc{
                    margin-top: 48px;
                    padding-bottom: 40px;
                    width: 100%;
                    img{
                        display: block;
                        width: 100%;
                        margin:0 auto;
                    }
                }
            }
        }
    }   
</style>
