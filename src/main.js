// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueX from 'vuex'

import App from './App'
const Start = resolve => require(['components/start'], resolve)
const Game = resolve => require(['components/3d/main'], resolve)
const Fight = resolve => require(['components/2d/main'], resolve)
import text from 'src/script/text.js'
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
		scene: new Physijs.Scene,
		camera: {},
		renderer: {},
		geometry: [],
		material: [],
		mesh: [],
		light: [],
		//kaiwa
		direct: 'up',
		speed: 100,
		text: "",
		now_text: [],
		kaiwa_show: false,
		kaiwa: function (chaptor, section) {
			var me = this;
			me.now_text = '';
			me.kaiwa_show = true;
			me.now_text = text[chaptor][section].concat();
			text[chaptor][section].push('');
			me.Even(0);
		},
		Even: function (i) {
			//一个even只负责一句话
			var me = this;
			me.text = ""
			var d = setInterval(function () {
				me.text += me.now_text[i].slice(0, 1);
				me.now_text[i] = me.now_text[i].slice(1);
				//一个字符串打完了
				if (me.now_text[i].length < 1) {
					//循环控制,判断有没有下一句话
					if (me.now_text.length > i + 1)
						setTimeout(function () {
							me.Even(i + 1);
						}, 1500)
					clearInterval(d);
					if (me.now_text.length - 1 == i)
						setTimeout(function () {
							me.kaiwa_show = false;
						}, 1000)
				}
			}, me.speed)

		},
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
