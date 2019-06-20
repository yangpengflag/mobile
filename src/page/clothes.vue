<template>
    <div class="clothes page">
        <pageHeader></pageHeader>
        <div class="main">
            <div class="type-box border-bottom" @touchmove.stop.prevent>
                <div class="type border-right" @click="showEve">类别<img src="../images/down.png"></div>
                <div class="type-val"><span v-html="defaultType.name0"></span> <span v-html="defaultType.name1"></span></div>
                <div class="type-menu" v-show="showMenu" @click="hideModel">
                    <ol>
                        <li class="border-bottom" v-for="(item,index) in typeList" @click.stop="checkType(item,index)">
                            <span>{{item.name0}}</span>
                            <p>{{item.name1}}</p>
                        </li>
                    </ol>
                </div>
            </div>
            <div class="list" ref="list">
                <div class="scroll">
                    <ul>
                        <li v-for="(item,index) in dataList">
                            <img :src="item.photo">
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
        name: 'clothes',
        components:{
            pageHeader,
            pageFooter,
            pageLoading,
            goHome
        },
        data(){
            return{
                defaultType:{
                    type:"2017SS&nbsp;&nbsp;&nbsp;BACK TO BASIC",
                    second:"返璞归真"
                },
                typeList:[],
                dataList:[],
                showMenu:false,
                page:1,
                isNull:false
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
            hideModel(){
                this.showMenu=false;
            },
            showEve(){
                this.showMenu=!this.showMenu;
            },
            checkType(item,index){
                let _this=this;
                _this.defaultType=item;
                _this.showMenu=false;
                _this.page=1;
                _this.isNull=false;
                _this.dataList=[];
                _this.getList(_this.page,_this.defaultType.id);
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
                    _this.getList(_this.page,_this.defaultType.id);                    
                }
              })              
            },
            getNav(){
                let _this=this;
                _this.request({
                    url:"WebGoods/GetCategoryListByID/7",
                    data:{},
                    success:function(res){
                        if(res.data.status==1){
                            let list=res.data.data;
                            for(var i=0;i<list.length;i++){
                                let name=list[i].name.split("_");
                                list[i].name0=name[0];
                                list[i].name1=name[1]
                            }
                            _this.typeList=list;
                            _this.defaultType=list[0];
                            _this.getList(_this.page,list[0].id);
                        }
                    },
                    error:function(error){
                        console.log(error)
                    }
                })    
            },
            getList(page,id){
                let _this=this;
                _this.$store.dispatch("showLoading");
                _this.request({
                    url:"WebGoods/GetPageListNew/"+page,
                    data:{
                        styleid:id
                    },
                    success:function(res){
                        if(res.data.status==1){
                            let list=res.data.data.list;
                            _this.dataList=[..._this.dataList,...list];
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
            this.getNav();
            this.wxShare();
        },
        mounted(){
           this.initScroll(); 
        }
    }
</script>
<style lang="less" scoped>
    .clothes{
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
                    z-index: 10;
                    background-color: rgba(0,0,0,0.3);
                    ol{
                        padding:0 30px;
                        overflow: hidden;
                        background-color: #fff;
                        li{
                            height: 148px;
                            overflow: hidden;
                            font-family: "FuturaT-Demi";
                            font-size: 26px;
                            color:#1b1b1b;
                            span{
                                margin-top: 40px;
                                display: block;
                            }
                            p{
                                margin-top: 10px;
                            }
                        }
                    }
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
                    padding-top: 10px;
                    overflow: hidden;
                    li{
                        width: 370px;
                        height: 370px;
                        overflow: hidden;
                        margin-bottom: 10px;
                        background-color: #fff;
                        box-sizing: border-box;
                        padding:20px;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }  
</style>
