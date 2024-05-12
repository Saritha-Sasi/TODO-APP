const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const mainContainer = document.getElementById('main-container');
const todoListLink = document.getElementById('todo-list-link');
const todoListContainer = document.getElementById('todo-list');
 
function handleLogin(event) {
  event.preventDefault(); // Prevent default form submission
 
  const username = usernameInput.value;
  const password = passwordInput.value;
 
  if (username === 'admin' && password === '12345') {
    // Login successful
    loginForm.style.display = 'none';
    mainContainer.style.display = 'block';
  } else {
    alert('Invalid username or password');
  }
}
 
function handleLogout() {
  // Simulate logout (redirect to login)
  loginForm.style.display = 'block';
  mainContainer.style.display = 'none';
}
 
function fetchTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json());
}
 
function createTodoList(todos) {
  let completedCount = 0;
 
  const todoList = document.createElement('ul');
 
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      completedCount += checkbox.checked ? 1 : -1;
      checkCompletedTodos(completedCount);
    });
 
    todoItem.appendChild(checkbox);
    todoItem.appendChild(document.createTextNode(todo.title));
    todoList.appendChild(todoItem);
  });
 
  todoListContainer.appendChild(todoList);
}
 
const completedTodosPromise = new Promise((resolve, reject) => {
  // Resolve the promise when 5 todos are marked completed
  checkCompletedTodos = (count) => {
    if (count === 5) {
      resolve('5 Tasks Completed');
    }
  };
});
 
completedTodosPromise.then(message => {
  alert(message);
});
 
todoListLink.addEventListener('click', () => {
  fetchTodos()
    .then(todos => {
      todoListContainer.innerHTML = ''; // Clear previous list
      createTodoList(todos);
    })
    .catch(error => console.error(error));
});
 
loginForm.addEventListener('submit', handleLogin);
 
document.getElementById('logout-link').addEventListener('click', handleLogout);