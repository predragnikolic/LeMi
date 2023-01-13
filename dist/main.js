function mouseCoords() {
    var x = Ref(0);
    var y = Ref(0);
    addEventListener('mousemove', (e) => {
        x.value = e.clientX;
        y.value = e.clientY;
    });
    const reset = () => {
        x.value = 0;
        y.value = 0;
    };
    return { x, y, reset };
}
function Count() {
    var count = Ref(0);
    const doubleCount = Memo(() => count.value * 2);
    var people = Ref([1, 2]);
    let x3123 = 321;
    let { x, y, reset } = mouseCoords();
    const doubleX = Memo(() => x.value * 2);
    let ahsad = () => {
        x.value = x.value + 1;
        let ds = {
            x: Read(x),
            y
        };
    };
    React(() => {
        let param = {
            count: Read(count),
            x: Read(x),
            y: Read(y)
        };
        console.log(param);
    });
    // React(() => console.log(x, y))
    return div([
        button({ onclick() { count.value++; } }, ['Increase']),
        p(['Count is ', count]),
        p(['Double count is ', doubleCount]),
        ol([
            For(people, (per, i) => [i, li([per])])
        ]),
        () => count == 2 && 'da',
        button({ onclick: reset }, ['Reset']),
        'x:', x,
        'y:', y,
        'x2:', doubleX
    ]);
}
export let root = div([
    Count()
]);
document.body.appendChild(root);
