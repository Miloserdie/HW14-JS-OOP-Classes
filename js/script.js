class TodoList {
	constructor(el) {
		this.todos = [];
		this.findTasksTodos = [];
		this.el = el;
		this.el.addEventListener('click', (event) => {
			if(event.target.classList.contains('set-status')) {
				event.target.closest('.list-item').classList.toggle('list-item-done');
				this.changeStatus(event.target.closest('.list-item').dataset.id);
			} else if(event.target.classList.contains('delete-task')) {
				this.removeTodo(event.target.closest('.list-item').dataset.id);
				todo1.render(todo1.getTodos());
			}
		});
	}
	addTodo(todo) {
		this.todos.unshift(todo);
	}
	removeTodo(id) {
		this.todos = this.todos.filter((el) => {
			return el.id !== id;
		});
	}
	getTodos() {
		return this.todos;
	}
	getfindTasksTodos() {
		return this.findTasksTodos;
	}
	changeStatus(id) {
		let index = this.todos.findIndex((el) => el.id === id);
		this.todos[index].status = !this.todos[index].status;
	}
	render(todos = []) {
		let lis = '';
		for (let el of todos) {
			if (!el) {
			return;
		}
		lis += `<li class="list-item" data-id="${el.id}"><span>${el.value}</span><button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
	  	}
	  	this.el.innerHTML = lis;
	}
	findTasks(value) {
		this.findTasksTodos = this.todos.filter((el) => {
			return el.value.includes(value);
		});
		todo1.render(todo1.getfindTasksTodos());
	}
}

class Task {
	constructor(value) {
		this.value = value;
		this.status = false;
		this.id = Math.random().toString(36).substring(2, 9);
	}
}

const form = document.querySelector('.form');
const list = document.querySelector('#list');
const taskText = document.querySelector('.task-text');
const todo1 = new TodoList(list);

form.addEventListener('click', (event) => {
	event.preventDefault();
	if(event.target.classList.contains('add-task')) {
		todo1.addTodo(new Task(taskText.value));
		todo1.render(todo1.getTodos());
		taskText.value = '';
		
	} else if(event.target.classList.contains('find-task')) {
		todo1.findTasks(taskText.value);
	}
})

todo1.addTodo(new Task('by milk'));
todo1.addTodo(new Task('clean room'));
todo1.addTodo(new Task('play pc'));
todo1.addTodo(new Task('set spawn'));
todo1.render(todo1.getTodos());