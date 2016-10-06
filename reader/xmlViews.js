/**
* Class that represents a scene tag in xml
* @param attrDefault ID for the default perspective
*/
function xmlViews(attrDefault)
{
  this.default = attrDefault;
  this.perspectives = [];
  this.currePerspective = 0;//TODO need to be set to defaault
};
/**
* @return next perspective defined in dsx file
*/
xmlViews.prototype.getNextPerspective = function(){
  if(this.currePerspective  < this.perspectives.length - 1){
    this.currePerspective++;
  }
  else
  this.currePerspective =0;
  return this.perspectives[this.currePerspective];;
}
xmlViews.prototype.getDefaultCamera = function(){
  var length = this.perspectives.length;


  for(var i = 0; i < length; i++){
    if(this.default == this.perspectives[i].id){
      return this.perspectives[i];
    }
  }
  return this.perspectives[0]; // TODO alterar depois
};
