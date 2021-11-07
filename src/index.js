
let projs = [];
let selectedProj;

const Todo = (title, dueDate, priority, isDone, description) => {
    const setPriority = (priority) => {
        rets.priority = priority
    }

    const switchDone = () => {
        rets.isDone = !rets.isDone
    }

    const rets = {
        title, dueDate, priority, isDone, description,
        setPriority,
        switchDone,
    };
    return rets;
};

const Project = (title) => {
    let _todos = [];

    const addTodo = todo => {
        _todos.push(todo);
    };

    const getTodos = () => _todos;

    return {
        addTodo, getTodos, title
    };
};


const MainController = (() => {
    function newTodo_raw(proj) {
        todoList = proj.getTodos();

        const title = prompt('Task Title');
        const dueDate = prompt('Due Date');
        const priority = todoList.length + 1;
        const isDone = (prompt('Is it done yet?') === 'true');

        const desc = prompt('Description');

        const todo = Todo(title, dueDate, priority, isDone, desc);
        proj.addTodo(todo);
        Display.renderTodos(proj);
    }

    function newProject_raw() {
        const proj = Project();
        proj.title = prompt('Project Title');
        projs.push(proj);
        Display.renderProjects();
    }

    return {
        newTodo_raw, newProject_raw
    };
})();


const Display = (() => {
    const projList = document.querySelector('#project_list');
    const todoList = document.querySelector('#todos_list');

    function _displayTodo(todo) {
        const todoObj = ElementBuilder.buildTodo(todo);
        todoList.appendChild(todoObj);
    }

    function renderTodos(proj) {
        todoList.textContent = '';
        proj.getTodos().forEach(todo => {
            _displayTodo(todo)
        });
    }

    function _displayProjects(proj) {
        const projObj = ElementBuilder.buildProject(proj);
        projList.appendChild(projObj);
    }

    function renderProjects() {
        projList.textContent = '';
        projs.forEach(proj => {
            _displayProjects(proj)
        });
    }

    return {
        renderProjects, renderTodos
    };
})();

const ElementBuilder = (() => {
    function buildTodo(todo) {
        const container = document.createElement('div');
        container.classList.add('todo');

        const title = document.createElement('p');
        title.textContent = todo.title;

        const dueDate = document.createElement('p');
        dueDate.textContent = todo.dueDate;

        const priority = document.createElement('p');
        priority.textContent = todo.priority;

        const isDone = document.createElement('input');
        isDone.type = 'checkbox';
        isDone.checked = todo.isDone;

        const descBtn = document.createElement('button');
        descBtn.textContent = 'Expand';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        const desc = document.createElement('div');
        desc.classList.add('todo-desc', 'hidden');
        const descText = document.createElement('p');
        descText.textContent = todo.description;
        desc.appendChild(descText);


        descBtn.addEventListener('click', () => {
            desc.classList.toggle('hidden');
        });

        container.appendChild(title);
        container.appendChild(dueDate);
        container.appendChild(priority);
        container.appendChild(isDone);
        container.appendChild(descBtn);
        container.appendChild(editBtn);
        container.appendChild(deleteBtn);

        container.appendChild(desc);

        return container;
    };

    function buildProject(proj) {
        const container = document.createElement('div');
        container.classList.add('proj');

        const projBtn = document.createElement('button');
        projBtn.addEventListener('click', () => {
            selectedProj = proj;
            Display.renderTodos(proj);
        });
        projBtn.textContent = proj.title;

        container.appendChild(projBtn)

        return container;
    }

    return {
        buildTodo, buildProject
    };
})();


const todoBtn = document.querySelector('#new_todo');
todoBtn.addEventListener('click', () => MainController.newTodo_raw(selectedProj));

const projBtn = document.querySelector('#new_project');
projBtn.addEventListener('click', MainController.newProject_raw);

const projForm = document.forms['projForm'];
const todoForm = document.forms['todoForm'];