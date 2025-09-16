import { cloneTemplate } from './../functions/dom.js'

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
        const li = cloneTemplate('#todolist-item').firstElementChild
        this.#element = li

        if(this.#completed) {
            li.classList.add('is-completed')
       }
       const checkbox = li.querySelector('input')
       checkbox.setAttribute('id', id)
       if(this.#completed) {
            checkbox.setAttribute('checked', '')
       }
       const label = li.querySelector('label')
       label.setAttribute('for', id)
       label.innerText = title
       const button = li.querySelector('.btn')

        button.addEventListener('click', (event) =>{this.remove(event)})
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))
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
        input.parentElement.classList.toggle('is-completed')
    }
}