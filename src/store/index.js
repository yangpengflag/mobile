import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



import router from '../router'


var state = {		//状态对象
	showFlag:false
}                                                                                                                                                                                                                         

const mutations = {		//触发状态的方法，同步,第一个参数默认state，第二个参数自定义
	
}

const getters = {	//计算state
	
}

const actions = {	//异步触发状态
	showLoading({state}){
		state.showFlag=true
	},
	hideLoading({state}){
		state.showFlag=false
	}
}


export default new Vuex.Store({
	state,
    mutations,
    getters,
    actions
})