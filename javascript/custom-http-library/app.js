const results = document.getElementById('results');
const http = new easyHTTP;

//Get posts
//Add action to the button
document.getElementById('get-multiple-posts').addEventListener('click', function (e) {
  http.get('https://jsonplaceholder.typicode.com/posts', function (err, posts) { //this does not have to be called 'posts' or 'response' or anything specific. The argument for this function is the value which got passed to the callback() in the easyhttp-es5.js 
    if (err) {
      results.innerHTML = err;
    } else {
      results.innerHTML = posts;
    }
  });
  e.preventDefault();
});


//Get a single post
//Add action to the button
document.getElementById('get-a-post').addEventListener('click', function (e) {
  //Execute this
  http.get('https://jsonplaceholder.typicode.com/posts/1', function (err, post) { //this does not have to be called 'posts' or 'response' or anything specific. The argument for this function is the value which got passed to the callback() in the easyhttp-es5.js 
    if (err) {
      results.innerHTML = err;
    } else {
      results.innerHTML = post;
    }
  });
  e.preventDefault();
});





//Create data
const data = {
  title: "Custom post",
  body: "This is a post"
};

//Create a new post
//Add action to the button
document.getElementById('create-a-post').addEventListener('click', function (e) {
  //Execute this
  http.post('https://jsonplaceholder.typicode.com/posts', data, function (err, post) {
    if (err) {
      results.innerHTML = err;
    } else {
      results.innerHTML = post;
    }
  });
  e.preventDefault();
});

//Update a post
document.getElementById('update-a-post').addEventListener('click', function (e) {
  http.put('https://jsonplaceholder.typicode.com/posts/2', data, function (err, post) {
    if (err) {
      results.innerHTML = err;
    } else {
      results.innerHTML = post;
    }
  });
  e.preventDefault();
});


//Delete a post
document.getElementById('delete-a-post').addEventListener('click', function (e) {
  http.delete('https://jsonplaceholder.typicode.com/posts/1', function (err, response) {
    if (err) {
      results.innerHTML = err;
    } else {
      results.innerHTML = response;
    }
  });
  e.preventDefault();
});