/**
 * @template {unknown} Return
 * @typedef {() => Return} Context
 */
/** @type {Context<unknown>[]} */
const context = []

/**
 * @param      {Context<void>}  cb      { parameter_description }
 */
function React(cb) {
	context.push(cb)
	cb()
	context.pop()
}
/**
 * @template Return
 *
 * @param      {Context<Return>}  cb      { parameter_description }
 * @return     {Readonly<Ref<Return>>}    { description_of_the_return_value }
 */
function Memo(cb) {
	context.push(() => ref.value = cb())
	const ref = Var(cb())
	context.pop()
	return ref
}


/**
 * @template   T
 *
 * @param      {T}  value   The value
 * @return     {Ref<T>}  { description_of_the_return_value }
 */
function Var(value) {
	/** @type {Context<unknown>[]} */
	let subs = []
	let v = value
	let ignore = false

	return {
		get value() {
			if (!ignore) {
				let ctx = context.at(-1)
				if (ctx && !subs.includes(ctx)) subs.push(ctx)
			}
			return v
		},
		peek() {
			ignore = true
			let ret = this.value
			ignore = false
			return ret
		},
		toString() {
			return String(this.value)
		},
		valueOf() {
			return this.value
		},
		set value(newValue) {
			if (v == newValue) return
			v = newValue
			let oldSubs = [...subs]
			subs = []
			oldSubs.forEach(sub => React(sub))
		}
	};
}

/**
 * @template T
 * @param      {Ref<T>}  ref     The reference
 * @return     {T}  { description_of_the_return_value }
 */
function Peek(ref) {
	return ref.peek()
}

window.Var = Var
window.Memo = Memo
window.React = React
window.Peek = Peek

