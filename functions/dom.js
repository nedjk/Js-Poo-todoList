/**
 * 
 * @param {String} tagName 
 * @param {object} attributes 
 * @param {string} classes 
 * @param {String} text 
 * @returns HTMLElement
 */

export function createElementByTagName(tagName, attributes = {}, text = undefined ) {
    const newElement = document.createElement(tagName)
        for(const [attribute,value] of Object.entries(attributes)) {
            if( value !== null)
                newElement.setAttribute(attribute,value)
        }
        
        if (text) {
            newElement.innerText = text
        }
        
        return newElement
}
/**
 * 
 * @param {String} id 
 * @returns {DocumentFragment}
 */
export function cloneTemplate(id) {
    return document.querySelector(id).content.cloneNode(true)
}