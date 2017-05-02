// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueX from 'vuex'

import App from './App'
const Start = resolve => require(['components/start'], resolve)
const Game = resolve => require(['components/3d/main'], resolve)
const Fight = resolve => require(['components/2d/main'], resolve)

Vue.config.productionTip = false
//全局状态管理
Vue.use(VueX)
//全局路由
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: Start,
             },
		{
			path: '/game',
			component: Game,
        	},
		{
			path: '/game_fight',
			component: Fight,
        }
    ],
})

const store = new VueX.Store({
	state: {
		scene: new THREE.Scene(),
		camera: {},
		renderer: {},
		geometry: [],
		material: [],
		mesh: [],
		light: [],
	},
})

export default new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})
