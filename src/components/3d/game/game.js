import vm from 'src/main.js'
import light from './light.js'

import mesh from './mesh.js'

import move from './move.js'

var vs = vm.$store.state;
var game = {
	yuusya: {},
	init: function () {
		mesh.init();
		light.init();
		move.init();
		//init const
		var me = this;
		me.yuusya = vs.mesh[0];
		vs.scene.setGravity(new THREE.Vector3(0, -30, 0));

		//set canvas
		vs.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById("canvas")
		});
		vs.renderer.setSize(window.innerWidth, window.innerHeight);
		vs.renderer.shadowMap.enabled = true;
		vs.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		//set light
		for (let i = 0; i < vs.light.length; i++) {
			vs.scene.add(vs.light[i])
		}

		//set mesh
		for (let i = 0; i < vs.mesh.length; i++) {
			vs.scene.add(vs.mesh[i]);
		}

		//set camera
		vs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		//		vs.camera.position.copy(me.yuusya.position).add(new THREE.Vector3(0, 80, 100));
		vs.camera.position.add(new THREE.Vector3(0, 5, 10));
		me.yuusya.add(vs.camera)

		//get animate
		game.animate();
	},
	onWindowResize: function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	},

	animate: function () {
		vs.scene.simulate();
		vs.renderer.render(vs.scene, vs.camera);
		requestAnimationFrame(game.animate);
	}
}

export default game;
