class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  //Show all posts available in the db (json file)
  showPosts(posts) {
    let output = '';
    posts.forEach((post) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
          <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
          <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });
    this.post.innerHTML = output;
  }

  //Show an alert message
  showAlert(message, className) {
    this.clearAlert();
    //Create a div
    const div = document.createElement('div');
    //Add classes
    div.className = className;
    //Add the text
    div.appendChild(document.createTextNode(message));
    //Get the parrent
    const container = document.querySelector('.postsContainer');
    //Get post
    const posts = document.querySelector('#posts');
    //Insert the alert div
    container.insertBefore(div, posts); //what - div, before what - posts

    //Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  //Clear an alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  //Clear all fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  //Fill form to edit it
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  //Clear id input
  clearIdInput() {
    this.idInput.value = '';
  }

  //Change the form state
  changeFormState(type) {
    if (type === 'edit') {
      //Change the 'Submit' button's text and color to become an 'Update' button
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      //Create a button to cancel the editing
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Editing'));

      //Get the parent which should be used to insert the 'Cancel editing' button into
      const cardForm = document.querySelector('.card-form');
      //Get the element to insert before
      const formEnd = document.querySelector('.form-end');
      //Insert the 'Cancel editing' button
      cardForm.insertBefore(button, formEnd);

    } else {
      //Set the button's text and color to become an the default 'Submit' button
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      //Remove the 'cancel editing' button if it is present
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      //Clear id from the hidden field
      this.clearIdInput();
      //Clear text field
      this.clearFields();
    }
  }
}


export const ui = new UI();