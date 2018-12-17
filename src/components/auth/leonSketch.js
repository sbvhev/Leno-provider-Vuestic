// setup
export default () => {
  let leonSketch = document.querySelector('#leonSketch')
  leonSketch.style.opacity = 0.25

  let razzles = []
  // parallax

  let mouseoverElement = document

  let previousMousePoint = null
  let currentMousePoint = null

  mouseoverElement.onmousemove = function (e) {
    if (currentMousePoint == null) {
      currentMousePoint = mousePoint(e)
    } else {
      previousMousePoint = currentMousePoint
      currentMousePoint = mousePoint(e)

      for (let i = 0; i < razzles.length; i++) {
        let percentToOffset = razzles[i].r / objRMax
        let offsetToQueue = (currentMousePoint.x - previousMousePoint.x) / 4
        razzles[i].queuedOffset += offsetToQueue * percentToOffset
      }
    }
  }

  mouseoverElement.onmouseout = function (e) {
    previousMousePoint = null
    currentMousePoint = null
  }

  function mousePoint (e) {
    let mouseX = e.offsetX * dpr
    let mouseY = e.offsetY * dpr

    return {
      x: mouseX,
      y: mouseY
    }
  }

  let bleed, objDensity
  let dpr = window.devicePixelRatio || 1

  let sketchesChanged = true

  let objRMax = 20
  let objRMin = 10

  function initObj (onScreen) {
    let x = Math.random()
    let y = (onScreen) ? (Math.random() * leonSketch.height + bleed * 2) - bleed : leonSketch.height + bleed

    let s = Math.random() + 0.5

    let r = Math.floor(Math.random() * (objRMax - objRMin) / 2)
    r += objRMin

    let t = ''
    let which = Math.random()
    if (which < 0.33) {
      t = '+'
    } else if (which < 0.67) {
      t = 'o'
    } else {
      t = '*'
    }

    razzles.push({
      x: x,
      y: y,
      s: s,
      r: r,
      t: t,
      mouseOffset: 0,
      queuedOffset: 0
    })
  }

  function sizeSketches () {
    if (sketchesChanged) {
      leonSketch.width = leonSketch.clientWidth * dpr
      leonSketch.height = leonSketch.clientHeight * dpr
      bleed = objRMax * dpr * 2
      objDensity = 4 + Math.floor(Math.max(leonSketch.width, leonSketch.height) / 200)
      sketchesChanged = false
    }
  }

  function drawSketches () {
    sizeSketches()

    let context = leonSketch.getContext('2d')
    context.clearRect(0, 0, leonSketch.width, leonSketch.height)

    for (let i = 0; i < razzles.length; i++) {
      if (Math.rectContainsPoint(-bleed, -bleed, leonSketch.width + bleed * 2, leonSketch.height + bleed * 2, razzles[i].x, razzles[i].y)) {
        if (razzles[i].queuedOffset > 1 || razzles[i].queuedOffset < -1) {
          let amountToAdd = razzles[i].queuedOffset / 16
          razzles[i].mouseOffset += amountToAdd
          razzles[i].queuedOffset -= amountToAdd
        } else {
          razzles[i].queuedOffset = (razzles[i].queuedOffset === 0)
        }

        let sketch = leonSketch
        let context = sketch.getContext('2d')

        let curX = razzles[i].x * (sketch.width + sketch.height / 2) - sketch.height / 2 + razzles[i].mouseOffset
        let offset = razzles[i].r * dpr

        context.lineCap = 'round'
        context.lineWidth = offset / 2
        context.strokeStyle = 'black'
        context.fillStyle = 'black'

        if (razzles[i].t === '+') {
          context.beginPath()
          context.moveTo(curX - offset, razzles[i].y)
          context.lineTo(curX + offset, razzles[i].y)
          context.stroke()
          context.beginPath()
          context.moveTo(curX, razzles[i].y - offset)
          context.lineTo(curX, razzles[i].y + offset)
          context.stroke()
        } else if (razzles[i].t === 'o') {
          context.beginPath()
          context.arc(curX, razzles[i].y, offset, 0, 2 * Math.PI)
          context.stroke()
        } else if (razzles[i].t === '*') {
          context.beginPath()
          context.arc(curX, razzles[i].y, offset / 2, 0, 2 * Math.PI)
          context.fill()
        }

        razzles[i].x += 0.0005
        razzles[i].y -= razzles[i].s * dpr
      }
    }

    for (let i = 0; i < razzles.length; i++) {
      if (razzles[i].y < -bleed) {
        razzles.splice(i, 1)
        if (razzles.length < objDensity) {
          initObj(false)
          if (razzles.length < objDensity) {
            initObj(false)
          }
        }
      }
    }
  }

  Math.rectContainsPoint = function (rX, rY, rW, rH, pX, pY) {
    let xContainsPoint = (rX <= pX && pX <= rX + rW)
    let yContainsPoint = (rY <= pY && pY <= rY + rH)

    return (xContainsPoint && yContainsPoint)
  }

  Math.distanceBetweenPoints = function (x1, y1, x2, y2) {
    let a = x1 - x2
    let b = y1 - y2

    return Math.sqrt(a * a + b * b)
  }

  window.onresize = function () {
    sketchesChanged = true
  }

  window.onload = function () {
    sizeSketches()
    for (let i = 0; i < objDensity; i++) {
      initObj(true)
    }

    window.setInterval(function () {
      drawSketches()
    }, 20)
  }
}
