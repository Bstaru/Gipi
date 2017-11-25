	var audio = document.createElement('audio');
		var source = document.createElement('source');
			source.src = 'assets/power.mp3';
			audio.appendChild(source);

	    var stop = false;

	var scene;
	var camera;
	var renderer;
	var controls;
	var objects = [];
	var clock;
	var deltaTime;	
	var keys = {};

	// PARTICULAAA
	var particles;

	var ren;

	var PerMain = [];
	var Random = 0;

	var mov = 20;

	var objsIzq = [];
	var objsDer = [];
	var objsPiso = [];

	var animaPap = [];
	
		var paparazzis= new Array();
		var contNP= 0; //Cuenta en que parte del arreglo de notasPower va
		var contPp= 0; //Cuenta cuantos papparazzis hay en escena
		var clockAnim;
		var tAnim=0;
		var clockPrinc;
		var tPrinc=0;
		var time= 0;
		var clockP;
		var timeJuego=0;
		var third;
		var punt=0;

		var puntaje = 0;
	
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

			loadOBJWithMTL("assets/cameraRun/", "cam_1.obj", "cam_1.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				animaPap[0] = object;

				collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_3.obj", "cam_3.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				animaPap[1] = object;

				collisionObjects.push(object);

				isWorldReady[2] = true;
			});
	

			loadOBJWithMTL("assets/cameraRun/", "cam_5.obj", "cam_5.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;

				animaPap[2] = object;

				collisionObjects.push(object);

				isWorldReady[2] = true;
			});

			loadOBJWithMTL("assets/cameraRun/", "cam_7.obj", "cam_7.mtl", (object) => {
				object.position.z =90;
				object.scale.x = 0.55;
				object.scale.y = 0.55;
				object.scale.z = 0.55;
				object.children[0].receiveShadow = true;
				object.children[0].receiveShadow = true;
				animaPap[3] = object;

				collisionObjects.push(object);

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

				scene.add(object);
				animaPer[0] = object;
				animaPer.currentAnim= 0;
				animaPer.PosX= 0;

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

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

				object.rays = [
					new THREE.Vector3(0, 0, 1),
					new THREE.Vector3(0, 0, -1)
				];

				animaPer[7] = object;

				//collisionObjects.push(object);

				isWorldReady[2] = true;
			});


		//render();
		drawParticles();



		Fin();
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


		AnimPrinc();
		clone();
		DrawPaparazzis();
		AnimPaparazzis();
		for (var i = 0; i< paparazzis.length; i++) {

			paparazzis[i][paparazzis[i].currentAnim].position.z = paparazzis[i].posZ + (20 * deltaTime);
			paparazzis[i].posZ = paparazzis[i][paparazzis[i].currentAnim].position.z;

			if (paparazzis[i][paparazzis[i].currentAnim].position.z > 20) {
				scene.remove(paparazzis[i][paparazzis[i].currentAnim]);
			}
		}


	
	//MOVIMIENTO MONO	

		animaPer[animaPer.currentAnim].position.x= animaPer.PosX;
		
		//37 39
		if(keys['A']){
            animaPer[animaPer.currentAnim].position.x= -5;
            animaPer.PosX= -5;
		}
		else if (keys['D']) {
			animaPer[animaPer.currentAnim].position.x= 5;
            animaPer.PosX= 5;
		}
		else if (keys['S']) {
			animaPer[animaPer.currentAnim].position.x= 0;
            animaPer.PosX= 0;
		}

		for(var i = 0; i < paparazzis.length; i++){

		
			if (((paparazzis[i].posZ > -6 && paparazzis[i].posZ < -4) && 0 == paparazzis[i].posCol1.x)  || 
				((paparazzis[i].posZ > -6 && paparazzis[i].posZ < -4)  && -5 == paparazzis[i].posCol2.x) ||
				((paparazzis[i].posZ > -6 && paparazzis[i].posZ < -4)  && 5 == paparazzis[i].posCol3.x)) {

				puntaje += 5;

				$('#score').empty();
				$('#score').text(puntaje);
			}
		}	

		camera.rotation.y += yaw * deltaTime;
		camera.translateZ(forward * deltaTime);
	
	// 

	particles.rotation.y -= 0.004;
	particles.position.y = 100;
	particles.position.x = 0;
	particles.position.z = 0;
			
	
	renderer.render(scene, camera);
	}

	function setupScene() {		
		var visibleSize = { width: window.innerWidth ,   height: window.innerHeight};

		clock = new THREE.Clock();	
		clockP= new THREE.Clock();	
		clockAnim= new THREE.Clock();
		clockPrinc= new THREE.Clock();
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
		camera.position.z = 1;
		camera.position.y = 20;
		camera.rotation.x = THREE.Math.degToRad(-45);

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

		$("#scene-section").append(renderer.domElement);
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth-5, window.innerHeight-5);
	    render();
	}


	function drawParticles(){
	    particles = new THREE.Group();
	    scene.add(particles);
	    
	    //const geometry = new THREE.TetrahedronGeometry(5, 0);
	    const geometry = new THREE.SphereGeometry(0.3, 5,5);
	    const material = new THREE.MeshPhongMaterial({
	        color: 'rgba(209,104,204,0.5)',
	        shading : THREE.FlatShading
	    });
	    
	    for (let i = 0; i < 2000; i++){
	        const mesh = new THREE.Mesh(geometry, material);
	        mesh.position.z = ( Math.random() - 0.5 ) * 200;
	        mesh.position.x = ( Math.random() - 0.5 ) * 200;
	        mesh.position.y = ( Math.random() - 0.5 ) * 200;
	        mesh.updateMatrix();
	        mesh.matrixAutoUpdate = false;
	        particles.add(mesh);
	    }
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

	function AnimPrinc(){
		tPrinc += clockPrinc.getDelta();

		if(tPrinc >= .1){
			scene.remove(animaPer[animaPer.currentAnim]);
			animaPer.currentAnim= animaPer.currentAnim + 1 == animaPer.length ? 0 : animaPer.currentAnim +1;
			animaPer[animaPer.currentAnim].position.x= animaPer.PosX;
			animaPer[animaPer.currentAnim].position.z= -5;
			scene.add(animaPer[animaPer.currentAnim]);
			tPrinc=0;
		}
	}

	function clone(){
		if(paparazzis.length == 0){
			for(var i= 0; i<8; i++){
				var arr= new Array();
				for(var j= 0; j< animaPap.length; j++){
					arr[j]= animaPap[j].clone();
					collisionObjects.push(arr[j]);
				}
				paparazzis[i]= arr;
				paparazzis[i].currentAnim= 0;
				paparazzis[i].posZ= -70;
				paparazzis[i].posCol1 = new THREE.Vector3(0,0,-5);
				paparazzis[i].posCol2 = new THREE.Vector3(-5,0,-5);
				paparazzis[i].posCol3 = new THREE.Vector3(5,0,-5);
			}
			console.log(paparazzis);
		}
	}

	function DrawPaparazzis(){
		
		timeJuego += time;
		time += clockP.getDelta();

		if(timeJuego < (600)){
			third= 4;
		} else if(timeJuego >= (600) && timeJuego <= (850)){
			third=3;
		}
		else if(timeJuego > (850)){
			third=1;
		}

		if(time >= third){

			if(contPp == paparazzis.length){
				contPp= 0;
			}
			if(contNP == notasPower.length){
				contNP= 0;
			}
			paparazzis[contPp][0].position.z= -70;
			paparazzis[contPp][0].position.x= notasPower[contNP];

			paparazzis[contPp].currentAnim= 0;
			paparazzis[contPp].posZ= -70;
			paparazzis[contPp].posX= notasPower[contNP];

			scene.add(paparazzis[contPp][0]);

			contPp+=1;
			contNP+=third;

			time=0;
		}
	}

	function AnimPaparazzis(){
		tAnim += clockAnim.getDelta();

		if(tAnim >= .1){
			for (var i = 0; i< paparazzis.length; i++) {
				
				scene.remove(paparazzis[i][paparazzis[i].currentAnim]);
				paparazzis[i].currentAnim= paparazzis[i].currentAnim + 1 == animaPap.length ? 0 : paparazzis[i].currentAnim + 1;
				paparazzis[i][paparazzis[i].currentAnim].position.z = paparazzis[i].posZ;
				paparazzis[i][paparazzis[i].currentAnim].position.x = paparazzis[i].posX;
				scene.add(paparazzis[i][paparazzis[i].currentAnim]);			
			}

			tAnim=0;
		}
	}


	function Fin(){
		setTimeout(function() {
			cancelAnimationFrame(ren);
			mov = 0;
			 	
		 	if (audio.paused == false) {
	            audio.pause();
	        }
	         $("#menu2").removeClass('elem-hide');
	         $('#puntaje_final').text($('#score').text());
	        //msgGameOve.iziModal('open');
		},95000);
		
	}


