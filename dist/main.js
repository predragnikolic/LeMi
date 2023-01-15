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
        let ds = {
            x: Read(x),
            y: Read(y)
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
    React(() => {
        let params = {
            x: Read(x),
            y: Read(y) //
        };
        console.log(Read(x), Read(y));
    });
    var open = Ref(false);
    return div([
        For(people, (per) => [p(['hello'])]),
        button({ onclick() { count.value++; } }, ['Increase']),
        p(['Count is ', count]),
        p(['Double count is ', doubleCount]),
        Toggle({ open }),
        ol([
            For(people, (per) => li([per, 'dsad']))
        ]),
        () => count == 2 && 'da',
        button({ onclick: () => { open.value = !open.value; } }, ['Reset']),
        'x:', x,
        'y:', y,
        'x2:', doubleX
    ]);
}
/**
 * @param      {{open: boolean}}  arg1       The argument 1
 */
function Toggle({ open }) {
    var isOpen = Ref(open);
    return p({ onclick() { isOpen.value = !isOpen.value; } }, [() => isOpen.value ? 'da' : 'ne', () => open.value ? 'parent da' : 'parent ne']);
}
export let root = div([
    Count()
]);
document.body.appendChild(root);
