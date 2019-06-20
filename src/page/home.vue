<template>
    <div class="home page">
        <pageHeader></pageHeader>
        <div class="main">
            <div class="video-box" :style="{'background-image':'url('+indexInfo.photo+')'}">
                <div class="info">
                    
                    <!-- <div class="title">{{indexInfo.title}}</div>
                    <div class="line"></div>
                    <p v-html="indexInfo.subTitle"></p> -->

                    <img style="margin-top: 446px;" src="../images/fm.png">
                    <div class="play-btn" @click="videoPlay" v-show="!playFlag">
                        <img src="../images/home_btn_play_default.png">
                    </div>
                </div>
                <!-- loop webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" --> 
                <video :src="indexInfo.videoUrl" loop webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" ref="video0" @pause="videoPause" v-show="playFlag"></video>
            </div>
        </div>
        <div class="contact">
            <!--<div class="info">
                <div class="title">Contact</div>
                <div class="add">ADD:杭州市滨江区白马湖国际会展中心4幢5楼</div>
                <div class="tel">TEL:0571-81915088</div>
            </div>
            <div class="qrcode">
                <img src="../images/foot_img_qrcode.png">
            </div>-->
        </div>
        <pageFooter></pageFooter>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import {Swiper,Scroller,SwiperItem,Loading} from 'vux'
    import pageHeader from "../components/header.vue"
    import pageFooter from "../components/footer.vue"
    import video from "../video/video.mp4"
    export default {
        name: 'home',
        components:{
            pageHeader,
            pageFooter,
            Swiper,
            SwiperItem,
        },
        data(){
            return{
                videoUrl:video,
                page:1,
                current:0,
                playFlag:false,
                indexInfo:{}
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
            videoPlay(index){
                let _this=this;
                let currentIndex=_this.current;
                _this.$refs.video0.play()
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
            getIndexVideo(){
                let _this=this;
                _this.$store.dispatch("showLoading");
                _this.request({
                    url:"WebCMS/GetVideoDefault",
                    data:{},
                    success:function(res){
                        if(res.data.status==1){
                            let result=res.data.data;
                            _this.indexInfo=result;
                            //console.log(res);
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
            this.wxShare();
            this.getIndexVideo();
        },
        mounted(){
            
        }
    }
</script>
<style lang="less" scoped>
    .home{
        .main{
            overflow: hidden;
            .video-box{
                width: 100%;
                height: 1178px;
                overflow: hidden;
                background-repeat: no-repeat;
                position: relative;
                background-size: cover;
                color:#fff;
                video{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position:center; 
                    background-color: #000;
                }
                .logo_01{
                    width: 1046px;
                    height: 288px;
                    img{display:block;
                    width: 100%;
            
                    }
                }
                .info{
                    position: absolute;
                    left:0;
                    top:0;
                    width: 100%;
                    z-index: 10;
                    text-align: center;
                    .title{
                        margin-top: 446px;
                        font-size: 40px;
						font-family: PingFangSC-Light, sans-serif;
						font-weight:300;
						letter-spacing: 20px;
						line-height:72px;
                    }
                    .line{
                        width: 80px;
                        height: 1px;
                        background-color: #F5F5F5;
                        margin:15px auto;
                    }
                    p{
                        font-size:22px;
						font-family:Avenir-Light;
						font-weight:300;
						line-height: 38px;
						letter-spacing:2px;
                    }
                    .play-btn{
                        width: 86px;
                        height: 46px;
                        margin:30px auto 0;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                }
                .vux-slider{
                    height: 100%;
                }
                .vux-swiper-item{
                    overflow:hidden;
                }
                .video-bg{
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .slide-group{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: 666;
                    display: flex;
                    height: 100px;
                    align-items: center;
                    .slide-bot{
                        width: 100px;
                        height: 100px;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                    }
                    .prev{
                        background-image: url(../images/prev.png);
                    }
                    .next{
                        background-image: url(../images/next.png);
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
