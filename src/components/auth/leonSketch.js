// setup
export default () => {
  /*
Copyright © 2018 by Health Science Inc. All rights reserved.
https://myleon.co
*/



  // sketch class

  function LeonSketch (canvas) {
    this.canvas = canvas
    this.canvas.style.opacity = 0.2

    this.context = canvas.getContext('2d')

    this.dpr = window.devicePixelRatio || 1
    this.resize()

    this.shapeRadiusMin = 10
    this.shapeRadiusMax = 20

    this.shapeTypeEnum = {
      'plus': 1,
      'circle': 2,
      'dot': 3
    }

    this.shapes = []
    for (let i = 0; i < this.shapeDensity; i++) {
      let shape = this.newShape(true)
      this.shapes.push(shape)
    }
  }

  LeonSketch.prototype.calculateShapeDensity = function () {
    return 10 + Math.floor(Math.max(this.canvas.width, this.canvas.height) / 200)
  }

  LeonSketch.prototype.calculateBleed = function () {
    return Math.max(this.canvas.width, this.canvas.height) / 4
  }

  LeonSketch.prototype.resize = function () {
    this.canvas.width = this.canvas.clientWidth * this.dpr
    this.canvas.height = this.canvas.clientHeight * this.dpr

    this.bleed = this.calculateBleed()
    this.shapeDensity = this.calculateShapeDensity()

    this.shouldResize = false
  }

  LeonSketch.prototype.refresh = function () {
    if (this.shouldResize) {
      this.resize()
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0; i < this.shapes.length; i++) {
      this.drive(this.shapes[i])
      this.display(this.shapes[i])
    }

    for (let i = 0; i < this.shapes.length; i++) {
      if (!this.containsShape(this.shapes[i])) {
        this.shapes.splice(i, 1)
      }
    }

    for (let i = 0; i < 2; i++) {
      if (this.shapes.length < this.shapeDensity) {
        let shape = this.newShape(false)
        this.shapes.push(shape)
      }
    }
  }

  LeonSketch.prototype.newShape = function (onScreen) {
    let coordinate = null

    if (onScreen) {
      let x = Math.random() * (this.canvas.width + this.bleed * 2) - this.bleed
      let y = Math.random() * (this.canvas.height + this.bleed * 2) - this.bleed

      coordinate = {
        x: x,
        y: y
      }
    } else {
      let x = Math.random() * this.canvas.width - this.bleed
      let y = this.canvas.height + this.bleed / 2

      coordinate = {
        x: x,
        y: y
      }
    }

    let radius = (Math.floor(Math.random() * (this.shapeRadiusMax - this.shapeRadiusMin) / 2) + this.shapeRadiusMin) * this.dpr

    let velocity = {
      dx: (Math.random() / 3 + 1 / 6) * this.dpr,
      dy: Math.random() + 0.5
    }

    let momentum = {
      dx: 0,
      dy: 0
    }

    let shapeType = null
    switch (Math.floor(Math.random() * 3) + 1) {
      case 1:
        shapeType = this.shapeTypeEnum.plus
        break
      case 2:
        shapeType = this.shapeTypeEnum.circle
        break
      case 3:
        shapeType = this.shapeTypeEnum.dot
        break
    }

    let shape = {
      coordinate: coordinate,
      radius: radius,
      velocity: velocity,
      momentum: momentum,
      shapeType: shapeType
    }

    return shape
  }

  LeonSketch.prototype.containsShape = function (shape) {
    let x = -this.bleed
    let y = -this.bleed
    let w = this.canvas.width + this.bleed * 2
    let h = this.canvas.height + this.bleed * 2

    let containsX = (x <= shape.coordinate.x && shape.coordinate.x <= w)
    let containsY = (y <= shape.coordinate.y && shape.coordinate.y <= h)

    return (containsX && containsY)
  }

  LeonSketch.prototype.drive = function (shape) {
    let friction = 1 / 32

    if (Math.abs(shape.momentum.dx) > 1) {
      shape.coordinate.x += shape.momentum.dx * friction
      shape.momentum.dx -= shape.momentum.dx * friction
    } else {
      shape.momentum.dx = shape.momentum.dx === 0
    }

    if (Math.abs(shape.momentum.dy) > 1) {
      shape.coordinate.y += shape.momentum.dy * friction
      shape.momentum.dy -= shape.momentum.dy * friction
    } else {
      shape.momentum.dy = shape.momentum === 0
    }

    shape.coordinate.x += shape.velocity.dx
    shape.coordinate.y -= shape.velocity.dy
  }

  LeonSketch.prototype.display = function (shape) {
    this.context.lineWidth = shape.radius / 2
    this.context.lineCap = 'round'
    this.context.lineJoin = 'round'
    this.context.strokeStyle = 'black'
    this.context.fillStyle = 'black'

    switch (shape.shapeType) {
      case this.shapeTypeEnum.plus:
        this.drawPlus(shape.coordinate.x, shape.coordinate.y, shape.radius)
        break
      case this.shapeTypeEnum.circle:
        this.drawCircle(shape.coordinate.x, shape.coordinate.y, shape.radius)
        break
      case this.shapeTypeEnum.dot:
        this.drawDot(shape.coordinate.x, shape.coordinate.y, shape.radius)
        break
    }
  }

  LeonSketch.prototype.drawPlus = function (x, y, r) {
    this.context.beginPath()
    this.context.moveTo(x - r, y)
    this.context.lineTo(x + r, y)
    this.context.lineTo(x, y)
    this.context.lineTo(x, y - r)
    this.context.lineTo(x, y + r)
    this.context.stroke()
  }

  LeonSketch.prototype.drawCircle = function (x, y, r) {
    this.context.beginPath()
    this.context.arc(x, y, r, 0, 2 * Math.PI)
    this.context.stroke()
  }

  LeonSketch.prototype.drawDot = function (x, y, r) {
    this.context.beginPath()
    this.context.arc(x, y, r / 2, 0, 2 * Math.PI)
    this.context.fill()
  }

  LeonSketch.prototype.apply = function (momentum) {
    for (let i = 0; i < this.shapes.length; i++) {
      let shape = this.shapes[i]

      let percentToApply = shape.radius / this.shapeRadiusMax

      let dx = momentum.dx * percentToApply * this.dpr * 1 / 8
      let dy = momentum.dy * percentToApply * this.dpr * 1 / 12

      shape.momentum = {
        dx: shape.momentum.dx + dx,
        dy: shape.momentum.dy + dy
      }
    }
  }



  // sketch setup

  let leonSketch = new LeonSketch(document.querySelector('#leonSketch'))

  window.onresize = function () {
    leonSketch.shouldResize = true
  }

  window.onload = function () {
    window.setInterval(function () {
      leonSketch.refresh()
    }, 20)
  }



  // sketch parallax

  let mouseoverElement = document

  let previousMousePoint = null
  let currentMousePoint = null

  mouseoverElement.onmousemove = function (e) {
    if (currentMousePoint == null) {
      currentMousePoint = mousePoint(e)
    } else {
      previousMousePoint = currentMousePoint
      currentMousePoint = mousePoint(e)

      let dx = (currentMousePoint.x - previousMousePoint.x)
      let dy = (currentMousePoint.y - previousMousePoint.y)

      let mouseMomentum = {
        dx: dx,
        dy: dy
      }

      leonSketch.apply(mouseMomentum)
    }
  }

  mouseoverElement.onmouseout = function (e) {
    previousMousePoint = null
    currentMousePoint = null
  }

  function mousePoint (e) {
    let mouseX = e.offsetX
    let mouseY = e.offsetY

    return {
      x: mouseX,
      y: mouseY
    }
  }
}
