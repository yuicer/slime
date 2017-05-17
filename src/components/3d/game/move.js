import vm from 'src/main.js'
import text from 'src/script/text.js'
var vs = vm.$store.state;

var move = {
	yuusya: {},
	dom: {},
	event: [],

	//move
	move_speed: .4, //0.4 1分钟走完1000
	left: false,
	right: false,
	forward: false,
	back: false,
	move: false,
	jump: false,
	jump_height: 0,
	jump_enable: true,
	//rotate
	angelX: 0,
	angelY: 0,
	//		上一步的鼠标位置
	mouse_vector: new THREE.Vector3(0, 0, 0),
	rotate_speed: 0.005,

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
			var vector = new THREE.Vector3(0, 0, 0);
			//化简啥的以后再说吧
			if (me.forward) {
				if (Math.abs(me.yuusya.rotation.z) > 2.4)
					vector.add(new THREE.Vector3(-Math.sin(Math.PI - me.yuusya.rotation.y) * me.move_speed, 0, -Math.cos(Math.PI - me.yuusya.rotation.y) * me.move_speed))
				else
					vector.add(new THREE.Vector3(-Math.sin(me.yuusya.rotation.y) * me.move_speed, 0, -Math.cos(me.yuusya.rotation.y) * me.move_speed))
			}
			if (me.left) {
				if (Math.abs(me.yuusya.rotation.z) > 2.4)
					vector.sub(new THREE.Vector3(-Math.sin(-me.yuusya.rotation.y + Math.PI / 2) * me.move_speed, 0, -Math.cos(-me.yuusya.rotation.y + Math.PI / 2) * me.move_speed))
				else
					vector.add(new THREE.Vector3(-Math.sin(me.yuusya.rotation.y + Math.PI / 2) * me.move_speed, 0, -Math.cos(me.yuusya.rotation.y + Math.PI / 2) * me.move_speed))
			}
			if (me.right) {
				if (Math.abs(me.yuusya.rotation.z) > 2.4)
					vector.sub(new THREE.Vector3(-Math.sin(-me.yuusya.rotation.y + Math.PI / 2 * 3) * me.move_speed, 0, -Math.cos(-me.yuusya.rotation.y + Math.PI / 2 * 3) * me.move_speed))
				else
					vector.add(new THREE.Vector3(-Math.sin(me.yuusya.rotation.y - Math.PI / 2) * me.move_speed, 0, -Math.cos(me.yuusya.rotation.y - Math.PI / 2) * me.move_speed))
			}
			if (me.back) {
				if (Math.abs(me.yuusya.rotation.z) > 2.4)
					vector.add(new THREE.Vector3(Math.sin(Math.PI - me.yuusya.rotation.y) * me.move_speed, 0, Math.cos(Math.PI - me.yuusya.rotation.y) * me.move_speed))
				else
					vector.add(new THREE.Vector3(Math.sin(me.yuusya.rotation.y) * me.move_speed, 0, Math.cos(me.yuusya.rotation.y) * me.move_speed))
			}

			me.yuusya.position.add(vector);
		}

		//转动,鼠标移到边缘后一直转动
		if (me.mouse_vector.x > 0.9) {
			me.yuusya.rotateOnAxis(new THREE.Vector3(0, -1, 0), me.rotate_speed * 6)
		} else if (me.mouse_vector.x < -0.9) {
			me.yuusya.rotateOnAxis(new THREE.Vector3(0, 1, 0), me.rotate_speed * 6)
		}
		if (me.mouse_vector.y > 0.9 && vs.camera.rotation.x < Math.PI / 4)
			vs.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), me.rotate_speed * 6)
		else if (me.mouse_vector.y < -0.9 && vs.camera.rotation.x > -Math.PI / 6)
			vs.camera.rotateOnAxis(new THREE.Vector3(-1, 0, 0), me.rotate_speed * 6)


		//跳
		if (me.jump) {
			me.jump_height += .1;
			if (me.jump_height < 3) {
				me.yuusya.position.y += .15;
				//me.jump_height 只是一个计数器
			} else if (me.jump_height > 6.5) {
				me.jump = false
				me.jump_enable = true;
				me.jump_height = 0;
			}
		}

		//判断位置出现文本
		if (!vs.kaiwa_show && me.yuusya.position.z < 250 && me.yuusya.position.x < 400 && me.yuusya.position.x > 350)
			if (text[0]['a2'][text[0]['a2'].length - 1] != '')
				vs.kaiwa(0, 'a2')

	},
	//绑定事件
	keyboard: function () {
		var me = this;
		me.event[0] = function (event) {
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
				case 32: // jump
					if (me.jump_enable) {
						me.jump = true;
						me.jump_enable = false;
					}
			}
			if (me.left || me.forward || me.right || me.back)
				me.move = true;
		}
		document.addEventListener('keydown', me.event[0]);

		me.event[1] = function (event) {
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

		}
		document.addEventListener('keyup', me.event[1]);
	},
	mouse: function () {
		var me = this;
		me.dom.addEventListener('mousemove', function (event) {
			me.yuusya.__dirtyPosition = true;
			me.yuusya.__dirtyRotation = true;
			var vector = new THREE.Vector3((event.clientX / me.dom.clientWidth) * 2 - 1, -((event.clientY / me.dom.clientHeight) * 2 - 1), 0);
			//角度控制
			if (vector.x > me.mouse_vector.x && Math.abs(vector.x) <= 0.9)
				me.yuusya.rotateOnAxis(new THREE.Vector3(0, -1, 0), me.rotate_speed)
			else if (vector.x < me.mouse_vector.x && Math.abs(vector.x) <= 0.9)
				me.yuusya.rotateOnAxis(new THREE.Vector3(0, 1, 0), me.rotate_speed)

			if (vector.y > me.mouse_vector.y && vs.camera.rotation.x < Math.PI / 4)
				vs.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), me.rotate_speed)
			else if (vector.y < me.mouse_vector.y && vs.camera.rotation.x > -Math.PI / 6)
				vs.camera.rotateOnAxis(new THREE.Vector3(-1, 0, 0), me.rotate_speed)

			me.mouse_vector = vector;
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
