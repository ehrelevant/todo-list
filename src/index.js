
const TodoFactory = (title, description, dueDate, priority) => {
    return {
        title, description,
        dueDate, priority
    };
};

const ProjectFactory = (todos = null) => {
    return {
        todos
    };
};

const DisplayController = (() => {
    return {

    };
})();