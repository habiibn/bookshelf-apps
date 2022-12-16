// DOM loaded
document.addEventListener('DOMContentLoaded', function(){
    const searchForm = document.getElementById('search-book');
    searchForm.addEventListener('submit', function(event){
        const titleBook = document.getElementById('searchBook').value;
        event.preventDefault();
        searchTitleBook(titleBook);
    });
    if (isStorageExist()) {
        loadData();
    };
});

// Input book
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
    if (bookDetails.title !== "" && bookDetails.author !== "" && bookDetails.year !== "" && bookDetails.year !== "" && bookDetails.category !== ""){
        books.push(bookDetails);
    } else {
        alert("Tolong lengkapi formulir!");
    }
    document.dispatchEvent(new Event('render-event'));
    clearText();
    save();
}

// function find book
function searchBook (bookID){
    for (const bookItem of books){
        if(bookItem.id == bookID){
            return bookItem;
        }
    }
    return null;
}

const inCompleteBooks = document.getElementById('idle-list');
const completeBooks = document.getElementById('completed-list');
const searchResult = document.getElementById('shelf-base');
const div = document.createElement('div');

// show book 
function searchTitleBook(title){
    completeBooks.innerHTML = '';
    inCompleteBooks.innerHTML = '';
    searchResult.innerHTML = '';

    for (const book of books){
        if ( book.title == title){
            const bookElement = createShelf(book);
            const searchElements = displaySearch(book);
            if(book.isComplete){
                completeBooks.append(bookElement);
                searchResult.append(searchElements);
            } else {
                
                inCompleteBooks.append(bookElement);
                searchResult.append(searchElements);
            }
        } 
        else {
            const noCompleteBook = emptyBook();
            completeBooks.append(noCompleteBook);
            const noIncompleteBook = emptyBook();
            inCompleteBooks.append(noIncompleteBook);
        }
    }
}

// function swap to complete book
function BookCompleted(bookID){
    const bookTarget = searchBook(bookID);

    if(bookTarget == null ) {
        return ;
    }

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event('render-event'));
    save();
}

// function swap to incomplete book
function unBookCompleted(bookID){
    const bookTarget = searchBook(bookID);

    if(bookTarget == null){
        return ;
    }

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event('render-event'));
    save();
}

// function remove Book
function removeBook(id){
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