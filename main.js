import './h.js'
import './ref.js'

/**
 * @param      {{title: string, body: HTMLElement}}  props   The properties
 */
function Accordion({ title, body }) {
    const open = Ref(false)

    return div([
        section({ onclick: () => open.value = !open.value }, [title]),
        () => open.value && section([body])
    ])
}


/**
 * Reuse refs where you need them.
 */
function mouseCoords() {
    let x = Ref(0)
    let y = Ref(0)

    addEventListener('mousemove', (e) => {
        x.value = e.clientX
        y.value = e.clientY
    })

    return { x, y }
}

function Food() {
    let { x, y } = mouseCoords()

    Act(() => console.log(`x is ${x} y is ${y}`))

    return p()
}

/**
 * @param      {{name: string, age: number}}  props   The properties
 */
function Card({ name, age }) {
    let x = Ref(0)
    let y = Ref(0)
    let toggle = Ref(false)
    let id = {
        v: 3,
        valueOf() {
            this.v++
            return this.v
        }
    }
    let people = Ref([
        { id: id.valueOf(), text: '1' },
        { id: id.valueOf(), text: '2' },
        { id: id.valueOf(), text: '3' }
    ])
    let person = {
        ime: x
    }

    setInterval(() => x.value++, 1000)

    Act(() => console.log(people.value))

    return div({ style: { background: '#eee', color: '#333' } }, [
        // Children examples
        'You can use a string',
        23,
        false,
        true,
        null,
        // Element definition #1
        p(),
        // Element definition #2
        p(['Hello world!']),
        // Element definition #3
        p({ className: 'important' }, ['Hello world!']),

        // Event handlers
        p({
            onclick() { console.log('Hello') }
        }, [
            'Click me'
        ]),
        button(['dsad']),

        // Don't need .value for refs in render
        p(['X:', x]),
        // Y will not update! because .value is used
        p(['Y:', y.value]),

        p({ onclick: () => toggle.value = !toggle.value }, [
            'Toggle'
        ]),
        // ifs in render
        // sadly cannot find a way to write toggle ? doThis : doThat...
        // instead must use () => ref.value ? doThis : doThat
        () => toggle.value
            ? 'do this'
            : 'do that',
        // ifs in render 2 example
        () => toggle.value && 'The toggle is on',

        // list rendering
        ol({ onclick: () => { people.value = [...people.value, { id: id.valueOf(), text: String(x.value) }] } }, [
            For(people, (person, i) => [person.id, li([person.text, i])])
        ]),

        // Using custom components,
        // Food(),
        // passing reactive props
        Foo({ z: x }),

        // more examples
        For(people, (person) => [person.id, Accordion({
            title: 'Naslov',
            // passing children as props however you want
            body: p([person.text, button({ onclick() { people.value = people.value.filter((p) => p.id !== person.id) } }, ['remove'])])
        })]),
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