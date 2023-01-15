import {isRef} from './h.js'


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
	const ref = Ref(cb())
	context.pop()
	return ref
}


/**
 * @template   T
 *
 * @param      {T}  value   The value
 * @return     {Ref<T>}  { description_of_the_return_value }
 */
function Ref(value) {
	/** @type {Context<unknown>[]} */
	let subs = []
	let v = isRef(value) ? value.value : value
	let ignore = false

	return {
		__isRef: true,
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

function Read(maybeRef) {
	return isRef(maybeRef) ? maybeRef.value : maybeRef
}

window.Ref = Ref
window.Memo = Memo
window.React = React
window.Peek = Peek
window.Read = Read

