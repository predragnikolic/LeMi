import './h.js'
import './ref.js'


/**
 * @param      {{name: string, age: number}}  props   The properties
 */
function Card({ name, age }) {
    let x = Ref(0)
    let y = Ref(0)
    let toggle = Ref(true)
    let people = Ref([1, 2, 3, 4])

    let person = {
        ime: x
    }

    Act(() => console.log('people', people.value))

    setInterval(() => x.value++, 1000)

    return div({ style: { background: '#eee', color: '#333' } }, [
        p({ onclick: () => { toggle.value = !toggle.value } },
            ['Ime:', name, person.ime]),

        () => toggle.value
            ? div(['pedja'])
            : div(['hello']),

        ul({ onclick: () => { people.value = [...people.value, x.value] } }, [
            'People:',
            For(people, (person, i) => li([person, i])),
            'end'
        ]),
        'ee',
        Foo({ z: x })
    ])
}


/**
 * @param      {{z: Ref<number>}}  props   The properties
 */
function Foo({ z }) {
    const className = Memo(() => `hello ${z}`)
    return p({ className }, [z])
}

let root = p({
    className: 'hello you'
}, [
    Card({ name: 'pedja', age: 27 }),
    // Card({ name: 'ana', age: 27 })
])

document.body.appendChild(root)