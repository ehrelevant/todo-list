
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

    function newTodo(proj, title, date, isDone, desc) {
        todoList = proj.getTodos();
        const priority = todoList.length + 1;
        const todo = Todo(title, date, priority, isDone, desc);

        proj.addTodo(todo);
        Display.renderTodos(proj);
    }

    function newProject(title) {
        const proj = Project();
        proj.title = title;
        selectedProj = proj;
        projs.push(proj);
        Display.renderProjects();
    }

    return {
        newTodo, newProject
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

        const isDone = document.createElement('input');
        isDone.classList.add('checkbox')
        isDone.type = 'checkbox';
        isDone.checked = todo.isDone;

        const title = document.createElement('p');
        title.classList.add('todo-title');
        title.textContent = todo.title;

        const dueDate = document.createElement('p');
        dueDate.classList.add('todo-date');
        dueDate.textContent = todo.dueDate;

        const priority = document.createElement('p');
        priority.classList.add('todo-priority');
        priority.textContent = todo.priority;

        const descBtn = document.createElement('button');
        descBtn.textContent = 'Expand';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        const desc = document.createElement('div');
        desc.classList.add('todo-desc', 'hidden');
        const descText = document.createElement('p');
        descText.textContent = (todo.description) ? todo.description : 'No Description...';

        desc.appendChild(descText);

        isDone.addEventListener('change', todo.switchDone);
        descBtn.addEventListener('click', () => {
            desc.classList.toggle('hidden');
        });

        container.appendChild(isDone);
        container.appendChild(title);
        container.appendChild(dueDate);
        container.appendChild(priority);
        container.appendChild(descBtn);
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
        projBtn.classList.add('proj-btn')

        container.appendChild(projBtn)

        return container;
    }

    return {
        buildTodo, buildProject
    };
})();


const todoFormContainer = document.querySelector('#todo_form_container');
const todoForm = document.forms.todoForm;
const todoOpenBtn = document.querySelector('#new_todo');
todoOpenBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('form-open');
    todoOpenBtn.classList.add('form-open');
});

todoForm.addEventListener('reset', () => {
    todoFormContainer.classList.remove('form-open');
    todoOpenBtn.classList.remove('form-open');
});

todoForm.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        todoFormContainer.classList.remove('form-open');
        todoOpenBtn.classList.remove('form-open');
        todoForm.reset();
    }
});

todoForm.addEventListener('submit', () => {
    todoFormContainer.classList.remove('form-open');
    todoOpenBtn.classList.remove('form-open');

    MainController.newTodo(selectedProj,
                           todoForm['title'].value,
                           todoForm['date'].value,
                           todoForm['done'].checked,
                           todoForm['desc'].value,
                           );

    todoForm.reset();
});



const projFormContainer = document.querySelector('#proj_form_container');
const projForm = document.forms.projForm;
const projOpenBtn = document.querySelector('#new_project');
projOpenBtn.addEventListener('click', () => {
    projFormContainer.classList.add('form-open');
    projOpenBtn.classList.add('form-open');
});

projForm.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        projFormContainer.classList.remove('form-open');
        projOpenBtn.classList.remove('form-open');
        projForm.reset();
    }
});

projForm.addEventListener('submit', () => {
    projFormContainer.classList.remove('form-open');
    projOpenBtn.classList.remove('form-open');

    MainController.newProject(projForm['title'].value);

    projForm.reset();
});



MainController.newProject('Default');