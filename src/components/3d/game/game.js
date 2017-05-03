import vm from 'src/main.js'
var vs = vm.$store.state;
var game = {
	init: function () {
		//init scene

		//set camera
		vs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		vs.camera.position.z = 1000;

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
		vs.renderer.setClearColor('black')

	},
	animate: function () {
		requestAnimationFrame(game.animate);
		for (let i = 0; i < vs.mesh.length; i++) {
			vs.mesh[i].rotation.y += 0.01;
		}

		vs.renderer.render(vs.scene, vs.camera);
	}
}

export default game;
