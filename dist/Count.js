export function Count() {
    var count = Ref(0);
    const doubleCount = Memo(() => count.value * 2);
    React(() => console.log(Read(count)));
    return section([
        button({
            onclick() { count.value++; }
        }, ['Increase']),
        p(['count is ', count]),
        p(['doubleCount is ', doubleCount])
    ]);
}
