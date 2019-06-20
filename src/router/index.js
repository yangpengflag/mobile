import Vue from 'vue'
import Router from 'vue-router'


let Home = resolve => {
  require(['@/page/home.vue'], resolve);//首页
}

let Show = resolve => {
  require(['@/page/show.vue'], resolve);//首页
}
let Clothes = resolve => {
  require(['@/page/clothes.vue'], resolve);//服装
}
let Jewellery = resolve => {
  require(['@/page/jewellery.vue'], resolve);//珠宝
}
let Brand = resolve => {
  require(['@/page/brand.vue'], resolve);//品牌
}
let Article = resolve => {
  require(['@/page/article.vue'], resolve);//文章详情
}

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/show',
      name: 'show',
      component: Show
    },
    {
      path: '/clothes',
      name: 'clothes',
      component: Clothes
    },
    {
      path: '/jewellery',
      name: 'jewellery',
      component: Jewellery
    },
    {
      path: '/brand',
      name: 'brand',
      component: Brand
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    }
  ],
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
  }
})
