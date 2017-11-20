	var scene;
	var camera;
	var renderer;
	var controls;
	var objects = [];
	var clock;
	var deltaTime;	
	var keys = {};

	var rayCaster; //rayos como vectores
	var collisionObjects = []; //aqui estaran todos los objs que queremos que colisionen *se deben agregar tambien los clonados

	var isWorldReady = [ false, false ];
	$(document).ready(function() {

		setupScene();

		//inicializar este weon
		rayCaster = new THREE.Raycaster();

		
		loadOBJWithMTL("assets/", "plano.obj", "plano.mtl", (object) => {
				object.position.z = 0;
				object.scale.x = 2;
				object.name = "pisou";

				var obj2 = object.clone();
				obj2.position.z = -48;

				scene.add(object);
				scene.add(obj2);

				collisionObjects.push(object)			

			isWorldReady[0] = true;
		});

		loadOBJWithMTL("assets/", "cielo.obj", "cielo.mtl", (object) => {
				object.position.z = -80;
				object.position.y = 10;
				object.rotation.y = THREE.Math.degToRad(-90);
				object.rotation.z = THREE.Math.degToRad(-90);
				object.scale.x = 3;
				object.scale.z = 3;
				object.name = "cielo";

				var obj2 = object.clone();
				obj2.position.x = 150;

				var obj3 = object.clone();
				obj3.position.x = - 180;

				scene.add(object);
				scene.add(obj2);
				scene.add(obj3);


				collisionObjects.push(object)			

			isWorldReady[0] = true;
		});

		loadOBJWithMTL("assets/", "minivan.obj", "minivan.mtl", (object) => {
				object.position.z = -50;
				object.rotation.y = THREE.Math.degToRad(90);
				object.name = "minivan";


				scene.add(object);

				collisionObjects.push(object)			

			isWorldReady[0] = true;
		});

		loadOBJWithMTL("assets/", "arbol.obj", "arbol.mtl", (object) => {
				object.position.z = -15;
				object.position.x = -15;
				object.name = "arbol";

				scene.add(object);

				collisionObjects.push(object)			

			isWorldReady[1] = true;
		});

		loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_1.mtl", (object) => {
				object.position.z = -30;
				object.position.x = -19;
				object.rotation.y = THREE.Math.degToRad(90);
				object.name = "edificio1";

				var obj2 = object.clone();
				obj2.position.x = 18;
				obj2.rotation.y = THREE.Math.degToRad(-90);

				for (var i = 5; i >= 0; i--) {
					var clonado = object.clone();
					object.position.z = -20 * i;
					object.rotation.y = THREE.Math.degToRad(90);

					scene.add(clonado);
				}


				scene.add(object);
				scene.add(obj2);

				collisionObjects.push(object)			

			isWorldReady[1] = true;
		});


		loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_1.mtl", (object) => {
				object.position.z = -40;
				object.position.x = 19;
				object.rotation.y = THREE.Math.degToRad(-90);
				object.name = "edificio2";

				scene.add(object);

				collisionObjects.push(object)			

			isWorldReady[1] = true;
		});


		loadOBJWithMTL("assets/", "detener_front.obj", "detener_front.mtl", (object) => {
			object.position.z = -7;
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje";

			var obj2 = object.clone();
				obj2.position.x = 5;
				obj2.rotation.y = THREE.Math.degToRad(40);

			var obj3 = object.clone();
				obj3.position.x = -5;
				obj3.rotation.y = THREE.Math.degToRad(-40);

			scene.add(object);
			scene.add(obj2);
			scene.add(obj3);

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		

		render();

		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);		
	});

	function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath(path);
		mtlLoader.load(mtlFile, (materials) => {
			
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath(path);
			objLoader.load(objFile, (object) => {
				onLoadCallback(object);
			});

		});
	}

	function onKeyDown(event) {
		keys[String.fromCharCode(event.keyCode)] = true;
	}
	function onKeyUp(event) {
		keys[String.fromCharCode(event.keyCode)] = false;
	}

	
	function render() {
		requestAnimationFrame(render);
		deltaTime = clock.getDelta();	

		var yaw = 0;
		var forward = 0;

		if(keys['A']){
			console.log("asdad");

		} else if (keys['W']) {

		} else if (keys['S']) {

		};

		if (isWorldReady[0] && isWorldReady[1] && isWorldReady[2]) {

			for(var i = 0; i < camera.rays.length; i++){
				rayCaster.set(camera.position, camera.rays[i]);

				var collision = rayCaster.intersectObjects(collisionObjects,true);
				
				if(collision.length > 0 && collision[0].distance <1){
					console.log('yeee');
				}
			}
			
			camera.rotation.y += yaw * deltaTime;
			camera.translateZ(forward * deltaTime);
		}
		
	
		renderer.render(scene, camera);
	}

	function setupScene() {		
		var visibleSize = { width: window.innerWidth , height: window.innerHeight};

		clock = new THREE.Clock();		
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
		camera.position.z = 5;
		camera.position.y = 10;
		camera.rotation.x = THREE.Math.degToRad(-25);

		//arreglo de vectores para rayos, y apuntan los rayos a donde va a colisionar
		camera.rays=[
			new THREE.Vector3(1,0,0),
			new THREE.Vector3(-1,0,0),
			new THREE.Vector3(1,0,1),
			new THREE.Vector3(1,0,-1),
		];

		renderer = new THREE.WebGLRenderer( {precision: "mediump" } );
		renderer.setClearColor(new THREE.Color(0x84bbd1));
		renderer.setPixelRatio(visibleSize.width / visibleSize.height);
		renderer.setSize(visibleSize.width - 50, visibleSize.height -50);

		var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
		scene.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.2);
		directionalLight.position.set(0, 0, 1);
		scene.add(directionalLight);

		// var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
		// grid.position.y = -1;
		// scene.add(grid);

		$("#scene-section").append(renderer.domElement);
	}

