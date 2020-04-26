// BAD PRACTICE - not proper MVC. Should be separated to files.
const render = function (todos) {

    $("#todos").empty()

    todos.forEach(todo => {
        $("#todos").append(`
        <div data-id=${todo.id} class="todo ${todo.complete ? 'complete' : ''}">
            <i class="fas fa-check-circle"></i>
            <span class=text>${todo.text}</span>
            <span class="delete"><i class="fas fa-trash"></i></span>
             <div class="priority ${todo.id}">
                <input type="radio" value="low" name="priority ${todo.id}" class="priority ${todo.id}">LOW</input>
                <input type="radio" value="medieum" name="priority ${todo.id}" class="priority ${todo.id}">MED</input>
                <input type="radio" value="high" name="priority ${todo.id}" class="priority ${todo.id}">HIGH</input>
            </div>
        </div>
        `)
    })

    const checkPriority = function(){
        $("#todos").on('click','.priority',function(){
            for(btn of $(this).find('input')){
                if(btn.checked){
                    let status = $(btn).val()
                    let thisToDo = this.closest('.todo')
                    if(status === 'low'){
                        $(thisToDo).css('background-color','green')
                    } else if (status === 'medieum'){
                        $(thisToDo).css('background-color','orange')
                    } else if (status === 'high'){
                        $(thisToDo).css('background-color','red')
                    }
                }
            }
        })
    }

    checkPriority()
}



const add = function () {
    $.post('/todo', { text: $("#todo-input").val() }, function (todos) {
        render(todos)
        $("#todo-input").val("")
    })
}



$("#todos").on("click", ".fa-check-circle", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "PUT",
        url: "/todo/" + id,
        success: todos => {
            render(todos)
        }
    })
})

$("#todos").on("click", ".fa-trash", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "DELETE",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$.get('/todos', todos => render(todos))








class TODO {

    constructor(id, text, complete){
        this.id = id
        this.text = text
        this.complete = this.complete
    }

    mark(){
       
    }

    delete(){

    }
}

