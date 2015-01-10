
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
            });

            // define the action when user clicked the login button.
            $("#my-login-button").click(function(){
                FB.login();
            });
        };
        var fetch_my_profile = function () {
        FB.api('/me', function(response) {
            var my_first_name = response.first_name;
            var my_gender = response.gender;
            var my_username = response.last_name;
            var my_facebook_id = response.id;
    
            $("#my-profile-name").html(my_first_name);
            $("#my-profile-facebook-id").html(my_facebook_id);
        });
    
        FB.api('/me/picture', function(response) {
            var my_picture_url = response.data.url;
    
            $("#my-profile-picture").attr('src', my_picture_url);
    });
};
