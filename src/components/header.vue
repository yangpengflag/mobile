<template>
    <div id="header">
        <div class="menu" :class="[{'open':isOpen}]" @click="toggleMenu"></div>
        <div class="logo" @click="goIndex">
            <img src="../images/logo.png">
        </div>
        <div class="goBack" @click="back">
        	<img src="../images/icon_arrowleft@2x.png" />
        </div>
        <div class="drop-menu" v-show="isOpen" @touchmove.stop.prevent>
            <ul>
            	<li @click="navLink('/brand')">
                    <h6>明星</h6>
                    <p>Star</p>
                </li>
                <li @click="navLink('/show')">
                    <h6>秀场</h6>
                    <p>Show Time</p>
                </li>
                <li @click="navLink('/jewellery')">
                    <h6>珠宝</h6>
                    <p>Jewelry</p>
                </li>
                <li @click="navLink('/clothes')">
                    <h6>服饰</h6>
                    <p>Clothes</p>
                </li>
            </ul>
            <div class="nav-logo" @click="goIndex">
                <img src="../images/nav_img_imglogo.png">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    import router from '../router'
    export default {
        name: 'pageheader',
        data(){
            return {
                isOpen:false
            }
        },
        computed:{
            ...mapState([
               
            ])
        },
        methods:{
        	back(){
                this.$router.back();
            },
            toggleMenu(){
                this.isOpen=!this.isOpen;
            },
            goIndex(){
                this.$router.replace({
                    path:"/"
                })
            },
            navLink(str){
            	console.log(str);
                this.$router.push({
                    path:str
                })
                this.isOpen=false;
            }
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    #header{
        height: 120px;
        background-color: #1B1B1B;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        padding:0 0 0 30px;
        position: fixed;
        box-sizing: border-box;
        left:0;
        top:0;
        right: 0;
        z-index: 1001;
        width: 100%;
        max-width: 750px;
        margin:0 auto;
        .menu{
            width: 44px;
            height: 44px;
            overflow: hidden;
            background-image: url('../images/nav_icon_menu.png');
            background-repeat: no-repeat;
            background-size: 100%;
            transition: all 0.3s ease;
        }
        .menu.open{
            background-image: url('../images/nav_icon_close.png');
        }
        .logo{
            flex:1;
            text-align: center;
            img{
                width: 500px;
            }
        }
        .goBack{
        	width: 100px;
        	height: 100px;
        	img{
        		width: 100%;
        		height: 100%;
        	}
        }
        .drop-menu{
            position: fixed;
            left:0;
            right: 0;
            max-width: 750px;
            margin:0 auto;
            top:120px;
            bottom: 0;
            width: 100%;
            background-color:rgba(33,33,33,0.97);
            color:#fff;
            box-sizing: border-box;
            .nav-logo{
                width: 75px;
                height: 75px;
                position: absolute;
                left:64px;
                bottom: 57px;
                img{
                    display: block;
                    width: 100%;
                }
            }
            ul{
                overflow: hidden;
                padding:0 60px;
            }
            li{
                height: 148px;
                border-bottom: solid 1px rgba(255, 255, 255, 0.2);
                display: flex;
                flex-direction: column;
                justify-content: center;
                h6{
                    height: 40px;
                    line-height: 40px;
                    font-size: 28px;
                }
                p{
                    font-size: 24px;
                    font-family: FuturaT-Demi;
                }
            }
        }
    } 
</style>