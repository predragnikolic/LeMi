
/**
 * @template   {keyof HTMLElementTagNameMap} TagName
 *
 * @param      {TagName}                         tagName     The tag name
 * @param      {HtmlAttributes<TagName>}             attributes  The attributes
 * @param      {Children}                        children    The children
 * @return     {HTMLElementTagNameMap[TagName]}
 */
function h(tagName, attributes, children) {
    let el = document.createElement(tagName)
    for (let key in attributes) {
        if (key === 'style') {
            const styles = attributes[key]
            for (let s in styles) {
                // @ts-ignore
                el.style[s] = styles[s]
            }
            continue
        }
        const value = attributes[key]
        if (isRef(value)) {
            // @ts-ignore
            Act(() => el[key] = value.value)
            continue
        }
        // @ts-ignore
        el[key] = value
    }

    handleChildren(el, children)
    return el
}

/**
     * { function_description }
     *
     * @param      {HTMLElement}    root      The root
     * @param      {Children}  children  The children
     */
function handleChildren(root, children) {
    for (const index in children) {
        let c = children[index]
        if (isRef(c)) {
            let child = getChild(c.value)
            handleChildren(root, [child])
            Act(() => {
                let newChild = getChild(c.value)
                root.insertBefore(newChild, child);
                child.remove()
                child = newChild
            })
            continue
        }
        root.append(getChild(c))
    }
}

function getChild(c) {
    if (typeof c === 'boolean') return
    if (typeof c === 'object' && c === null) return
    if (typeof c === 'undefined') return
    if (typeof c === 'string') return document.createTextNode(c)
    if (typeof c === 'number') return document.createTextNode(String(c))
    return c
}

function bindRef(value) {
    const textNode = document.createTextNode(String(value.value))
    Act(() => textNode.textContent = String(value.value))
    return textNode
}

/** @type {TagName[]} */
const TAG_NAMES = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'slot',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
];


for (const tag of TAG_NAMES) {

    /**
     *
     * @param      {Attrs<typeof tag>}  attrs   The attributes
     */
    const helper = (...attrs) => {
        if (attrs.length == 0) return h(tag, {}, [])

        if (attrs.length == 1) return h(tag, {}, attrs[0])

        if (attrs.length == 2) return h(tag, attrs[0], attrs[1])

        throw new Error('Specify attributes and children. Or just specify children')
    }

    Object.defineProperty(window, tag, {
        enumerable: false,
        get: () => helper,
        set(newValue) {
            throw new Error(`You cannot override property "${tag}".\n "${tag}" is used to create elements.`)
        }
    });
}

export function isRef(value) {
    return typeof value === 'object' && value && 'value' in value
}



let listID = 0
/**
 * @template T
 *
 * @param      {Ref<Array<T>>}             list    The list
 * @param      {(item: T, index: number) => HTMLElement}  mapFn   The map function
 * @return     {HTMLElement}             { description_of_the_return_value }
 */
export function For(list, mapFn) {
    let fragment = div()
    let parent = Ref(null)
    let nodes = []
    let previousSibling, nextSibling;

    setTimeout(() => {
        previousSibling = fragment.previousSibling
        nextSibling = fragment.nextSibling
        parent.value = fragment.parentNode
        if (!parent.value) throw new Error('List must be in a parent')
        // fragment.remove()
    })

    Act(() => {
        if (!parent.value) return
        let newNodes = list.value.map((item, i) => mapFn(item, i))
        if (previousSibling) {
            [...newNodes].reverse().forEach(node => previousSibling.after(node))
        } else if (nextSibling) {
            newNodes.forEach(node => nextSibling.before(node))
        } else {
            // append to parrent
            newNodes.forEach(node => parent.value.append(node))
        }
        nodes.forEach(node => node.remove())
        nodes = newNodes
    })

    return fragment
}

window.For = For

