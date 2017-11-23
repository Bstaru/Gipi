$(document).ready(function() {

	// 
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
	 	 window.location.href = "index.html";
	 });

	//ANIMACION DEL INDEX -LOGIN-NEW
	var frmLog = $('#form-login');
	var frmNew = $('#form-new');

	$('#Regis').on('click',function(){

		frmLog.removeClass('fadeInDown');
    	frmNew.removeClass('fadeOutDown');

		if(frmNew.hasClass('elem-hide')){

			frmLog.addClass('fadeOutDown');
			setTimeout(function () {
		      frmLog.addClass('elem-hide');
		    }, 380);

			setTimeout(function () {
		      frmNew.removeClass('elem-hide');
		    }, 380);
		    frmNew.addClass('fadeInDown');
		}
		else{
		}

    });

    $('#Volver').on('click',function(){

    	frmLog.removeClass('fadeOutDown');
    	frmNew.removeClass('fadeInDown');

		if(frmLog.hasClass('elem-hide')){

			frmNew.addClass('fadeOutDown');
			setTimeout(function () {
		      frmNew.addClass('elem-hide');
		    }, 380);			
		   
		    setTimeout(function () {
		      frmLog.removeClass('elem-hide');
		    }, 380); 
		    frmLog.addClass('fadeInDown');
		}
		else{
		}

    });


    $("#Canciones").on('click', function(){
    	$('.ranking').addClass('elem-hide');
    	$('.opciones').addClass('elem-hide');

	 	$('.opciones').removeClass('elem-hide');
	 });

    $("#Rang").on('click', function(){
    	$('.ranking').addClass('elem-hide');
    	$('.opciones').addClass('elem-hide');
    	
	 	$('.ranking').removeClass('elem-hide');
	 });

	$("#JUGAR").on('click', function(){
	 	 window.location.href = "inicio.html";
	 });
});