<template>
    <div>
        <img src="../../assets/d/slime.png" alt="">
        <h1 @click="jump">start</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            jump: function() {
                //                this.$router.push('./one')
                location.href = '../2d/index'
            }
        }
    }

</script>

<style scoped="true">
    div {
        text-align: center;
        color: #2c3e50;
        margin-top: 250px;
    }

</style>
