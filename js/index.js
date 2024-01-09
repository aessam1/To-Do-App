let getTask = document.getElementById('getTask');
let addBtn = document.getElementById('addBtn');
let tasks = document.getElementById('tasks')
let loading = document.getElementById('loading')

addBtn.addEventListener('click', function(){
    let task = {
        title: getTask.value,
        apiKey: "659d69712681618c591bbccc"
    }

    addTodos(task)
})

// function to add task to backend 
async function addTodos(task){
    let data = await fetch('https://todos.routemisr.com/api/v1/todos',{
    
    method : 'post',
    body: JSON.stringify(task),
    headers: {'content-type':'application/json'}

    })

    let result = await data.json()
    if (result.message=='success') {
        getTodos()
    }
    console.log(result)
    clearData()
}

function clearData(){
    getTask.value = ''
}

// function to get all todos from user 
async function getTodos() {
    loading.style.display = 'block'
    tasks.style.display = 'none'
    let data = await fetch('https://todos.routemisr.com/api/v1/todos/659d69712681618c591bbccc')
    let result = await data.json()
    console.log(result)
    if (result.message=='success') {
        loading.style.display = 'none'
    tasks.style.display = 'block'
        displayData(result.todos)
    }
}



getTodos()

// function to show all the todos on user screen
function displayData(data){
    let box = ``

    for (let i = 0; i < data.length; i++) {
        box +=`
        
        <div class="task my-2 w-75 m-auto d-flex justify-content-between rounded-2">
        <div class="m-2 ${data[i].completed ? 'text-decoration-line-through' : ''} ${data[i].completed ? 'text-completed' : ''} "> ${data[i].title}</div>
        <div class="icons m-2">
            <i onclick="markCompleted('${data[i]._id}')" id="done" class="fa-solid fa-square-check ${data[i].completed ? 'd-none' : ''} "></i>
            <i onclick="deleteTodos('${data[i]._id}')" id="delete" class="fa-solid fa-trash"></i>
        </div>
        </div>

        `
    }

    tasks.innerHTML = box
}

async function deleteTodos(id){
    let data = await fetch('https://todos.routemisr.com/api/v1/todos',{
    
    method : 'delete',
    body: JSON.stringify({todoId : id}),
    headers: {'content-type':'application/json'}

    })

    let result = await data.json()
    if (result.message=='success') {
        getTodos()
    }
    console.log(result)
    
}

async function markCompleted(id){
    let data = await fetch('https://todos.routemisr.com/api/v1/todos',{
    
    method : 'put',
    body: JSON.stringify({todoId : id}),
    headers: {'content-type':'application/json'}

    })

    let result = await data.json()
    if (result.message=='success') {
        getTodos()
    }
    console.log(result)
    
}