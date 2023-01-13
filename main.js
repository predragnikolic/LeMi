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

// rules
// 1. cannot override refs from reusable functions,
//  const {x, y, reset} = mouseCoords()
//  x = 2 // this is a no go
//  Instead: only mutate x in `mouseCoords`

// 2. If you want to pass a ref as a ref, then
// {x} compiles to: {x}
// If you want to read the value of a ref as a value, then
// {x: x} compiles to: {x: x.value}

function Count() {
  var count = 0
  const doubleCount = Memo(() => count * 2)
  var people = [1, 2]
  let x3123 = 321

  const {x, y, reset} = mouseCoords()
  const doubleX = Memo(() => x * 2)

  let ahsad = () => {
    let ds = {
      x: x,
      y
    }
  }
  React(() => {
    let param = {
      count: count,
      x: x,
      y: y
    }

    console.log(param)
  })

  React(() => {
    let params = {
      x: x,
      y: y,
    }
    console.log(x, y)
  })
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