import {format, compareAsc, isToday, isThisWeek, isThisMonth} from 'date-fns'

let projs = [];
let selectedProj;

const Todo = (title, dueDate, priority, isDone, description) => {
    const switchDone = () => {
        rets.isDone = !rets.isDone
    }

    const rets = {
        title, dueDate, priority, isDone, description,
        switchDone,
    };
    return rets;
};

const Project = (title) => {
    let _todos = [];

    const addTodo = todo => {
        _todos.push(todo);
        sortByDate();
    };

    const updateTodos = todos => {
        _todos = [];
        _todos.push(...todos);
        sortByDate();
    };

    const sortByDate = () => {
        _todos.sort((a, b) => {
            const aDate = a.dueDate;
            const bDate = b.dueDate;
            if(!aDate && !bDate){
                return (aDate > bDate) ? aDate : bDate;
            } else if(!aDate){
                return 1;
            } else if(!bDate){
                return -1;
            } else {
                return compareAsc(new Date(aDate), new Date(bDate));
            }
        });
    };

    const getTodos = () => _todos;

    const deleteTodo = (todo) => {
        _todos.splice(_todos.indexOf(todo), 1);
    };

    return {
        addTodo, updateTodos, getTodos, title, deleteTodo
    };
};


const MainController = (() => {
    function newTodo(proj, title, date, priority, isDone, desc) {
        const todo = Todo(title, date, priority, isDone, desc);
        proj.addTodo(todo);

        Display.renderTodosPanel(proj);
    }

    function newProject(title) {
        const proj = Project(title);
        selectedProj = proj;
        projs.push(proj);

        Display.renderProjectPanel();
    }

    return {
        newProject, newTodo
    };
})();


const Display = (() => {
    const projList = document.querySelector('#project_list');
    const todoList = document.querySelector('#todo_list');

    function _displayTodo(todo) {
        const todoObj = ElementBuilder.buildTodo(todo);
        todoList.appendChild(todoObj);
    }

    function renderTodosPanel(proj) {
        todoList.textContent = '';
        proj.getTodos().forEach(todo => {
            _displayTodo(todo)
        });
    }

    function _displayProject(proj) {
        const projObj = ElementBuilder.buildProject(proj);
        projList.appendChild(projObj);
    }

    function renderProjectPanel() {
        projList.textContent = '';
        projs.forEach(proj => {
            _displayProject(proj)
        });
    }

    return {
        renderProjectPanel, renderTodosPanel
    };
})();


const ElementBuilder = (() => {
    function buildTodo(todo) {
        const doneCbox = _newInput('checkbox', todo.isDone, ['checkbox']);

        const title = _newElement('p', undefined, undefined, todo.title);
        const titleInput = _newInput('text', todo.title, ['todo-form-text', 'hidden']);
        titleInput.required;

        const dueDate = _newElement('p', undefined, undefined, (todo.dueDate) ? format(new Date(todo.dueDate), "PPPP") : 'No Info');
        const dueDateInput = _newInput('date', todo.dueDate, ['todo-form-text', 'hidden']);


        const priority = _newElement('p', undefined, undefined, (todo.priority) ? todo.priority : 'No Info');

        const selectLow = _newElement('option', undefined, undefined, 'Low');
        selectLow.value = 'Low';
        const selectMed = _newElement('option', undefined, undefined, 'Medium');
        selectMed.value = 'Medium';
        const selectHigh = _newElement('option', undefined, undefined, 'High');
        selectHigh.value = 'High';
        const priorityInput = _newElement('select', ['todo-form-text', 'hidden'], [selectLow, selectMed, selectHigh]);


        const descIcon = _newIcon('caret-down');
        const descBtn = _newElement('button', ['todo-btn'], [descIcon]);

        const delIcon = _newIcon('trash-alt');
        const delBtn = _newElement('button', ['todo-btn'], [delIcon]);


        const descText = _newElement('p', undefined, undefined, (todo.description) ? todo.description : 'No Info');
        const descInput = _newElement('textarea', ['todo-form-desc-area', 'hidden'], undefined, todo.description);

        const todoDesc = _newElement('div', ['todo-desc', 'hidden'], [descText, descInput]);


        // Todo Eventlisteners
        _addEditEvent(title, titleInput, todo, 'title')
        _addEditEvent(dueDate, dueDateInput, todo, 'dueDate')
        _addEditEvent(priority, priorityInput, todo, 'priority')
        _addEditEvent(descText, descInput, todo, 'description')


        doneCbox.addEventListener('change', todo.switchDone);

        delBtn.addEventListener('click', () => {
            selectedProj.deleteTodo(todo);
            Display.renderTodosPanel(selectedProj);
        });
        descBtn.addEventListener('click', () => {
            todoDesc.classList.toggle('hidden');
        });


        const todoContent = _newElement('div',
                ['todo-content'], [doneCbox,
                title, titleInput,
                dueDate, dueDateInput,
                priority, priorityInput,
                descBtn, delBtn]);

        const container = _newElement('div', ['todo'], [todoContent, todoDesc]);
        container.addEventListener('focusout', () => {
            title.classList.remove('hidden');
            titleInput.classList.add('hidden');

            dueDate.classList.remove('hidden');
            dueDateInput.classList.add('hidden');

            priority.classList.remove('hidden');
            priorityInput.classList.add('hidden')

            descText.classList.remove('hidden');
            descInput.classList.add('hidden');
        });

        return container;
    }

    function _addEditEvent(element, input, proj, todo, todoName) {
        element.addEventListener('dblclick', () => {
            element.classList.add('hidden');
            input.classList.remove('hidden');
            input.focus();
        });
        input.addEventListener('change', () => {
            todo[todoName] = input.value;
            if(todoName === 'dueDate') {
                element.textContent = (input.value) ? format(new Date(input.value), "PPPP") : 'No Info';
            } else {
                element.textContent = (input.value) ? input.value : 'No Info';
            }

            selectedProj.sortByDate();

            element.classList.remove('hidden');
            input.classList.add('hidden');
        });
    }

    function buildProject(proj) {
        const selBtn = _newElement('button', ['proj-btn', 'sel-btn'], undefined, proj.title);
        const selInput = _newInput('text', proj.title, ['proj-form-text', 'hidden']);
        selInput.required;

        const editIcon = _newIcon('edit');
        const editBtn = _newElement('button', ['proj-btn', 'edit-btn'], [editIcon])

        const delIcon = _newIcon('trash-alt');
        const delBtn = _newElement('button', ['proj-btn', 'del-btn'], [delIcon])

        editBtn.addEventListener('click', () => {
            selBtn.classList.add('hidden');
            selInput.classList.remove('hidden');
            selInput.focus();
        });

        selBtn.addEventListener('click', () => {
            selectedProj = proj;
            todoOpenBtn.classList.remove('hidden');
            Display.renderTodosPanel(proj);
        });

        selInput.addEventListener('change', () => {
            proj.title = selInput.value;
            selBtn.textContent = selInput.value;

            selBtn.classList.remove('hidden');
            selInput.classList.add('hidden');
        });

        selInput.addEventListener('focusout', () => {
            selBtn.classList.remove('hidden');
            selInput.classList.add('hidden');
        });

        selInput.addEventListener('keydown', (evt) => {
            if(evt.key === 'Escape') {
                selBtn.classList.remove('hidden');
                selInput.classList.add('hidden');
            }
        });

        delBtn.addEventListener('click', () => {
            console.log(projs);
            projs.splice(projs.indexOf(selectedProj), 1);
            selectedProj=null;
            Display.renderProjectPanel();
        });


        const container = _newElement('div', ['proj'], [selBtn, selInput, editBtn, delBtn]);

        return container;
    }

    function _newElement(tag, classes=null, children=null, text=null) {
        const element = document.createElement(tag);

        if(classes) {
            element.classList.add(...classes);
        }
        if(children) {
            _appendChildren(element, children);
        }
        if(text) {
            element.textContent = text;
        }

        return element;
    }

    function _newInput(type, value=null, classes=null, children=null) {
        const element = document.createElement('input');
        element.type = type;

        if(value) {
            if(type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
        if(classes) {
            element.classList.add(...classes);
        }
        if(children) {
            _appendChildren(element, children);
        }

        return element;
    }

    function _newIcon(iconName) {
        const icon = document.createElement('i');
        icon.classList.add('fas', `fa-${iconName}`);

        return icon;
    }

    function _appendChildren(parent, children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
    }

    return {
        buildTodo, buildProject
    };
})();


const todoForm = document.forms.todoForm;
const todoOpenBtn = document.querySelector('#new_todo');

const projForm = document.forms.projForm;
const projOpenBtn = document.querySelector('#new_proj');

projOpenBtn.addEventListener('click', () => {
    projOpenBtn.classList.add('hidden');
    projForm.parentNode.classList.remove('hidden');
    projForm.children[0].focus();
});

projForm.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
        projOpenBtn.classList.remove('hidden');
        projForm.parentNode.classList.add('hidden');
        projForm.reset();
    }
});

projForm.addEventListener('submit', () => {
    projOpenBtn.classList.remove('hidden');
    projForm.parentNode.classList.add('hidden');

    MainController.newProject(projForm['title'].value);

    projForm.reset();
});


todoOpenBtn.addEventListener('click', () => {
    todoOpenBtn.classList.add('hidden');
    todoForm.parentNode.classList.remove('hidden');
});

todoForm.addEventListener('reset', () => {
    todoOpenBtn.classList.remove('hidden');
    todoForm.parentNode.classList.add('hidden');
});

todoForm.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
        todoOpenBtn.classList.remove('hidden');
        todoForm.parentNode.classList.add('hidden');
    }
});

todoForm.addEventListener('submit', () => {
    todoOpenBtn.classList.remove('hidden');
    todoForm.parentNode.classList.add('hidden');

    MainController.newTodo(selectedProj,
                           todoForm['title'].value,
                           todoForm['date'].value,
                           todoForm['priority'].value,
                           todoForm['done'].checked,
                           todoForm['desc'].value,
                           );

    todoForm.reset();
});




const allProj = Project(undefined);
const dayProj = Project(undefined);
const weekProj = Project(undefined);
const monthProj = Project(undefined);


const projAllBtn = document.querySelector('#proj_all');
projAllBtn.addEventListener('click', () => {
    todoOpenBtn.classList.add('hidden');

    allProj.updateTodos(projs.reduce((allTodos, proj) => {
        return allTodos.concat(proj.getTodos())
    }, []));
    Display.renderTodosPanel(allProj)
});

const projDayBtn = document.querySelector('#proj_day');
projDayBtn.addEventListener('click', () => {
    todoOpenBtn.classList.add('hidden');

    dayProj.updateTodos(projs.reduce((allTodos, proj) => {
        return allTodos.concat(proj.getTodos());
    }, []).filter(todo => {
        return isToday(new Date(todo.dueDate))
    }));
    Display.renderTodosPanel(dayProj)
});

const projWeekBtn = document.querySelector('#proj_week');
projWeekBtn.addEventListener('click', () => {
    todoOpenBtn.classList.add('hidden');

    weekProj.updateTodos(projs.reduce((allTodos, proj) => {
        return allTodos.concat(proj.getTodos());
    }, []).filter(todo => {
        return isThisWeek(new Date(todo.dueDate))
    }));
    Display.renderTodosPanel(weekProj)
});

const projMonthBtn = document.querySelector('#proj_month');
projMonthBtn.addEventListener('click', () => {
    todoOpenBtn.classList.add('hidden');

    monthProj.updateTodos(projs.reduce((allTodos, proj) => {
        return allTodos.concat(proj.getTodos());
    }, []).filter(todo => {
        return isThisMonth(new Date(todo.dueDate))
    }));
    Display.renderTodosPanel(monthProj)
});









MainController.newProject('Proj 1');
MainController.newProject('Proj 2');
MainController.newProject('Proj 3');
MainController.newTodo(selectedProj, 'Todo 1', undefined, 'High', true, 'Hello World!');
MainController.newTodo(selectedProj, 'Todo 2', undefined, 'High', true, 'Hello World!');
MainController.newTodo(selectedProj, 'Todo 3', undefined, 'High', false, 'Hello World!');