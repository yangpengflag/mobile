// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//禁用自带提示
Vue.config.productionTip = false

//消除点击延迟
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

//vue-resource
// import vueResource from 'vue-resource'
// Vue.use(vueResource);

// vuex
import Vuex from 'vuex';		
Vue.use(Vuex);

// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
//下拉刷新，上拉加载组件;

import Navigation from 'vue-navigation'
Vue.use(Navigation, {router, store,keyName: 'str'})

// import VueLazyload from 'vue-lazyload';
// Vue.use(VueLazyload)

import 'lib-flexible';



import App from './App'
import router from './router'
import store from './store'

//全局css/js
import "./css/main.css"

//import Zepto from "n-zepto"

import axios from 'axios'
import qs from 'qs'
import shareLogo from './images/title.png'

function GetParams(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]); 
    return "";
}


router.afterEach((to, from, next) => {
  if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
    window.entryUrl = window.location.href
  }
})


Vue.mixin({
  data () {
    return {
      
    }
  },
  methods: {
      request(json){
        let baseUrl="https://websiteapi.weekfan.com/api/v1/";
        let method="GET";
        if(json.method){
          axios.post(baseUrl+json.url,json.data).then(res=>{
            json.success&&json.success(res);
          }).catch(err=>{
            json.error&&json.error(err);
          })
        }else{
          axios.get(baseUrl+json.url,{params:json.data}).then(res=>{
            json.success&&json.success(res);
          }).catch(err=>{
            json.error&&json.error(err);
          })          
        }
      },
      wxShare(shareUrl){
        let requestUrl="https://websiteapi.weekfan.com/api/v1/WebCMS/GetShareConfig";
        let localUrl = location.href.split('#')[0];
        var shareUrl=localUrl;
        var u=window.navigator.userAgent;
        if(u.indexOf("Android")>-1){
          shareUrl=location.origin;
        }
        let parmas={
          url:localUrl
        };
        axios.get(requestUrl,{params:parmas}).then(res=>{
          if(res.data.status==1){
            let result=res.data.data;
            wx.config({
                debug:false,//开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId:result.appId,//必填，公众号的唯一标识
                timestamp:result.timestamp,//必填，生成签名的时间戳
                nonceStr:result.noncestr,//必填，生成签名的随机串
                signature:result.signature,//必填，签名
                jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
              //分享给朋友
              wx.onMenuShareAppMessage({ 
                title: 'CHICCOMAO&WEEKFAN官网', // 分享标题
                desc: '精致女人 尚流生活', // 分享描述
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "http://www.weekfan.com/title.png", // 分享图标
              }); 
              //分享到朋友圈
              wx.onMenuShareTimeline({ 
                title: 'CHICCOMAO&WEEKFAN官网', // 分享标题
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "http://www.weekfan.com/title.png", // 分享图标
              });
            })            
          }
        }).catch(err=>{
          console.log(err)
        })
        
      }
  },
  created () {
    
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate:function (){
    //router.push({path:'/'});
  },
  created:function(){
    
  }
})



