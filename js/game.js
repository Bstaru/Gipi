	var scene;
	var camera;
	var renderer;
	var controls;
	var objects = [];
	var clock;
	var deltaTime;	
	var keys = {};

	var ren;

	var PerMain = [];
	var Random = 0;

	var mov = 20;

	var objsIzq = [];
	var objsDer = [];
	var objsPiso = [];

	var objPap = [];
	var posPap = [-80,-120,-150];

	var animaPer = [];

	var rayCaster; //rayos como vectores
	var collisionObjects = []; //aqui estaran todos los objs que queremos que colisionen *se deben agregar tambien los clonados

	var isWorldReady = [ false, false ];
	$(document).ready(function() {

		setupScene();

		rayCaster = new THREE.Raycaster();

		// OTROS MODELOS
		//FIJOS
			loadOBJWithMTL("assets/", "plano.obj", "plano.mtl", (object) => {
					
					object.scale.z = 5;
					object.scale.x = 2;
					object.position.z = -165;
					object.name = "pisou";

					var obj2 = object.clone();
					obj2.position.z = -155;

					scene.add(object);
					//scene.add(obj2);

					objsPiso[0]= object;
					//objsPiso[1]= obj2;

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

			// loadOBJWithMTL("assets/", "minivan.obj", "minivan.mtl", (object) => {
			// 		object.position.z = -50;
			// 		object.rotation.y = THREE.Math.degToRad(90);
			// 		object.name = "minivan";


			// 		scene.add(object);

			// 		collisionObjects.push(object)			

			// 	isWorldReady[0] = true;
			// });
		
		//DINAMICOS	
			loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_1.mtl", (object) => {
					object.position.z = -30;
					object.position.x = -19;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio1_01";

					var obj2 = object.clone();
					obj2.position.z = -10;
					obj2.position.x = 19;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio1_02";

					var obj3 = object.clone();
					obj3.visible = false;
					obj3.name = "edificio1_03";


					scene.add(object); //IZQ
					scene.add(obj2);   //DER

					objsIzq[0]= object;
					objsDer[0]= obj2;

					collisionObjects.push(object)			

				isWorldReady[1] = true;
			});
			loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_2.mtl", (object) => {
					object.position.z = -60;
					object.position.x = -19;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio2_01";					

					var obj2 = object.clone();
					obj2.position.z = 1;
					obj2.position.x = 19;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio2_02";

					scene.add(object); //IZQ
					scene.add(obj2);	//DER

					objsIzq[1]= object;
					objsDer[1]= obj2;

					collisionObjects.push(object)			

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_3.mtl", (object) => {
					object.position.z = -15;
					object.position.x = -19;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio3_01";

					var obj2 = object.clone();
					obj2.position.z = -60;
					obj2.position.x = 19;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio3_02";

					scene.add(object);	//IZQ
					scene.add(obj2);	//DER

					objsIzq[2]= object;
					objsDer[2]= obj2;

					collisionObjects.push(object)			

				isWorldReady[3] = true;
			});

			loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_1.mtl", (object) => {
					object.position.z = -40;
					object.position.x = 22;
					object.rotation.y = THREE.Math.degToRad(-90);
					object.name = "edificio4_01";

					var obj2 = object.clone();
					obj2.position.z = -70;
					obj2.position.x = -22;
					obj2.rotation.y = THREE.Math.degToRad(90);
					obj2.name = "edificio4_02";

					scene.add(object); //DER
					scene.add(obj2);	//IZQ

					objsIzq[3]= obj2;
					objsDer[3]= object;

					collisionObjects.push(object)			

				isWorldReady[4] = true;
			});

			loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_2.mtl", (object) => {
					object.position.z = -40;
					object.position.x = -22;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio5_01";

					var obj2 = object.clone();
					obj2.position.z = -70;
					obj2.position.x = 22;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio5_02";

					scene.add(object); //IZQ
					scene.add(obj2);	//DER

					objsIzq[4]= object;
					objsDer[4]= obj2;

					collisionObjects.push(object)			

				isWorldReady[5] = true;
			});

			loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_3.mtl", (object) => {
					object.position.z = -30;
					object.position.x = 22;
					object.rotation.y = THREE.Math.degToRad(-90);
					object.name = "edificio6_01";

					var obj2 = object.clone();
					obj2.position.z = -5;
					obj2.position.x = -22;
					obj2.rotation.y = THREE.Math.degToRad(90);
					obj2.name = "edificio16_02";

					scene.add(object); //DER
					scene.add(obj2);	//IZQ

					objsIzq[5]= obj2;
					objsDer[5]= object;

					collisionObjects.push(object)			

				isWorldReady[6] = true;
			});

			loadOBJWithMTL("assets/", "arbol.obj", "arbol.mtl", (object) => {
				// 
					object.position.z = -20;
					object.position.x = -13;
					object.name = "arbol_01";
					object.rotation.y = THREE.Math.degToRad(45);

					var obj2 = object.clone();
					obj2.position.z = -50;
					obj2.name = "arbol_02";

					var obj3 = object.clone();
					obj3.position.x = 13;
					obj3.position.z = -50;
					obj3.name = "arbol_03";

					var obj6 = obj3.clone();
					obj6.position.x = 15;
					obj6.position.z = -55;					
					obj6.rotation.y = THREE.Math.degToRad(-40);
					obj6.name = "arbol_06";

					var obj4 = object.clone();
					obj4.position.z = -15;
					obj4.position.x = 13;
					obj4.name = "arbol_04";

					var obj5 = object.clone();
					obj5.position.z = -20;
					obj5.position.x = 15;
					obj5.rotation.y = THREE.Math.degToRad(90);
					obj5.name = "arbol_05";
					
				// -----
					var pap1 = object.clone();
					pap1.position.z = -150;
					pap1.position.x = 5;
					pap1.rotation.y = THREE.Math.degToRad(90);
					pap1.name = "pap1";

					var pap2 = object.clone();
					pap2.position.z = -120;
					pap2.position.x = 0;
					pap2.rotation.y = THREE.Math.degToRad(90);
					pap2.name = "pap2";

					var pap3 = object.clone();
					pap3.position.z = -80;
					pap3.position.x = -5;
					pap3.rotation.y = THREE.Math.degToRad(90);
					pap3.name = "pap3";

					var pap4 = object.clone();
					pap4.position.z = -150;
					pap4.position.x = 5;
					pap4.rotation.y = THREE.Math.degToRad(90);
					pap4.name = "pap4";

					var pap5 = object.clone();
					pap5.position.z = -120;
					pap5.position.x = 0;
					pap5.rotation.y = THREE.Math.degToRad(90);
					pap5.name = "pap5";

					var pap6 = object.clone();
					pap6.position.z = -80;
					pap6.position.x = -5;
					pap6.rotation.y = THREE.Math.degToRad(90);
					pap6.name = "pap6";

					scene.add(pap1);
					scene.add(pap2);
					scene.add(pap3);
					scene.add(pap4);
					scene.add(pap5);
					scene.add(pap6);  

					objPap[0]= pap1;
					objPap[1]= pap2;
					objPap[2]= pap3;
					objPap[3]= pap4;
					objPap[4]= pap5;
					objPap[5]= pap6;
					

				// ---
					scene.add(object); //IZQ
					scene.add(obj2);	//IZQ
					scene.add(obj3);	//DER
					scene.add(obj4);	//DER
					scene.add(obj5);	//DER
					scene.add(obj6);	//DER

					objsIzq[6]= object;
					objsIzq[7]= obj2;
					objsDer[6]= obj3;
					objsDer[7]= obj4;
					objsDer[8]= obj5;
					objsDer[9]= obj6;

				// 
					collisionObjects.push(object)			

				isWorldReady[1] = true;
			});
		
		//PERSONAJE	
		loadOBJWithMTL("assets/", "detener_front.obj", "detener_front.mtl", (object) => {
			object.position.z = -7;
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje";

			var obj2 = object.clone();
				obj2.position.x = 5;

			var obj3 = object.clone();
				obj3.position.x = -5;
				obj3.visible = false;

			scene.add(object);	
			scene.add(obj2);
			scene.add(obj3);

			PerMain[0] = object;
			PerMain[1] = obj2;
			PerMain[2] = obj3;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_1.obj", "run_1.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run1";

			object.visible = false;

			scene.add(object);
			animaPer[0] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_2.obj", "run_2.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run2";

			object.visible=false;

			scene.add(object);
			animaPer[1] = object;
			
			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_3.obj", "run_3.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run3";

			object.visible = false;

			scene.add(object);
			animaPer[2] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_4.obj", "run_4.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run4";

			object.visible = false;

			scene.add(object);
			animaPer[3] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_5.obj", "run_5.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run5";

			object.visible = false;

			scene.add(object);
			animaPer[4] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_6.obj", "run_6.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run6";

			object.visible = false;

			scene.add(object);
			animaPer[5] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_7.obj", "run_7.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run7";

			object.visible = false;

			scene.add(object);
			animaPer[6] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});

		loadOBJWithMTL("assets/cicloRun_obj/", "run_8.obj", "run_8.mtl", (object) => {
			object.scale.x = 0.4;
			object.scale.y = 0.4;
			object.scale.z = 0.4;

			object.position.z = -5;			
			object.rotation.y = THREE.Math.degToRad(180);
			object.name = "personaje_run8";

			object.visible = false;

			scene.add(object);
			animaPer[7] = object;

			collisionObjects.push(object);

			isWorldReady[2] = true;
		});


		//render();

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
		ren =  requestAnimationFrame(render);
		deltaTime = clock.getDelta();

		//requestAnimationFrame(render);

		PerMain[0].visible = true;

		// for (var x = 0; x < objPap.length; x++) {
		// 	objPap[x].position.z += 20 * deltaTime;

		// 	if(objPap[x].position.z >0){

		// 			var rand = Math.floor((Math.random() * 3) + 0);

		// 			objPap[x].position.z = posPap[rand];
		// 	}
		// }
		var per = animaPer.length;
		var otro = 1;

		for(var i = 0; i< per; i++){
			
			 if(i==0){
			 	otro = 1;
			 }
			 else{
				otro = i - 1;
			 }
			console.log(i + ' ' + otro);


			animaPer[otro].visible = false;
			animaPer[i].visible = true;

			if(i == per){
				i = 0;
				console.log(i);
			}
		}
			
		objsPiso[0].position.z += 20 * deltaTime;
		if (objsPiso[0].position.z > 15) {
			objsPiso[0].position.z = -70;
		}		

		var ekis = objsIzq.length;
		var yee = objsDer.length;

		for (var i = 0; i< ekis; i++) {
			objsIzq[i].position.z += mov * deltaTime;

			if (objsIzq[i].position.z > 15) {
				objsIzq[i].position.z = -70;
			}
		}
		for (var i = 0; i< yee; i++) {
			objsDer[i].position.z += mov * deltaTime;

			if (objsDer[i].position.z > 15) {
				objsDer[i].position.z = -70;
			}
		}

		var yaw = 0;
		var forward = 0;

           PerMain[0].visible = true;
           PerMain[1].visible = false;
		   PerMain[2].visible = false;

		//37 39
		if(keys['A']){
			console.log("izq");
			PerMain[0].visible = false;
			PerMain[1].visible = false;
			PerMain[2].visible = true;
		}
		else if (keys['D']) {
			console.log("der");
			PerMain[0].visible = false;
			PerMain[1].visible = true;
			PerMain[2].visible = false;
		}

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
		var visibleSize = { width: window.innerWidth ,
						   height: window.innerHeight};

		clock = new THREE.Clock();		
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
		camera.position.z = 1;
		camera.position.y = 20;
		camera.rotation.x = THREE.Math.degToRad(-45);

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
		renderer.setSize(visibleSize.width - 5, visibleSize.height -10);

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

