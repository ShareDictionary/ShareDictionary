
    window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
        appId      : 821388711240155,                        // App ID from the app dashboard
        cookie     : true,                                 // Allowed server-side to fetch fb auth cookie
        status     : true,                                 // Check Facebook Login status
        xfbml      : true                                  // Look for social plugins on the page
        });

        // Additional initialization code such as adding Event Listeners goes here
        window.fbLoaded();
        check_FB_login();
    };

    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        //js.src = "//connect.facebook.net/en_US/all.js";
        // Debug version of Facebook JS SDK
        js.src = "https://connect.facebook.net/en_US/all/debug.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbLoaded = function(){
            // define the events when login status changed.
            FB.Event.subscribe('auth.login', function(response) {
                // when user has been logged in, this block will be triggered.
                var msg = "You're logged in.";
                $("#my-login-message").html(msg);
                console.log("Your login response:");
                console.log(response);
                
                fetch_my_profile();
                check_FB_login();
            });

            // define the action when user clicked the login button.
            $("#my-login-button").click(function(){
                FB.login();
                fetch_my_profile();
            });
        };
    var fetch_my_profile = function () {
        FB.api('/me', function(response) {
            var my_first_name = response.first_name;
            var my_gender = response.gender;
            var my_username = response.last_name;
            var my_facebook_id = response.id;
            var my_website = response.webstie;
        
            $("#my-profile-name").html(my_first_name);
            $("#my-profile-facebook-id").html(my_facebook_id);
            $("#my-profile-website").html(my_website);
        });
        
        FB.api('/me/picture', function(response) {
            var my_picture_url = response.data.url;
            $("#my-profile-picture").attr('src', my_picture_url);
        });
    };
    
    var check_FB_login = function(){
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            
            fetch_my_profile();
            var myModal = document.getElementById("login-toggle");
            myModal.removeAttribute("href");
            var loginButton = document.getElementById("login-button");
            loginButton.innerHTML="logout";
            
            
          }else{
            //FB.logout();
            loginButton = document.getElementById("login-button");
            loginButton.innerHTML="login";
            var logintoggle = document.getElementById("login-toggle");
            logintoggle.setAttribute("href","#myModal");
            
            //$("#login-button").innerHTML();
          }
        });
    }
    function FB_logout(){
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            FB.logout();
            //check_FB_login();
            
            var loginButton = document.getElementById("login-button");
            loginButton.innerHTML="login";
            document.location.reload(true);
            //window.fbLoaded();.
            
          }else{
            var myModal = document.getElementById("login-toggle");
            myModal.setAttribute("href","#myModal");
          }
        });
    }
    
    function check_if_can_post(){
      if(document.getElementById("description").value==""||document.getElementById("sentence").value==""||document.getElementById("word").value=="") {
        alert("你的輸入不完整");
        $('#add_word').attr( 'type','button' );
      }else{
                
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            
            //$('#creating_word').removeClass( 'red-class' );
            $("#add_word").attr('method', "POST");
            $("#add_word").attr('type', "submit");
            
          }else{
              $('#add_word').attr( 'type','button' );
              //$('#creating_word').removeClass( 'red-class' );
              //window.fbLoaded();
              FB.login();
              if (response.status === 'connected') {
                //fetch_my_profile();
                $("#add_word").attr('method', "POST");
                
              }
        }
        });
        
        }
    }
    
    
    