$(document).ready(function() {

	var MTDS = new METODOS();

	var songID = MTDS.GET_URL_PARAM('id');


	var msgInicio = $("#msgInicio").iziModal({
		title: '¿LISTO?',
	    headerColor: '#153B50',
	    background:'#fff',
	    zindex: 2000,
	    padding: 20,
	    width: 300,
        iconText: '<i class="game icon"></i>',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown'
    });

    msgInicio.iziModal('open');

    $("#Prueba").on('click',function(){
    	msgInicio.iziModal('close');
    	render();
    });

	//BOTONES DE MENU Y ESO
		 $("body").keyup(function (e) {
		 	 if (e.keyCode === 0 || e.keyCode === 32) {
			    e.preventDefault()
			    cancelAnimationFrame(ren);
		 		mov = 0;
			  }
			  if (e.keyCode === 27) {
			    e.preventDefault()
			    render();
		 		mov=20;
			  }
		 });
		 $("#detener").on('click', function(){
		 	cancelAnimationFrame(ren);
		 	mov = 0;
		 });
		 $("#reaunadar").on('click', function(){
		 	render();
		 	mov=20;
		 });


});