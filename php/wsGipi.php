<?php
	$action = $_POST['action'];

//USUARIOS
	if ($action == "selUser")
		s_user();
	if ($action == "insUser")
		i_user();
	if ($action == "upUserData")
		u_user();
//SCORE	
	if ($action == "selScore")
		s_score();
	if ($action == "insScore")
		i_score();
	if ($action == "upScore")
		u_score();
// 
	if ($action == "selSongs")
		s_songs();

// CONEXIÓN BASE DE DATOS
	function connect() {
		$databasehost = "localhost"; //160.153.62.69
		$databasename = "gipi"; //gipi01
		$databaseuser = "root"; //bstaru95
		$databasepass = "shineekey91"; //uM7DGtE&j2#eVC

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_errno) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
		}
	function disconnect() {
		mysqli_close();
		}

// ----------------------------------------------------------------

//USUARIOS
	function s_user() {
		$email = $_POST["mail"];
		$pass = $_POST["pass"];

		$mysqli = connect();

		$result = $mysqli->query("call s_user('".$email."', '".$pass."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}

	function i_user(){
		$nickname = $_POST["nick"];
		$correo = $_POST["mail"];
		$contra = $_POST["pass"];

		$mysqli = connect();

		$result = $mysqli->query("call i_user('".$nickname."','".$correo."','".$contra."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Se ha creado tu usuario, ahora inicia sesión para comenzar a jugar";
		}
		mysqli_close($mysqli);
		}
	
	function u_user(){
		$idu = $_POST["id"];
		$nickname = $_POST["nick"];
		$correo = $_POST["mail"];
		$contra = $_POST["pass"];

		$mysqli = connect();

		$result = $mysqli->query("call u_user_data(".$idu.",'".$nickname."', '".$correo."', '".$contra."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Se han actualizado tus datos";
		}
		mysqli_close($mysqli);
		}

//SCORE
	function s_score() {
		$song = $_POST["song"];

		$mysqli = connect();

		$result = $mysqli->query("call s_score(".$song.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
		}
	
	function i_score(){
		$score = $_POST["score"];
		$user = $_POST["user"];
		$song = $_POST["song"];

		$mysqli = connect();

		$result = $mysqli->query("call i_score('".$score."','".$user."','".$song."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}	
	
	function u_score(){
		$score = $_POST["score"];
		$user = $_POST["user"];
		$song = $_POST["song"];

		$mysqli = connect();

		$result = $mysqli->query("call u_score('".$score."','".$user."','".$song."');");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";
		}
		mysqli_close($mysqli);
		}	

//SONGS 
	function s_songs() {

		$mysqli = connect();

		$result = $mysqli->query("call s_songs();");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
	}
?>