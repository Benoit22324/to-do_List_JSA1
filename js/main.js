// Default Variable
let tasks = [
    {
        id: 1,
        title: "Apprendre mon cours de JavaScript",
        priority: 1
    },
    {
        id: 2,
        title: "Créer mon compte Github",
        priority: 2
    },
    {
        id: 3,
        title: "Répondre à mes emails",
        priority: 3
    }
];
let idIncrement = 4;

// Page loaded Event
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const tasks_list = document.getElementById('tasks_list');
    const task_form = document.getElementById('add_new_task');
    const delete_btn = document.getElementById('delete_checked_btn');
    const notification_area = document.getElementById('notification_area');

    // Initialisation
    updateList(tasks_list)

    // Form Event
    task_form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formTitle = e.target[1].value;
        const formPriority = e.target[2].value;

        if (formTitle.length > 0) {
            addTask(formTitle, formPriority, tasks_list);
            e.target[1].value = "";
            notification_area.innerHTML = "";
        }
        else notification_area.innerHTML = "<p class='error'>Veuillez saisir le nom de la tâche</p>";
    })

    // Delete Button Event
    delete_btn.addEventListener('click', () => {
        const taskCheckbox = document.getElementsByClassName('task_checkbox');
        let taskDeleted = 0;

        for (let element of taskCheckbox) {
            if (element.checked) {
                let newList = tasks.filter(task => task.id !== parseFloat(element.id));
                tasks = newList;
                taskDeleted++;
            }
        }
        if (taskDeleted > 0) notification_area.innerHTML = `<p class='success'>${taskDeleted} tâches supprimées avec succès !</p>`;

        updateList(tasks_list)
    })
})

// Add Task Function
const addTask = (title, priority, where) => {
    const newTask = {
        id: idIncrement, 
        title: title, 
        priority: priority
    }
    tasks.push(newTask)
    idIncrement++;
    updateList(where)
}

// Update Task List
const updateList = (where) => {
    where.innerHTML = "";

    if (tasks.length > 0) {
        tasks.sort((a, b) => a.priority - b.priority)
        
        for (let task of tasks) {
            const newTask = `<li><label class='priority${task.priority}'><input id=${task.id} class='task_checkbox' type='checkbox'>${task.title}</label></li>`;
            where.innerHTML += newTask;
        }
    }
    else {
        where.innerHTML = "<li>Il n'y a pas de tâches</li>";
    }
}