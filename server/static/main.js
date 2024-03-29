$(document).ready(function() {
    
    var username;
    $loginPage = $('.login.page'); // The login page
    $gamePage = $('.game.page');

    var updateTicker = 0;
    var tickerGiven = false;
    var gameLive = false;
    var c=document.getElementById("canvasId");
    var ctx=c.getContext("2d");

    var isCurveSize = 0;
    var isCurveVar = 1;
    var tickerSpeed = 1;
    var isCurveVarTarget = 1;
    var isCurveSizeTarget = 0;
    var playerY = 0;
    var isDead = false;

    var gameLoop = function(){
      draw();
      requestAnimationFrame(gameLoop, c);
    }
    requestAnimationFrame(gameLoop, c);


    
    setInterval(increaseCurveSizeUntil.bind(this),40);
    setInterval(increaseCurveVarUntil.bind(this),40);

    function increaseCurveVarUntil(){
      if(isCurveVar < isCurveVarTarget){
        isCurveVar += 0.01
        if(isCurveVar > isCurveVarTarget){
          isCurveVar = isCurveVarTarget;
        }
      }
      else if(isCurveVar > isCurveVarTarget){
        isCurveVar -= 0.01;
        if(isCurveVar < isCurveVarTarget){
          isCurveVar = isCurveVarTarget;
        }
      }

    }

    function increaseCurveSizeUntil(){
      if(isCurveSize < isCurveSizeTarget){
        isCurveSize += 0.01
        if(isCurveSize > isCurveSizeTarget){
          isCurveSize = isCurveSizeTarget;
        }
      }
      else if(isCurveSize > isCurveSizeTarget){
        isCurveSize -= 0.01;
        if(isCurveSize < isCurveSizeTarget){
          isCurveSize = isCurveSizeTarget;
        }
      }
    }

     function draw(){
      /* upper map */
      updateTicker+=tickerSpeed;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#F4A460";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for(var x = 0; x < 1324; x++){
        var y_pos = (200 + (100 * isCurveSize)  + (200 * Math.sin(Math.PI * ((1-(x/40 + updateTicker))/60)))*isCurveVar);
        ctx.lineTo(x,y_pos);
      }
      ctx.lineTo( 1024+300, 0);

      ctx.fillStyle = "#F4A460";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 800);
      for(var x = 0; x <1324; x++){
        var y_pos = (550 - (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((x/40 + (updateTicker+60)))/60)))*isCurveVar);
        ctx.lineTo(x,y_pos);
      }
      ctx.lineTo(1024+300 , 800);
      ctx.closePath();

      if (playerY > 0) {
        ctx.fillStyle = "#f71313";
        ctx.fillRect(480, playerY, 10, 10);
      }

      if (isDead) {
        ctx.fillStyle = "#f23a3a";
        ctx.font = "bold 192px Arial";
        ctx.fillText("DÖD", 320, 420);
      }
     }

 

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
        $("#header2").text("Player: "+username);
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
        socket.on('drawMap', drawMap);
        socket.on('gameDisconnected', handleGameDisconnect);
        socket.on('playerPositions', drawPlayer);
        socket.on('eventActive', eventActive);
        socket.on('playerDead', playerDied);


        $(".btn").click(function() {
            spawnEvent($(this).attr("powerup"), $("#homovittu").val());
        });

         if(gameLive === false) 
            $("#header").text("Game offline");

        $('#inputImage').on('change', function(e){
            //Get the first (and only one) file element
            //that is included in the original event
            var file = e.originalEvent.target.files[0],
                reader = new FileReader();
            //When the file has been read...
            reader.onload = function(evt) {
                socket.emit('image', evt.target.result);
            };
            reader.readAsDataURL(file);  
        });


    }

    var drawMap = function(data) {
        isCurveVarTarget = data.curveFrequency;
        isCurveSizeTarget = data.curveSize;
        tickerSpeed = data.tickerSpeed;
        if(tickerGiven === false) {
            updateTicker = data.updateTicker;
            tickerGiven = true;
        }
        if(gameLive === false) {
            gameLive = true;
        }
        else {
            $("#header").text("Game live!  ");
        }
        
    }

    var drawPlayer = function(data) {
        playerY = data.player1 + (384*(768/1080));
    }

    var playerDied = function() {
        isDead = true;
        setTimeout(function(){ isDead = false; }, 3000);
    }

    var handleGameDisconnect = function() {
        $("#header").text("Game offline");
        gameLive = false;
        playerY = 0;
    };

    var spawnEvent = function(powerup, msg) {
        result.powerup = powerup;
        result.msg = msg;
        socket.emit('spawn new powur', result);
    };

    var eventActive = function(data) {
        console.log(data);
    }


    
});