
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
    return {

    };
})();

const ElementBuilder = (() => {
    function buildTodo(todoObj) {
        const container = document.createElement('div');

        const title = document.createElement('p');
        title.textContent = todoObj.title;
        title.classList.add('todo-desc', 'hidden')

        const descBtn = document.createElement('btn');

        const dueDate = document.createElement('p');
        dueDate.textContent = todoObj.dueDate;

        const priority = document.createElement('p');
        priority.textContent = todoObj.priority;

        const isDone = document.createElement('p');
        isDone.textContent = todoObj.isDone;

        const desc = document.createElement(p);
        desc.textContent = todoObj.description;


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

todo1 = Todo('a', 'a', 'date', 1, false)
todo2 = Todo('b', 'b', 'date', 2, true)
todo3 = Todo('c', 'c', 'date', 3, false)
proj1 = Project()
proj1.addTodo([todo1, todo2, todo3])