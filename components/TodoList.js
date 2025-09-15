import { TodoListItem } from './TodoListItem.js'

export class TodoList {

    /**
     * @type {Todo[]}
     */
    #todos = []

    /**
     * @type {HTMLUListElement}
     */
    #listElement

    /**
     * @param {Todo[]} todos 
     */
    constructor (todos) {
        this.#todos  = todos
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo (element) {
        element.innerHTML = `
        <form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>

            <ul class="list-group">

            </ul>
        </main>`
        this.#listElement = element.querySelector('.list-group')
        this.#todos.forEach(todo => {
            const task = new TodoListItem(todo)
            this.#listElement.append(task.element)
        });

        const form = element.querySelector('form')
        form.addEventListener('submit', event => this.#onSubmit(event))

        element.querySelectorAll('.btn-group button').forEach((filter) => {
            filter.addEventListener('click' , e => this.#toggleFilter(e))
        })

    }

    /**
     * 
     * @param {SubmitEvent} event 
     */
    #onSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const title = data.get('title').toString().trim()
        if(title !== '') {
            const task = new TodoListItem({
                id : Date.now(),
                title : title,
                completed : false
            })
           this.#listElement.prepend(task.element)
        }
        form.reset()

    }

    /**
     * 
     * @param {PointerEvent} event 
     */
    #toggleFilter(event) {
        event.preventDefault()
        const filter = event.target.getAttribute('data-filter')
        console.warn(event.target)
        event.target.parentElement.querySelector('.active').classList.remove('active')
        event.target.classList.add('active')

        if(filter === 'todo') {
            this.#listElement.classList.add('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        } else if ( filter === 'done') {
            this.#listElement.classList.remove('hide-completed')
            this.#listElement.classList.add('hide-todo')
        } else {
            this.#listElement.classList.remove('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        }
    }
}
