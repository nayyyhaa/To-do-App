//Selectors
let todoInput = document.querySelector(".todo-input"); //alt + shift + down for multiple copies
let todoSubmit = document.querySelector(".todo-submit");
let todoList = document.querySelector(".todo-list");
let filterTodos = document.querySelector(".filter-todos")

//Event Listeners
todoSubmit.addEventListener("click",addTodoHandler);
todoList.addEventListener("click",deleteCheckHandler);
filterTodos.addEventListener("click",filterTodosHandler);
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
    saveLocalTodos(inputValue);
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
    if(item.classList[0]==="todo-delete"){
        let todo = item.parentElement;
        todo.classList.add("removeTransition");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
    if(item.classList[0]==="todo-check"){
        console.log(todo.classList[0])
        if(todo.classList[0]==="slash"){
            todo.classList.remove("slash");
        } else {
        todo.classList.add("slash");
        }
    }
}

function filterTodosHandler(e){
    //option value - all, completed
    let optionValue = e.target.value;
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
    }
    return todosInStorage;
}

function saveLocalTodos(inputValue){
    let todosInStorage = checkLocalStorage();
    todosInStorage.push(inputValue);
    localStorage.setItem("todosInStorage", JSON.stringify(todosInStorage));
}

function removeLocalTodos(todo){
    let todosInStorage = checkLocalStorage();
    // console.log(todo.children); -item,check,delete
    const todoIndex = todo.children[0].innerText;
    todosInStorage.splice(todoIndex, 1);
    localStorage.setItem("todosInStorage", JSON.stringify(todosInStorage));
}

function getTodosHandler(){
    let todosInStorage = checkLocalStorage();
    todosInStorage.forEach(function(todo) {
        const div = document.createElement("div");
        let li=document.createElement("li");
        li.appendChild(document.createTextNode(todo));
        li.innerHTML=`  
                        <span class="todo-item">${todo}</span>
                        <button class="todo-delete"><i class="fa fa-trash-o"></i></button>
                        <button class="todo-check"><i class="fa fa-check-circle"></i></button>
                    `
        div.classList.add("todo");
        div.appendChild(li)
        todoList.appendChild(div);
    })

}