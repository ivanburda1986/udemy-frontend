//Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI class
class UI {
  addBookToList(book) {
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

  showAlert(message, className) {
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

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();

      //Instantiate the UI
      const ui = new UI();

      //Show alert
      ui.showAlert('Book removed', 'success');
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local storage class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI;
      //Add book to ui
      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


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
    Store.addBook(book);

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
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});