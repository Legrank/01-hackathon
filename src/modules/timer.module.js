import { Module } from '../core/module'
import '../styles/timer.css'
import { createElement } from '../utils'

export class TimerModule extends Module {
  #interval
  #endTime
  #spanMin
  #spanSec
  #requestId
  #timerBlockContainer
  #imputTimeBlockContainer
  #oldMin
  #oldSec
  constructor() {
    super('Timer', 'Добавить таймер')
    this.#oldMin = ''
    this.#oldSec = ''
  }
  trigger() {
    this.#createImputTimeBlock()
  }
  #formatTime(ms) {
    const sec = ((ms / 1000) % 60).toFixed()
    const min = ((ms / 1000 - sec) / 60).toFixed()
    const fixMin = min == 0 ? '0' : min
    const fixSec = sec < 10 ? '0' + sec : sec
    return { min: fixMin, sec: fixSec }
  }
  #updateTime() {
    const delta = this.#endTime - Date.now()
    const { min, sec } = this.#formatTime(delta)
    this.#spanMin.textContent = min
    this.#spanSec.textContent = sec
    this.#requestId = setTimeout(this.#updateTime.bind(this), 500)
  }

  #createTimerBlock(ms) {
    const { min, sec } = this.#formatTime(ms)
    this.#endTime = Date.now() + ms
    const timerBlockContainer = createElement('div', 'timer-container')
    this.#spanMin = createElement('span', 'timer-span', min)
    const seporator = createElement('span', 'timer-seporator', ':')
    this.#spanSec = createElement('span', 'timer-span', sec)
    timerBlockContainer.append(this.#spanMin, seporator, this.#spanSec)
    document.body.append(timerBlockContainer)
    this.#timerBlockContainer = timerBlockContainer
    this.#requestId = setTimeout(this.#updateTime.bind(this), 500)
    setTimeout(() => {
      this.#timerBlockContainer.remove()
      clearTimeout(this.#requestId)
    }, ms)
  }

  #createImputTimeBlock() {
    const imputTimeBlockContainer = createElement('div', 'timer-block')
    const startTimerBtn = createElement(
      'button',
      'timer-btn',
      'Запустить таймер'
    )
    const inputFildContainer = createElement('div', 'timer-input-caontainer')
    const labelMin = createElement('label', 'timer-label', 'Минуты')
    const imputMin = createElement('input', 'timer-input')
    labelMin.append(imputMin)
    const labelSeс = createElement('label', 'timer-label', 'Секунды')
    const inputSec = createElement('input', 'timer-input')
    labelSeс.append(inputSec)
    imputMin.addEventListener('input', this.#inputFarmatMin.bind(this))
    inputSec.addEventListener('input', this.#inputFarmatSec.bind(this))
    startTimerBtn.addEventListener('click', () => {
      const min = Number(this.#oldMin)
      const sec = Number(this.#oldSec)
      this.#createTimerBlock((min * 60 + sec) * 1000)
      this.#imputTimeBlockContainer.remove()
    })
    inputFildContainer.append(labelMin, labelSeс)
    imputTimeBlockContainer.append(inputFildContainer, startTimerBtn)
    document.body.append(imputTimeBlockContainer)
    this.#imputTimeBlockContainer = imputTimeBlockContainer
  }
  #inputFarmatMin(e) {
    this.#oldMin = this.#inputFarmat(this.#oldMin, e.target.value)
    e.target.value = this.#oldMin
  }
  #inputFarmatSec(e) {
    this.#oldSec = this.#inputFarmat(this.#oldSec, e.target.value)
    e.target.value = this.#oldSec
  }
  #inputFarmat(oldValue, newValue) {
    if (isNaN(Number(newValue))) {
      return oldValue
    }
    if (newValue.length > 2) {
      return oldValue
    }
    if (newValue > 60) {
      return oldValue
    }
    return newValue
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
  }
}
