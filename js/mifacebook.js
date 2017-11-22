window.fbAsyncInit = function() {
  FB.init({
    appId      : '458706004523444',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); 


function shareScore(score) {
  FB.uni({
    method: 'share',
    href:'https://google.com',
    hashtag:'#MI_Chido',
    quote: 'Mi puntuacion: joj',

  });
}

function basicAPIRequest(){
    FB.api('/me?fields=id,name,email,permissions', function(response) {
      console.log(response);
    //$("#nombrePlayer").val(response);
    });
};

  function Request(){

    if(typeof(FB) == "undefined") {
            alert("Facebook SDK not yet loaded please wait.")
          }
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
          console.log('Logged in.');
          basicAPIRequest();
        }
      else {
          FB.login();
        }
    }); 
  };
function AdiosSess(){
  FB.logout();
}
