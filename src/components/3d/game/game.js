import vm from 'src/main.js'
var game = {
	init: function () {
		//init scene

		//set camera
		vm.$store.state.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		vm.$store.state.camera.position.z = 1000;

		//add light
		for (let i = 0; i < vm.$store.state.light.length; i++) {
			vm.$store.state.scene.add(vm.$store.state.light[i])
		}

		//add mesh
		for (let i = 0; i < vm.$store.state.mesh.length; i++) {
			vm.$store.state.mesh[i].position.set((2 * i - 1) * 200, 0, 0);
			vm.$store.state.scene.add(vm.$store.state.mesh[i]);
		}
		//set canvas
		vm.$store.state.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById("3d_canvas")
		});
		vm.$store.state.renderer.setSize(window.innerWidth, window.innerHeight);
		vm.$store.state.renderer.setClearColor('black')

	},
	animate: function () {
		requestAnimationFrame(game.animate);
		for (let i = 0; i < vm.$store.state.mesh.length; i++) {
			//vm.$store.state.mesh[i].rotation.x += 0.01;
			vm.$store.state.mesh[i].rotation.y += 0.01;
		}

		vm.$store.state.renderer.render(vm.$store.state.scene, vm.$store.state.camera);
	}
}

export default game;
