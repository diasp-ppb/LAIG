/**
 * A subclass that represents a request generated by picking a cell
 *
 * @param game Object of class Game
 * @param pickId Id of picked cell
 */
function RequestValidatePlay(game, pickId) {

  // get coordinates of picked cell
  var position = game.playBoard.getPosition(pickId);
  // generate request string
  var requestStr = "validatePlay(something," + game.playBoard.toString() + "," + position[1] + "," + position[0] + ")";

  // super class constructor
  ServerRequest.call(this, "validatePlay", requestStr);

  // set request onload
  this.request.onload = function(data) {

    var reply = data.target.response;
    console.log("Server Reply: " + reply);

    if (reply === "yes") {
        game.switchPieceBoardBlack(pickId);
    }
    else {
      // TODO
    }
  };

  // set request onerror
  this.request.onerror = function() {
    console.log("Error waiting for response");
  };

  // send request to the server
  this.request.send();
}
RequestValidatePlay.prototype = Object.create(ServerRequest.prototype);
