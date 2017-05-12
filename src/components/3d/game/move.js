import vm from 'src/main.js'
var vs = vm.$store.state;

var move = {
	yuusya: {},
	dom: {},
	event: [],

	//move
	move_speed: 0.3,
	left: false,
	right: false,
	forward: false,
	back: false,
	move: false,

	//rotate
	angelX: 0,
	angelY: 0,
	//		上一步的鼠标位置
	mouse_vector: new THREE.Vector3(0, 0, 0),
	rotate_speed: 0.003,

	init: function () {
		//init const
		var me = this;
		me.yuusya = vs.mesh[0];
		me.dom = document.getElementById('canvas')

		move.keyboard();
		move.mouse();
		vs.scene.addEventListener('update', move.action);

	},

	action: function () {
		var me = move;

		me.yuusya.__dirtyPosition = true;
		me.yuusya.__dirtyRotation = true;
		//移动
		if (me.move) {
			var vector;
			if (me.forward) {
				vector = new THREE.Vector3(-Math.sin(me.angelX) * me.move_speed, 0, -Math.cos(me.angelX) * me.move_speed)
			}
			if (me.left) {
				vector = new THREE.Vector3(-Math.sin(me.angelX + Math.PI / 2) * me.move_speed, 0, -Math.cos(me.angelX + Math.PI / 2) * me.move_speed)
			}
			if (me.right) {
				vector = new THREE.Vector3(-Math.sin(me.angelX - Math.PI / 2) * me.move_speed, 0, -Math.cos(me.angelX - Math.PI / 2) * me.move_speed)
			}
			if (me.back) {
				vector = new THREE.Vector3(Math.sin(me.angelX) * me.move_speed, 0, Math.cos(me.angelX) * me.move_speed)
			}

			me.yuusya.position.add(vector);

		}
		//转动,鼠标移到边缘后一直转动
		if (me.mouse_vector.x > 0.9) {
			me.yuusya.rotation.set(me.angelY, me.angelX, 0)
			me.angelX -= (Math.PI / 2) * me.rotate_speed * 6;
		} else if (me.mouse_vector.x < -0.9) {
			me.angelX += (Math.PI / 2) * me.rotate_speed * 6;
			me.yuusya.rotation.set(me.angelY, me.angelX, 0)
		}
	},
	keyboard: function () {
		var me = this;
		me.event[0] = document.addEventListener('keydown', function (event) {
			switch (event.keyCode) {
				case 65: // left
					me.left = true;
					break;
				case 87: // forward
					me.forward = true;
					break;
				case 68: // right
					me.right = true;
					break;
				case 83: // back
					me.back = true;
					break;
			}
			if (me.left || me.forward || me.right || me.back)
				me.move = true;

		});

		me.event[1] = document.addEventListener('keyup', function (event) {
			switch (event.keyCode) {
				case 65: // left
					me.left = false;
					break;
				case 87: // forward
					me.forward = false;
					break;
				case 68: // right
					me.right = false;
					break;
				case 83: // back
					me.back = false
					break;
			}
			if (!me.left && !me.forward && !me.right && !me.back)
				me.move = false;

		});
	},
	mouse: function () {
		var me = this;
		me.dom.addEventListener('mousemove', function (event) {
			me.yuusya.__dirtyPosition = true;
			me.yuusya.__dirtyRotation = true;
			var vector = new THREE.Vector3((event.clientX / me.dom.clientWidth) * 2 - 1, -((event.clientY / me.dom.clientHeight) * 2 - 1), 0);
			//角度控制
			if (vector.x > me.mouse_vector.x && vector.x <= 0.9)
				me.angelX -= (Math.PI / 2) * me.rotate_speed;
			else if (vector.x < me.mouse_vector.x && vector.x >= -0.9)
				me.angelX += (Math.PI / 2) * me.rotate_speed;

			if (vector.y > me.mouse_vector.y) {
				me.angelY += (Math.PI / 2) * me.rotate_speed / 2;
				if (me.angelY > Math.PI / 6)
					me.angelY = Math.PI / 6

			} else if (vector.y < me.mouse_vector.y) {
				me.angelY -= (Math.PI / 2) * me.rotate_speed / 2;
				if (me.angelY < -Math.PI / 6)
					me.angelY = -Math.PI / 6
			}

			me.yuusya.rotation.set(me.angelY, me.angelX, 0)
			me.mouse_vector = vector;
			//			console.log(me.yuusya)
		})
	},
}

export default move;

//	applyForce: function () {
//		var mouse_position = new THREE.Vector3(1, 1, 1);
//		var me = this;
//		var strength = 1235,
//			distance, effect, offset, box;
//
//		box = vs.mesh[0];
//		distance = mouse_position.distanceTo(box.position);
//		offset = mouse_position.clone().sub(box.position);
//		effect = mouse_position.clone().sub(box.position).normalize().multiplyScalar(4).negate();
//		box.applyCentralImpulse(effect);
//
//	},
