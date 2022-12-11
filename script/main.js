// DOM loaded
document.addEventListener('DOMContentLoaded', function(){
    const searchForm = document.getElementById('search-book');
    searchForm.addEventListener('submit', function(event){
        const titleBook = document.getElementById('searchBook').value;
        event.preventDefault();
        findTitleBook(titleBook);
    });
    
    if (isStorageExist()) {
        loadData();
    };
});

// 
let books = [];
function registry() {
    const bookTitle = document.querySelector("#input-Title"),
        bookAuthor = document.querySelector("#input-Author"),
        bookYear = document.querySelector("#input-Year"),
        bookCategory = document.querySelector("#input-Category"),
        isRead = document.querySelector("#input-IsComplete"),
        bookDetails = {
            id: +new Date,
            title: bookTitle.value,
            author: bookAuthor.value,
            year: bookYear.value,
            category: bookCategory.value,
            isComplete: isRead.checked
        };
    books.push(bookDetails);
    save();
}

// function find book
function findBook (bookID){
    for (const bookItem of books){
        if(bookItem.id == bookID){
            return bookItem;
        }
    }
    return null;
}

// find book 
const inCompleteBooks = document.getElementById('idle-list');
const completeBooks = document.getElementById('completed-list');
const searchResult = document.getElementById('shelf-base');
const div = document.createElement('div');

function findTitleBook(title){
    completeBooks.innerHTML = '';
    inCompleteBooks.innerHTML = '';
    searchResult.innerHTML = '';

    const lowerTitle = title.toLowerCase();
    for (const book of books){
        if ( book.title == lowerTitle){
            const bookElement = makeShelf(book);
            const searchElements = displaySearch(book);
            console.log(searchElements);
            if(book.isComplete){
                completeBooks.append(bookElement);
                searchResult.append(searchElements);
            } else {
                inCompleteBooks.append(bookElement);
                searchResult.append(searchElements);
            }
        }
    }
}

// function to complete book
function BookCompleted(bookID){
    const bookTarget = findBook(bookID);

    if(bookTarget == null ) {
        return ;
    }

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event('render-event'));
    save();
}

// function to incomplete book
function unBookCompleted(bookID){
    const bookTarget = findBook(bookID);

    if(bookTarget == null){
        return ;
    }

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event('render-event'));
    save();
}

// function remove Book
function removeBook(id){
    const foundBooks = findBook(id);
    console.log("Id found: " + foundBooks.id)
    books.splice(books.findIndex(function (foundBooks) {
        return foundBooks.id === id;
    }),1);
    
    document.dispatchEvent(new Event('render-event'));
    save();
}

function confirmRemove(objectBook){
    const confirmPopup = document.getElementById('popup');
    const confirmBar = confirmPopup.appendChild(div);

    confirmPopup.style.visibility = 'visible';
    confirmPopup.style.zIndex = 1;

    confirmBar.innerHTML = "<p> Apa Anda yakin ingin menghapus buku ini? </p>";
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('remove-book');
    confirmBtn.innerText = "Hapus";
    styleBtn2(confirmBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-remove');
    cancelBtn.innerText = "Batal";
    styleBtn(cancelBtn);

    confirmBar.appendChild(confirmBtn);
    confirmBtn.addEventListener('click', function(){
        removeBook(objectBook.id);
        confirmPopup.style.visibility = 'hidden';
        confirmPopup.style.zIndex = -1;
        confirmBar.remove();
    });

    confirmBar.appendChild(cancelBtn);
    cancelBtn.addEventListener('click', function(){
        confirmPopup.style.visibility = 'hidden';
        confirmPopup.style.zIndex = -1;
        confirmBar.remove();
    });

    document.dispatchEvent(new Event('render-event'));
}