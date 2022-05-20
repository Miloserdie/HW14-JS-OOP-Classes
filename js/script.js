class TodoList {
	constructor(el) {
		this.todos = [];
		this.el = el;
		this.el.addEventListener('click', (event) => {
			if(event.target.classList.contains('set-status')) {
				this.changeStatus(event.target.closest('.list-item').dataset.id);
			} else if(event.target.classList.contains('delete-task')) {
				this.removeTodo(event.target.closest('.list-item').dataset.id);
			}
		});
	}
	addTodo(todo) {
		this.todos.unshift(todo);
		this.render(this.todos);
	}
	removeTodo(id) {
		this.todos = this.todos.filter((el) => {
			return el.id !== id;
		});
		todo1.render(this.todos);
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
		this.render(this.todos);
	}
	render(todos = []) {
		let lis = '';
		for (let el of todos) {
			if (!el) {
			return;
		}
		lis += `<li class="list-item ${el.status ? 'list-item-done' : ''}" data-id="${el.id}"><span>${el.value}</span><button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
	  	}
	  	this.el.innerHTML = lis;
	}
	findTasks(value) {
      this.render(
          this.todos.filter(item => item.value.includes(value))
      );
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