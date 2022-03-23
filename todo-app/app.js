import TodoList from "./TodoList.js";

const body = document.body;
const theme = document.querySelector('.todo__theme');
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__create-todo');
const states = document.querySelector('.todo__states');
const todosLeft = document.querySelector('.todo__todos-left');
const clearCompletedTodos = document.querySelector('.todo__clear');
const todoApp = document.querySelector('.todo');

const todos = new TodoList(todoList, todosLeft);

// // Set theme from local storage if exists 
document.addEventListener('DOMContentLoaded', () => getTheme());

theme.addEventListener('click', () => {
    if (body.dataset.theme === 'light') {
        body.dataset.theme = 'dark';
    } else {
        body.dataset.theme = 'light';
    }

    saveTheme(body.dataset.theme);
});

// Load theme from local storage
function getTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === null) return;
    body.dataset.theme = theme;
}

// Save theme to local storage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Update 'items left' by observing for changes in todo list
const observer = new MutationObserver(() => {
    todos.updateCount();
});

observer.observe(todoList, { childList: true });

todoList.addEventListener('click', e => {
    const target = e.target;

    if (target.classList.contains('todo__bullet')) {
        todos.completeTodo(target.parentElement);
    }

    if (target.classList.contains('todo__delete')) {
        todos.deleteTodo(target.parentElement);
    }
});

todoInput.addEventListener('keyup', e => {
    // On enter create new todo
    if (e.keyCode === 13) {
        if (!todos.todoIsEmpty(e.target.value)) {
            todos.createTodo(e.target.value)
            e.target.value = '';
        };
    }
});

states.addEventListener('click', e => {
    const target = e.target;
    const statesChildren = states.children;

    for (let i = 0; i < statesChildren.length; i++) {
        if (target.classList.contains(statesChildren[i].classList[0]) && !statesChildren[i].classList.contains('todo--selected')) {
            statesChildren[i].classList.add('todo--selected');
        } else {
            statesChildren[i].classList.remove('todo--selected');
        }
    }

    // Display all todos
    if (statesChildren[0].classList.contains('todo--selected')) {
        todos.filterTodos(todos.getAllTodos);
    }

    // Display active todos
    if (statesChildren[1].classList.contains('todo--selected')) {
        todos.filterTodos(todos.getActiveTodos);
    }

    // Display completed todos
    if (statesChildren[2].classList.contains('todo--selected')) {
        todos.getCompletedTodos();
    }
});

// Delete completed todos
clearCompletedTodos.addEventListener('click', () => {
    todos.clearCompletedTodos();
});