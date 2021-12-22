//  =================
//  ANSI ESCAPE CODES
//  =================

//  ESCAPE CODES : Unicode | Ctrl | Octal  | Hexadecimal | Decimal
export type escapeCode = '\u001b' | '^[' | '\033' | '\x1b' | '27'

export const ESC: escapeCode = '\u001b'
export const OSC = '\u001B]'
export const BEL = '\u0007'
export const RESET = `${ESC}[0m`

const wrap = (str: string, tuple: [number, number]) => `${ESC}[${tuple[0]}m${str}${ESC}[${tuple[1]}m`

type ANSIColor =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'default'

const color: Record<ANSIColor, [number, number]> = {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    default: [39, 39],
}

const bgOffset = 10
const brightOffset = 60

const ansiColor = (clr: ANSIColor) => {
    const c = (str: string) => wrap(str, color[clr])
    c.bg = (str: string) => wrap(str, color[clr].map(x => x + bgOffset) as [number, number])
    c.bright = (str: string) => wrap(str, color[clr].map(x => x + brightOffset) as [number, number])
    c.bgBright = (str: string) => wrap(str, color[clr].map(x => x + bgOffset + brightOffset) as [number, number])
    return c
}

export const black = ansiColor('black')
export const red = ansiColor('red')
export const green = ansiColor('green')
export const yellow = ansiColor('yellow')
export const blue = ansiColor('blue')
export const magenta = ansiColor('magenta')
export const cyan = ansiColor('cyan')
export const white = ansiColor('white')

export const rgb = (str: string, [r, g, b]: [number, number, number]) => `${ESC}[38;2;${r};${g};${b}m${str}${RESET}`
rgb.bg = (str: string, [r, g, b]: [number, number, number]) => `${ESC}[48;2;${r};${g};${b}m${str}${RESET}`

type ANSIStyle =
    | 'bold'
    | 'faint'
    | 'italic'
    | 'underline'
    | 'blinking'
    | 'inverse'
    | 'hidden'
    | 'strikethrough'

export const style: Record<ANSIStyle, [number, number]> = {
    bold: [1, 21],
    faint: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    blinking: [5, 25],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
}

export const bold = (str: string) => wrap(str, style.bold)
export const faint = (str: string) => wrap(str, style.faint)
export const italic = (str: string) => wrap(str, style.italic)
export const underline = (str: string) => wrap(str, style.underline)
export const blinking = (str: string) => wrap(str, style.blinking)
export const inverse = (str: string) => wrap(str, style.inverse)
export const hidden = (str: string) => wrap(str, style.hidden)
export const strikethrough = (str: string) => wrap(str, style.strikethrough)

export const cursor = {
    toHome: `${ESC}[H`,
    toPos: (row: number = 0, column: number = 0) => `${ESC}[${row};${column}H`,
    up: (n: number = 1) => `${ESC}[${n}A`,
    down: (n: number = 1) => `${ESC}[${n}B`,
    right: (n: number = 1) => `${ESC}[${n}C`,
    left: (n: number = 1) => `${ESC}[${n}D`,
    toNextLine: (n: number = 1) => `${ESC}[${n}E`,
    toPrevLine: (n: number = 1) => `${ESC}[${n}F`,
    toColumn: (n: number = 0) => `${ESC}[${n}G`,
    requestPosition: `${ESC}[6n`,
    show: `${ESC}[?25h`,
    hide: `${ESC}[?25l`,
    //  The following commands have not been standardized and may have different functionality across different terminal applications. DEC Sequences are recommended.
    save: (mode: 'DEC' | 'SOC' = 'DEC') => mode === 'DEC' ? `${ESC}7` : `${ESC}[s`,   //  Save the current cursor position
    restore: (mode: 'DEC' | 'SOC') => mode === 'DEC' ? `${ESC}8` : `${ESC}[u`    //  Restores the cursor to the last saved position
}

export const clear = {
    screen: `${ESC}[J`,
    cursorAndBelow: `${ESC}[0J`,
    cursorAndAbove: `${ESC}[1J`,
    entireScreen: `${ESC}[2J`,
    line: `${ESC}[K`,
    lineFromCursor: `${ESC}[0K`,
    lineToCursor: `${ESC}[1K`,
    entireLine: `${ESC}[2K`,
}

export const link = (text: string, url: string) => `${OSC}8;;${url}${BEL}${text}${OSC}8;;${BEL}` //  Returns a link

export const bell = BEL

export const screen = {
    save: `${ESC}[?47h`,
    restore: `${ESC}[?47l`
}

export const altBuffer = {
    enable: `${ESC}[?1049h`,
    disable: `${ESC}[?1049l`
}

console.log(`${inverse(' Hello ')} ${bold(rgb.bg(' World ', [224, 21, 221]))} ${yellow('!!!')}`)