//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//FUNCTIONS

function addTodo(event){
     event.preventDefault();         //Prevent form from submitting

     if(todoInput.value === "") {
         console.log("The input is empty");
     }
     else {
     //todo DIV
     const todoDiv = document.createElement("div");
     todoDiv.classList.add("todo");
     //create LI
     const newTodo = document.createElement('li');
     newTodo.innerText = todoInput.value;
     newTodo.classList.add('todo-item');
     todoDiv.appendChild(newTodo);
     
     //Add todo to local storage
     saveLocalTodos(todoInput.value);
     //check mark button
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<img height="20" width="20" src="tick.png" id="check">';
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);

     //trash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<img height="20" width="20" src="recycle.png" id="trash">';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);

     //APPEND TO LIST
     todoList.appendChild(todoDiv);

     //Clear todo input value
     todoInput.value="";
     }
}

function deleteCheck(e){
     const item = e.target;
     //DELETE TODO
     if(item.classList[0] === 'trash-btn'){
          const todo = item.parentElement;
          //Animation
          todo.classList.add("fall");

          removeLocalTodos(todo);
          todo.addEventListener('transitionend' ,function(){
               todo.remove();
          })
     }

     //CHECK MARK
     if(item.classList[0] === "complete-btn"){
          const todo = item.parentElement;
          todo.classList.toggle("completed");
         markCompleted(todo);
     }
}

function filterTodo(e){
     const todos = todoList.childNodes;
     todos.forEach(function(todo){
          switch(e.target.value){
               case "all":
                    todo.style.display = "flex";
                    break;
               case "completed":
                    if(todo.classList.contains("completed")){
                         todo.style.display = "flex";
                    }
                    else{
                         todo.style.display = "none";
                    }
                    break;
               case "incomplete":
                    if(!todo.classList.contains("completed")){
                         todo.style.display = "flex";
                    }
                    else{
                         todo.style.display = "none";
                    }
          }
     });
}

function saveLocalTodos(todo){
     //Is it empty
     let todos;
     if(localStorage.getItem("todos")=== null){
          todos=[];
     }
     else{
          todos = JSON.parse(localStorage.getItem('todos'));
     }
     let data={
          todo:  todo,
          status:"incomplete"
     };
     todos.push(data);
     localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
     //Is it empty
     let todos;
     if(localStorage.getItem('todos')=== null){
          todos=[];
     }else{
          todos = JSON.parse(localStorage.getItem('todos'));
     }

     todos.forEach(function(todo){
     //todo DIV
     const todoDiv = document.createElement("div");
     todoDiv.classList.add("todo");
     //create LI
     const newTodo = document.createElement('li');
     newTodo.innerText = todo["todo"];
     newTodo.classList.add('todo-item');
     todoDiv.appendChild(newTodo);
    
     //check mark button
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<img height="20" width="20" src="tick.png" id="check">';
     completedButton.classList.add("complete-btn");
     todoDiv.appendChild(completedButton);

     //tash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<img height="20" width="20" src="recycle.png" id="trash">';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);

     //APPEND TO LIST
     todoList.appendChild(todoDiv);
     let status = todo.status;
     if(status === "completed"){
          todoDiv.classList.toggle("completed");
          console.log(status);
     }  
     })
}

function removeLocalTodos(todo){
      //Is it empty
      let todos;
      if(localStorage.getItem("todos")=== null){
           todos=[];
      }else{
           todos = JSON.parse(localStorage.getItem('todos'));
      }
     const todoIndex = todo.children[0].innerText;
     let index = todos.findIndex(obj=>obj.todo==todoIndex);
     todos.splice(index,1);
     localStorage.setItem('todos',JSON.stringify(todos));
}

function markCompleted(todo){
     let todos;
     if(localStorage.getItem('todos')=== null){
          todos=[];
     }else{
          todos = JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex = todo.children[0].innerText;
     let index = todos.findIndex(obj => obj.todo==todoIndex);
     if(todos[index].status === "incomplete"){
          todos[index].status="completed";
          localStorage.setItem('todos' , JSON.stringify(todos));
     }
     else{
          todos[index].status = "incomplete";
          localStorage.setItem('todos' , JSON.stringify(todos));
     }
}