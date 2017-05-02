import vm from 'src/main.js'
var light = {
	get_light: function () {
		vm.$store.state.light[0] = new THREE.DirectionalLight(0xfaeaef);
		vm.$store.state.light[0].position.set(1, 1, 1);

		vm.$store.state.light[1] = new THREE.PointLight(0xffffff);
		vm.$store.state.light[2] = new THREE.AmbientLight(0x333333);
	},
}

export default light;
