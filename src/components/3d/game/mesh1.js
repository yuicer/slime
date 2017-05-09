import vm from 'src/main.js'
var vs = vm.$store.state;
var mesh1 = {
	get_mesh: function () {
		// Loader
		var loader = new THREE.TextureLoader();

		// Materials
		var img1 = require('assets/3d/rocks.jpg')
		var img2 = require('assets/3d/plywood.jpg')
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img1)
			}),

		);
		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		ground_material.map.repeat.set(3, 3);

		var box_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img2)
			}),
			.4, // low friction
			.8 // high restitution
		);
		box_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		box_material.map.repeat.set(.25, .25);

		// Ground
		var ground = new Physijs.BoxMesh(
			new THREE.BoxGeometry(100, 1, 100),
			ground_material,
			0 // mass
		);
		ground.receiveShadow = true;
		vs.mesh.push(ground);

		var box = new Physijs.BoxMesh(
			new THREE.BoxGeometry(4, 4, 4),
			box_material,
		);
		box.position.y = 50;
		box.castShadow = true;
		box.receiveShadow = true;
		vs.mesh.push(box);

		var box1 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(10, 10, 10),
			box_material,
		);
		box1.position.y = 50;
		box1.position.x = 8;
		box1.castShadow = true;
		vs.mesh.push(box1);







		//		vs.mesh[0] = new Physijs.BoxMesh(
		//			new THREE.CubeGeometry(5, 5, 5),
		//			new THREE.MeshBasicMaterial({
		//				color: 0x888888
		//			})
		//		);
		//		vs.mesh[0].scale.set(8, 8, 8)
	}
}



//var mesh1 = {
//	get_mesh: function () {
//		var tt,
//			ma,
//			objloader = new THREE.OBJLoader(),
//			tgaloader = new THREE.TGALoader();
//		tt = tgaloader.load('static/sakura_d.tga');
//		ma = new THREE.MeshBasicMaterial({
//			map: tt,
//			overdraw: true,
//		})
//		objloader.load('static/untitled3.obj', function (obj) {
//			obj.traverse(function (child) {
//				if (child instanceof THREE.Mesh) {
//					child.material.map = tt;
//
//				}
//			});
//			obj.position.y = -500;
//			obj.scale.set(6, 6, 6);
//			vs.mesh[0] = obj;
//			vs.scene.add(obj);
//		})
//	},
//}

export default mesh1;
