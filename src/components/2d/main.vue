<template>
       <div class="section" id="section3">
		<canvas id="canvas" tabindex="0" width="1000px" height="800px"></canvas>
		<!--	canvas不支持键盘事件，所添加了tabindex来使其支持		-->
		<div id="game_intro">
			WASD控制移动，鼠标左键控制冰锥收回与释放，注意运用背刺。
		</div>
	</div>
</template>

<script>
	import game from './js/game'
	export default {
		name: 'fight',
		data() {
			return {}
		},
		mounted: function() {
			setTimeout(function() {
				game.init();
			}, 1)
		},
		methods: {

		}
	}

</script>

<style scoped="true" src="./css/main.css">


</style>
