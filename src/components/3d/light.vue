<template>
    <div></div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted: function() {
            console.log(2)
            var me = this;
            me.get_light();
        },
        methods: {
            get_light: function() {
                var me = this;
                me.$store.state.light[0] = new THREE.DirectionalLight(0xfaeaef);
                me.$store.state.light[0].position.set(1, 1, 1);

                me.$store.state.light[1] = new THREE.PointLight(0xffffff);
                me.$store.state.light[2] = new THREE.AmbientLight(0x333333);
            },
        }
    }

</script>

<style>


</style>
