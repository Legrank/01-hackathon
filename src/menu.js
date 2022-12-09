import {Menu} from './core/menu'
import { createMenuElement } from './utils'

export class ContextMenu extends Menu {
  #contextMenu

  constructor() {
    super('#menu')
  }

  open() {
    this.#contextMenu.classList.add('open')
  }

  close() {
    this.#contextMenu.classList.remove('open')
  }

  add(module) {
    const menuElementHTML = createMenuElement(module.text)
    menuElementHTML.addEventListener('click', () => {
      module.trigger()
      this.close()
    })

    this.#contextMenu.append(menuElementHTML)
  }

  run() {
    this.#contextMenu = document.getElementById('menu')

    document.body.addEventListener('contextmenu', e => {
      e.preventDefault()
      if(this.#contextMenu.querySelector('.menu-item')) {
        this.#contextMenu.style.left = `${e.clientX}px`
        this.#contextMenu.style.top = `${e.clientY}px`
        this.open()
      }
    })
    
  }
}
