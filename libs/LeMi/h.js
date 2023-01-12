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
            React(() => el[key] = value.value)
            continue
        }
        // @ts-ignore
        el[key] = value
    }

    handleChildren(el, children)
    return el
}

/**
 * @param      {HTMLElement}    root      The root
 * @param      {Children}  children  The children
 */
function handleChildren(root, children) {
    for (const index in children) {
        let c = children[index]
        console.log(children)
        if (isRef(c)) {
            let child = getChild(c.value)
            handleChildren(root, [child])
            React(() => {
                if (!isRef(c)) return
                let newChild = getChild(c.value)
                if (isNode(newChild) && isNode(child)) {
                    root.insertBefore(newChild, child);
                    child.remove()
                    child = newChild
                }
            })
            continue
        }
        if (typeof c === 'function') {
            let divEl = div()
            React(() => {
                if (typeof c !== 'function') return
                let child = getChild(c())
                divEl.replaceChildren()
                isNode(child) && divEl.append(child);
            })
            root.append(divEl)
            continue
        }
        console.log(c)
        let child = getChild(c)
        isNode(child) && root.append(child)
    }
}

/**
 * Gets the child.
 * @template T
 * @param      {boolean | null | undefined | string | number | T}  c
 * @return     {undefined | Text | T}  The child.
 */
function getChild(c) {
    if (typeof c === 'boolean') return
    if (typeof c === 'object' && c === null) return
    if (typeof c === 'undefined') return
    if (typeof c === 'string') return document.createTextNode(c)
    if (typeof c === 'number') return document.createTextNode(String(c))
    return c
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

/**
 * Determines whether the specified value is a Ref.
 * @template T
 * @param      {T}   value   The value
 * @return     {value is Ref<T>}  True if the specified value is reference, False otherwise.
 */
function isRef(value) {
    if (value instanceof HTMLElement) return false
    return typeof value === 'object' && value && 'value' in value
}

/**
 * Determines whether the specified value is a DOM node.
 *
 * @param      {unknown}   value   The value
 * @return     {value is HTMLElement}  True if the specified value is node, False otherwise.
 */
function isNode(value) {
    return value instanceof HTMLElement || value instanceof Text
}

/**
 * @template T
 *
 * @param      {Ref<Array<T>>}             list    The list
 * @param      {(item: T, index: number) => [uniqueKey: string | number, node: HTMLElement]}  mapFn   The map function
 * @return     {HTMLElement}             { description_of_the_return_value }
 */
export function For(list, mapFn) {
    // a hack to detect a parent
    let spyNode = div()
    /** @type {Ref<ParentNode | null>} */
    let parent = Ref(null)
    let nodes = new Map()

    setTimeout(function findParent() {
        parent.value = spyNode.parentNode
        if (!parent.value) throw new Error('List must be in a parent')
        spyNode.remove()
    })

    React(() => {
        if (!parent.value) return
        let newNodes = list.value.map((item, i) => {
            let [key, newNode] = mapFn(item, i)
            let oldNode = nodes.get(key)
            if (oldNode) return oldNode
            nodes.set(key, newNode)
            return newNode
        })
        newNodes.forEach(node => parent.value?.append(node))
        nodes.forEach(node => {
            if (!newNodes.includes(node)) node.remove()
        })
    })

    return spyNode
}

Object.defineProperty(window, 'For', {
    enumerable: false,
    get: () => For,
    set(newValue) {
        throw new Error('You cannot override property "For".\n "For" is reserved for creating elements.')
    }
});

