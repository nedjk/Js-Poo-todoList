import { fetchJSON } from './functions/api.js'
import { TodoList } from './components/TodoList.js'
import { createElementByTagName } from './functions/dom.js'

const api_url = "https://jsonplaceholder.typicode.com/todos"

try {
    const todos = await fetchJSON(api_url+'?_limit=5', {method : 'GET'})
    const todoList = new TodoList(todos)
    todoList.appendTo(document.querySelector('#todolist'))
} catch (error) {
    const alertElement = createElementByTagName('div', {
        role : 'alert', 
        class : 'alert alert-danger m-2'},
        error.message
    )
    document.body.prepend(alertElement)
}
