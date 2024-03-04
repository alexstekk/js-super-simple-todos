const list = document.getElementById('todos');
document.querySelector('button').addEventListener('click', handleClick);
document.addEventListener('DOMContentLoaded', loadTodos);
document.querySelector('input').addEventListener('keypress', handleEnter);
document.querySelector('#clear').addEventListener('click', handleClear);

function handleEnter(e) {
	if (e.key === 'Enter') {
		createTodo(this.value);
		saveToStorage(this.value);
		this.value = '';
	}
}

function handleClick() {
	const newTodo = this.previousElementSibling.value.trim();

	if (newTodo) {
		createTodo(newTodo);
		saveToStorage(newTodo);
		this.previousElementSibling.value = '';
	} else {
		alert('input field is empty ');
	}
}

function saveToStorage(todo) {
	const todos = JSON.parse(localStorage.getItem('tasks')) || [];

	localStorage.setItem('tasks', JSON.stringify([...todos, todo]));
}

function loadTodos() {
	const todos = JSON.parse(localStorage.getItem('tasks'));

	if (todos) {
		todos.forEach((todo) => createTodo(todo));
	}
}

function createTodo(text) {
	const li = document.createElement('li');
	li.innerText = text;
	li.className = 'todo-item';
	li.addEventListener('click', removeTodo);
	list.appendChild(li);
}

function removeTodo() {
	removeTaskFromLocalStorage(this.innerText);
	this.removeEventListener('click', removeTodo);
	this.remove();
}

function removeTaskFromLocalStorage(task) {
	let todos = JSON.parse(localStorage.getItem('tasks')) || [];
	const todoIndex = todos.findIndex((todo) => todo === task);
	todos = todos.slice(0, todoIndex).concat(todos.slice(todoIndex + 1));
	localStorage.setItem('tasks', JSON.stringify(todos));
}

function handleClear() {
	document.querySelectorAll('.todo-item').forEach((todo) => todo.remove());
	localStorage.removeItem('tasks');
}
