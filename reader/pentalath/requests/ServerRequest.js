/**
 * Super Class that represents a server request
 *   Subclasses should override request.onload and request.onerror
 *   Subclasses should call request.send
 *
 * @param type String that identifies the type of this request
 * @param requestStr String to be sent as a request to the server
 */
function ServerRequest(type, requestStr) {

  // static const
  this.REQUEST_PORT = 8081;
  this.ADDRESS = 'http://localhost:' + this.REQUEST_PORT + '/';
  this.HEADER = 'application/x-www-form-urlencoded; charset=UTF-8';

  // string that identifies the type of this request
  this.type = type;

  // string to be sent as a request to the server
  this.str = requestStr;

  // XMLHttpRequest object
  this.request = new XMLHttpRequest();
  this.request.open('GET', this.ADDRESS + this.str);
  this.request.setRequestHeader('Content-Type', this.HEADER);

  // subclasses should override this with their own onload (data.target.response)
  this.request.onload = function(data) {
    console.log("Request: " + type);
    console.log("Server Reply: " + data.target.response);
  };

  // subclasses should override this with their own onerror
  this.request.onerror = function() {
    console.log("Error waiting for response");
  };
}
