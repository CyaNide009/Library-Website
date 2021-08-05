class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(bookObj) {
    //console.log("add");
    tableBody.innerHTML = "";
    bookObj.forEach(function (element, index) {
      let tableBody = document.getElementById("tableBody");
      let uiString = `
                  <tr>
                      <td>${element.name}</td>
                      <td>${element.author}</td>
                      <td>${element.type}</td>
                      <td><i class="fas fa-times-circle" id="${index}"onclick="deleteBook(this.id)" style="color: crimson; cursor: pointer;"></i></td>
                  </tr>`;
      tableBody.innerHTML += uiString;
    });
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <strong>${boldText}</strong> ${displayMessage}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 5000);
  }
}



var display = new Display();
let getBook = localStorage.getItem("getBook");
if (getBook == null) {
  var bookObj = [];
} else {
  bookObj = JSON.parse(getBook);
}
display.add(bookObj);



let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let book = new Book(name, author, type);
  //console.log(book);

  let getBook = localStorage.getItem("getBook");
  if (getBook == null) {
    let bookObj = [];
  } else {
    bookObj = JSON.parse(getBook);
  }
  bookObj.push(book);
  localStorage.setItem("getBook", JSON.stringify(bookObj));
  //console.log(getBook);

  // var display = new Display();
  if (display.validate(book)) {
    display.add(bookObj);
    display.clear();
    display.show("success", "Your book has been successfully added");
  } else {
    display.show("danger", "Sorry you cannot add this book");
  }

  e.preventDefault();
}

function deleteBook(index) {
  let getBook = localStorage.getItem("getBook");
  if (getBook == null) {
    let bookObj = [];
  } else {
    bookObj = JSON.parse(getBook);
  }
  bookObj.splice(index, 1);
  localStorage.setItem("getBook", JSON.stringify(bookObj));
  // var display = new Display();
  display.add(bookObj);
}
