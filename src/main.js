// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueX from 'vuex'

import App from './App'
import Start from './components/d/start'
import Game from './components/3d/main'
import Fight from './components/2d/main'

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
            path: '/one',
            component: Game,
        }, {
            path: '/two',
            component: Fight,
        }
    ],
    //		切换页面自动上滑
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

const store = new VueX.Store({
    state: {
        scene: {},
        camera: {},
        renderer: {},
        geometry: [],
        material: [],
        mesh: [],
        light: [],
        a: 1,
    },
    mutations: {
        set(state, {
            obj,
            value
        }) {
            for (let i = 0, l = obj.length; i < l; i++)
                state[obj[i]] = value[i];
        },
    },
})
//this.$store.commit('set', {
//	obj: 'test2',
//	value: 'lala'
//	})
/* eslint-disable no-new */
var me = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})

//export default me;
window.me = me;
