export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function formatTime(ms) {
  return Number.parseFloat(ms / 1000).toFixed(2)
}

export function createElement(tag, className, text) {
  const el = document.createElement(tag)
  if (className) {
    el.classList.add(className)
  }
  if (text) {
    el.textContent = text
  }
  return el
}
