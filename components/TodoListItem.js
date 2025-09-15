import { createElementByTagName } from './../functions/dom.js'

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export  class TodoListItem {
    #id = 0
    #title = ""
    #completed = false
    #element 
    constructor ({id,title,completed}) {
        this.#id = id
        this.#title = title
        this.#completed = completed

        const li = createElementByTagName('li', {
            class : "todo list-group-item d-flex align-items-center" + (this.#completed ? ' is-completed' : '') 
        })

        const checkbox = createElementByTagName('input' , {
            type : 'checkbox',
            id : `todo-${this.#id}`,
            class : 'form-check-input',
            checked : this.#completed ? '' : null
        })

        const label = createElementByTagName('label',{
            class : "ms-2 me-auto form-check-label",
            for : `todo-${this.#id}`
        },this.#title)

        const iconBean = createElementByTagName('i' , {
            class : 'bi-trash'
        })
        
        const labelBean = createElementByTagName('label' , {
            class : 'btn btn-danger btn-sm'
        })

        labelBean.append(iconBean)
        li.append(checkbox,label,labelBean)

        labelBean.addEventListener('click', (event) =>{this.remove(event)})
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))

        this.#element = li
    }

    /**
     * 
     * @param {HTMLElement} element 
     */

    get element () {
        return this.#element
    }

    remove(event) {
        event.preventDefault()
        this.#element.remove()
    }

    /**
     * Switch state of task (done / to do)
     * @param {HTMLInputElement} target 
     */
    toggle(input) {
        console.log(input.parentElement.parentElement)
        input.parentElement.classList.toggle('is-completed')
    }
}