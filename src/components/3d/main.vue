<template>
    <div @click="test">
       <kaiwa :direct="'up'" :chaptor="chaptor" :section="section" :speed="speed"></kaiwa>
       <canvas id="3d_canvas"></canvas>
    </div>
</template>

<script>
	import kaiwa from 'src/plugin/kaiwa.vue'
	import light from './game/light.js'
	import mesh1 from './game/mesh1.js'
	import game from './game/game.js'

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

		mounted: function() {
			light.get_light();
			mesh1.get_mesh();
			game.init();
			game.animate();
		},
		methods: {
			test: function() {
				this.chaptor = 0;
				this.section = "a" + 2;
				this.speed = 100;
			},
		}
	}

</script>

<style>


</style>
