<template>
    <div>
        <img src="../../assets/d/slime.png" alt="">
        <h1 @click="jump">start</h1>
    </div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		mounted: function() {

		},
		methods: {
			jump: function() {
				this.$router.push('./one')

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
