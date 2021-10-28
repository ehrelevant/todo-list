
const Todo = (title, description, dueDate, priority, isDone) => {
    const setPriority = (priority) => {
        rets.priority = priority
    }
    
    const switchDone = () => {
        rets.isDone = !rets.isDone
    }

    const rets = {
        title, description, dueDate, priority, isDone,
        setPriority,
        switchDone,
    };
    return rets;
};

const Project = () => {
    let _todos = [];

    const addTodo = todo => {
        _todos.push(todo);
    };

    const getTodos = () => _todos;

    return {
        addTodo, getTodos
    };
};

const Display = (() => {
    function showTodo(todo) {
        const todoList = document.querySelector('#todos_list');
        const todoObj = ElementBuilder.buildTodo(todo);
        todoList.appendChild(todoObj);
    }
    return {
        showTodo
    };
})();

const ElementBuilder = (() => {
    function buildTodo(todo) {
        const container = document.createElement('div');
        container.classList.add('todo')

        const title = document.createElement('p');
        title.textContent = todo.title;

        const descBtn = document.createElement('button');
        descBtn.textContent = 'Read More';

        const dueDate = document.createElement('p');
        dueDate.textContent = todo.dueDate;

        const priority = document.createElement('p');
        priority.textContent = todo.priority;

        const isDone = document.createElement('p');
        isDone.textContent = todo.isDone;

        const desc = document.createElement('div');
        desc.classList.add('todo-desc', 'hidden');
        const descText = document.createElement('p');
        descText.textContent = todo.description;
        desc.appendChild(descText);


        container.appendChild(title);
        container.appendChild(descBtn);
        container.appendChild(dueDate);
        container.appendChild(priority);
        container.appendChild(isDone);

        container.appendChild(desc);

        return container;
    };

    function buildProject(projectObj) {

    };

    return {
        buildTodo, buildProject
    }
})();

todo1 = Todo('a', 'a', 'date', 1, false, 'yes')
todo2 = Todo('b', 'b', 'date', 2, true, 'uhh')
todo3 = Todo('c', 'c', 'date', 3, false, 'story')
proj1 = Project()
proj1.addTodo([todo1, todo2, todo3])

Display.showTodo(todo1);
Display.showTodo(todo2);
Display.showTodo(todo3);