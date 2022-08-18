const register = document.querySelector('.register');
const register_text = register.querySelector('#register_text');
const list = document.querySelector('.list');

const TODOS_KEY = 'todos';

let todos = [];

//localStorage에 넣는 것
function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function insertTodo(newTodo) {
  console.log(todos);
  const li = document.createElement('li');
  const input = document.createElement('input');
  const span = document.createElement('span');
  input.id = newTodo.id;
  input.addEventListener('click', checkEnd);

  if (newTodo.check) {
    input.checked = true;
    li.classList.toggle('checked');
  }

  span.innerText = newTodo.text;
  input.type = 'checkbox';
  li.appendChild(input);
  li.appendChild(span);
  list.prepend(li);
}

function checkEnd(event) {
  var myInput = event.target;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == myInput.id) {
      todos[i].check = myInput.checked;
      myInput.parentNode.classList.toggle('checked');
      break;
    }
  }
  saveTodos();
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = register_text.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    check: false,
  };
  register_text.value = '';
  todos.push(newTodoObj);
  insertTodo(newTodoObj);
  saveTodos();
}

register.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  todos.forEach(insertTodo);
}