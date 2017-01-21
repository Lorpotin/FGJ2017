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
            init(username);
        }

    }

    function init(username) {
        socket = io("https://fgj17-tatsiki.c9users.io", { query: "user=WEB" });

        result = {
            msg: "Jotain shittii",
            powerup: "",
            nick: ""
        };
        result.nick = username;

        socket.on('connect', function() {
            console.log("connection to socket established!");
        });
        socket.on('drawMap', function() {
            console.log("Map draw yes.");
            drawMap();
        });

        $(".btn").click(function() {
            myFunction($(this).attr("powerup"));
        });
    }

    var drawMap = function(data) {
        console.log("yes");
    }

    var myFunction = function(powerup) {
        result.powerup = powerup;
        console.log(result);
        socket.emit('spawn new powur', result);
    };


    
});