const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items ;

// load items

loadItems();

//call eventlustener

eventListeners();

function eventListeners(){
    //submit event
form.addEventListener('submit' , addNewItem);

// delete item
taskList.addEventListener('click', deleteItem);
btnDeleteAll.addEventListener('click', deleteAllItems);

}

function loadItems(){

    items = getItemFromLS();
    items.forEach(function(item){
        createItem(item);
    })

}

// get items from Local Storage

function getItemFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];

    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text){
    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text){

    //create li
    const li = document.createElement('li');
   li.className='list-group-item list-group-item-secondary';
   li.appendChild(document.createTextNode(text));

   // create a
   const a = document.createElement('a');
   a.classList = 'delete-item float-right'
   a.setAttribute('href','#');
   a.innerHTML='<i class="fas fa-times"></i>';

   // add a to li
   li.appendChild(a);

   // add li to ul
   taskList.appendChild(li);

   
}
// add new item

function addNewItem(e){
   if(input.value ===''){
       alert('add new item');
   }

   createItem(input.value);

   // save to LocalStorage

   setItemToLS(input.value);

       // clear input
   input.value='';

   

    e.preventDefault();

     // Delete an item

}

function deleteItem(e){
    if(e.target.className=== 'fas fa-times'){
        e.target.parentElement.parentElement.remove();

// delete item from LS
        deleteItemFromLS(e.target.parentElement.textContent);
    }

    e.preventDefault();
}

function deleteItemFromLs(text){
    items = getItemFromLS();
    items.forEach(function(item,index){
        if(item===text){
        items.splice(index,1);
        }
        
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteAllItems(e){

    if(confirm('are you sure?')){

    taskList.innerHTML='';

    localStorage.clear();

}
    e.preventDefault();
}
