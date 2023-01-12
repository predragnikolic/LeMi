function Component() {
    var count = 1
    const doubleCount = Memo(() => count * 2)
    var open = false

    React(() => console.log(`the count is : ${count}`))
    React(() => console.log(`the doubleCount is : ${doubleCount}`))

    return div({ onclick() { count++ } }, [
        'Count is ', count, br(),
        'Double count is ', doubleCount, br(),
        button({ onclick() { open = !open }},['toggle open']), br(),
        open ? 'open' : 'closed',
        open && 'it is def open'
    ])
}

export let root = div([
    Component()
])

document.body.appendChild(root)