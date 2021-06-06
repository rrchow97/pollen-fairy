function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFromRange(min, max) {
  return (Math.random() * (max - min) + min)
}

var canvas = document.getElementById('pollen')

canvas.width = innerWidth
canvas.height = innerHeight
var minWidth = 750;

var c = canvas.getContext('2d')

var maxPollenSize = 4
var minPollenSize = 1
var mouseRadius = 50

// var treeAmt = window.treeStr
// var grassAmt = window.grassStr
// var weedAmt = window.weedStr

// var treeAmt = 'Very High'
// var grassAmt = 'Low'
// var weedAmt = 'Very High'

var pollenDensity = {
  'Low': 0.3,
  'Moderate': 1,
  'High': 2.5,
  'Very High': 4.5
}

mouse = {
  x: undefined,
  y: undefined
}
addEventListener('resize', () => {
  canvas.width = innerWidth
  if (canvas.width < minWidth) {
    canvas.width = minWidth
  }
  canvas.height = innerHeight
  if (canvas.width > minWidth) {
    init(window.grassStr, window.treeStr, window.weedStr)
  }
})


addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

// -----------------------------------------------------------
// STAR ======================================================
// -----------------------------------------------------------

function Pollen(x, y, radius, rgb, shadow) {
  this.trueX = x
  this.velocity = (2.5 ** radius) * 0.01 * [-1, 1][Math.round(Math.random())]
  this.radius = radius
  this.rgb = rgb
  this.shadow = shadow

  // sin wave
  this.a = randomFromRange(20, 40)
  this.b = randomFromRange(0.2, 0.3) / 10
  this.c = randomFromRange(5, 15)
  this.d = y

  this.trueY = this.a * Math.sin(this.b * (this.trueX + this.c)) + this.d

  this.x = this.trueX
  this.y = this.trueY
}

Pollen.prototype.draw = function() {
  c.save()
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = `rgba(${this.rgb}, ${this.radius/maxPollenSize})`//this.color
  c.shadowColor = `rgba(${this.shadow}, 1)`
  c.shadowBlur = 10
  c.fill()
  c.closePath()
  c.restore()
}

Pollen.prototype.update = function() {
  this.draw()

  if (this.x + this.radius + this.velocity > canvas.width + 20) {
    this.trueX = -10
    this.x = this.trueX
  }

  if (this.x + this.radius + this.velocity < -20) {
    this.trueX = canvas.width + 10
    this.x = this.trueX
  }

  this.trueX += this.velocity
  this.trueY = this.a * Math.sin(this.b * (this.trueX + this.c)) + this.d

  this.x = this.trueX
  this.y = this.trueY

  var opposite = this.y - mouse.y
  var adjacent = this.x -  mouse.x
  var theta = Math.atan2(opposite, adjacent)

  if (Math.abs(Math.hypot(mouse.x - this.trueX, mouse.y - this.trueY)) < mouseRadius * this.radius) {
    this.previousY = mouse.y
    this.x = mouse.x + Math.cos(theta) * mouseRadius * this.radius
    this.y = mouse.y + Math.sin(theta) * mouseRadius * this.radius

  }
}


// -----------------------------------------------------------
// Backgorund ================================================
// -----------------------------------------------------------

function createMountainRange(mountainAmount, height, color) {
  const mountainWidth = canvas.width/mountainAmount
  for (let i = 0; i < mountainAmount; i++) {
    c.beginPath()
    c.moveTo(i * mountainWidth, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth/2, canvas.height - height)
    c.lineTo(i * mountainWidth - 325, canvas.height)
    c.fillStyle = color
    c.fill()
    c.closePath()
  }
}

// -----------------------------------------------------------
// Implementation ============================================
// -----------------------------------------------------------

// const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
// backgroundGradient.addColorStop(0, '#54beff')
// backgroundGradient.addColorStop(0.4, '#a1dbff')
// backgroundGradient.addColorStop(1, '#a1dbff')
let pollen
let groundHeight = 100

function init(grassAmt, treeAmt, weedAmt) {
  pollen = []

  var area = canvas.height * canvas.width
  var grassDensity = grassAmt * 75
  var treeDensity = treeAmt * 10
  var weedDensity = weedAmt * 50

  var density = 18000

  var heightOffset = .80

  for (let i = 0; i < area/density * pollenDensity[grassAmt]; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * heightOffset
    const radius = randomFromRange(minPollenSize, maxPollenSize)
    pollen.push(new Pollen(x, y, radius, '90, 189, 4', '90, 189, 4' ))
  }

  for (let i = 0; i < area/density * pollenDensity[treeAmt]; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * heightOffset
    const radius = randomFromRange(minPollenSize, maxPollenSize)
    pollen.push(new Pollen(x, y, radius, '255, 221, 196', '255, 221, 196'))
  }

  for (let i = 0; i < area/density * pollenDensity[weedAmt]; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * heightOffset
    const radius = randomFromRange(minPollenSize, maxPollenSize)
    pollen.push(new Pollen(x, y, radius, '240, 89, 149', '240, 89, 149'))
  }
}

// -----------------------------------------------------------
// Animation Loop ============================================
// -----------------------------------------------------------

function animate() {
  requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)

  pollen.forEach((pollen, index) => {
    pollen.update()
  })

}

window.init = init

init(window.grassStr, window.treeStr, window.weedStr)
animate()