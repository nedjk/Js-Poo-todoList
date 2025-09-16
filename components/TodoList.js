import { TodoListItem } from './TodoListItem.js'
import { cloneTemplate } from './../functions/dom.js'

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
        element.append(cloneTemplate('#todolist-layout'))
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
