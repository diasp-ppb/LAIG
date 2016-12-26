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
	request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

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
 */
Pentalath.prototype.makeRequest = function(requestString) {
	// Make Request
	this.getPrologRequest(requestString, this.handleReply);
};


/**
 * Handle the Reply
 *
 * @param data Data sent from the server (data.target.response)
 */
Pentalath.prototype.handleReply = function(data) {
  console.log(data.target.response);
};
