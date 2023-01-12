function Component() {
    var count = Ref(1);
    const doubleCount = Memo(() => count.value * 2);
    var open = Ref(false);
    React(() => console.log(`the count is : ${count}`));
    React(() => console.log(`the doubleCount is : ${doubleCount}`));
    return div({ onclick() { count.value++; } }, [
        'Count is ', count, br(),
        'Double count is ', doubleCount, br(),
        button({ onclick() { open.value = !open.value; } }, ['toggle open']), br(),
        open.value ? 'open' : 'closed',
        open.value && 'it is def open'
    ]);
}
export let root = div([
    Component()
]);
document.body.appendChild(root);
