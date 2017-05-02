<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    	<keep-alive exclude="start,fight">
       		<router-view></router-view>
		</keep-alive>
    </transition>
  </div>
</template>
<script>
	export default {
		name: 'app',
	}

</script>

<style>
	* {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	button {
		position: absolute;
		top: 0;
	}
	
	#app {
		font-family: 'Avenir', '微软雅黑', Helvetica, Arial, sans-serif;
	}
	
	body,
	html {
		padding: 0;
		margin: 0;
	}
	
	canvas {
		display: block;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .2s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}

</style>
