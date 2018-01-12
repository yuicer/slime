<template>
  <div id="app">
    <canvas id="canvas" tabindex="0" width="1000" height="800"></canvas>
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
    mounted: function () {
      game.init()
    },
    methods: {}
  }
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #app {
    background: #333;
    color: white;
    font-family: "微软雅黑";
    font-size: 18px;
    width: 100%;
    height: 100%;
  }

  #canvas {
    position: absolute;
    left: calc(50% - 500px);
    top: calc(50% - 400px);
  }

  #game_intro {
    width: 550px;
    text-align: center;
    position: fixed;
    left: calc(50% - 275px);
    bottom: 10px;
  }
</style>
