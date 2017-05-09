import vm from 'src/main.js'
var vs = vm.$store.state;
var game = {
	init: function () {
		//init scene

		//set camera
		vs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		vs.camera.position.z = 80;
		vs.camera.position.y = 40;

		//add light
		for (let i = 0; i < vs.light.length; i++) {
			vs.scene.add(vs.light[i])
		}

		//add mesh
		for (let i = 0; i < vs.mesh.length; i++) {
			vs.scene.add(vs.mesh[i]);
		}

		//set canvas
		vs.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById("3d_canvas")
		});
		vs.renderer.setSize(window.innerWidth, window.innerHeight);
		vs.renderer.shadowMap.enabled = true;
		vs.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	},
	animate: function () {
		//		for (let i = 0; i < vs.mesh.length; i++) {
		//			vs.mesh[i].rotation.y += 0.01;
		//		}
		vs.scene.simulate();
		vs.renderer.render(vs.scene, vs.camera);
		requestAnimationFrame(game.animate);
	}
}

export default game;
