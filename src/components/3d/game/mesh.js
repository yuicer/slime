import vm from 'src/main.js'
var vs = vm.$store.state;
var mesh = {
	init: function () {
		this.static_box();
		this.ground();
		//		this.crystal();
		//		this.get_box();

	},
	static_box: function () {
		var loader = new THREE.TextureLoader();

		// Materials
		var img2 = require('assets/3d/plywood.jpg')


		var box_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img2),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.1 // high restitution
		);
		box_material.map.wrapS = box_material.map.wrapT = THREE.RepeatWrapping;
		box_material.map.repeat.set(.25, .25);
		var box = new Physijs.BoxMesh(
			new THREE.BoxGeometry(4, 4, 4),
			box_material,

			//			new THREE.MeshNormalMaterial(),

		);
		box.castShadow = true;
		//		box.receiveShadow = true;
		box.position.set(0, 4, -1)
		vs.mesh.push(box);
	},
	ground: function () {
		// Loader
		var loader = new THREE.TextureLoader();

		// Materials
		var img1 = require('assets/3d/rocks.jpg')
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img1),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.8 // high restitution

		);
		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		ground_material.map.repeat.set(3, 3);
		// Ground
		var ground = new Physijs.BoxMesh(
			new THREE.BoxGeometry(1000, 1, 1000),
			ground_material,
			0 // mass
		);
		ground.receiveShadow = true;
		vs.mesh.push(ground);
	},
	get_box: function () {
		// Loader
		var loader = new THREE.TextureLoader();

		// Materials
		var img2 = require('assets/3d/plywood.jpg')


		var box_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img2),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.1 // high restitution
		);
		box_material.map.wrapS = box_material.map.wrapT = THREE.RepeatWrapping;
		box_material.map.repeat.set(.25, .25);

		var geo = new THREE.BoxGeometry(10, 10, 10);
		geo.vertices[0].x = -5;
		geo.vertices[1].x = -5;
		//		for (let i = 0, l = geo.vertices.length; i < l; i++) {
		//			geo.vertices[i].z += 5;
		//		}
		var box = new Physijs.ConvexMesh(
			geo,
			box_material,
		);
		box.position.y = 80;
		box.position.x = 0;
		box.castShadow = true;
		box.receiveShadow = true;
		vs.mesh.push(box);

		var box2 = new Physijs.ConvexMesh(
			geo,
			box_material,
		);
		box2.position.y = 60;
		box2.position.x = 0;
		box2.castShadow = true;
		box2.receiveShadow = true;
		vs.mesh.push(box2);

		var box1 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(10, 10, 10),
			box_material,
		);
		box1.position.y = 100;
		box1.castShadow = true;
		box1.receiveShadow = true;
		vs.mesh.push(box1);




	},
	crystal: function () {
		//		var box = new Physijs.BoxMesh(
		//			new THREE.BoxGeometry(10, 10, 10),
		//			new THREE.MeshNormalMaterial(),
		//
		//		);
		//		box.position.y = 10;
		//		vs.mesh.push(box);

		function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
			var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
			for (let i = 0, l = geometry.vertices.length; i < l; i++) {
				geometry.vertices[i].x *= 0.2;
				geometry.vertices[i].y *= 0.2;
				geometry.vertices[i].z *= 0.2;
			}
			var meshMaterial = new THREE.MeshNormalMaterial();
			var mesh = new Physijs.ConvexMesh(geometry, meshMaterial);

			mesh.position.set(x, y, z);
			mesh.rotation.set(rx, ry, rz);
			//			mesh.scale.set(s, s, s);
			//			mesh.scale.set(.2, .2, .2)
			mesh.position.y = 20;
			mesh.castShadow = true;
			//			box.add(mesh);
			vs.mesh.push(mesh)
		}

		var hexShape = new THREE.Shape();
		hexShape.moveTo(0, 0.8);
		hexShape.lineTo(0.4, 0.5);
		hexShape.lineTo(0.3, 0);
		hexShape.lineTo(-0.3, 0);
		hexShape.lineTo(-0.4, 0.5);
		hexShape.lineTo(0, 0.8);

		var numberOfCrystals = 1;
		for (let i = 0; i < numberOfCrystals; i++) {
			var extrudeSettings = {
				amount: Math.random() * 200,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 1,
				bevelSize: (Math.random() * 10) + 10,
				bevelThickness: (Math.random() * 10) + 25
			};

			addShape(
				hexShape,
				extrudeSettings,
				0xff3333, // color
				0, // x pos
				0, // y pos
				0, // z pos
				Math.random() * 2 * Math.PI, // x rotation
				Math.random() * 2 * Math.PI, // y rotation
				Math.random() * 2 * Math.PI, // z rotation
				1
			);
		}

	},
	test: function () {
		// Materials
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({}),
			.8, // high friction
			.4 // low restitution
		);
		//		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		//		ground_material.map.repeat.set(2.5, 2.5);

		var ground_geometry = new THREE.PlaneGeometry(75, 75, 50, 50);
		for (var i = 0; i < ground_geometry.vertices.length; i++) {
			var vertex = ground_geometry.vertices[i];
			vertex.z = Math.random() * 5

		}
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();

		var ground = new Physijs.ConcaveMesh(
			ground_geometry,
			ground_material,
			0, // mass
		);
		ground.rotation.x = Math.PI / -2;
		ground.scale.set(2, 2, 2)
		ground.receiveShadow = true;
		ground.position.y = 30;
		vs.mesh.push(ground)
	}
}

//加载外部模型
//		var objloader = new THREE.OBJLoader();
//		objloader.load('static/untitled.obj', function (obj) {
//			obj.traverse(function (child) {
//				if (child instanceof THREE.Mesh) {
//					child.material.map = loader.load(img2);
//
//				}
//			});
//			//			2个直接转换的方法都是把这个物体做成了一个包裹它的立方体而已。。而且第二个方法的厚度还有问题
//			//			方法1：用一个同等大小的physi物体添加他，并遮挡，材质设置为透明
//			//			ground_material.visible = false;
//			//			var box3 = new Physijs.BoxMesh(
//			//				new THREE.BoxGeometry(15, 8, 15),
//			//				ground_material,
//			//				0
//			//			);
//			//			box3.add(obj)
//			//			vs.scene.add(box3)
//
//			//			方法2：直接转换，
//			//			var model = obj;
//			//			for (let x in model.children) {
//			//				let material = Physijs.createMaterial(
//			//					model.children[x].material,
//			//					1,
//			//					0
//			//				);
//			//				let mesh = new Physijs.BoxMesh(
//			//					model.children[x].geometry,
//			//					box_material,
//			//					0
//			//				);
//			//				mesh.castShadow = true;
//			//				mesh.receiveShadow = true;
//			//				mesh.scale.set(10, 4, 10);
//			//				mesh.position.y = 15;
//			//				vs.mesh.push(mesh)
//			//				vs.scene.add(mesh);
//			//			}
//		})

export default mesh;
