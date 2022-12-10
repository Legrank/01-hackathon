export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function formatTime(ms) {
  return Number.parseFloat(ms / 1000).toFixed(2)
}

export function createMenuElement(text) {
  const menuElementHTML = document.createElement('li')
  menuElementHTML.className = 'menu-item'
  menuElementHTML.textContent = text
  return menuElementHTML
}
