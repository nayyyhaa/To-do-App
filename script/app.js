//Selectors
let todoInput = document.querySelector(".todo-input"); //alt + shift + down for multiple copies
let todoSubmit = document.querySelector(".todo-submit");
let todoList = document.querySelector(".todo-list");

//Event Listeners
todoSubmit.addEventListener("click",addTodoHandler);
todoList.addEventListener("click",deleteCheckHandler);

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
    let li=document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
    li.innerHTML=`  
                    <span class="todo-item">${inputValue}</span>
                    <button class="todo-delete"><i class="fa fa-trash-o"></i></button>
                    <button class="todo-check"><i class="fa fa-check-circle"></i></button>
                `
    todoList.appendChild(li);
    todoInput.value="";
}

function deleteCheckHandler(e){
    //getting clicked target 
    let item = e.target;
    //console.log(item); - whatever clicked(button,div)
    //whole <li>
    let todo=e.target.parentElement;
    if(item.classList[0]==="todo-delete"){
        let todo = item.parentElement;
        todo.classList.add("removeTransition");
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