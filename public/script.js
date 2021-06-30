let myLibrary = []

var firebaseConfig = {
    apiKey: "AIzaSyC86UcVa0nwmv4AgWPeF-ItPl7jxQ4t7YA",
    authDomain: "library-catalog-dca29.firebaseapp.com",
    projectId: "library-catalog-dca29",
    storageBucket: "library-catalog-dca29.appspot.com",
    messagingSenderId: "99819483910",
    appId: "1:99819483910:web:9bbc44618ca6a0f15c6487"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function saveMessage(book) {
    // Add a new library entry to the database.
    return firebase.firestore().collection('books').doc(book.title).set({title: book.title, author: book.author, pages: book.pages, read: book.read})
    .catch(function(error) {
      console.error('Error writing new book to database', error);
    });
  }

function updateRead(title, read) {
    console.log(title)
    return firebase.firestore().collection('books').doc(title).update({read: read})
            .catch(function(error) {
                console.error('Error changing read value', error);
            });
}  

async function updateMyLibrary() {
    myLibrary = []
    await firebase.firestore().collection("books").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            myLibrary.push(doc.data())
        });
    }).then(() => {console.log(myLibrary)})
}


const addBookForm = document.querySelector('.add-book')
const newBookButton  = document.getElementById('new-book')
const closeBookForm = document.getElementById('closeform')

closeBookForm.addEventListener('click', () => {
    addBookForm.style.visibility = 'hidden'
    let libraryElement = Array.from(document.getElementsByClassName('library'))[0]
    libraryElement.style.filter =  'none';
})

newBookButton.addEventListener('click', () => {    
    addBookForm.style.visibility = 'visible';
    let libraryElement = Array.from(document.getElementsByClassName('library'))[0]
    libraryElement.style.filter =  'blur(5px)';
})



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    if (this.read) {return(`${this.title} by ${this.author}, ${this.pages} pages, already read`)}
    else {return(`${this.title} by ${this.author}, ${this.pages} pages, not read yet`)}
};

Book.prototype.toggle = function() {
    this.read = !this.read;

}

function addBooktoLibrary(book) {
    saveMessage(book)
}

async function displayLibrary() {
    container = document.createElement('div')
    container.className = 'library'
    let headers = (['Title', 'Author', 'Pages', 'Status'])
    document.getElementsByTagName('body')[0].appendChild(container)
    await updateMyLibrary()
    for(let i=0;i<myLibrary.length;i++) {
        listElement = document.createElement('ul')
        book = myLibrary[i]
        listElement.className = 'book'
        item = document.createElement('li');
        item.className = 'name'
        item.innerHTML = book.title;
        listElement.appendChild(item);

        item = document.createElement('li');
        item.className = 'author'
        item.innerHTML = book.author;
        listElement.appendChild(item);
            
        item = document.createElement('li');
        item.className = 'pages'
        item.innerHTML = book.pages;
        listElement.appendChild(item);
            
        item = document.createElement('li');
        item.className = 'read'
        item.innerHTML = "<span class = 'textRead'>Read</span><span class = 'textNotRead'>Not Read</span>"
        if(book.read!= "false") {
        ReadClass = Array.from(item.getElementsByClassName('textRead'))[0];
        ReadClass.style.boxShadow = 'inset 0px 0px 3px';
        ReadClass.style.backgroundColor = '#97A637';
        }
        else {
        ReadClass = Array.from(item.getElementsByClassName('textNotRead'))[0];
        ReadClass.style.boxShadow = 'inset 0px 0px 3px';
        ReadClass.style.backgroundColor = '#AA4139';
        }
        listElement.appendChild(item);
        item = document.createElement('li');
        item.className = 'close';
        item.innerHTML = 'Remove this book';
        listElement.appendChild(item);
        container.appendChild(listElement)
    }
    readSwitcher()
    bookRemover()
}

function clearLibrary() {
    let library = Array.from(document.getElementsByClassName('library'))
    library.forEach(element => {
        element.remove()
    });
}


const submitButton = document.getElementById('submit')
submitButton.addEventListener('click', () => {
    let bookname = document.getElementById('name').value
    let authorname = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    if(bookname!= '' && authorname!='' && pages!= '') {
        let book = new Book(bookname, authorname, pages, true)
        addBooktoLibrary(book)
        clearLibrary()
        displayLibrary()
        let libraryElement = Array.from(document.getElementsByClassName('library'))[0]
        libraryElement.filter = 'none';
        addBookForm.style.visibility = 'hidden';
    }
    else {
        alert('Fill in all the fields')
    }
})

function readSwitcher() {
    read_items = Array.from(document.getElementsByClassName('read'));
    read_items.forEach((item) => {
        item.addEventListener('click', () => {
            updateRead(item.parentElement.childNodes[0].textContent, 'false')
            clearLibrary()
            displayLibrary() 
        })
    
    })
}

async function removeFromDatabase(title)
{   console.log(title)
    await firebase.firestore().collection("books").doc(title).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function bookRemover() {
    remove_Buttons = Array.from(document.getElementsByClassName('close'));
    remove_Buttons.forEach(button =>
        button.addEventListener('click', async () => {
            await removeFromDatabase(button.parentElement.childNodes[0].textContent)
            clearLibrary()
            displayLibrary()
        }))
}

displayLibrary()









