<template>
    <div @click="test">
      <transition name="fade">
     	 <kaiwa v-show="$store.state.kaiwa_show"></kaiwa>
      </transition>
       <canvas id="canvas"></canvas>
    </div>
</template>

<script>
	import kaiwa from 'src/plugin/kaiwa.vue'
	import game from './game/game.js'
	//为了清除绑的事件
	import move from './game/move.js'
	export default {
		name: 'game',
		data() {
			return {
				chaptor: "",
				section: "",
				speed: 150,
			}
		},
		components: {
			kaiwa,
		},
		watch: {
			move: function() {
				console.log(111)
			},
			deep: true
		},
		mounted: function() {
			game.init();
		},
		methods: {
			test: function() {
				this.chaptor = 0;
				this.section = "a" + 2;
				this.speed = 100;
			},
		},
		beforeRouteLeave(to, from, next) {
			this.$store.state.scene.removeEventListener('update', move.action);
			document.removeEventListener('keydown', move.event[0]);
			document.removeEventListener('keyup', move.event[1]);
			next()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (to.path == '/game' && from.path == '/game_fight') {
					document.addEventListener('keydown', move.event[0]);
					document.addEventListener('keyup', move.event[1]);
					vm.$store.state.scene.addEventListener('update', move.action);
				}
			})

		}

	}

</script>

<style>


</style>
