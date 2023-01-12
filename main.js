function Component() {
  var count = 1
  const doubleCount = Memo(() => count * 2)
  var open = false

  React(() => console.log(`count: ${count}`))

  return div([
    button({ onclick() { count++ } }, ['Increase']),
    p(['Count is ', count]),
    p(['Double count is ', doubleCount]),
    button({
      onclick() { open = !open }
    }, ['toggle', open ? 'Close it' : 'Open it']),
    open && 'it is open'
  ])
}

export let root = div([
  Component()
])

document.body.appendChild(root)