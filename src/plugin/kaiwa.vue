<template>
    <div id="box" :class="{up:direct == 'up',down:direct == 'down'}">
    <section>
    	<div>{{text}}</div>
    </section>
    </div>
</template>

<script>
	import text from 'src/script/text.js'
	export default {
		data() {
			return {
				text: "",
				time: 150,
				now_text: [],
			}
		},
		props: ['direct', 'chaptor', 'section', 'speed'],
		mounted: function() {
			var me = this;


		},
		watch: {
			section: function() {
				var me = this;
				//保存一次会话的数组
				me.now_text = text[this.chaptor][this.section];
				me.Even(0);

			}
		},
		methods: {

			//匀速出现字
			Even: function(i) {
				var me = this;
				me.text = ""
				var d = setInterval(function() {
					me.text += me.now_text[i].slice(0, 1);
					me.now_text[i] = me.now_text[i].slice(1);
					//一个字符串打完了
					if (me.now_text[i].length < 1) {
						//循环控制
						if (me.now_text.length > i + 1)
							setTimeout(function() {
								me.Even(i + 1);
							}, 1000)
						clearInterval(d);
					}
				}, me.speed)

			},
			//变速出现字
			Gradient: function(speed) {
				var me = this;
				setTimeout(function() {
					me.text += "1";
					me.time += speed;
					if (me.text.length <= 250)
						me.Gradient();
				}, me.time)
			},
		},
	}

</script>

<style scoped="true">
	#box {
		width: 100vw;
		height: 16vh;
		background: rgba(0, 0, 0, .7);
		display: flex;
		padding: 2vh;
	}
	
	section {
		width: 60vw;
		height: 80%;
		margin: auto;
		padding: 1.5vh;
		text-align: left;
		border: 2px solid white;
		text-indent: 48px;
		font-size: 24px;
		color: white;
		overflow: auto;
	}
	
	section>div {
		word-break: break-all;
	}
	
	.up {
		position: fixed;
		top: 0;
	}
	
	.down {
		position: fixed;
		bottom: 0;
	}

</style>
