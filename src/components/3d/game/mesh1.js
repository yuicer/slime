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
				map: loader.load(img1),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.8 // high restitution

		);
		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		ground_material.map.repeat.set(3, 3);

		var box_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				map: loader.load(img2),
				side: THREE.DoubleSide
			}),
			.4, // low friction
			.1 // high restitution
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
		//		var ground1 = new Physijs.BoxMesh(
		//			new THREE.BoxGeometry(100, 1, 100),
		//			ground_material,
		//			0 // mass
		//		);
		//		ground1.position.y = 100;
		//		ground1.receiveShadow = true;
		//		vs.mesh.push(ground1);
		//		var ground2 = new Physijs.BoxMesh(
		//			new THREE.BoxGeometry(1, 100, 100),
		//			ground_material,
		//			0 // mass
		//		);
		//		ground2.position.x = 50;
		//		ground2.position.y = 50;
		//		ground2.receiveShadow = true;
		//		vs.mesh.push(ground2);
		//		var ground3 = new Physijs.BoxMesh(
		//			new THREE.BoxGeometry(1, 100, 100),
		//			ground_material,
		//			0 // mass
		//		);
		//		ground3.position.x = -50;
		//		ground3.position.y = 50;
		//		ground3.receiveShadow = true;
		//		vs.mesh.push(ground3);
		var box = new Physijs.BoxMesh(
			new THREE.BoxGeometry(20, 20, 20),
			box_material,
		);
		box.position.y = 100;
		box.castShadow = true;
		box.receiveShadow = true;
		vs.mesh.push(box);

		mesh1.init()



	},
	init: function () {
		//		container = document.createElement('div');
		//		document.body.appendChild(container);
		//
		//		scene = new THREE.Scene();
		//
		//		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
		//		camera.position.z = 750;
		//		scene.add(camera);
		//
		//		var light = new THREE.PointLight(0xffffff, 0.8);
		//		camera.add(light);

		var group = new THREE.Group();
		group.position.y = 50;
		group.scale.set(.1, .1, .1)
		vs.scene.add(group);

		function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
			var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

			var meshMaterial = new THREE.MeshNormalMaterial();
			var mesh = new THREE.Mesh(geometry, meshMaterial);

			mesh.position.set(x, y, z);
			mesh.rotation.set(rx, ry, rz);
			mesh.scale.set(s, s, s);
			group.add(mesh);
		}

		var hexShape = new THREE.Shape();
		hexShape.moveTo(0, 0.8);
		hexShape.lineTo(0.4, 0.5);
		hexShape.lineTo(0.3, 0);
		hexShape.lineTo(-0.3, 0);
		hexShape.lineTo(-0.4, 0.5);
		hexShape.lineTo(0, 0.8);

		var numberOfCrystals = 100;
		for (let i = 0; i < numberOfCrystals; i++) {
			var extrudeSettings = {
				amount: Math.random() * 200,
				bevelEnabled: true,
				bevelSegments: 1,
				steps: 1,
				bevelSize: (Math.random() * 10) + 15,
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
		//
		//		renderer = new THREE.WebGLRenderer({
		//			antialias: true
		//		});
		//		renderer.setClearColor(0x000000);
		//		renderer.setPixelRatio(window.devicePixelRatio);
		//		renderer.setSize(window.innerWidth, window.innerHeight);
		//		container.appendChild(renderer.domElement);
		//
		//		document.addEventListener('mousedown', onDocumentMouseDown, false);
		//		document.addEventListener('touchstart', onDocumentTouchStart, false);
		//		document.addEventListener('touchmove', onDocumentTouchMove, false);
		//
		//		window.addEventListener('resize', onWindowResize, false);
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

export default mesh1;
