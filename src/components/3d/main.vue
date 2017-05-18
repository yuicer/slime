<template>
    <div>
      <transition name="fade">
     	 <kaiwa v-show="$store.state.kaiwa_show"></kaiwa>
      </transition>
       <canvas tabindex="0" id="canvas"></canvas>
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

			}
		},
		components: {
			kaiwa,
		},

		mounted: function() {
			game.init();
		},

		beforeRouteLeave(to, from, next) {
			this.$store.state.scene.removeEventListener('update', move.action);
			next()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (to.path == '/game' && from.path == '/game_fight') {
					if (vm.$store.state.death) {
						vm.$store.state.mesh[0].__dirtyPosition = true;
						vm.$store.state.mesh[0].__dirtyRotation = true;
						vm.$store.state.mesh[0].position.z = 750;
					}
					vm.$store.state.scene.addEventListener('update', move.action);
				}
				document.getElementById("canvas").focus();
			})

		}

	}

</script>

<style>


</style>
