function Count() {
  var count = 0
  const doubleCount = Memo(() => count * 2)
  var people = [1, 2]

  React(() => console.log(`count: ${count}`))

  React(() => console.log(`${people}`))

  return div([
    button({ onclick() { count++ } }, ['Increase']),
    p(['Count is ', count]),
    p(['Double count is ', doubleCount]),
    ol([
      For(people, (per, i) => [i, li([per])])
    ]),
    count == 2 && 'da'
  ])
}

export let root = div([
  Count()
])

document.body.appendChild(root)