var updateTicker = 0;
var c=document.getElementById("canvasId");
var ctx=c.getContext("2d");

var isCurveSize = 0;
var isCurveVar = 1;
var tickerSpeed = 1;

var gameLoop = function(){
  draw();
  requestAnimationFrame(gameLoop, c);
}
requestAnimationFrame(gameLoop, c);


setInterval(setDarknessMask.bind(this),40);
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
 }

 