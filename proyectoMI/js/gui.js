$(document).ready(function() {

	 $("body").keyup(function (e) {
	 	 if (e.keyCode === 0 || e.keyCode === 32) {
		    e.preventDefault()
		    console.log('Space pressed');
		    $("#menu").removeClass('elem-hide');
		  }
		  if (e.keyCode === 27) {
		    e.preventDefault()
		    console.log('esc pressed');
		    $("#menu").addClass('elem-hide');
		  }
	 });

	 $("#detener").on('click', function(){
	 	$("#menu").removeClass('elem-hide');
	 });

	 $("#reaunadar").on('click', function(){
	 	$("#menu").addClass('elem-hide');
	 });

	  $("#menu_inicial").on('click', function(){
	 	 window.location.href = "inicio.html";
	 });

	  $("#Nuevo").on('click', function(){
	 	 $('.opciones').removeClass('elem-hide');
	 });

	  $("#JUGAR").on('click', function(){
	 	 window.location.href = "index.html";
	 });

	

});