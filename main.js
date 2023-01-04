import './h.js'
import './ref.js'

let root = p({
    className: 'hello you',
    onclick() {
        console.log('eee')
    },
}, [
    Card({ name: 'pedja', age: 27 }),
    Card({ name: 'ana', age: 27 })
])

let x = Ref(2)
let y = Ref(2)


let double = Computed(() => x.value * 2)

let four = Computed(() => double.value * 4)


Act(() => {
    console.log('1x is :', x.value)
    console.log('2x is :', double.value)
    console.log('4x is :', four.value)
})


x.value = 1

/**
 * @param      {{name: string, age: number}}  props   The properties
 */
function Card(props) {
    const people = [1, 1]

    return div({ style: { background: '#eee', color: '#333' } }, [
        p(['Ime:', props.name]),
        p([
            'Punolet|an/na:',
            props.age > 18 ? 'da' : 'ne'
        ]),
        hr()
    ])
}


document.body.appendChild(root)