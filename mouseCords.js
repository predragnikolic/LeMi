export function mouseCoords() {
    var x = 0
    var y = 0

    addEventListener('mousemove', (e) => {
        x = e.clientX
        y = e.clientY
    })
    const reset = () => {
      x = 0
      y = 0
    }

    return { x, y, reset }
}