let myLibrary = [];
const addBookForm = document.querySelector('.add-book')
const newBookButton  = document.getElementById('new-book')
newBookButton.addEventListener('click', () => {    
    addBookForm.style.visibility = 'visible';
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
        item.innerHTML = book.title;
        listElement.appendChild(item);

        item = document.createElement('li');
        item.innerHTML = book.author;
        listElement.appendChild(item);
            
        item = document.createElement('li');
        item.innerHTML = book.pages;
        listElement.appendChild(item);
            
        item = document.createElement('li');
        item.innerHTML = book.read? 'Read': 'Not Read';
        listElement.appendChild(item);

        
        container.appendChild(listElement)
    }
}

function clearLibrary() {
    let library = Array.from(document.getElementsByClassName('library'))
    library.forEach(element => {
        element.innerHTML = ""
    });
}

const Solitude = new Book('100 Years of Solitude', 'GGC', 500, true);
addBooktoLibrary(Solitude)

const Lolita = new Book('Lolita', 'Vladimir Pervertov', 400, false);
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
})

displayLibrary()










