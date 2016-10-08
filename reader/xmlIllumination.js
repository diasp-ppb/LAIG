/**
* Class that represents a illumination tag in xml
* @param doublesided
* @param local
* @param arrayAmbient
* @param arrayBackground
*/
function xmlIllumination(doublesided, local, arrayAmbient, arrayBackground)
{
  this.doublesided = doublesided;
  this.local = local;
  this.ambient = arrayAmbient.slice(0);
  this.background = arrayBackground.slice(0);
};

/**
* Outputs every attr to the console
*/
xmlIllumination.prototype.consoleDebug = function(){
  console.log("--- START ILLUMINATION DEBUGGING ---");
  console.log("Doublesided: " + this.doublesided);
  console.log("Local: " + this.local);
  var ss; //string variable that helps avoiding the console.log newline
  ss = "Ambient[" + this.ambient.length + "]:";
  for(var i = 0; i < this.ambient.length; i++){
    ss += " " + this.ambient[i];
  }
  console.log(ss);
  ss = "Background[" + this.background.length + "]:";
  for(var i = 0; i < this.background.length; i++){
    ss += " " + this.background[i];
  }
  console.log(ss);
  console.log("--- FINISH ILLUMINATION DEBUGGING ---");
};
