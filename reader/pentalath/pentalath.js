/**
* global variable that containts server response
*/
var reply;


/**
 * A class that represents the plog game
 */
function Pentalath() {

}

/**
 * Send request to server and get reply
 */
Pentalath.prototype.getPrologRequest = function(requestString, onSuccess, onError, port) {
	var requestPort = port || 8081;
	var request = new XMLHttpRequest();
	// request needs to be synchronous in order to wait for reply before placing a piece
	request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, false);

	request.onload = onSuccess;
	request.onerror = onError || function() {
		console.log("Error waiting for response");
	};

	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
};


/**
 * Make server request
 *
 * @param requestString String to send as a request
 * @return Server Reply
 */
Pentalath.prototype.makeRequest = function(requestString, game) {
	// Make Request
	this.getPrologRequest(requestString, this.handleReply);

	return reply;

};


/**
 * Handle the Reply
 *
 * @param data Data sent from the server (data.target.response)
 */
Pentalath.prototype.handleReply = function(data) {
	reply = data.target.response;
	console.log("Server Reply: " + reply);
};
