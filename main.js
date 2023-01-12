function mouseCoords() {
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


function Count() {
  var count = 0
  const doubleCount = Memo(() => count * 2)
  var people = [1, 2]

  const {x, y, reset} = mouseCoords()
  const doubleX = Memo(() => x * 2)

  React(() => console.log(`count: ${count}`))
  React(() => console.log(`${x}, ${y}`))

  return div([
    button({ onclick() { count++ } }, ['Increase']),
    p(['Count is ', count]),
    p(['Double count is ', doubleCount]),
    ol([
      For(people, (per, i) => [i, li([per])])
    ]),
    count == 2 && 'da',
    button({onclick: reset}, ['Reset']),
    'x:', x,
    'y:', y,
    'x2:', doubleX
  ])
}

export let root = div([
  Count()
])

document.body.appendChild(root)