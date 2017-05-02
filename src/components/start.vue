<template>
    <div>
        <img src="~assets/d/slime.png" alt="">
        <h1 @click="jump">start</h1>
    </div>
</template>

<script>
	export default {
		name: 'start',
		data() {
			return {

			}
		},

		methods: {
			jump: function() {
				this.$router.push('./game')

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
		/*		visibility: hidden;*/
	}

</style>
