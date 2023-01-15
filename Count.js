export function Count() {
	var count = 0
	const doubleCount = Memo(() => count * 2)

	React(() => console.log(count))

	return section([
		button({
			onclick() { count++ }
		}, ['Increase']),
		p(['count is ', count]),
		p(['doubleCount is ', doubleCount])
	])
}