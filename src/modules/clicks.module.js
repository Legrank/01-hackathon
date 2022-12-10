import '../styles/clicks.css'
import {Module} from '../core/module'
import { formatTime } from '../utils'

export class ClicksModule extends Module {
  #clicks
  #dblclicks
  #TIMEOUT
  #clicksBlockHTML
  #timerBlock
  #clicksBlock
  #dblclicksBlock
  #interval
  #timeout

  constructor() {
    super('Clicks', 'Считать клики (за 3 секунды)')
    this.#clicks = 0
    this.#dblclicks = 0
    this.#TIMEOUT = 3000
  }

  #createClicksBlock() {
    this.#clicksBlockHTML = document.createElement('div')
    this.#clicksBlockHTML.className = 'clicks-block'
  
    this.#timerBlock = document.createElement('div')
    this.#timerBlock.className = 'timer'
    this.#clicksBlock = document.createElement('div')
    this.#clicksBlock.className = 'clicks'
    this.#dblclicksBlock = document.createElement('div')
    this.#dblclicksBlock.className = 'dblclicks'
  
    this.#clicksBlockHTML.append(this.#timerBlock, this.#clicksBlock, this.#dblclicksBlock)
  
    document.body.append(this.#clicksBlockHTML)
  }

  #stopTimer() {
    document.body.onclick = null
    document.body.ondblclick = null
    document.body.onmousedown = null
    this.#changeInfo(this.#timerBlock, 0)
    this.#clicks = 0
    this.#dblclicks = 0
    clearInterval(this.#interval)
    clearTimeout(this.#timeout)
  }

  #addListeners() {
    const startTime = Date.now()
    document.body.ondblclick = () => {
      this.#dblclicks++
      this.#changeInfo(this.#dblclicksBlock, `Дв. клики: ${this.#dblclicks}!`)
    }
    document.body.onmousedown = () => false
    document.body.onclick = () => {
      this.#clicks++
      this.#changeInfo(this.#clicksBlock, `Клики: ${this.#clicks}!`)
    }
    this.#interval = setInterval(() => {
      const delta = Date.now() - startTime
      this.#changeInfo(this.#timerBlock, formatTime(this.#TIMEOUT - delta))
    }, 100);
    document.body.oncontextmenu = () => {
      this.#stopTimer()
      this.#changeInfo(this.#clicksBlock, `Клики: 0!`)
      this.#changeInfo(this.#dblclicksBlock, `Дв. клики: 0!`)
    }
    this.#timeout = setTimeout(() => {
      this.#stopTimer()
    }, this.#TIMEOUT)
  }

  #showClicksInfo(block, time) {
    block.classList.add('open')
    this.#changeInfo(this.#timerBlock, time)
    this.#changeInfo(this.#clicksBlock, `Клики: 0!`)
    this.#changeInfo(this.#dblclicksBlock, `Дв. клики: 0!`)
  }

  #changeInfo(block, text) {
    block.textContent = text
  }

  trigger() {
    this.#createClicksBlock()
    this.#showClicksInfo(this.#clicksBlockHTML, formatTime(this.#TIMEOUT))
    this.#addListeners()
  }
}