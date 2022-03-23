
export default class TodoList {

    constructor(todoList, todosLeft) {
        this.todoList = todoList;
        this.todosLeft = todosLeft;
    }

    createTodo(todo) {
        const li = document.createElement('li');
        li.classList.add('todo__item');
        li.innerHTML = ` 
    <div class="todo__bullet"><img src="./images/icon-check.svg" alt=""></div>
    <span class="todo__text">${todo}</span>
    <img src="./images/icon-cross.svg" alt="" class="todo__delete">`;

        this.todoList.append(li);
    }

    deleteTodo(todo) {
        todo.remove();
    }

    completeTodo(todo) {
        todo.classList.toggle('todo__item--completed');
    }

    clearCompletedTodos() {
        for (let i = this.todoList.children.length - 1; i >= 0; --i) {
            if (this.todoList.children[i].classList.contains('todo__item--completed')) {
                this.todoList.children[i].remove();
            }
        }
    }

    getActiveTodos(todo) {
        todo.style.display = 'none';
    }

    filterTodos(func) {
        for (let i = this.todoList.children.length - 1; i >= 0; --i) {
            if (this.todoList.children[i].classList.contains('todo__item--completed')) {
                func(this.todoList.children[i]);
            } else {
                this.todoList.children[i].style.display = 'flex';
            }
        }
    }

    getAllTodos(todo) {
        todo.style.display = 'flex';
    }

    getCompletedTodos() {
        for (let i = this.todoList.children.length - 1; i >= 0; --i) {
            if (!this.todoList.children[i].classList.contains('todo__item--completed')) {
                this.todoList.children[i].style.display = 'none';
            } else {
                this.todoList.children[i].style.display = 'flex';
            }
        }
    }

    todosCount() {
        return this.todoList.children.length;
    }

    updateCount() {
        this.todosLeft.textContent = `${this.todosCount()} items left`;
    }

    todoIsEmpty(todo) {
        return todo.trim() === '';
    }
}