
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
        // @ts-ignore
        el[key] = value
    }

    /**
     * @param      {Children}  children  The children
     */
    function handleChildren(children) {
        for (const c of children) {
            if (typeof c === 'boolean') continue
            if (typeof c === 'object' && c === null) continue
            if (typeof c === 'undefined') continue
            if (typeof c === 'string') {
                el.append(document.createTextNode(c))
                continue
            }
            if (Array.isArray(c)) {
                handleChildren(c)
                continue
            }
            el.append(c)
        }
    }

    handleChildren(children)
    return el
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

    // @ts-ignore
    window[tag] = helper
}