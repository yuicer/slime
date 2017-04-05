<template>
    <div>
       <canvas id="3d_canvas"></canvas>
       <light></light>
       <mesh1></mesh1>
    </div>
</template>

<script>
    import light from './light.vue'
    import mesh1 from './mesh1.vue'
    export default {
        data() {
            return {}
        },
        components: {
            light,
            mesh1,
        },

        mounted: function() {
            var me = this;
            me.init();
            me.animate();
        },
        methods: {
            init: function() {
                var me = this;

                //init scene
                me.$store.state.scene = new THREE.Scene();

                //set camera
                me.$store.state.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
                me.$store.state.camera.position.z = 1000;

                //add light
                for (let i = 0; i < me.$store.state.light.length; i++) {
                    me.$store.state.scene.add(me.$store.state.light[i])
                }


                //add mesh
                for (let i = 0; i < me.$store.state.mesh.length; i++) {
                    me.$store.state.mesh[i].position.set((2 * i - 1) * 200, 0, 0);
                    me.$store.state.scene.add(me.$store.state.mesh[i]);
                }

                //set canvas
                me.$store.state.renderer = new THREE.WebGLRenderer({
                    canvas: document.getElementById("3d_canvas")
                });
                me.$store.state.renderer.setSize(window.innerWidth, window.innerHeight);
                me.$store.state.renderer.setClearColor('black')

            },
            animate: function() {
                var me = this;

                requestAnimationFrame(me.animate);
                for (let i = 0; i < me.$store.state.mesh.length; i++) {
                    me.$store.state.mesh[i].rotation.x += 0.01;
                    me.$store.state.mesh[i].rotation.y += 0.01;
                }

                me.$store.state.renderer.render(me.$store.state.scene, me.$store.state.camera);

            }
        }
    }

</script>

<style>


</style>
