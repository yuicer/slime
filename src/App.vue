<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
    export default {
        name: 'app',

    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
