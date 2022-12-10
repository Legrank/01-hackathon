import {Menu} from './core/menu'
import { ClicksModule } from './modules/clicks.module'

export class ContextMenu extends Menu {
  #modules

  constructor() {
    super('#menu')
    this.#modules = [
      new ClicksModule(),

    ]
    this.#modules.forEach(module => this.add(module))
    this.#modules.forEach(module => this.#addListenerOnElement(module))
  }

  open() {
    this.el.classList.add('open')
  }

  close() {
    this.el.classList.remove('open')
  }

  add(module) {
    const menuElement = module.toHTML()
    this.el.innerHTML += menuElement
  }

  #addListenerOnElement(module) {
    const element = this.el.querySelector(`[data-type="${module.type}"]`)
    element.addEventListener('click', () => {
      module.trigger()
      this.close()
    })

  }
  
  #addListenerOnBody() {
    document.body.addEventListener('contextmenu', e => {
      e.preventDefault()
      if(this.el.querySelector('.menu-item')) {
        this.el.style.left = `${e.clientX}px`
        this.el.style.top = `${e.clientY}px`
        this.open()
      }
    })
  }

  run() {
    this.#addListenerOnBody()
  }
}
