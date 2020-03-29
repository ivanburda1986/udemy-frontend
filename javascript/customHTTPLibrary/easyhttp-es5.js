function easyHTTP() {
  this.http = new XMLHttpRequest();
}

//Make an HTTP GET request
easyHTTP.prototype.get = function (url, callback) {
  this.http.open('GET', url, true);

  let self = this; //the self (or whatever we decided to call is - it could be also 'that' or anything else) allows reffering from within the following function
  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, self.http.responseText); //here 'this' would mean 'inside this function', however, we need the context of the above-function - we can refer to that context by using the 'self'
    } else {
      callback('Error: ' + self.http.status);
    }
  }

  this.http.send();
}

//Make an HTTP POST request
easyHTTP.prototype.post = function (url, postPayload, callback) {
  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');

  let self = this;
  this.http.onload = function () {
    callback(null, self.http.responseText);
  }
  this.http.send(JSON.stringify(postPayload));
}

//Make an HTTP PUT request
easyHTTP.prototype.put = function (url, putPayload, callback) {
  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');

  let self = this;
  this.http.onload = function () {
    callback(null, self.http.responseText);
  }
  this.http.send(JSON.stringify(putPayload));
}

//Make an HTTP DELETE request
easyHTTP.prototype.delete = function (url, callback) {
  this.http.open('DELETE', url, true);

  let self = this; //the self (or whatever we decided to call is - it could be also 'that' or anything else) allows reffering from within the following function
  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, 'Post deleted'); //here 'this' would mean 'inside this function', however, we need the context of the above-function - we can refer to that context by using the 'self'
    } else {
      callback('Error: ' + self.http.status);
    }
  }

  this.http.send();
}