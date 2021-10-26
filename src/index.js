
const ToDo = (title, description, dueDate, priority, isDone) => {
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
    let _toDos = [];

    const addToDo = toDo => {
        _toDos.push(toDo);
    };

    const getToDos = () => _toDos;

    return {
        addToDo, getToDos
    };
};

const Display = (() => {
    return {

    };
})();

const ElementBuilder = (() => {
    function buildTodo(toDoObj) {
        const container = document.createElement('div');

        const title = document.createElement('p');
        title.textContent = toDoObj.title;
        title.classList.add('todo-desc', 'hidden')

        const descBtn = document.createElement('btn');

        const dueDate = document.createElement('p');
        dueDate.textContent = toDoObj.dueDate;

        const priority = document.createElement('p');
        priority.textContent = toDoObj.priority;

        const isDone = document.createElement('p');
        isDone.textContent = toDoObj.isDone;

        const desc = document.createElement(p);
        desc.textContent = toDoObj.description;


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

todo1 = ToDo('a', 'a', 'date', 1, false)
todo2 = ToDo('b', 'b', 'date', 2, true)
todo3 = ToDo('c', 'c', 'date', 3, false)
proj1 = Project()
proj1.addToDo([todo1, todo2, todo3])