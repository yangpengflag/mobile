<template>
    <div class="brand page">
        <pageHeader></pageHeader>
        <div class="main">
        	<!--<div class="type-box border-bottom" @touchmove="touchEve">
                <div class="type border-right" @click="showEve">类别<img src="../images/down.png"></div>
                <div class="type-val">{{defaultType.name}}</div>
                <div class="type-menu" v-show="showMenu" ref="typescroll" @click="hideModel">
                    <div class="scroll">
                        <ol>
                            <li class="border-bottom" v-for="(item,index) in typeList" @click.stop="checkType(item,index)">
                                <span>{{item.name}}</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>-->
            <div class="typeMenu">
            	<div class="typeItem" v-for="(item,index) in typeList" @click.stop="checkType(item,index)">{{item.name}}</div>
            	<div class="typeSlider" :style="{transform: 'translateX(' + sliderOffset + 'px)','-webkit-transform': 'translateX(' + sliderOffset + 'px)'}"></div>
            </div>
            <div class="list" ref="list">
                <div class="scroll">
                    <ul>
                        <li v-for="(group,index) in decList">
                            <div class="item" @click="navLink(item)" v-for="(item,index) in group">
                                <div class="pic">
                                    <img :src="item.photo" alt="">
                                </div>
                                <div class="info">
                                    <div class="title" style="-webkit-box-orient: vertical;">{{item.title}}</div>
                                </div>
                            </div>
                        </li>
                    </ul> 
                    <div class="is-null" v-if="isNull">没有更多数据了...</div>  
                </div>
            </div>   
        </div>
        <pageLoading></pageLoading>
        <!--<goHome></goHome>-->
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import {Swiper,Scroller,SwiperItem,Loading} from 'vux'
    import pageHeader from "../components/header.vue"
    import pageFooter from "../components/footer.vue"
    import pageLoading from "../components/loading.vue"
    import goHome from "../components/goHome.vue"
    import BScroll from 'better-scroll'
    export default {
        name: 'brand',
        components:{
            pageHeader,
            pageFooter,
            pageLoading,
            goHome
        },
        data(){
            return{
                isNull:false,
                decList:[[],[]],
                hArr:[0,0],
                dataList:[],
                page:1,
                listLen:0,
                showMenu: false,
                showMore:true,
                typeList: [{
                	type: 2,
                	name: "明星"
                },{
                	type: 1,
                	name: "名流"
                }],
                activeIndex: 0,
                sliderOffset: 0,
                screenWidth: document.body.clientWidth
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
            touchEve(e){
                if(this.showMore){
                    e.stopPropagation();
                    e.preventDefault();
                }
            },
            hideModel(){
                this.showMenu=false;
            },
            showEve(){
                this.showMenu=!this.showMenu;
            },
            checkType(item,index){
                let _this=this;
                _this.defaultType=item;
//              _this.showMenu=false;
                _this.page=1;
                _this.isNull=false;
                _this.hArr = [0,0];
                _this.decList=[[],[]];
                _this.activeIndex = index;
                _this.sliderOffset = _this.screenWidth / 2 * index;
                _this.getList(_this.page,_this.defaultType.type);
            },
            showAll(){
                let _this=this;
                _this.typeList=_this.typeListAll;
                _this.typeScroll= new BScroll(this.$refs.typescroll, {
                  click:true,
                  bounce:false
                });
                _this.showMore=false;
            },
            initScroll(){
              var _this=this;
              _this.bScroll = new BScroll(this.$refs.list, {
                  click:true,
                  pullUpLoad:true
              }); 
              _this.bScroll.on("pullingUp",function(){
                if(!_this.isNull){
                    _this.page+=1;
                    _this.getList(_this.page,_this.defaultType.type);                      
                }
              }) 
            },
            navLink(item){
                console.log(item)
                this.$router.push({
                    path:"/article",
                    query:{
                        id:item.id
                    }
                })
            },
            loadImg(item,obj){
                let _this=this;
                let w=window.innerWidth/window.dpr;
                let liWidth=360*(w/750);
                let imgWidth=obj.width;
                let imgHeight=obj.height;
                let decList = _this.decList;
                let hArr = _this.hArr;
                item.width=imgWidth;
                item.height=imgHeight;
                if (hArr[0] <= hArr[1]){
                    decList[0].push(item);
                    hArr[0]+=imgHeight;
                }else{
                    decList[1].push(item);
                    hArr[1]+=imgHeight;
                }
                _this.listLen++;
                if(_this.listLen==_this.dataList.length){
                    _this.$nextTick(function(){
                        _this.bScroll.refresh();
                        _this.bScroll.finishPullUp();
                    })
                }
                console.log(imgHeight)
            },
            init(list){
                let _this=this;
                for(var i=0;i<list.length;i++){
                    var imgObj=new Image();
                    imgObj.src=list[i].photo;
                    (function(item){
                        imgObj.onload=function(){
                            _this.loadImg(item,this);
                        };
                        imgObj.onerror=function(){
                            _this.errImg(item);
                        };
                    })(list[i])
                }
            },
            errImg(i){
                console.log(i);
            },
            getList(page,type){
                let _this=this;
                _this.$store.dispatch("showLoading");
                _this.request({
                    url:"WebCMS/GetPageList/"+page,
                    data:{type:type},
                    success:function(res){
                        if(res.data.status==1){
                            let list=res.data.data.list;
                            let len=0;
                            if(list.length==0){
                                _this.isNull=true;
                            }
                            for(var i=0;i<list.length;i++){
                                var imgObj=new Image();
                                imgObj.src=list[i].photo;
                                imgObj.onload=function(){
                                    len++;
                                    if(len==list.length){
                                        _this.init(list)
                                    }
                                };
                                imgObj.onerror=function(){
                                    len++;
                                    if(len==list.length){
                                       _this.init(list)
                                    }
                                };
                            }
                            _this.dataList=[..._this.dataList,...list];
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
            this.wxShare();
            this.defaultType = {type: 2,name: 'WEEKFUN'};
        },
        mounted(){
            var _this=this;
            setTimeout(function(){
                _this.getList(_this.page,_this.defaultType.type);
                _this.initScroll();
            },100)
        }
    }
</script>
<style lang="less" scoped>
    .brand{
        position: relative;
        .main{
            position: absolute;
            left:0;
            width: 100%;
            top:120px;
            bottom: 0;
            z-index: 80;
            overflow: hidden;
            background-color: #f5f5f5;
            .type-box{
                height: 88px;
                display: flex;
                align-items: center;
                background-color: #fff;
                position: absolute;
                left:0;
                top:0;
                width: 100%;
                z-index: 10;
                .type{
                    width: 150px;
                    text-align: center;
                    height: 88px;
                    line-height: 88px;
                    font-size: 24px;
                    img{
                        width: 20px;
                        height: 20px;
                        vertical-align: middle;
                    }
                }
                .type-val{
                    flex:1;
                    text-align: center;
                    font-size: 24px;
                    color:#1b1b1b;
                    font-family: "FuturaT-Demi";
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 88px;
                }
                .type-menu{
                    position: fixed;
                    left:0;
                    right: 0;
                    max-width: 750px;
                    margin:0 auto;
                    top:208px;
                    bottom: 0;
                    overflow: hidden;
                    width: 100%;
                    z-index: 12;
                    background-color: rgba(0,0,0,0.3);
                    .scroll{
                        overflow: hidden;
                    }
                    ol{
                        padding:0 30px;
                        overflow: hidden;
                        background-color: #fff;
                        li{
                            height: 98px;
                            overflow: hidden;
                            font-family: "FuturaT-Demi";
                            font-size: 26px;
                            color:#1b1b1b;
                            span{
                                display: block;
                                line-height: 98px;
                            }
                        }
                    }
                    .show-more{
                        height: 44px;
                        padding:9px 0;
                        text-align: center;
                        background-color: #fff;
                        img{
                            width: 44px;
                            height: 44px;
                            display: block;
                            margin:0 auto;
                        }
                    }
                }
            }
            .typeMenu{
            	position: relative;
            	display: flex;
            	height: 88px;
            	background: #fff;
            	overflow: hidden;
            	z-index: 10;
            	.typeItem{
            		flex: 1;
            		text-align: center;
            		height: 88px;
            		line-height: 88px;
            	}
            	.typeSlider{
            		width: 200px;
            		height: 2px;
            		position: absolute;
            		left: 25%;
            		bottom: 0;
            		margin-left: -100px;
            		background: #1B1B1B;
            		transition: transform .3s
            	}
            }
            .list{
                position: absolute;
                left:0;
                top:88px;
                bottom: 0;
                width: 100%;
                z-index: 9;
                .scroll{
                    overflow: hidden;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding:10px 10px 0;
                    overflow: hidden;
                    li{
                        width: 360px;
                        overflow: hidden;
                        margin-bottom: 10px;
                        .item{
                            width: 100%;
                            overflow: hidden;
                            margin-bottom: 20px;
                            background-color: #fff;
                            img{
                                display: block;
                                width: 100%;
                            }                            
                            .info{
                                height: 122px;
                                padding:0 20px;
                                overflow: hidden;
                                .title{
                                    margin-top: 24px;
                                    font-size: 26px;
                                    color:#222;
                                    line-height: 36px;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    text-overflow: ellipsis;
                                    overflow:hidden;
                                }
                            }
                        }

                    }
                }
            }
        }
    }
</style>
