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
  let x3123 = 321

  let {x, y, reset} = mouseCoords()
  const doubleX = Memo(() => x * 2)

  let ahsad = () => {
    let ds = {
      x,
      y
    }
  }
  React(() => {
    let param = {
      count: count,
      x,
      y
    }

    console.log(param)
  })

  React(() => {
    let params = {
      x: x,
      y: y //
    }
    console.log(x, y)
  })
  var open = false
  return div([
    people.map((per) => [p(['hello'])]),
    button({ onclick() { count++ } }, ['Increase']),
    p(['Count is ', count]),
    p(['Double count is ', doubleCount]),
    Toggle({open}),
    ol([
      people.map((per) => li([per, 'dsad']))
    ]),
    count == 2 && 'da',
    button({onclick: () => {open = !open}}, ['Reset']),
    'x:', x,
    'y:', y,
    'x2:', doubleX
  ])
}

/**
 * @param      {{open: boolean}}  arg1       The argument 1
 */
function Toggle({open}) {
  var isOpen = open
  return p({onclick() {isOpen = !isOpen}}, [isOpen ? 'da' : 'ne', open ? 'parent da' : 'parent ne'])
}

export let root = div([
  Count()
])

document.body.appendChild(root)