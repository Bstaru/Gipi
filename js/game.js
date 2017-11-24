	var scene;
	var camera;
	var renderer;
	var controls;
	var objects = [];
	var clock;
	var deltaTime;	
	var keys = {};

	// PARTICULAAA
		var materialPL = new THREE.PointsMaterial({
			color: 0xffffff
		});
		var geometryPL = new THREE.Geometry();
		var xp, yp, zp;

	var ren;

	var PerMain = [];
	var Random = 0;

	var mov = 20;

	var objsIzq = [];
	var objsDer = [];
	var objsPiso = [];

	var animaPap = [];
	//KAREN
		var paparazzis= new Array();
		var contNP= 0; //Cuenta en que parte del arreglo de notasPower va
		var contPp= 0; //Cuenta cuantos papparazzis hay en escena
		var posZ= [-70, -70, -70, -70, -70, -70, -70, -70, -70, -70];
		var time= 0;
		var clockP;
		var clockJuego;
		var timeJuego=0;
		var third;
	//------
	var animaPapClone = new Array();
	var clon = [];
	var recorPap = 0;
	var posPap = -20;
	var clonado;

	var animaPer = [];
	var recorPer = 0;

	var delay = 0;
	var delay2 = 0;

	var minivan;
	var posMini = -90;

	var objetoAct;

	// el arreglo es de 156
	var notasPower = [5,5,5,5,0,0,-5,-5,5,5,5,5,0,0,5,5,5,-5,5,-5,
		-5,-5,-5,-5,5,5,5,0,-5,5,5,0,-5,-5,-5,-5,0,0,5,5,-5,5,5,5,5,-5,0,
		5,5,5,5,5,0,0,-5,-5,-5,-5,-5,0,5,0,5,5,5,0,0,0,5,5,5,0,5,5,
		-5,-5,-5,5,5,5,0,0,5,5,5,5,0,-5,5,-5,5,-5,-5,5,0,0,0,-5,-5,5,-5,
		5,-5,5,-5,0,5,0,5,5,5,0,5,5,0,-5,-5,5,5,5,0,0,0,0,-5,5,-5,5,
		-5,5,-5,5,0,5,0,5,5,5,5,0,0,0,0,5,5,-5,-5,0,0,5,5,0,5,-5,-5,5]
	var recorNotas = 0;

	var rayCaster; 
	var collisionObjects = []; 

	var isWorldReady = [ false, false ];
	$(document).ready(function() {

		setupScene();

		rayCaster = new THREE.Raycaster();

		// OTROS MODELOS
		// FIJOS
			loadOBJWithMTL("assets/", "plano.obj", "plano.mtl", (object) => {
					
					object.scale.z = 5;
					object.scale.x = 5;
					object.position.z = -165;
					object.name = "pisou";
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					// var obj2 = object.clone();
					// obj2.position.z = -155;

					scene.add(object);

					objsPiso[0]= object;

					//collisionObjects.push(object)			

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

					//collisionObjects.push(object)			

				isWorldReady[0] = true;
			});

			loadOBJWithMTL("assets/", "minivan.obj", "minivan.mtl", (object) => {
					object.position.z = 100;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "minivan";
											
					scene.add(object);
					minivan = object;	

					collisionObjects.push(object)			

				isWorldReady[0] = true;
			});
		
		//DINAMICOS	
			loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_1.mtl", (object) => {
					object.position.z = -30;
					object.position.x = -19;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio1_01";
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					var obj2 = object.clone();
					obj2.position.z = -10;
					obj2.position.x = 19;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio1_02";

					scene.add(object); //IZQ
					scene.add(obj2);   //DER

					objsIzq[0]= object;
					objsDer[0]= obj2;

					//collisionObjects.push(object)			

				isWorldReady[1] = true;
			});
			loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_2.mtl", (object) => {
					object.position.z = -60;
					object.position.x = -19;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio2_01";					
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					var obj2 = object.clone();
					obj2.position.z = 1;
					obj2.position.x = 19;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio2_02";

					scene.add(object); //IZQ
					scene.add(obj2);	//DER

					objsIzq[1]= object;
					objsDer[1]= obj2;

					//collisionObjects.push(object)			

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/", "edificio01.obj", "edificio01_3.mtl", (object) => {
					object.position.z = -15;
					object.position.x = -19;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio3_01";
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					var obj2 = object.clone();
					obj2.position.z = -60;
					obj2.position.x = 19;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio3_02";

					scene.add(object);	//IZQ
					scene.add(obj2);	//DER

					objsIzq[2]= object;
					objsDer[2]= obj2;

					//collisionObjects.push(object)			

				isWorldReady[3] = true;
			});

			loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_1.mtl", (object) => {
					object.position.z = -40;
					object.position.x = 22;
					object.rotation.y = THREE.Math.degToRad(-90);
					object.name = "edificio4_01";
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					var obj2 = object.clone();
					obj2.position.z = -70;
					obj2.position.x = -22;
					obj2.rotation.y = THREE.Math.degToRad(90);
					obj2.name = "edificio4_02";

					scene.add(object); //DER
					scene.add(obj2);	//IZQ

					objsIzq[3]= obj2;
					objsDer[3]= object;

					//collisionObjects.push(object)			

				isWorldReady[4] = true;
			});

			loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_2.mtl", (object) => {
					object.position.z = -40;
					object.position.x = -22;
					object.rotation.y = THREE.Math.degToRad(90);
					object.name = "edificio5_01";
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					var obj2 = object.clone();
					obj2.position.z = -70;
					obj2.position.x = 22;
					obj2.rotation.y = THREE.Math.degToRad(-90);
					obj2.name = "edificio5_02";

					scene.add(object); //IZQ
					scene.add(obj2);	//DER

					objsIzq[4]= object;
					objsDer[4]= obj2;

					///collisionObjects.push(object)			

				isWorldReady[5] = true;
			});

			loadOBJWithMTL("assets/", "edificio02.obj", "edificio02_3.mtl", (object) => {
					object.position.z = -30;
					object.position.x = 22;
					object.rotation.y = THREE.Math.degToRad(-90);
					object.name = "edificio6_01";
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

					var obj2 = object.clone();
					obj2.position.z = -5;
					obj2.position.x = -22;
					obj2.rotation.y = THREE.Math.degToRad(90);
					obj2.name = "edificio16_02";

					scene.add(object); //DER
					scene.add(obj2);	//IZQ

					objsIzq[5]= obj2;
					objsDer[5]= object;

					//collisionObjects.push(object)			

				isWorldReady[6] = true;
			});

			loadOBJWithMTL("assets/", "arbol.obj", "arbol.mtl", (object) => {
				// 
					object.position.z = -20;
					object.position.x = -13;
					object.name = "arbol_01";
					object.rotation.y = THREE.Math.degToRad(45);
					object.children[0].receiveShadow = true;
					object.children[0].castShadow = true;

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

					var obj5 = object.clone();
					obj5.position.z = -20;
					obj5.position.x = 15;
					obj5.rotation.y = THREE.Math.degToRad(90);
					obj5.name = "arbol_05";
				
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

				//collisionObjects.push(object)			

				isWorldReady[1] = true;
			});
		
		//CAMARAS
			var spotLight = new THREE.SpotLight( 0xffffff, 0.5, 140, 1, 0, 2 );
			spotLight.castShadow = true;
			spotLight.shadow.camera.near = 0.1;
			spotLight.shadow.camera.far = 100;
			// scene.add(spotlight.target);
			// scene.add(spotlight);

			loadOBJWithMTL("assets/cameraRun/", "cam_1.obj", "cam_1.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				object.add(spotLight);

				//scene.add(object);

				animaPap[0] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_2.obj", "cam_2.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;

				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				//scene.add(object);

				//animaPap[1] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_3.obj", "cam_3.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				//scene.add(object);

				animaPap[1] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});
	
			loadOBJWithMTL("assets/cameraRun/", "cam_4.obj", "cam_4.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				//scene.add(object);

				//animaPap[3] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_5.obj", "cam_5.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				object.add(spotLight);

				//scene.add(object);
				animaPap[2] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_6.obj", "cam_6.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				//scene.add(object);

				//animaPap[5] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_7.obj", "cam_7.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				//scene.add(object);

				animaPap[3] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_8.obj", "cam_8.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				//scene.add(object);

				//animaPap[3] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});
		//PERSONAJE	
		
			loadOBJWithMTL("assets/cicloRun_obj/", "run_1.obj", "run_1.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run1";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				scene.add(object);
				animaPer[0] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_2.obj", "run_2.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run2";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible=false;

				scene.add(object);
				animaPer[1] = object;
				
				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_3.obj", "run_3.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run3";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible = false;

				scene.add(object);
				animaPer[2] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_4.obj", "run_4.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run4";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible = false;

				scene.add(object);
				animaPer[3] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_5.obj", "run_5.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run5";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible = false;

				scene.add(object);
				animaPer[4] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_6.obj", "run_6.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run6";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible = false;

				scene.add(object);
				animaPer[5] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_7.obj", "run_7.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run7";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible = false;

				scene.add(object);
				animaPer[6] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cicloRun_obj/", "run_8.obj", "run_8.mtl", (object) => {
				object.scale.x = 0.4;
				object.scale.y = 0.4;
				object.scale.z = 0.4;

				object.position.z = 100;			
				object.rotation.y = THREE.Math.degToRad(180);
				object.name = "personaje_run8";

				object.children[0].receiveShadow = true;
				object.children[0].castShadow = true;

				//object.visible = false;

				scene.add(object);
				animaPer[7] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});


		//render();

		//--KAREN--
			// for(var i= 0; i<10; i++){
			// 	//var arr= new Array();
			// 	for(var y=0; y< animaPap.length; y++){
			// 		var model= animaPap[y];
			// 		console.log(model);
			// 	}
			// 	//paparazzis[i]= arr;
			// }
			console.log(animaPap);
			console.log(animaPap.length);
			var arr= new Array();
			for(var i= 0; i< 4; i++){
				console.log(animaPap[i]);
				//arr.push(animaPap[i].clone());
			}
			// console.log('holi');
			//console.log(arr);
		//--------

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
		//onWindowResize();
		ren =  requestAnimationFrame(render);
		deltaTime = clock.getDelta();
		delay += 10 * deltaTime;
		delay2 += 10 * deltaTime;
	
	//animacion piso y edificios		
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

	//Mnie();
	
	//ANIMACION camaras	
		//animaPap[recorPap].position.z = -70;
		// posPap += 0.5;

		// if (delay2 > 1) {
		// 	if (recorPap != 8) {
		// 		animaPap[7].position.z = 100;
		// 	}
		// 	animaPap[recorPap].position.z = posPap;					

		// 	if (recorPap > 0) {
		// 		animaPap[recorPap - 1].position.z = 100;
		// 	}
		// 	else{				
		// 		//animaPap[0].position.z = 100;
		// 	}

		// 	recorPap += 1;
		// 	if (recorPap==8) {
		// 		recorPap = 0;
		// 	}	

		// 	delay2 = 0;
		// }	
		// if (posPap == 10) {
		// 	posPap = -75;
		// }			

		// animaPap[recorPap].position.x = 5;

		// for (var i = 0 ; i < 5; i++) {
		// 	// i = animaPap[recorPap].clone();
		// 	// i.position.x = posNotas[i];
		// 	// scene.add(i);
		// }

	//MostrarClon();
	
	//---KAREN
		// DrawPaparazzis();
		// for (var i = 0; i< paparazzis.length; i++) {
		// 	paparazzis[i][0].position.z += 1.5 * deltaTime;
		// }

	//-------------

	// ANIMACION MONO	
		var per = animaPer.length;
		if (delay > 1) {
			if (recorPer != 8) {
				animaPer[7].position.z = 100;

			}
			animaPer[recorPer].position.z = -5;					

			if (recorPer > 0) {
				animaPer[recorPer - 1].position.z = 100;
			}
			else{				
				//animaPer[0].position.z = 100;
			}

			recorPer += 1;
			if (recorPer==8) {
				recorPer = 0;
			}	

			delay = 0;
		}	

		objetoAct = animaPer[recorPer];		
	
	//MOVIMIENTO MONO	
		animaPer[recorPer].position.x = 0;
		
		//37 39
		if(keys['A']){
			console.log("izq");
            animaPer[recorPer].position.x = -5;
		}
		else if (keys['D']) {
			console.log("der");
			animaPer[recorPer].position.x = 5;
		}

	
		objetoAct.rays = [new THREE.Vector3(0,0,-1),new THREE.Vector3(0,0,1)];

		for(var i = 0; i < objetoAct.rays.length; i++){

			rayCaster.set(objetoAct.position, objetoAct.rays[i]);
			var collision = rayCaster.intersectObjects(collisionObjects,true);
			
			if(collision.length > 0 && collision[0].distance < 1){
				//var minimini = collision[0].object.parent;
				console.log('choco minivan');
				// for (var j = 0; j < collisionObjectsNames.length; j++) {
				// 	var obj = scene.getObjectByName(collisionObjectsNames[j]);
				// 	if (collision[0].object.parent.name == obj.name) {
				// 		scene.remove(obj);
				// 		var pos = collisionObjects.indexOf(obj);
				// 		collisionObjects.splice(pos, 1);
				// 		pos = collisionObjectsNames.indexOf(obj.name);
				// 		collisionObjectsNames.splice(pos, 1);
				// 	}
				// }
			}
		}		

		camera.rotation.y += yaw * deltaTime;
		camera.translateZ(forward * deltaTime);
		
	for(var i = 0; i<1000; i++){
		var dx, dy, dz;
		dx = Math.random() * 2 - 1;
		dY = Math.random() * 2 - 1;
		dZ = Math.random() * 2 - 1;

		geometryPL.vertices[i].add(new THREE.Vector3(dx, dy, dz));
	}
	geometryPL.verticesNeedUpdate = true;
			
	
		renderer.render(scene, camera);
	}

	function setupScene() {		
		var visibleSize = { width: window.innerWidth ,   height: window.innerHeight};

		clock = new THREE.Clock();	
		clockP= new THREE.Clock();	
		clockJuego= new THREE.Clock();
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
		renderer.setClearColor(new THREE.Color(0x041343));
		renderer.setPixelRatio(visibleSize.width / visibleSize.height);
		renderer.setSize(visibleSize.width - 5, visibleSize.height -10);    	

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.Type = THREE.BasicShadowMap;

		var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
		scene.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.2);
		directionalLight.position.set(0, 15, -7);	
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.near = 0.1;
		directionalLight.shadow.camera.far = 100;
		scene.add(directionalLight);

		var spotii = new THREE.PointLight(new THREE.Color(1, 1, 0), 0.8, 18);
		spotii.position.set(0,15,-7);
		spotii.castShadow = true;
		spotii.shadow.camera.near = 0.1;
		spotii.shadow.camera.far = 100;
		//scene.add(spotii);

		for(var i=0; i <1000; i++){
			xp = (Math.random() * 200) - 100;
			yp = (Math.random() * 100) - 50;
			zp = (Math.random() * 100) - 50;

			geometryPL.vertices.push(new THREE.Vector3(xp, yp, zp));
		}
		var ParticulasPL = new THREE.Points(geometryPL, materialPL);
		ParticulasPL.name = "luciernagas";
		scene.add(ParticulasPL);

		$("#scene-section").append(renderer.domElement);
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth-5, window.innerHeight-5);
	    render();
	}

	function Clonar(indice){
		clon[indice] = animaPap[indice].clone();
	}
	var tamanio = notasPower.length;

	function MostrarClon(){		
		setTimeout(function(){ 
			if (animaPapClone.length < tamanio) {
				for(var i = 0; i < 4; i++){
					Clonar(i);
				}
				
				animaPapClone.push(clon);
				clon = [];
				//console.log(animaPapClone);
			}
		}, 
		500);
	}

	function Mnie(){
		setTimeout(function(){
			posMini += 20 * deltaTime;
			minivan.position.z = posMini;	
		},3000);	

		// if (minivan.position.z > 10) {
		// 	scene.remove(minivan);
		// }
	}

	function DrawPaparazzis(){
		
		timeJuego += time;
		time += clockP.getDelta();

		if(timeJuego < (60*15)){
			third= 3;
		} else if(timeJuego >= (60*15) && timeJuego <= (60*30)){
			third=2.5;
		} else if(timeJuego >= (60*31) && timeJuego <= (60*45)){
			third=2;
		} else if(timeJuego >= (60*46) && timeJuego <= (60*60)){
			third=1.5;
		} 
		else if(timeJuego > (60*60)){
			third=1;
		}

		//third


		if(time >= third){

			if(contPp == paparazzis.length){
				contPp= 0;
			}
			if(contNP == notasPower.length){
				contNP= 0;
			}
			paparazzis[contPp][0].position.z= posZ[contPp];
			paparazzis[contPp][0].position.x= notasPower[contNP];

			scene.add(paparazzis[contPp][0]);

			console.log(paparazzis[contPp][0]);
			console.log(contPp);
			contPp+=1;
			contNP+=6;

			time=0;
		}
	}

