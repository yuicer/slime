<template>
    <div>
        <kaiwa :position="true" :charector="charector"></kaiwa>
        <img src="../../assets/d/slime.png" alt="">
        <h1 @click="jump">start</h1>
        <kaiwa :position="false"></kaiwa>
    </div>
</template>

<script>
	import kaiwa from './kaiwa.vue'
	export default {
		data() {
			return {
				charector: ""
			}
		},
		components: {
			kaiwa
		},
		mounted: function() {

		},
		methods: {
			jump: function() {
				//				this.$router.push('./one')
				this.charector = "one";
			}
		}
	}

</script>

<style scoped="true">
	div {
		text-align: center;
		color: #2c3e50;
		width: 100vw;
		height: 100vh;
	}
	
	div>img {
		margin-top: 250px;
	}

</style>
