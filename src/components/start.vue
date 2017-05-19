<template>
    <div>
        <img v-if="!$store.state.win" src="~assets/d/slime.png" alt="">
        <img v-else src="~assets/d/yuusya.png" alt="">
        <h1 v-if="!$store.state.win & !$store.state.mercy" @click="jump">start</h1>
<!--结局1-->
        <h2 v-if="$store.state.win">镇民们给了你丰厚的报酬，不过对于你的问题都摇头说不知道，镇民们全体都出来为你送行，站在村口目送你离开，一直到你走的很远之后，他们才四散而去。</h2>
        <h2 v-if="$store.state.win">一年以后你在别的酒馆偶然听到别人在讨论这个城镇，
        	<p>
	        <br>[哎呀，真是没想到那个地牢里有那么多的金子，据说他们最后还发现一个美少女啊！]<br>[喔喔！早知道我也该去了]
       		</p>
        </h2>
        <h2 v-if="$store.state.win">而你，紧握着，镇民给你的3块金子。</h2>
<!--结局2-->
        <h2 v-if="$store.state.lost">你在迷宫里面迷路了，，只好返回到了镇子里。被大家用异样的眼光注视着</h2>
<!--结局3-->
        <h2 v-if="$store.state.mercy==2">史莱姆带着家人的照片离开了地牢，回到镇上，领取了报酬后，离开了小镇。</h2>
        <h2 v-if="$store.state.mercy==2">两年后你与魔龙战斗时，身边突然出现了一个白色的液状物体
        	<p>
	        <br>[哟！打完之后去喝杯茶如何？]<br>[就这么说定了！]
       		</p>
        </h2>
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
	
	h2>p {
		margin: 20px 0;
		font-size: 20px;
		padding-bottom: 80px;
	}
	
	div>img {
		margin-top: 250px;
		height: 100px;
		/*		visibility: hidden;*/
	}

</style>
