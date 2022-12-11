const STORAGE_KEY = 'dataBook';

// window.addEventListener("load", function(){
//     if (localStorage.getItem(STORAGE_KEY) !== "") {    
//         const booksData = getData();
//         showData(booksData);
//         console.log(booksData);
//     }
// })

function getData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// check storage
function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
      alert('Browser tidak mendukung local storage');
      console.log(Error);
      return false;
    } else {
      return true;
    }
}  
// save databook shelf
function save() {
    if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    }
}

//check storage 
function loadData() {
    const resultData = localStorage.getItem(STORAGE_KEY);
    let dataBooks = JSON.parse(resultData);
    books = [];
    if (dataBooks !== null) {
    for (const book of dataBooks) {
        books.push(book);
    }
    }
    
    document.dispatchEvent(new Event('render-event'));
}