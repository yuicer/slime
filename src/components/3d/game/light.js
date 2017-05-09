import vm from 'src/main.js'
var vs = vm.$store.state;
var light = {
	get_light: function () {
		vs.light[0] = new THREE.DirectionalLight(0xfaeaef);
		vs.light[0].position.set(20, 40, 0);
		//		vs.light[0].target.position.copy(vs.scene.position);
		vs.light[0].castShadow = true;
		vs.light[0].shadow.camera.left = -160;
		vs.light[0].shadow.camera.top = -160;
		vs.light[0].shadow.camera.right = 160;
		vs.light[0].shadow.camera.bottom = 160;
		vs.light[0].shadowMapWidth = vs.light[0].shadowMapHeight = 1024;


		//		vs.light[0].shadow.bias = -.0001
		//		vs.light[1] = new THREE.PointLight(0xffffff);
		vs.light[1] = new THREE.AmbientLight(0x666666);
	},
}

export default light;
