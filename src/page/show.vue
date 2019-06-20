<template>
    <div class="home page">
        <pageHeader></pageHeader>
        <div class="main" ref="show">
            <div class="scroll">
                <ul>
                    <li v-for="(item,index) in videoList" :key="index">
                        <div class="video-box" :style="{'background-image':'url('+item.photo+')'}">
                            <video controls :poster="item.photo" :src="item.videoUrl" @pause="videoPause(index)" v-show="playFlag" :ref="'video'+index" ></video>
                            <div class="play-btn" @click="videoPlay(index)" v-show="!playFlag"></div>
                        </div>
                        <div class="video-info">
                            <h4>{{item.title}}</h4>
                            <p>{{item.subTitle}}</p>
                        </div>
                    </li>
                </ul>
                <div class="is-null" v-if="isNull">没有更多数据了...</div>    
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
        name: 'show',
        components:{
            pageHeader,
            pageFooter,
            Swiper,
            SwiperItem,
            goHome
        },
        data(){
            return{
                page:1,
                current:0,
                playFlag:false,
                isNull:false,
                videoList:[],
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
            initScroll(){
              var _this=this;
              _this.bScroll = new BScroll(this.$refs.show, {
                  click:true,
                  pullUpLoad:true
              });
              _this.bScroll.on("pullingUp",function(){
                if(!_this.isNull){
                    _this.page+=1;
                    _this.getList(_this.page);                    
                }
              })
            },
            videoPlay(index){
                let _this=this;
                let currentIndex=_this.current;
                let video=this.$refs['video'+index];
                video[0].play();
                _this.playFlag=true;
            },
            videoPause(){
                this.playFlag=false;
            },
            slideChange(currentIndex){
                let _this=this;
                _this.current=currentIndex;
                _this.playFlag=false;
                for(var key in _this.$refs){
                    _this.$refs[key][0].pause();
                }
            },
            prevEve(){
                if(this.current>0){
                  this.current--;  
                }else{
                  this.current=this.slideArr.length-1
                }
            },
            nextEve(){
                if(this.current<this.slideArr.length-1){
                    this.current++;   
                }else{
                    this.current=0;
                }
            },
            getList(page){
                console.log(1);
                let _this=this;
                _this.$store.dispatch("showLoading");
                _this.request({
                    url:"WebCMS/GetVideoPageList/"+page,
                    data:{type: 0},
                    success:function(res){
                        if(res.data.status==1){
                            let list=res.data.data.list;
                            _this.videoList=[..._this.videoList,...list];
                            if(list.length==0){
                                _this.isNull=true;
                            }
                            _this.$nextTick(function(){
                                _this.bScroll.refresh();
                                _this.bScroll.finishPullUp();
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
            let _this=this;
            _this.wxShare();
            _this.getList(_this.page);
        },
        mounted(){
            let _this=this;
            _this.initScroll();
            window.onresize=function(){
               setTimeout(function(){
                    _this.initScroll();
               },500)
            }
        }
    }
</script>
<style lang="less" scoped>
    .home{
        .main{
            position: absolute;
            left:0;
            right: 0;
            margin:0 auto;
            top:120px;
            bottom: 0;
            z-index: 80;
            overflow: hidden;
            background-color: #fff;
            max-width: 750px;
            ul{
                padding:30px 30px 0;
                overflow:hidden;
                li{
                    margin-bottom: 40px;
                    overflow:hidden;
                    .video-box{
                        background-color: #1D1E1F;
                        height: 324px;
                        overflow:hidden;
                        position: relative;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                        video{
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                        .play-btn{
                            width: 90px;
                            height: 50px;
                            background-image: url(../images/home_btn_play_default.png);
                            background-repeat: no-repeat;
                            background-size: cover;
                            position: absolute;
                            left:50%;
                            top:50%;
                            margin-left: -45px;
                            margin-top: -25px;
                            z-index: 20;
                        }
                    }
                    .video-info{
                        padding-top:20px;
                        h4{
                            font-size: 26px;
                            line-height: 38px;
                        }
                        p{
                            font-size: 20px;
                            color:#999;
                            margin-top: 7px;
                        }
                    }
                }
            }
        } 
        .contact{
            padding:0 35px;
            background-color: #1a1a1a;
            display: flex;
            align-items: center;
            overflow: hidden;
            .info{
                flex:1;
                color:#fff;
                margin-right: 54px;
                font-family: "FuturaT-Demi";
                .title{
                    padding-bottom: 16px;
                    border-bottom: solid 1px rgba(255,255,255,0.15);
                    font-size: 30px;
                    margin-top: 30px;
                }
                .add{
                    margin-top: 30px;
                    line-height: 26px;
                    font-size: 20px;
                }
                .tel{
                    margin-top: 30px;
                    line-height: 26px;
                    font-size: 20px;
                    margin-bottom: 40px;
                }
            }
            .qrcode{
                width: 150px;
                height: 150px;
                margin-right: 6px;
                img{
                    display: block;
                    width: 100%;
                }
            }
        }  
    }
</style>
