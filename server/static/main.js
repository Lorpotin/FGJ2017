$(document).ready(function() {
    
    socket = io("localhost:8000", { query: "user=WEB" });

    result = {
        msg: "Jotain shittii",
        nick : ""
    };

    socket.on('connect', function() {
        console.log("connection to socket established!");
    });

    $("#button").click(function() {
        myFunction();
    });
    var myFunction = function() {
        if($("input").val().length < 3 || $("input").val().length > 8) {
            alert("give nickname of 3-8 chars");
            return;
        }
        result.nick = $('input').val();
        vari = "jotain shittii lähtee clientille";
        socket.emit('spawn new powur', result);
    };
    
});