$(document).ready(function() {

	var MTDS = new METODOS();

	var user;
	var song;

    var frmlogNew = $('#frms_inicio');
	var frmMenu = $('#menu_inicio');

	var btnSehizo;
	var btnSeactu;
	var btnAlerta = $("#msg2").iziModal({
			        title: "¡Alto ahí!",
			        subtitle: "No has llenado todos los campos aún",
			        iconText: '<i class="warning sign icon"></i>',
			        headerColor: '#F2BE30',
			        width: 600,
			        timeout: 5000,
			        timeoutProgressbar: true,
			        transitionIn: 'fadeInDown',
			        transitionOut: 'fadeOutDown',
			        pauseOnHover: true
			    });
	var btnAlerta2 = $("#msg3").iziModal({
			        title: "¡Espera!",
			        subtitle: "Tu correo o contraseña no son correctos",
			        iconText: '<i class="warning sign icon"></i>',
			        headerColor: '#F2BE30',
			        width: 600,
			        timeout: 5000,
			        timeoutProgressbar: true,
			        transitionIn: 'fadeInDown',
			        transitionOut: 'fadeOutDown',
			        pauseOnHover: true
			    });
	var Errorsito = $("#msg5").iziModal({
			        title: "¡OH NO!",
			        subtitle: "Lo sentimos hubo un error, intenta de más tarde",
			        iconText: '<i class="warning sign icon"></i>',
			        headerColor: '#F2BE30',
			        width: 600,
			        timeout: 5000,
			        timeoutProgressbar: true,
			        transitionIn: 'fadeInDown',
			        transitionOut: 'fadeOutDown',
			        pauseOnHover: true
			    });
	var Configs = $("#config").iziModal({
	    title: 'CONFIGURACIONES',
	    subtitle: 'Cambia tus datos',
	    headerColor: '#153B50',
	    background:'#46acc2',
	    zindex: 2000,
	    padding: 20,
	    width: 500,
	});

	var UserSess = function () {
		this.id = "";
        this.nickname = "";
        this.email = "";
        this.password = "";
    	}

    function GuardaSess(id,nkn,mail,pss) {
        var user = new UserSess();

        user.id = id;
        user.nickname = nkn;
        user.email = mail;
        user.password = pss;

        sessionStorage.setItem('UserSession', JSON.stringify(user));
    	}
    function CheckSess(){
    	if(sessionStorage.length != 0){

    		frmlogNew.removeClass('fadeInDown');
	    	frmMenu.removeClass('fadeOutDown');

			if(frmMenu.hasClass('elem-hide')){

				frmlogNew.addClass('fadeOutDown');
				setTimeout(function () {
			      frmlogNew.addClass('elem-hide');
			    }, 380);

				setTimeout(function () {
			      frmMenu.removeClass('elem-hide');
			    }, 380);
			    frmMenu.addClass('fadeInDown');
			}
			$('#user_name').empty();
            var objSess = JSON.parse(sessionStorage.getItem("UserSession"));
            $('#user_name').append(objSess.nickname);
    	}
    	else{
    		console.log('no hay');
			frmlogNew.removeClass('fadeOutDown');
	    	frmMenu.removeClass('fadeInDown');

			if(frmlogNew.hasClass('elem-hide')){

				frmMenu.addClass('fadeOutDown');
				setTimeout(function () {
			      frmMenu.addClass('elem-hide');
			    }, 380);			
			   
			    setTimeout(function () {
			      frmlogNew.removeClass('elem-hide');
			    }, 380); 
			    frmlogNew.addClass('fadeInDown');
			}
    	}
    }	

    function s_user(mail, pass) {

        var param = {action: "selUser", mail:mail, pass:pass };
       
        $.ajax({
            type: "POST",
            url: servicio,
            data: param,
            dataType: "json",
            async: true,

            success: function (response) {

            	$('#user_name').empty();

                if (response == 0) {
                    console.log('vacio');
                    btnAlerta2.iziModal('open'); 
                }
                else {
                    console.log('login');           
               
                    $.each(response, function (ind, obj) {
                        GuardaSess(obj.id,obj.Nickname, obj.Email,obj.Pass);
                        $('#user_name').append(obj.Nickname);
                    });

					frmlogNew.removeClass('fadeInDown');
			    	frmMenu.removeClass('fadeOutDown');

					if(frmMenu.hasClass('elem-hide')){

						frmlogNew.addClass('fadeOutDown');
						setTimeout(function () {
					      frmlogNew.addClass('elem-hide');
					    }, 380);

						setTimeout(function () {
					      frmMenu.removeClass('elem-hide');
					    }, 380);
					    frmMenu.addClass('fadeInDown');
					}
					else{
					}

                }
            },

            error: function (e) {
                console.log(e);
                Errorsito.iziModal('open');
            }
        });

    };
    function i_user(nick,mail,pass) {

        var param = { action: "insUser",
                    nick: nick,
                    mail: mail,
                    pass: pass};
        $.ajax({
            type: "POST",
            url: servicio,
            data: param,
            async: true,

            success: function (response) {
                console.log(response);
				btnSehizo = $("#msg1").iziModal({
			        title: "¡Listo!",
			        subtitle: response,
			        iconText: '<i class="checkmark icon"></i>',
			        headerColor: '#4cae4c',
			        width: 600,
			        timeout: 5000,
			        timeoutProgressbar: true,
			        transitionIn: 'fadeInDown',
			        transitionOut: 'fadeOutDown',
			        pauseOnHover: true
			    });
			    btnSehizo.iziModal('open');
            },

            error: function (e) {
               console.log(e);
               Errorsito.iziModal('open');
            }
        });

    };
    function u_user(id,nick,mail,pass) {

        var param = { action: "upUserData",
        			id: id,
                    nick: nick,
                    mail: mail,
                    pass: pass};
        $.ajax({
            type: "POST",
            url: servicio,
            data: param,
            async: true,

            success: function (response) {
                console.log(response);
                btnSeactu = $("#msg4").iziModal({
			        title: "¡Listo!",
			        subtitle: response,
			        iconText: '<i class="checkmark icon"></i>',
			        headerColor: '#4cae4c',
			        width: 600,
			        timeout: 5000,
			        timeoutProgressbar: true,
			        transitionIn: 'fadeInDown',
			        transitionOut: 'fadeOutDown',
			        pauseOnHover: true,
			        onClosing: function(){location.reload();},
			    });
			    btnSeactu.iziModal('open');

			    GuardaSess(id,nick,mail,pass);
			    
            },

            error: function (e) {
               console.log(e);
               Errorsito.iziModal('open');
            }
        });

    };

    function bindBTNROW_S() {
	    $.each(song, function (index, value) {

	        $('#JUGAR_' + value.id).unbind();
	        $('#JUGAR_' + value.id).unbind().on('click',function () {
	        	console.log(value.Namesong);
	            window.location.href = "game.html?id="+value.id;
	        });
	    });
	}

    function s_songs(callback) {

        var param = {action: "selSongs"};
       
        $.ajax({
            type: "POST",
            url: servicio,
            data: param,
            dataType: "json",
            async: true,

            success: function (response) {
            	var arr = new Array();
            	song = response;

            	$('#Canciiones').empty();

            	$.each(response, function (indx, obj) {
                    var OBJ = [obj.id, obj.Namesong];
                    arr.push(OBJ);
                });

                try { callback(); }
                catch (ex) { console.log('no callback'); }

                bindBTNROW_S();
            },

            error: function (e) {
                console.log(e);
            }
        });

    };

    $('#login').on('click', function () {
        var correo = $('#usr').val();
        var contra = $('#pwd').val();

        if (correo != '' && contra != '') {           
            s_user(correo,contra);  
        }
        else {
            btnAlerta.iziModal('open');  
        }        
    });
 	$('#singup').on('click', function () {
        var alias = $('#nkn').val();
        var correo = $('#usr_n').val();
        var contra = $('#pwd_n').val();

        if (alias != '' && correo != '' && contra != '') {           
            i_user(alias,correo,contra);               
        }
        else {
            btnAlerta.iziModal('open');  
        }               
    });


    $('#Opciones').on('click', function () {
        Configs.iziModal('open');  
        $('#nkn_up').val(objSess.nickname);
        $('#usr_up').val(objSess.email);
    });
    $('#changeData').on('click', function () {
       	var alias = $('#nkn_up').val();
        var correo = $('#usr_up').val();
        var contra = $('#pwd_up').val();

        var checkContra = '';

        if(contra == ''){
        	checkContra = objSess.password;
        }
        else{
        	checkContra = contra;
        }

        if (alias != '' && correo != '') {           
            u_user(objSess.id,alias,correo,checkContra);               
        }
        else {
            btnAlerta.iziModal('open');  
        }   
    });
 	$('#logout').on('click', function () {
       	sessionStorage.removeItem("UserSession");

       	frmlogNew.removeClass('fadeOutDown');
    	frmMenu.removeClass('fadeInDown');

		if(frmlogNew.hasClass('elem-hide')){

			frmMenu.addClass('fadeOutDown');
			setTimeout(function () {
		      frmMenu.addClass('elem-hide');
		    }, 380);			
		   
		    setTimeout(function () {
		      frmlogNew.removeClass('elem-hide');
		    }, 380); 
		    frmlogNew.addClass('fadeInDown');
		}
		else{
		}
    });
	$("#Canciones").on('click', function(){		
		s_songs(function () {
			$.each(song, function (indx, obj) {
            $('#Canciiones').append(
            	'<div class="opcion img-op'+indx+'" style="position: relative;">'+
					'<div class="typ typ-white op-name">'+obj.Namesong+'</div>'+
					'<div class="pos-op-btn text-center">'+
						'<div class="el-btn">'+
							'<div class="typ btn-op" id="JUGAR_'+obj.id+'" idSong ="">JUGAR</div>'+
						'</div>'+				
					'</div>'+			
				'</div>');
            });
		});
	});

    CheckSess();
});