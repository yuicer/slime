import vm from 'src/main.js'
var mesh1 = {
	get_mesh: function () {
		var tt,
			ma,
			objloader = new THREE.OBJLoader(),
			tgaloader = new THREE.TGALoader();
		tt = tgaloader.load('static/sakura_d.tga');
		ma = new THREE.MeshBasicMaterial({
			map: tt,
			overdraw: true,
		})
		objloader.load('static/untitled3.obj', function (obj) {
			obj.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					child.material.map = tt;

				}
			});
			obj.position.y = -500;
			obj.scale.set(6, 6, 6);
			vm.$store.state.mesh[0] = obj;
			vm.$store.state.scene.add(obj);
		})
	},
}

export default mesh1;
