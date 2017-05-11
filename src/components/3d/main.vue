<template>
    <div @click="test">
       <kaiwa :direct="'up'" :chaptor="chaptor" :section="section" :speed="speed"></kaiwa>
       <canvas id="canvas"></canvas>
    </div>
</template>

<script>
	import kaiwa from 'src/plugin/kaiwa.vue'
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
			game.init();
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
