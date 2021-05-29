let addMessage = document.querySelector('.message'), //получаем input
    addButton = document.querySelector('.add');
    todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo')); //получает данные из локального хранилища и преобразовывает в массив
    displayMessages(); //выводит данные на страницу из локального хранилища 
}

// обработчик событий
addButton.addEventListener('click', function(){  
    if(!addMessage.value) return;
    let newTodo = {
       todo: addMessage.value,
       checked: false,
       important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo',JSON.stringify(todoList)); //сохраняет данные в локальное хранилище
    addMessage.value = '';
});

// ввод данных по нажатию enter
function createOnEnter(e) {
    if (e.keyCode == 13)
        document.getElementById('enter').click();
}
window.addEventListener("keyup", createOnEnter);

function displayMessages(){
    let displayMessage = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : 2}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage; 
    });
}

todo.addEventListener('change', function(event){
    let idInput = (event.target.getAttribute('id'));
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item){
        if (item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
   
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey){
                todoList.splice(i, 1);
            }else{
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});


// когда прокручивается 20px от начала страницы, появляется кнопка "Вверх"
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollBtn").style.display = "block";
    } else {
        document.getElementById("scrollBtn").style.display = "none";
    }
}

// клик по кнопке прокручивает в начало страницы
function topFunction() {
    document.documentElement.scrollTop = 0; 
}
