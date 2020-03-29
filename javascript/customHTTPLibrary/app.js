const http = new easyHTTP;

//Get posts
/*
http.get('https://jsonplaceholder.typicode.com/posts', function (err, posts) { //this does not have to be called 'posts' or 'response' or anything specific. The argument for this function is the value which got passed to the callback() in the easyhttp-es5.js 
  if (err) {
    console.log(err);
  } else {
    console.log(posts);
  }
});
*/


//Get a single post

http.get('https://jsonplaceholder.typicode.com/posts/1', function (err, post) { //this does not have to be called 'posts' or 'response' or anything specific. The argument for this function is the value which got passed to the callback() in the easyhttp-es5.js 
  if (err) {
    console.log(err);
  } else {
    console.log(post);
  }
});


//Create data
const data = {
  title: "Custom post",
  body: "This is a custom post"
};

//Create a new post

http.post('https://jsonplaceholder.typicode.com/posts', data, function (err, post) {
  if (err) {
    console.log(err);
  } else {
    console.log(post);
  }
});


//Update a post

http.put('https://jsonplaceholder.typicode.com/posts/1', data, function (err, post) {
  if (err) {
    console.log(err);
  } else {
    console.log(post);
  }
})



//Delete a post

http.delete('https://jsonplaceholder.typicode.com/posts/1', function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});