<template>
	<div class="jewellery page">
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
						<div class="show-more" @click="showAll" v-if="showMore" @click.stop>
							<img src="../images/shomore.png">
						</div>
					</div>
				</div>
			</div>-->
			<div class="list" ref="list">
				<!--<div class="scroll">
                    <ul>
                        <li v-for="(item,index) in dataList">
                            <img :src="item.photo">
                        </li>
                    </ul>
                    <div class="is-null" v-if="isNull">没有更多数据了...</div>
                </div>-->
				<div class="scroll">
					<ul>
						<li v-for="(item,index) in dataList" :key="index">
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
		</div>
		<pageLoading></pageLoading>
		<!--<goHome></goHome>-->
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import { Swiper, Scroller, SwiperItem, Loading } from 'vux'
	import pageHeader from "../components/header.vue"
	import pageFooter from "../components/footer.vue"
	import pageLoading from "../components/loading.vue"
	import goHome from "../components/goHome.vue"
	import BScroll from 'better-scroll'
	export default {
		name: 'jewellery',
		components: {
			pageHeader,
			pageFooter,
			pageLoading,
			goHome
		},
		data() {
			return {
				defaultType: {
					name: "金色迷情系列"
				},
				typeList: [],
				typeListAll: [],
				showMenu: false,
				showMore: true,
				dataList: [],
				page: 1,
				isNull: false,
				playFlag: false
			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapMutations([

			]),
			...mapActions([

			]),
			touchEve(e) {
				if(this.showMore) {
					e.stopPropagation();
					e.preventDefault();
				}
			},
			hideModel() {
				this.showMenu = false;
			},
			showEve() {
				this.showMenu = !this.showMenu;
			},
			checkType(item, index) {
				let _this = this;
				_this.defaultType = item;
				_this.showMenu = false;
				_this.page = 1;
				_this.isNull = false;
				_this.dataList = [];
				_this.getList(_this.page, _this.defaultType.id);
			},
			initScroll() {
				var _this = this;
				_this.bScroll = new BScroll(this.$refs.list, {
					click: true,
					pullUpLoad: true
				});
				_this.bScroll.on("pullingUp", function() {
					if(!_this.isNull) {
						_this.page += 1;
						_this.getList(_this.page, _this.defaultType.id);
					}
				})
			},
			showAll() {
				let _this = this;
				_this.typeList = _this.typeListAll;
				_this.typeScroll = new BScroll(this.$refs.typescroll, {
					click: true,
					bounce: false
				});
				_this.showMore = false;
			},
//			getNav() {
//				let _this = this;
//				_this.request({
//					url: "WebGoods/GetCategoryListByID/1",
//					data: {},
//					success: function(res) {
//						if(res.data.status == 1) {
//							let list = res.data.data;
//							let arr = [];
//							for(var i = 0; i < 6; i++) {
//								arr.push(list[i]);
//							}
//							_this.typeList = arr;
//							_this.typeListAll = list;
//							_this.defaultType = list[0];
//							_this.getList(_this.page, list[0].id);
//						}
//					},
//					error: function(error) {
//						console.log(error)
//					}
//				})
//			},
			getList(page, id) {
				let _this = this;
				_this.$store.dispatch("showLoading");
				_this.request({
					url: "WebCMS/GetVideoPageList/" + page,
					data: {
						type: 1
					},
					success: function(res) {
						if(res.data.status == 1) {
							let list = res.data.data.list;
							_this.dataList = [..._this.dataList, ...list];
							if(list.length == 0) {
								_this.isNull = true;
							}
							_this.$nextTick(function() {
								_this.bScroll.refresh();
								_this.bScroll.finishPullUp();
							})
						}
						_this.$store.dispatch("hideLoading");
					},
					error: function(error) {
						_this.$store.dispatch("hideLoading");
						console.log(error)
					}
				})
			},
			videoPlay(index) {
				let _this = this;
				let currentIndex = _this.current;
				let video = this.$refs['video' + index];
				video[0].play();
				_this.playFlag = true;
			},
			videoPause() {
				this.playFlag = false;
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
            slideChange(currentIndex){
                let _this=this;
                _this.current=currentIndex;
                _this.playFlag=false;
                for(var key in _this.$refs){
                    _this.$refs[key][0].pause();
                }
            },
		},
		created() {
			this.getList(this.page,1);
			this.wxShare();
		},
		mounted() {
			this.initScroll();
		}
	}
</script>
<style lang="less" scoped>
	.jewellery {
		position: relative;
		.main {
			position: absolute;
			left: 0;
			width: 100%;
			top: 120px;
			bottom: 0;
			z-index: 80;
			overflow: hidden;
			background-color: #f5f5f5;
			z-index: 10;
			.type-box {
				height: 88px;
				display: flex;
				align-items: center;
				background-color: #fff;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				z-index: 10;
				.type {
					width: 150px;
					text-align: center;
					height: 88px;
					line-height: 88px;
					font-size: 24px;
					img {
						width: 20px;
						height: 20px;
						vertical-align: middle;
					}
				}
				.type-val {
					flex: 1;
					text-align: center;
					font-size: 24px;
					color: #1b1b1b;
					font-family: "FuturaT-Demi";
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 88px;
				}
				.type-menu {
					position: fixed;
					left: 0;
					right: 0;
					max-width: 750px;
					margin: 0 auto;
					top: 208px;
					bottom: 0;
					overflow: hidden;
					width: 100%;
					z-index: 12;
					background-color: rgba(0, 0, 0, 0.3);
					.scroll {
						overflow: hidden;
					}
					ol {
						padding: 0 30px;
						overflow: hidden;
						background-color: #fff;
						li {
							height: 98px;
							overflow: hidden;
							font-family: "FuturaT-Demi";
							font-size: 26px;
							color: #1b1b1b;
							span {
								display: block;
								line-height: 98px;
							}
						}
					}
					.show-more {
						height: 44px;
						padding: 9px 0;
						text-align: center;
						background-color: #fff;
						img {
							width: 44px;
							height: 44px;
							display: block;
							margin: 0 auto;
						}
					}
				}
			}
			.list {
				position: absolute;
				left: 0;
				top: 0px;
				bottom: 0;
				width: 100%;
				z-index: 9;
				overflow: hidden;
				.scroll {
					overflow: hidden;
				}
				/*ul{
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
                        padding:40px;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                }*/
				ul {
					padding: 30px 30px 0;
					overflow: hidden;
					li {
						margin-bottom: 40px;
						overflow: hidden;
						.video-box {
							background-color: #1D1E1F;
							height: 324px;
							overflow: hidden;
							position: relative;
							background-repeat: no-repeat;
							background-size: cover;
							background-position: center;
							video {
								width: 100%;
								height: 100%;
								display: block;
							}
							.play-btn {
								width: 90px;
								height: 50px;
								background-image: url(../images/home_btn_play_default.png);
								background-repeat: no-repeat;
								background-size: cover;
								position: absolute;
								left: 50%;
								top: 50%;
								margin-left: -45px;
								margin-top: -25px;
								z-index: 20;
							}
						}
						.video-info {
							padding-top: 20px;
							h4 {
								font-size: 26px;
								line-height: 38px;
							}
							p {
								font-size: 20px;
								color: #999;
								margin-top: 7px;
							}
						}
					}
				}
			}
		}
	}
</style>