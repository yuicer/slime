<template>
    <div id="box" :class="{up:position,down:!position}">
    <section>
<!--    	<div>{{text}}</div>-->
    	{{charector}}
    </section>
    </div>
</template>

<script>
	import text from './text.js'
	export default {
		data() {
			return {
				text: "",
				time: 100,
				now_text: [],
			}
		},
		props: ['position', 'charector'],
		mounted: function() {
			var me = this;


		},
		watch: {
			charector: function() {
				var me = this;
				//保存一次会话的数组
				console.log(this.charector)
				me.now_text = text[0][this.charector];
				me.Even();

			}
		},
		methods: {

			//匀速出现字
			Even: function() {
				var me = this;
				var d = setInterval(function() {

					for (let i = 0, l = me.now_text.length; i < l; i++) {

						me.text += me.now_text[i].slice(0, 1);
						me.now_text[i] = me.now_text[0].slice(1);
						if (me.now_text[i].length < 1) {
							me.text = ""
						}

						if (i == l)
							clearInterval(d);
					}
				}, me.time)
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
		height: 18vh;
		background: rgba(0, 0, 0, .7);
	}
	
	section {
		width: 60vw;
		height: 100%;
		margin: 0 auto;
		text-align: left;
		/*		text-indent: 48px;*/
		font-size: 24px;
		color: white;
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
