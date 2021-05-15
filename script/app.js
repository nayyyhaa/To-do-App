//Selectors
let todoInput = document.querySelector(".todo-input"); //alt + shift + down for multiple copies
let todoSubmit = document.querySelector(".todo-submit");
let todoList = document.querySelector(".todo-list");
let filterTodos = document.querySelector(".filter-todos");
let todoSave =[];

//Event Listeners
todoSubmit.addEventListener("click",addTodoHandler);
todoList.addEventListener("click",deleteCheckHandler);
filterTodos.addEventListener("click",() => {
    if(filterTodos.value)
        filterTodosHandler(filterTodos.value);
});
filterTodos.addEventListener("change",() => {
    if(filterTodos.value)
        filterTodosHandler(filterTodos.value);
});
document.addEventListener("DOMContentLoaded",getTodosHandler);

//Functions
function addTodoHandler(event){
    //prevent form from submitting
    event.preventDefault();
    let inputValue = todoInput.value;
    if (inputValue === '') {
        alert("You must write something!");
    }
    else{
        if(inputValue.includes('<')){
        inputValue=inputValue.replace(/</g,"< ");
        }
        addTodo(inputValue);
    }
}

function addTodo(inputValue){
    //Create todo div
    saveLocalTodos(inputValue,false);
    todoSave.push({text: inputValue, checked: false});
    const div = document.createElement("div");
    let li=document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
    li.innerHTML=`  
                    <span class="todo-item">${inputValue}</span>
                    <button class="todo-delete"><i class="fa fa-trash-o"></i></button>
                    <button class="todo-check"><i class="fa fa-check-circle"></i></button>
                `
    div.classList.add("todo");
    div.appendChild(li)
    todoList.appendChild(div);
    todoInput.value="";
}

function deleteCheckHandler(e){
    //getting clicked target 
    let item = e.target;
    //console.log(item); - whatever clicked(button,li)
    //whole <li>
    let todo=e.target.parentElement;
    let selectedTodo= todo.querySelector("span").innerText;
    let todosInStorage = checkLocalStorage();
    if(item.classList[0]==="todo-delete"){
        let todo = item.parentElement;
        todo.classList.add("removeTransition");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.parentElement.remove();
        });
    }
    if(item.classList[0]==="todo-check"){
        todosInStorage.forEach(todoInArray => {
            if(selectedTodo === todoInArray.text){
                    if(todo.classList[0]==="slash" && todoInArray.checked === true){ 
                    todo.classList.remove("slash");
                } else {
                todo.classList.add("slash");
                }
            }
                
        })
        todosInStorage.forEach(todoInArray => {
                if(selectedTodo === todoInArray.text){
                    todoInArray.checked = !todoInArray.checked;
                }
            clearLocalTodo(todoInArray.text);
            saveLocalTodos(todoInArray.text,todoInArray.checked);
        })
    }
}

function filterTodosHandler(optionValue){
    // //option value - all, completed
    // let optionValue = e.target.value;
    let todos = Array.from(document.querySelectorAll('.todo-list>div'));
    //console.log(todos) //div's array
    todos.forEach(todoss => {
        let todo = todoss.querySelector('li');
        //console.log(todo)
        //console.log(todo.classList)
        switch(optionValue){
            case 'all' : 
                todo.style.display = "flex";break;

            case 'completed' : 
                if (todo.classList.contains("slash")) {
                todo.style.display = "flex";
                } else {
                todo.style.display = "none";
                }break;

            case 'uncompleted' : 
                if (!todo.classList.contains("slash")) {
                todo.style.display = "flex";
                } else {
                todo.style.display = "none";
                }break;
        }
    })
}

function checkLocalStorage(){
    let todosInStorage;
    if(localStorage.getItem("todosInStorage") === null){
        todosInStorage = [];
    } else {
        todosInStorage = JSON.parse(localStorage.getItem("todosInStorage"));
        console.log(todosInStorage[0]);
    }
    return todosInStorage;
}

function saveLocalTodos(inputValue,checkedValue){
    let todoObj = {text: inputValue,checked: checkedValue};
    let todosInStorage = checkLocalStorage();
    todosInStorage.push(todoObj);
    localStorage.setItem("todosInStorage", JSON.stringify(todosInStorage));
}

function removeLocalTodos(todo){
    let todosInStorage = checkLocalStorage();
    // console.log(todo.children); -item,check,delete
    const todoIndex = todo.children[0].innerText;
    todosInStorage.forEach(todo => {
        if(todo.text === todoIndex)
            todosInStorage.splice(todosInStorage.indexOf(todo), 1);
    })
    localStorage.setItem("todosInStorage", JSON.stringify(todosInStorage));
}

function clearLocalTodo(todoText){
    let todosInStorage = checkLocalStorage();
    todosInStorage.forEach(todo => {
        if(todo.text === todoText)
            todosInStorage.splice(todosInStorage.indexOf(todo), 1);
    })
    localStorage.setItem("todosInStorage", JSON.stringify(todosInStorage));
}
function getTodosHandler(){
    let todosInStorage = checkLocalStorage();
    console.log(todosInStorage);
    todosInStorage.forEach(function(todo) {
        const div = document.createElement("div");
        let li=document.createElement("li");
        li.appendChild(document.createTextNode(todo.text));
        li.innerHTML=`  
                        <span class="todo-item">${todo.text}</span>
                        <button class="todo-delete"><i class="fa fa-trash-o"></i></button>
                        <button class="todo-check"><i class="fa fa-check-circle"></i></button>
                    `
        div.classList.add("todo");
        div.appendChild(li)
        todoList.appendChild(div);
    })
    checkComplete();
}
function checkComplete() {
    let todosInStorage = checkLocalStorage();
    todosInStorage.forEach(todoInArray => {
                let todos = Array.from(document.querySelectorAll('.todo-list>div'));
                //console.log(todos) //div's array
                todos.forEach(todoss => {
                let todo = todoss.querySelector('li');
                let todoText = todo.querySelector('span').innerText;
            if(todoText === todoInArray.text && todoInArray.checked === true){ 
                    todo.classList.add("slash");
                }}) 
    })
}