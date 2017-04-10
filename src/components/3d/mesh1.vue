<template>
    <div></div>
</template>

<script>
    export default {
        data() {
            return {
                material: {},
                geometry: {},
            }
        },
        mounted: function() {
            var me = this;
            me.get_mesh();
        },
        methods: {
            get_mesh: function() {
                var me = this,
                    objloader = new THREE.OBJLoader(),
                    tgaloader = new THREE.TGALoader();




                var mtlLoader = new THREE.MTLLoader();

                mtlLoader.load('static/untitled3.mtl', function(materials) {
                    me.material = materials
                    me.geometry = new THREE.BoxGeometry(200, 200, 200);
                    me.$store.state.mesh[0] = new THREE.Mesh(me.geometry, me.material);
                    me.$store.state.scene.add(me.$store.state.mesh[0]);
                    //                    objLoader.load('static/untitled3.obj', function(obj) {
                    //                        obj.position.y = -200;
                    //                        obj.scale.set(6, 6, 6);
                    //                        me.$store.state.mesh[0] = obj;
                    //                        me.$store.state.scene.add(obj);
                    //                    }, onProgress, onError);
                });








                //                var tt = [],
                //                    ma = [];
                //                tt[0] = tgaloader.load('static/sakura_d.tga');
                //                tt[1] = tgaloader.load('static/sakura_hair_d.tga')
                //                ma[0] = new THREE.MeshBasicMaterial({
                //                    map: tt[0],
                //                    overdraw: true,
                //                })
                //                ma[1] = new THREE.MeshBasicMaterial({
                //                    map: tt[1],
                //                    overdraw: true,
                //                })
                //                objloader.load('static/untitled3.obj', function(obj) {
                //                    obj.traverse(function(child) {
                //                        if (child instanceof THREE.Mesh) {
                //                            child.material.map = tt[0];
                //
                //                        }
                //                    });
                //                    obj.position.y = -200;
                //                    obj.scale.set(6, 6, 6);
                //                    me.$store.state.mesh[0] = obj;
                //                    me.$store.state.scene.add(obj);
                //                })






                //                me.$store.state.scene.add(me.$store.state.mesh[0]);

                //                me.$store.state.geometry[0] = new THREE.BoxGeometry(200, 200, 200);
                //                me.$store.state.geometry[1] = new THREE.SphereGeometry(100, 100, 100);
                //                //	geometry[2] = new THREE.PlaneGeometry(500, 400);
                //                //    var img1 = new THREE.TextureLoader().load('./img/2.png')
                //                me.$store.state.material[0] = new THREE.MeshPhongMaterial({
                //                    color: 0xffffff,
                //                    specular: 0xffffff,
                //                    //        map: img1,
                //                });
                //
                //                me.$store.state.material[1] = new THREE.MeshLambertMaterial()
                //                //	material[2] = new THREE.MeshDepthMaterial()
                //                me.$store.state.mesh[0] = new THREE.Mesh(me.$store.state.geometry[0], me.$store.state.material[0]);
                //                me.$store.state.mesh[1] = new THREE.Mesh(me.$store.state.geometry[1], me.$store.state.material[1]);
            },
        }
    }

</script>

<style>


</style>
