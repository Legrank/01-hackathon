import {Menu} from './core/menu'
import { ClicksModule } from './modules/clicks.module'

export class ContextMenu extends Menu {
  #modules

  constructor() {
    super('#menu')
    this.#modules = [
      new ClicksModule(),

    ]
    this.add()
  }

  open() {
    this.el.classList.add('open')
  }

  close() {
    this.el.classList.remove('open')
  }

  add() {
    this.#modules.forEach(module => {
      const menuElement = module.toHTML()
      this.el.innerHTML += menuElement
      const menuElementHTML = this.el.querySelector(`[data-type="${module.type}"]`)
      menuElementHTML.addEventListener('click', () => {
        module.trigger()
        this.close()
      })
    })
  }
  
  #addListener() {
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
    this.#addListener()
  }
}
