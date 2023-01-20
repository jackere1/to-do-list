const form = document.getElementById('form');

var taskList = [];
form.addEventListener('submit', ev => {
    ev.preventDefault();

    const input = document.getElementById('input');
    if (input.value == "") return;
    
    const tasks = document.getElementById('tasks');
    tasks.parentElement.style.display = 'block';

    const container = document.createElement('div');
    container.setAttribute('class', 'bg-secondary rounded px-3 pt-3 d-flex gap-2 w-100');
    const p = document.createElement('p');
    p.className = 'text-dark bg-light w-100 rounded pt-2 ps-4';
    p.innerText = input.value;

    const button = document.createElement('button');
    button.className = 'btn btn-info h-25 mt-1';
    button.innerText = 'done';
    button.onclick = e => {
        e.target.parentElement.className += ' bg-success'
        let doneDate = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
        e.target.parentElement.lastChild.innerHTML = doneDate.slice(0, 10) + '<br>' + doneDate.slice(10);
        e.target.innerText = 'remove';
        e.target.onclick = ev => {
            ev.target.parentElement.remove();
            let text = ev.target.parentElement.firstChild.innerText;
            taskList = taskList.filter(elm => {
                if (elm.text === text)
                    return false;

                return true;
            })
            if (!tasks.hasChildNodes())
                tasks.parentElement.style.display = 'none';
            document.getElementById('taskTitle').className = 'text-center'
            document.getElementById('saveBtn').className = 'btn btn-warning text-nowrap px-4';
            document.getElementById('saveBtn').removeAttribute('disabled')
        }
    }

    const date = document.createElement('p');
    date.className = 'text-nowrap';

    // let dateStr = new Date().toUTCString();
    let dateStr = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
    date.innerHTML = dateStr.slice(0, 10) + '<br>' + dateStr.slice(10);
    

    container.append(p, button, date);
    tasks.appendChild(container);
    taskList.push({ text: p.innerText, date: date.innerText});
    document.getElementById('taskTitle').className = 'text-center'
    document.getElementById('saveBtn').className = 'btn btn-warning text-nowrap px-4'
    document.getElementById('saveBtn').toggleAttribute('disabled', false);
    input.value = "";   
})

document.getElementById('saveBtn').addEventListener('click', ev => {
    window.localStorage.setItem('taskItems#4commit', JSON.stringify(taskList));
    const lastSaved = document.getElementById('lastSaved');
    lastSaved.innerText = 'Last saved: ' + new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    window.localStorage.setItem('saved', lastSaved.innerText);
    ev.target.className = 'btn btn-success text-nowrap px-4';
    ev.target.setAttribute('disabled', true);
    document.getElementById('taskTitle').className = ' text-center text-success';
})

window.onload = event => {
    const savedTasks = JSON.parse(window.localStorage.getItem('taskItems#4commit'));
    document.getElementById('lastSaved').innerText = window.localStorage.getItem('saved');
    if (savedTasks.length === 0) return;
    taskList.push(...savedTasks);

    taskList.forEach(elm => {
        render(elm.text, elm.date);
    })
}

function render(text, dateStr) {
    const tasks = document.getElementById('tasks');
    tasks.parentElement.style.display = 'block';

    const container = document.createElement('div');
    container.setAttribute('class', 'bg-secondary rounded px-3 pt-3 d-flex gap-2 w-100');

    const p = document.createElement('p');
    p.className = 'text-dark bg-light w-100 rounded pt-2 ps-4';
    p.innerText = text;

    const button = document.createElement('button');
    button.className = 'btn btn-info h-25 mt-1';
    button.innerText = 'done';
    button.onclick = e => {
        e.target.parentElement.className += ' bg-success'
        let doneDate = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
        e.target.parentElement.lastChild.innerHTML = doneDate.slice(0, 10) + '<br>' + doneDate.slice(10);
        e.target.innerText = 'remove';
        e.target.onclick = ev => {
            ev.target.parentElement.remove();
            let text = ev.target.parentElement.firstChild.innerText;
            taskList = taskList.filter(elm => {
                if (elm.text === text)
                    return false;

                return true;
            })
            if (!tasks.hasChildNodes())
                tasks.parentElement.style.display = 'none';
            document.getElementById('taskTitle').className = 'text-center'
            document.getElementById('saveBtn').className = 'btn btn-warning text-nowrap px-4'
            document.getElementById('saveBtn').removeAttribute('disabled')
        }
    }

    const date = document.createElement('p');
    date.className = 'text-nowrap';
    date.innerHTML = dateStr.slice(0, 10) + '<br>' + dateStr.slice(10);

    container.append(p, button, date);
    tasks.appendChild(container);
}
// document.getElementsByClassName('removeBtn')[0].parentElement.remove();