
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


todo1 = ToDo('a', 'a', 'date', 1, false)
todo2 = ToDo('b', 'b', 'date', 2, true)
todo3 = ToDo('c', 'c', 'date', 3, false)
proj1 = Project()
proj1.addToDo([todo1, todo2, todo3])