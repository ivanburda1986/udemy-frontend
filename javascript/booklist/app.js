// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI constructor
function UI() {}


// Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');

  //Create a table-row element
  const row = document.createElement('tr');
  //Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;
  list.appendChild(row);
}

//Show alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  //Add class
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));

  //Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  //Insert the message into the parent container right before the form
  container.insertBefore(div, form);

  //Timeout after a few sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

//Delete a book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();

    //Instantiate the UI
    const ui = new UI();

    //Show alert
    ui.showAlert('Book removed', 'success');
  }
}

//Clear input field
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Local storage constructor
function Store() {}

Store.prototype.getBooks = function () {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

Store.prototype.displayBooks = function () {
  const books = Store.prototype.getBooks();
  books.forEach(function (book) {
    const ui = new UI;
    //Add book to ui
    ui.addBookToList(book);
  })
}

Store.prototype.addBook = function (book) {
  const books = Store.prototype.getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

Store.prototype.removeBook = function (isbn) {
  const books = Store.prototype.getBooks();

  books.forEach(function (book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));

}



//DOM load event
document.addEventListener('DOMContentLoaded', Store.prototype.displayBooks);


//Event listener for adding a book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate a book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Add to the Local store
    Store.prototype.addBook(book);

    //Show success
    ui.showAlert('Book added', 'success');

    //Clear input field
    ui.clearFields();

  }

  e.preventDefault();

})


//Event listener for deleting a book
document.getElementById('book-list').addEventListener('click', function (e) {

  //Instantiate the UI
  const ui = new UI();

  //Delete the book
  ui.deleteBook(e.target);

  //Remove from the local store
  Store.prototype.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});