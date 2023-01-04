let context = null

function Act(cb) {
	context = cb
	context()
	context = null
}
/**
 * @template T
 *
 * @param      {() => T}  cb      { parameter_description }
 * @return     {Readonly<Ref<T>>}    { description_of_the_return_value }
 */
function Computed(cb) {
	context = () => ref.value = cb()
	const ref = Ref(cb())
	context = null
	return ref
}


/**
 * @template   T
 *
 * { function_description }
 *
 * @param      {T}  value   The value
 * @return     {Ref<T>}  { description_of_the_return_value }
 */
function Ref(value) {
	let subs = []

	return new Proxy({ value }, {
		get(target) {
			if (context) subs.push(context)

			return target.value
		},
		set(target, _property, newValue) {
			if (target.value == newValue) return true

			target.value = newValue
			subs.forEach(cb => cb())
			return true
		},
	});
}

window.Ref = Ref
window.Act = Act
window.Computed = Computed

