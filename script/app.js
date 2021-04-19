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
        if(inputValue.includes('<ul>')){
        inputValue=inputValue.replace(/<ul>/g,"< ul >");
        }
        addTodo(inputValue);
    }
}

function addTodo(inputValue){
    let div=document.createElement("div");
    let li=document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
    li.innerHTML=`  
                    <span class="todo-item">${inputValue}</span>
                    <button class="todo-delete"><i class="fa fa-trash-o"></i></button>
                    <button class="todo-check"><i class="fa fa-check-circle"></i></button>
                `
    div.appendChild(li);
    div.classList.add("todo");
    todoList.appendChild(div);
    todoInput.value="";
}

function deleteCheckHandler(e){
    //getting clicked target 
    let item = e.target; 
    if(item.classList[0]==="todo-delete"){
        //whole <li>
        let todo=e.target.parentElement;
        todo.remove();
    }
    if(item.classList[0]==="todo-check"){
        //whole <li>
        let todo=e.target.parentElement;
        todo.classList.add("slash");
    }

}