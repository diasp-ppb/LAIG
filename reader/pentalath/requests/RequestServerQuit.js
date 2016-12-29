/**
 * A subclass that represents a request to shutdown the server
 */
function RequestServerQuit() {

  // super class constructor
  ServerRequest.call(this, "serverQuit", "quit");

  // send request to the server
  this.request.send();
}
RequestServerQuit.prototype = Object.create(ServerRequest.prototype);
