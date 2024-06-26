type Ref<T> = T

type Context<Return = unknown> = () => Ref<Return>
declare function Ref<T>(value: T): Ref<T>
declare function React(cb: Context<void>): void
declare function Memo<Ret>(cb: Context<Ret>): Ref<Ret>
declare function For<T>(refArray: Ref<Array<T>>, mapToEl: (item: T, index: number) => [uniqueKey: string | number, node: HTMLElement]): HTMLElement
declare function Peek<T>(ref: Ref<T>): T
declare function Read<T>(ref: Ref<T> | T): T

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

type DeepRef<T> = T extends object ? {
  [P in keyof T]: DeepRef<T[P]> | Ref<T[P]>;
} : T

type TagName = keyof HTMLElementTagNameMap

type HtmlAttributes<T extends TagName> = DeepRef<DeepPartial<HTMLElementTagNameMap[T]>>

type Child = HTMLElement | Text | boolean | null | undefined | string | number | Ref<unknown> | (() => Child)
type Children = Child[]

DeepPartial < HTMLElementTagNameMap[T]

type Attrs<T extends TagName> = [HtmlAttributes<T>, Children] | [Children] | []

declare function a(...attrs: Attrs<'a'>): HTMLElementTagNameMap['a']
declare function abbr(...attrs: Attrs<'abbr'>): HTMLElementTagNameMap['abbr']
declare function address(...attrs: Attrs<'address'>): HTMLElementTagNameMap['address']
declare function area(...attrs: Attrs<'area'>): HTMLElementTagNameMap['area']
declare function article(...attrs: Attrs<'article'>): HTMLElementTagNameMap['article']
declare function aside(...attrs: Attrs<'aside'>): HTMLElementTagNameMap['aside']
declare function audio(...attrs: Attrs<'audio'>): HTMLElementTagNameMap['audio']
declare function b(...attrs: Attrs<'b'>): HTMLElementTagNameMap['b']
declare function base(...attrs: Attrs<'base'>): HTMLElementTagNameMap['base']
declare function bdi(...attrs: Attrs<'bdi'>): HTMLElementTagNameMap['bdi']
declare function bdo(...attrs: Attrs<'bdo'>): HTMLElementTagNameMap['bdo']
declare function blockquote(...attrs: Attrs<'blockquote'>): HTMLElementTagNameMap['blockquote']
declare function body(...attrs: Attrs<'body'>): HTMLElementTagNameMap['body']
declare function br(...attrs: Attrs<'br'>): HTMLElementTagNameMap['br']
declare function button(...attrs: Attrs<'button'>): HTMLElementTagNameMap['button']
declare function canvas(...attrs: Attrs<'canvas'>): HTMLElementTagNameMap['canvas']
declare function caption(...attrs: Attrs<'caption'>): HTMLElementTagNameMap['caption']
declare function cite(...attrs: Attrs<'cite'>): HTMLElementTagNameMap['cite']
declare function code(...attrs: Attrs<'code'>): HTMLElementTagNameMap['code']
declare function col(...attrs: Attrs<'col'>): HTMLElementTagNameMap['col']
declare function colgroup(...attrs: Attrs<'colgroup'>): HTMLElementTagNameMap['colgroup']
declare function data(...attrs: Attrs<'data'>): HTMLElementTagNameMap['data']
declare function datalist(...attrs: Attrs<'datalist'>): HTMLElementTagNameMap['datalist']
declare function dd(...attrs: Attrs<'dd'>): HTMLElementTagNameMap['dd']
declare function del(...attrs: Attrs<'del'>): HTMLElementTagNameMap['del']
declare function details(...attrs: Attrs<'details'>): HTMLElementTagNameMap['details']
declare function dfn(...attrs: Attrs<'dfn'>): HTMLElementTagNameMap['dfn']
declare function dialog(...attrs: Attrs<'dialog'>): HTMLElementTagNameMap['dialog']
declare function div(...attrs: Attrs<'div'>): HTMLElementTagNameMap['div']
declare function dl(...attrs: Attrs<'dl'>): HTMLElementTagNameMap['dl']
declare function dt(...attrs: Attrs<'dt'>): HTMLElementTagNameMap['dt']
declare function em(...attrs: Attrs<'em'>): HTMLElementTagNameMap['em']
declare function embed(...attrs: Attrs<'embed'>): HTMLElementTagNameMap['embed']
declare function fieldset(...attrs: Attrs<'fieldset'>): HTMLElementTagNameMap['fieldset']
declare function figcaption(...attrs: Attrs<'figcaption'>): HTMLElementTagNameMap['figcaption']
declare function figure(...attrs: Attrs<'figure'>): HTMLElementTagNameMap['figure']
declare function footer(...attrs: Attrs<'footer'>): HTMLElementTagNameMap['footer']
declare function form(...attrs: Attrs<'form'>): HTMLElementTagNameMap['form']
declare function h1(...attrs: Attrs<'h1'>): HTMLElementTagNameMap['h1']
declare function h2(...attrs: Attrs<'h2'>): HTMLElementTagNameMap['h2']
declare function h3(...attrs: Attrs<'h3'>): HTMLElementTagNameMap['h3']
declare function h4(...attrs: Attrs<'h4'>): HTMLElementTagNameMap['h4']
declare function h5(...attrs: Attrs<'h5'>): HTMLElementTagNameMap['h5']
declare function h6(...attrs: Attrs<'h6'>): HTMLElementTagNameMap['h6']
declare function head(...attrs: Attrs<'head'>): HTMLElementTagNameMap['head']
declare function header(...attrs: Attrs<'header'>): HTMLElementTagNameMap['header']
declare function hgroup(...attrs: Attrs<'hgroup'>): HTMLElementTagNameMap['hgroup']
declare function hr(...attrs: Attrs<'hr'>): HTMLElementTagNameMap['hr']
declare function html(...attrs: Attrs<'html'>): HTMLElementTagNameMap['html']
declare function i(...attrs: Attrs<'i'>): HTMLElementTagNameMap['i']
declare function iframe(...attrs: Attrs<'iframe'>): HTMLElementTagNameMap['iframe']
declare function img(...attrs: Attrs<'img'>): HTMLElementTagNameMap['img']
declare function input(...attrs: Attrs<'input'>): HTMLElementTagNameMap['input']
declare function ins(...attrs: Attrs<'ins'>): HTMLElementTagNameMap['ins']
declare function kbd(...attrs: Attrs<'kbd'>): HTMLElementTagNameMap['kbd']
declare function label(...attrs: Attrs<'label'>): HTMLElementTagNameMap['label']
declare function legend(...attrs: Attrs<'legend'>): HTMLElementTagNameMap['legend']
declare function li(...attrs: Attrs<'li'>): HTMLElementTagNameMap['li']
declare function link(...attrs: Attrs<'link'>): HTMLElementTagNameMap['link']
declare function main(...attrs: Attrs<'main'>): HTMLElementTagNameMap['main']
declare function map(...attrs: Attrs<'map'>): HTMLElementTagNameMap['map']
declare function mark(...attrs: Attrs<'mark'>): HTMLElementTagNameMap['mark']
declare function menu(...attrs: Attrs<'menu'>): HTMLElementTagNameMap['menu']
declare function meta(...attrs: Attrs<'meta'>): HTMLElementTagNameMap['meta']
declare function meter(...attrs: Attrs<'meter'>): HTMLElementTagNameMap['meter']
declare function nav(...attrs: Attrs<'nav'>): HTMLElementTagNameMap['nav']
declare function noscript(...attrs: Attrs<'noscript'>): HTMLElementTagNameMap['noscript']
declare function object(...attrs: Attrs<'object'>): HTMLElementTagNameMap['object']
declare function ol(...attrs: Attrs<'ol'>): HTMLElementTagNameMap['ol']
declare function optgroup(...attrs: Attrs<'optgroup'>): HTMLElementTagNameMap['optgroup']
declare function option(...attrs: Attrs<'option'>): HTMLElementTagNameMap['option']
declare function output(...attrs: Attrs<'output'>): HTMLElementTagNameMap['output']
declare function p(...attrs: Attrs<'p'>): HTMLElementTagNameMap['p']
declare function picture(...attrs: Attrs<'picture'>): HTMLElementTagNameMap['picture']
declare function pre(...attrs: Attrs<'pre'>): HTMLElementTagNameMap['pre']
declare function progress(...attrs: Attrs<'progress'>): HTMLElementTagNameMap['progress']
declare function q(...attrs: Attrs<'q'>): HTMLElementTagNameMap['q']
declare function rp(...attrs: Attrs<'rp'>): HTMLElementTagNameMap['rp']
declare function rt(...attrs: Attrs<'rt'>): HTMLElementTagNameMap['rt']
declare function ruby(...attrs: Attrs<'ruby'>): HTMLElementTagNameMap['ruby']
declare function s(...attrs: Attrs<'s'>): HTMLElementTagNameMap['s']
declare function samp(...attrs: Attrs<'samp'>): HTMLElementTagNameMap['samp']
declare function script(...attrs: Attrs<'script'>): HTMLElementTagNameMap['script']
declare function section(...attrs: Attrs<'section'>): HTMLElementTagNameMap['section']
declare function select(...attrs: Attrs<'select'>): HTMLElementTagNameMap['select']
declare function slot(...attrs: Attrs<'slot'>): HTMLElementTagNameMap['slot']
declare function small(...attrs: Attrs<'small'>): HTMLElementTagNameMap['small']
declare function source(...attrs: Attrs<'source'>): HTMLElementTagNameMap['source']
declare function span(...attrs: Attrs<'span'>): HTMLElementTagNameMap['span']
declare function strong(...attrs: Attrs<'strong'>): HTMLElementTagNameMap['strong']
declare function style(...attrs: Attrs<'style'>): HTMLElementTagNameMap['style']
declare function sub(...attrs: Attrs<'sub'>): HTMLElementTagNameMap['sub']
declare function summary(...attrs: Attrs<'summary'>): HTMLElementTagNameMap['summary']
declare function sup(...attrs: Attrs<'sup'>): HTMLElementTagNameMap['sup']
declare function table(...attrs: Attrs<'table'>): HTMLElementTagNameMap['table']
declare function tbody(...attrs: Attrs<'tbody'>): HTMLElementTagNameMap['tbody']
declare function td(...attrs: Attrs<'td'>): HTMLElementTagNameMap['td']
declare function template(...attrs: Attrs<'template'>): HTMLElementTagNameMap['template']
declare function textarea(...attrs: Attrs<'textarea'>): HTMLElementTagNameMap['textarea']
declare function tfoot(...attrs: Attrs<'tfoot'>): HTMLElementTagNameMap['tfoot']
declare function th(...attrs: Attrs<'th'>): HTMLElementTagNameMap['th']
declare function thead(...attrs: Attrs<'thead'>): HTMLElementTagNameMap['thead']
declare function time(...attrs: Attrs<'time'>): HTMLElementTagNameMap['time']
declare function title(...attrs: Attrs<'title'>): HTMLElementTagNameMap['title']
declare function tr(...attrs: Attrs<'tr'>): HTMLElementTagNameMap['tr']
declare function track(...attrs: Attrs<'track'>): HTMLElementTagNameMap['track']
declare function u(...attrs: Attrs<'u'>): HTMLElementTagNameMap['u']
declare function ul(...attrs: Attrs<'ul'>): HTMLElementTagNameMap['ul']
declare function video(...attrs: Attrs<'video'>): HTMLElementTagNameMap['video']
declare function wbr(...attrs: Attrs<'wbr'>): HTMLElementTagNameMap['wbr']