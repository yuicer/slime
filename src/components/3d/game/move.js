import vm from 'src/main.js'
var vs = vm.$store.state;

var move = {
	yuusya: {},
	left: false,
	right: false,
	forward: false,
	back: false,
	move: false,
	event: [],
	speed: 0.3,
	dom: {},
	angel: 0,

	init: function () {
		//init const
		var me = this;
		me.yuusya = vs.mesh[0];
		me.dom = document.getElementById('canvas')

		move.keyboard();
		move.mouse();
		vs.scene.addEventListener('update', move.action);

	},

	applyForce: function () {
		var mouse_position = new THREE.Vector3(4, 4, 4);
		var me = this;
		var strength = 35,
			distance, effect, offset, box;

		box = vs.mesh[0];
		distance = mouse_position.distanceTo(box.position),
			effect = mouse_position.clone().sub(box.position).normalize().multiplyScalar(strength / distance).negate(),
			offset = mouse_position.clone().sub(box.position);
		box.applyImpulse(effect, offset);
		//		console.log(box.position, mouse_position)

	},
	action: function () {
		var me = move;

		if (me.move) {
			me.yuusya.__dirtyPosition = true;
			var _c = Math.sqrt(Math.pow(me.yuusya.position.x, 2) + Math.pow(me.yuusya.position.z, 2)),
				cos,
				sin;
			if (!_c) {
				cos = sin = 0;
			} else {
				cos = (me.yuusya.position.x + me.speed) / _c
				sin = (me.yuusya.position.z + me.speed) / _c
			}
			if (me.left) {
				me.yuusya.position.x += -me.speed;
			}
			if (me.forward) {
				me.yuusya.position.z += -me.speed;
			}
			if (me.right) {
				me.yuusya.position.x += me.speed;
			}
			if (me.back) {

				me.applyForce();
				//				me.yuusya.position.set(me.yuusya.position.x + me.speed * cos, me.yuusya.position.y, me.yuusya.position.z + me.speed * sin);
			}
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
			me.yuusya.__dirtyRotation = true;

			me.yuusya.rotation.set(0, me.angel, 0)
			me.angel += (Math.PI / 2) * .001;

		})
	},
}

export default move;
