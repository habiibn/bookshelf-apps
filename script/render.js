// custom event RENDER_EVENT
document.addEventListener('render-event', function(){
    completeBooks.innerHTML = '';
    inCompleteBooks.innerHTML = '';

    let checkIncompleteBook = 0;
    let checkCompleteBook = 0;
    for (const book of books){
        const bookElement = makeShelf(book);
        if(book.isComplete){
            completeBooks.append(bookElement);
            checkCompleteBook++;
        } else {
            inCompleteBooks.append(bookElement);
            checkIncompleteBook++;
        }
    }
    if (checkCompleteBook === 0){
        const noCompleteBook = showNoBook();
        completeBooks.append(noCompleteBook);
    }
    if (checkIncompleteBook === 0){
        const noIncompleteBook = showNoBook();
        inCompleteBooks.append(noIncompleteBook);
    }
});

// show no book 
function showNoBook(){
    const noBook = document.createElement('div');
    noBook.classList.add('no-book');

    const text = document.createElement('h3');
    text.innerText = 'belum ada buku';

    noBook.append(text);
    return noBook;
}

// make shelf book
function makeShelf(objectBook) {
    const titleBook = document.createElement('h3');
    titleBook.innerText = objectBook.title;

    const authorBook = document.createElement('p');
    authorBook.innerText = "penulis : " + objectBook.author;

    const yearBook = document.createElement('p');
    yearBook.innerText = "tahun : " + objectBook.year;

    const bookData = document.createElement('div');
    bookData.classList.add('book-data');
    bookData.append(titleBook, authorBook, yearBook);
    
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', `book-${objectBook.id}`);
    bookItem.classList.add('book-item');
    bookItem.append(bookData);

    if(objectBook.isComplete){
        const undoCompleteBtn = document.createElement('button');
        undoCompleteBtn.classList.add('btn-complete')
        undoCompleteBtn.innerText = "belum selesai dibaca";

        undoCompleteBtn.addEventListener('click', function(){
            undoBookCompleted(objectBook.id);
        });

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-book');
        removeBtn.innerText = "hapus buku";

        removeBtn.addEventListener('click', function(){
            removeBook(objectBook.id);
        });

        const action = document.createElement('div');
        action.classList.add('action');

        action.append(undoCompleteBtn, removeBtn);
        bookItem.append(action);
    } 
    else {
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('btn-incomplete')
        completeBtn.innerText = "selesai dibaca";

        completeBtn.addEventListener('click', function(){
            BookCompleted(objectBook.id);
        });

        const removeBtn2 = document.createElement('button');
        removeBtn2.classList.add('remove-book');
        removeBtn2.innerText = "hapus buku";

        removeBtn2.addEventListener('click', function(){
            removeBook(objectBook.id);
        });

        const action = document.createElement('div');
        action.classList.add('action');

        action.append(completeBtn, removeBtn2);
        bookItem.append(action);
    }

    return bookItem;
}