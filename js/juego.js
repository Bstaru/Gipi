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
        transitionOut: 'fadeOutDown',
        // onClosed: function(){
        //  	 msgGameOve.iziModal('open');
        //  },
    });

    msgInicio.iziModal('open');


    //COMPARTIR EN TWITTER
	    function ShareTwi(score){
		    // Opens a pop-up with twitter sharing dialog

			var url = "http://unilocker.com.mx/gipi";
			var text = "¡Hey! He jugado Gipi y mi puntaje es: " + score;
			window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
	    }

	    var msgGameOve = $("#msgGameover").iziModal({
			title: 'FIN DEL JUEGO',
		    headerColor: '#153B50',
		    background:'#fff',
		    zindex: 2000,
		    padding: 20,
		    width: 500,
	        iconText: '<i class="game icon"></i>',
	        transitionIn: 'fadeInDown',
	        transitionOut: 'fadeOutDown',
	         onOpened: function(){
	         	$('#puntaje_final').text(
	         		$('#score').text()
	         		);
	         },
	    });    

	    $("#shareTwit").on('click',function(){
	    	ShareTwi($('#puntaje_final').text());
	    });

	var audio = document.createElement('audio');
	var source = document.createElement('source');
		source.src = 'assets/power.mp3';
		audio.appendChild(source);

    var stop = false;

    $("#Prueba").on('click',function(){
    	msgInicio.iziModal('close');
    	render();		
		setTimeout(function(){ 
			audio.play();
			}, 200);
		//audio.play();
    });

	//BOTONES DE MENU Y ESO
		 $("body").keyup(function (e) {
		 	 if (e.keyCode === 0 || e.keyCode === 32) {
			    e.preventDefault()
			    cancelAnimationFrame(ren);
		 		mov = 0;

		 		if (audio.paused == false) {
	                audio.pause();
	            }
			  }
			  if (e.keyCode === 27) {
			    e.preventDefault()
			    render();
		 		mov=20;
		 		audio.play();
			  }
		 });
		 $("#detener").on('click', function(){
		 	cancelAnimationFrame(ren);
		 	mov = 0;
		 	
		 	if (audio.paused == false) {
                audio.pause();
            }
		 });
		 $("#reaunadar").on('click', function(){
		 	render();
		 	mov=20;
		 	audio.play();
		 });


		 $("#denuevo").on('click', function(){
		 	location.reload();
		 });

		 $("#menu_inicial").on('click', function(){
		 	window.location.href = "index.html";
		 });

});