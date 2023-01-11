import './h.js'
import './ref.js'


let root = p({
    className: 'some_class_name'
}, [
    Card({ name: 'Pedja', age: 27 })
])

document.body.appendChild(root)

/**
 * @param      {{name: string, age: number}}  props   The properties
 */
function Card({ name, age }) {
    let x = Ref(0)
    let y = Ref(0)
    let toggle = Ref(false)
    let id = 0
    let people = Ref([
        { id: id++, text: '1' },
        { id: id++, text: '2' },
        { id: id++, text: '3' }
    ])
    // nested refs
    let nestRefsInObjectForNestedReactivity = {
        name,
        age,
        ime: x // reactive
    }
    Act(() => console.log('this works', nestRefsInObjectForNestedReactivity.ime))

    setInterval(() => x++, 1000)

    Act(() => console.log(people))

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
        button(['Some button']),

        // Don't need .value for refs in render
        p(['X:', x]),
        // Y will not update! because .value is used
        p(['Y:', y]),

        p({ onclick() { toggle = !toggle } }, [
            'Toggle'
        ]),
        // ifs in render
        // sadly cannot find a way to write toggle ? doThis : doThat...
        // instead must use () => ref.value ? doThis : doThat
        toggle ? 'do this' : 'do that',
        // ifs in render 2 example
        toggle && 'The toggle is on',

        // list rendering
        ol({ onclick: () => { people = [...people, { id: id++, text: String(x) }] } }, [
            people.map((person, i) => [person.id,
            li([
                person.text
            ])
            ])
        ]),

        // Using custom components,
        Food(),
        // passing reactive props
        Foo({ z: x }),

        // more examples
        people.map((person) => [person.id,
        Accordion({
            title: 'Title',
            // passing children as props however you want
            body: p([person.text, button({ onclick() { people.value = people.value.filter((p) => p.id !== person.id) } }, ['Remove'])])
        })
        ]),
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
 * @param      {{z: Ref<number>}}  props   The properties
 */
function Foo({ z }) {
    const className = Memo(() => `Hello ${z}`)

    return p({ className }, [z])
}

/**
 * @param      {{title: string, body: HTMLElement}}  props   The properties
 */
function Accordion({ title, body }) {
    const open = Ref(false)

    return div([
        section({ onclick() { open.value = !open.value } }, [title]),
        () => open.value && section([body])
    ])
}