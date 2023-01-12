function Count() {
    var count = Ref(0);
    const doubleCount = Memo(() => count.value * 2);
    var people = Ref([1, 2]);
    React(() => console.log(`count: ${count}`));
    React(() => console.log(`${people}`));
    return div([
        button({ onclick() { count.value++; } }, ['Increase']),
        p(['Count is ', count]),
        p(['Double count is ', doubleCount]),
        ol([
            For(people, (per, i) => [i, li([per])])
        ]),
        () => count == 2 && 'da'
    ]);
}
export let root = div([
    Count()
]);
document.body.appendChild(root);
