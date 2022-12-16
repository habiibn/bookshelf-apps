// custom event render-event
document.addEventListener('render-event', function(){
    completeBooks.innerHTML = '';
    inCompleteBooks.innerHTML = '';
    searchResult.innerHTML = '';

    let checkIncompleteBook = 0;
    let checkCompleteBook = 0;
    for (const book of books){
        const bookElement = createShelf(book);
        if(book.isComplete){
            completeBooks.append(bookElement);
            checkCompleteBook++;
        } else {
            inCompleteBooks.append(bookElement);
            checkIncompleteBook++;
        }
    }
    if (checkCompleteBook === 0){
        const noCompleteBook = emptyBook();
        completeBooks.append(noCompleteBook);
    }
    if (checkIncompleteBook === 0){
        const noIncompleteBook = emptyBook();
        inCompleteBooks.append(noIncompleteBook);
    }
});

// show empty book 
function emptyBook(){
    const noBook = document.createElement('div');
    noBook.classList.add('no-book');

    const text = document.createElement('h3');
    text.innerText = 'Tidak ada buku';

    noBook.append(text);
    styleBox(noBook);
    return noBook;
}

// create object book
function createShelf(objectBook) {
    const titleBook = document.createElement('h3');
    titleBook.innerText = objectBook.title;
    titleBook.style.backgroundColor='#675bd1';
    titleBook.style.padding='5px';
    titleBook.style.borderRadius='5px';

    const authorBook = document.createElement('p');
    authorBook.innerText = "Penulis : " + objectBook.author;

    const yearBook = document.createElement('p');
    yearBook.innerText = "Tahun : " + objectBook.year;

    const categoryBook = document.createElement('p');
    categoryBook.innerText = "Kategori : " + objectBook.category;

    const bookData = document.createElement('div');
    bookData.classList.add('book-data');
    bookData.append(titleBook, authorBook, yearBook, categoryBook);
    
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', `book-${objectBook.id}`);
    bookItem.classList.add('book-item');
    bookItem.append(bookData);

    if(objectBook.isComplete){
        const unCompleteBtn = document.createElement('button');
        unCompleteBtn.classList.add('btn-complete')
        unCompleteBtn.innerText = "Baca";
        styleBtn(unCompleteBtn);

        unCompleteBtn.addEventListener('click', function(){
            unBookCompleted(objectBook.id);
        });

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-book');
        removeBtn.innerText = "Hapus";
        styleBtn2(removeBtn);

        removeBtn.addEventListener('click', function(){
            confirmRemove(objectBook);
        });

        const action = document.createElement('div');
        action.classList.add('action');

        action.append(unCompleteBtn, removeBtn);
        bookItem.append(action);
    } 
    else {
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('btn-incomplete')
        completeBtn.innerText = "Selesai";
        styleBtn(completeBtn);

        completeBtn.addEventListener('click', function(){
            BookCompleted(objectBook.id);
        });

        const removeBtn2 = document.createElement('button');
        removeBtn2.classList.add('remove-book');
        removeBtn2.innerText = "Hapus";
        styleBtn2(removeBtn2);

        removeBtn2.addEventListener('click', function(){
            confirmRemove(objectBook);
        });

        const action = document.createElement('div');
        action.classList.add('action');

        action.append(completeBtn, removeBtn2);
        bookItem.append(action);
    }
    styleBox(bookItem);

    return bookItem;
}

// Custom search result
function displaySearch (objectBook) {
    const titleSearch = document.createElement('h3');
    titleSearch.innerText = objectBook.title;
    titleSearch.style.backgroundColor='#675bd1';
    titleSearch.style.padding='5px';
    titleSearch.style.borderRadius='5px';

    const authorSearch = document.createElement('p');
    authorSearch.innerText = "Penulis : " + objectBook.author;

    const yearSearch = document.createElement('p');
    yearSearch.innerText = "Tahun : " + objectBook.year;

    const categorySearch = document.createElement('p');
    categorySearch.innerText = "Kategori : " + objectBook.category;

    const statusSearch = document.createElement('p');
    if (objectBook.isComplete) {
        statusSearch.innerText = "Status : Sudah selesai dibaca"; 
        statusSearch.style.backgroundColor = 'green';
    } else {
        statusSearch.innerText = "Status : Belum selesai dibaca"; 
        statusSearch.style.backgroundColor = 'grey';
    }

    const searchData = document.createElement('div');
    searchData.classList.add('search-data');
    searchData.append(titleSearch, authorSearch, yearSearch, categorySearch, statusSearch);
    
    const searchItem = document.createElement('div');
    searchItem.setAttribute('id', `book-${objectBook.id}`);
    searchItem.classList.add('search-item');
    searchItem.append(searchData);
    styleBox(searchItem);

    return searchItem;
}

function clearText(){
    document.querySelector("#input-Title").value = '';
    document.querySelector("#input-Author").value = '';
    document.querySelector("#input-Year").value = '';
    document.querySelector("#input-Category").value = '';
    document.querySelector("#input-IsComplete").value = '';
    document.getElementById('searchBook').value = '';
    let readCheck = document.querySelector("#input-IsComplete");
    readCheck.checked = false;
}