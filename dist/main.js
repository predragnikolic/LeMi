function mouseCoords() {
    var x = Ref(0);
    var y = Ref(0);
    addEventListener('mousemove', (e) => {
        Read(x) = e.clientX;
        Read(y) = e.clientY;
    });
    const reset = () => {
        Read(x) = 0;
        Read(y) = 0;
    };
    return { x: Read(x), y: Read(y), reset };
}
function Count() {
    var count = Ref(0);
    const doubleCount = Memo(() => Read(count) * 2);
    var people = Ref([1, 2]);
    let x3123 = 321;
    const { Read(x), Read(y), reset } = mouseCoords();
    const doubleX = Memo(() => Read(x) * 2);
    let ahsad = () => {
        let xdsa = {
            x: Read(x)
        };
    };
    React(() => {
        let param = {
            count: Read(count),
            y: Read(y)
        };
        console.log(param);
    });
    // React(() => console.log(x, y))
    return div([
        button({ onclick() { Read(count)++; } }, ['Increase']),
        p(['Count is ', Read(count)]),
        p(['Double count is ', doubleCount]),
        ol([
            For(Read(people), (per, i) => [i, li([per])])
        ]),
        () => count == 2 && 'da',
        button({ onclick: reset }, ['Reset']),
        'x:',
        Read(x),
        'y:',
        Read(y),
        'x2:', doubleX
    ]);
}
export let root = div([
    Count()
]);
document.body.appendChild(root);
