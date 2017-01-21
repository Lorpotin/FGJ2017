
function addDarknessMask(){
	mapUpper.mask = darknessMask;
    mapLower.mask = darknessMask;
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
			mapUpper.mask = null;
			mapLower.mask = null;
		}
	}
}

function randomizeNewCurve(){
	isCurveVarTarget = Math.random();
}

function randomizeNewCurveSize(){
	isCurveSizeTarget = Math.random();
}

function randomizeNewDarkness(){
	if(Math.floor(Math.random() * 2) === 0){
		isDarknessSize = 0;
		isDarknessTarget = 1;
		addDarknessMask();
	}
	else{
		removeDarknessMask();
	}
}

function updateLevel(){
	 /* upper map */
	mapUpper.clear();
    mapUpper.beginFill(0xF4A460);
	mapUpper.moveTo(0, 0);
 	for(var x = 0; x < GAME_WIDTH+300; x++){
  		mapUpper.lineTo(x,(200 + (100 * isCurveSize) + (200 * Math.sin(Math.PI * ((1-(x/40 + updateTicker))/60)))*isCurveVar));
 	}
	mapUpper.lineTo( GAME_WIDTH+300, 0);
    mapUpper.endFill();

    /* lower map */
  	mapLower.clear();
    mapLower.beginFill(0xF4A460);
	mapLower.moveTo(0, 800);
 	for(var x = 0; x < GAME_WIDTH+300; x++){
  		mapLower.lineTo(x,(550 - (100 * isCurveSize) + (200 * Math.sin(Math.PI * (((x/40 + (updateTicker+60)))/60)))*isCurveVar));
 	}
	mapLower.lineTo( GAME_WIDTH+300 , 800);
    mapLower.endFill();
	
	darknessMask.clear();
    darknessMask.beginFill(0x000000);
    darknessMask.drawCircle(500, 400, 1500 - (1000 * isDarknessSize));
}

function addTimeEvents(){
	game.time.events.loop(4000, randomizeNewCurve.bind(this));
	game.time.events.loop(40, increaseCurveVarUntil.bind(this));

	game.time.events.loop(2000, randomizeNewCurveSize.bind(this));
	game.time.events.loop(40, increaseCurveSizeUntil.bind(this));


	game.time.events.loop(4000, randomizeNewDarkness.bind(this));
	game.time.events.loop(40, setDarknessMask.bind(this));

}