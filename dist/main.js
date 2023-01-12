function Component() {
    var count = Ref(1);
    const doubleCount = Memo(() => count.value * 2);
    var open = Ref(false);
    React(() => console.log(`count: ${count}`));
    return div([
        button({ onclick() { count.value++; } }, ['Increase']),
        p(['Count is ', count]),
        p(['Double count is ', doubleCount]),
        button({
            onclick() { open.value = !open.value; }
        }, ['toggle', () => open.value ? 'Close it' : 'Open it']),
        () => open.value && 'it is open'
    ]);
}
export let root = div([
    Component()
]);
document.body.appendChild(root);
