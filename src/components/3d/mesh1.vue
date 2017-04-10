<template>
    <div></div>
</template>

<script>
    var THREE = require('static/three.min.js')
    export default {
        data() {
            return {}
        },
        mounted: function() {
            var me = this;
            me.get_mesh();
        },
        methods: {
            get_mesh: function() {
                var me = this;
                me.$store.state.geometry[0] = new THREE.BoxGeometry(200, 200, 200);
                me.$store.state.geometry[1] = new THREE.SphereGeometry(100, 100, 100);
                //	geometry[2] = new THREE.PlaneGeometry(500, 400);
                //    var img1 = new THREE.TextureLoader().load('./img/2.png')
                me.$store.state.material[0] = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    specular: 0xffffff,
                    //        map: img1,
                });

                me.$store.state.material[1] = new THREE.MeshLambertMaterial()
                //	material[2] = new THREE.MeshDepthMaterial()
                me.$store.state.mesh[0] = new THREE.Mesh(me.$store.state.geometry[0], me.$store.state.material[0]);
                me.$store.state.mesh[1] = new THREE.Mesh(me.$store.state.geometry[1], me.$store.state.material[1]);
            },
        }
    }

</script>

<style>


</style>
