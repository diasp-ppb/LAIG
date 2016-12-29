/**
 * A subclass that represents a request to check if game is over
 *
 * @param game Object of class Game
 */
function RequestGameCheck(game) {

  // request type
  var type = "gameIsRunning";

  // generate request string
  var requestStr = "" + type + "(" + game.playBoard.toString() + ")";

  // super class constructor
  ServerRequest.call(this, type, requestStr);

  // set request onload
  this.request.onload = function(data) {

    var reply = data.target.response;
    console.log("Request: " + type);
    console.log("Server Reply: " + reply);

    if (reply === "yes") {
        game.switchTurn();
    }
    else {
      console.log("Game is Over!");
      console.log(game.currPlayer + " wins!");
      // Update scoreboard
      if(game.currPlayer == "player1")
          game.scoreBoard.winWhite();
      else{
          game.scoreBoard.winBlack();
      }
    }
  };

  // set request onerror
  this.request.onerror = function() {
    console.log("Error waiting for response");
  };

  // send request to the server
  this.request.send();
}
RequestGameCheck.prototype = Object.create(ServerRequest.prototype);
