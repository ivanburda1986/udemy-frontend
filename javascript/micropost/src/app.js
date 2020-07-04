import {
  http
} from './http';

import {
  ui
}
from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//Listen for the 'Cancel editing' state
document.querySelector('.card-form').addEventListener('click', cancelEdit);

//Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//Submit a post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title, //ES2015 allow title instead of duplicating if both were the same such as title:title, body:body
    body
  }

  //Validate input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {

    //Check for the value set in the hidden id element
    //--If there is not id value, this means we are creating a new post. For such a post no id exists yet
    if (id === '') {
      //Create a post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));

    }
    //--IF there is already an id value, this means we are editing an already existing post. For such a post there already exists an id.
    else {
      //Update the post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }


}

//Delete post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

//Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }

    //Fill the form with the current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

//Cancel edit state
function cancelEdit(e) {

  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}