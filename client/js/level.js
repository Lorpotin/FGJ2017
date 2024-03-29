
var mapLower = null;
var mapUpper = null;
var darknessMask = null;

var isCurveVar = 1;
var isCurveVarTarget = 1;

var isCurveSize = 0;
var isCurveSizeTarget = 0;

var isDarknessSize = 0;
var isDarknessTarget = 0.5;

var upperLevelYCoord = 0;
var lowerLevelYCoord = 0;

function addDarknessMask(){
	mapUpper.mask = darknessMask;
    mapLower.mask = darknessMask;
    background.mask = darknessMask;
    for(var i = 0; i < particleArray.length; i++){
    	particleArray[i].mask = darknessMask;
    }
}

function removeDarknessMask(){
	isDarknessTarget = 0;
}

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

function setDarknessMask(){
	if(isDarknessSize < isDarknessTarget){
		isDarknessSize += 0.01
		if(isDarknessSize > isDarknessTarget){
			isDarknessSize = isDarknessTarget;
		}
	}
	else if(isDarknessSize > isDarknessTarget){
		isDarknessSize -= 0.01;
		if(isDarknessSize < isDarknessTarget){
			isDarknessSize = isDarknessTarget;
		
		}
	}
}

function randomizeNewCurve(){
	isCurveVarTarget = Math.random()  + 0.5;
}

function randomizeNewCurveSize(){
	isCurveSizeTarget = Math.random();
}

function randomizeNewDarkness(){
	if(Math.floor(Math.random() * 2) === 0){
		isDarknessSize = 0;
		isDarknessTarget = 0;
	}
	else{
		//removeDarknessMask();
	}
}
var testcollspot1 = null;
var testcollspot2 = null;
function updateLevel(){
	 /* upper map */
	mapUpper.clear();
    mapUpper.beginFill(0xF4A460);
	mapUpper.moveTo(0, 0);
 	for(var x = 0; x < GAME_WIDTH+1000; x++){
 		var y_pos = (260 + (100 * isCurveSize) + (200 * Math.sin(Math.PI * ((1-(x/40 + updateTicker))/60)))*isCurveVar);
 		if(player && x === player.x){
 			upperLevelYCoord = y_pos;
 		}
  		mapUpper.lineTo(x,y_pos);
 	}
	mapUpper.lineTo( GAME_WIDTH+1000, 0);
    mapUpper.endFill();

    /* lower map */
  	mapLower.clear();
    mapLower.beginFill(0xF4A460);
	mapLower.moveTo(0, 1200);
 	for(var x = 0; x < GAME_WIDTH+1000; x++){
	mapLower.beginFill(0xF4A460);
 		var y_pos = (770 - (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((x/40 + (updateTicker+60)))/60)))*isCurveVar);
 		if(player && x === player.x){
 		
 			lowerLevelYCoord = y_pos;
 		}
  		mapLower.lineTo(x,y_pos);
 	}
	mapLower.lineTo( GAME_WIDTH+1000 , 1200);
    mapLower.endFill();
	
	darknessMask.clear();
    darknessMask.beginFill(0x000000);
    darknessMask.drawCircle(200, 0, 3000 - (2500 *  isDarknessSize));

    if(player){
    	darknessMask.x = player.x ;
    	darknessMask.y = player.y + player.prevYCoordinates[player.prevYCoordinates.length-1];
    }
	
    if(middleObstacle){
    	middleObstacle.x -= tickerSpeed * 30;
    	middleObstacle.y = ((150 + 270) - (100* isCurveSize) + (200 * Math.sin(Math.PI * ((((middleObstacle.x/40) + (updateTicker+60)))/60)))*isCurveVar);
    	middleObstacle.rotation += 0.05;
    	if(middleObstacle.x < -40){
    		middleObstacle.destroy();
    	}
    }
    if( middleObstacle2){
    	 middleObstacle2.x -= tickerSpeed * 30;
    	 middleObstacle2.y = ((150 + 470) - (100* isCurveSize) + (200 * Math.sin(Math.PI * (((( middleObstacle2.x/40) + (updateTicker+60)))/60)))*isCurveVar);
    	 middleObstacle2.rotation += 0.05;
    	if( middleObstacle2.x < -40){
    		 middleObstacle2.destroy();
    	}
    }


    
  } 

function addTimeEvents(){
	game.time.events.loop(4000, randomizeNewCurve.bind(this));
	game.time.events.loop(40, increaseCurveVarUntil.bind(this));

	game.time.events.loop(2000, randomizeNewCurveSize.bind(this));
	game.time.events.loop(40, increaseCurveSizeUntil.bind(this));

	//game.time.events.loop(4000, randomizeNewDarkness.bind(this));
	game.time.events.loop(40, setDarknessMask.bind(this));

	game.time.events.loop(2000, sendUpdates.bind(this));
}
