let myLibrary = [];
const addBookForm = document.querySelector('.add-book')
const newBookButton  = document.getElementById('new-book')


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
    myLibrary.push(book)
}

function displayLibrary() {
    container = document.createElement('div')
    container.className = 'library'
    let headers = (['Title', 'Author', 'Pages', 'Status'])
    document.getElementsByTagName('body')[0].appendChild(container)

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
        if(book.read) {
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

const Solitude = new Book('Lord of the Rings', 'R.R. Tolkien', 500, true);
addBooktoLibrary(Solitude)

const Lolita = new Book('Harry Potter', 'RK Jowling', 400, false);
addBooktoLibrary(Lolita)

const submitButton = document.getElementById('submit')
submitButton.addEventListener('click', () => {
    let bookname = document.getElementById('name').value
    let authorname = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    let book = new Book(bookname, authorname, pages, true)
    addBooktoLibrary(book)
    clearLibrary()
    displayLibrary()
    let libraryElement = Array.from(document.getElementsByClassName('library'))[0]
    libraryElement.filter = 'none';
    addBookForm.style.visibility = 'hidden';

})

function readSwitcher() {
    read_items = Array.from(document.getElementsByClassName('read'));
    read_items.forEach((item) => {
        item.addEventListener('click', () => {
            let index = myLibrary.findIndex(book => {
                return book.title === item.parentElement.childNodes[0].textContent
            })
            myLibrary[index].toggle()
            clearLibrary()
            displayLibrary() 
        })
    
    })
}

function bookRemover() {
    remove_Buttons = Array.from(document.getElementsByClassName('close'));
    remove_Buttons.forEach(button =>
        button.addEventListener('click', () => {
        let index = myLibrary.findIndex(book => {
            return book.title === button.parentElement.childNodes[0].textContent
        })
        myLibrary.splice(index, 1)
        clearLibrary()
        displayLibrary()
    })
    )
}

displayLibrary()









