//Selectors
let todoInput = document.querySelector(".todo-input"); //alt + shift + down for multiple copies
let todoSubmit = document.querySelector(".todo-submit");
let todoList = document.querySelector(".todo-list");

//Event Listeners
todoSubmit.addEventListener("click",addTodo);

//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    let inputValue = todoInput.value;
    let li=document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
    todoList.appendChild(li)
    todoInput.value="";
}