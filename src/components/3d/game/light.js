import vm from 'src/main.js'
var vs = vm.$store.state;
var light = {
	get_light: function () {
		vs.light[0] = new THREE.DirectionalLight(0xfaeaef);
		vs.light[0].position.set(1, 1, 1);

		vs.light[1] = new THREE.PointLight(0xffffff);
		vs.light[2] = new THREE.AmbientLight(0x333333);
	},
}

export default light;
