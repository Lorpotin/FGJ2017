$(document).ready(function() {
    
    var username;
    $loginPage = $('.login.page'); // The login page
    $gamePage = $('.game.page');

    $(document).on("click", "#playBtn", function() 
    {
        setUsername();
    });

    function setUsername () 
    {
        username = $('.usernameInput').val();

        // If the username is valid
        if (username) 
        {
            $loginPage.fadeOut();
            // Tell the server your username
            $gamePage.show();
        }
    }

    function init(username) {
        socket = io("localhost:8000", { query: "user=WEB" });

        result = {
            msg: "Jotain shittii",
            nick: username
        };

        socket.on('connect', function() {
            console.log("connection to socket established!");
        });

        $("#button").click(function() {
            myFunction();
        });
    }


    var myFunction = function() {
        socket.emit('spawn new powur', result);
    };
    
});