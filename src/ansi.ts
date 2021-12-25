//  =================
//  ANSI ESCAPE CODES
//  =================

//  ESCAPE CODES : Unicode | Ctrl | Octal  | Hexadecimal | Decimal
export enum EscapeCode {
    Unicode = '\u001b',
    Ctrl = '^[',
    Octal = '\033',
    Hexadecimal = '\x1b',
    Decimal = '27'
}

export const ESC: EscapeCode = EscapeCode.Unicode
export const OSC = '\u001B]'
export const BEL = '\u0007'
export const RESET = `${ESC}[0m`

//  HELPER FUNCTION
//  ===============

/** Check whether Node.js is running with a text-terminal context attached */
export const isTTY = () => { if (!process.stdout.isTTY) { throw Error('Not running with a text-terminal context attached') } }

/**
 * Wrap ANSICode around string
 * @param str text to wrap string around
 * @param tuple ansiCode tuple to wrap
 */
const wrap = (str: string, tuple: [number, number]) => `${ESC}[${tuple[0]}m${str}${ESC}[${tuple[1]}m`

/**
 * Pipes the given functions
 * @param fns Functions to pipe together
 * @returns Piped functions
 */
export const pipe = (...fns: ((s: string) => string)[]) => (s: string) => fns.reduce((acc, currFn) => currFn(acc), s)

/**
 * Composes the given functions
 * @param fns Functions to compose together
 * @returns Composed functions
 */
export const compose = (...fns: ((s: string) => string)[]) => (s: string) => fns.reduceRight((acc, currFn) => currFn(acc), s)

//  ANSI COLOR
//  ==========

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

/** Background offset */
const bgOffset = 10
/** Bright-color offset */
const brightOffset = 60

/**
 * Initializes ANSIColor code functions
 * @param clr ANSIColor code
 * @returns Function to apply colors
 */
const ansiColor = (clr: ANSIColor) => {
    const c = (str: string) => wrap(str, color[clr])
    c.bg = (str: string) => wrap(str, color[clr].map(x => x + bgOffset) as [number, number])
    c.bright = (str: string) => wrap(str, color[clr].map(x => x + brightOffset) as [number, number])
    c.bgBright = (str: string) => wrap(str, color[clr].map(x => x + bgOffset + brightOffset) as [number, number])
    return c
}

/** Colors the string black */
export const black = ansiColor('black')
/** Colors the string red */
export const red = ansiColor('red')
/** Colors the string green */
export const green = ansiColor('green')
/** Colors the string yellow */
export const yellow = ansiColor('yellow')
/** Colors the string blue */
export const blue = ansiColor('blue')
/** Colors the string magenta */
export const magenta = ansiColor('magenta')
/** Colors the string cyan */
export const cyan = ansiColor('cyan')
/** Colors the string white */
export const white = ansiColor('white')

/** Colors the string with the given rgb values */
export const rgb = (str: string, [r, g, b]: [number, number, number]) => `${ESC}[38;2;${r};${g};${b}m${str}${RESET}`
rgb.bg = (str: string, [r, g, b]: [number, number, number]) => `${ESC}[48;2;${r};${g};${b}m${str}${RESET}`

//  ANSI STYLE
//  ==========

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

/** Makes the string bold */
export const bold = (str: string) => wrap(str, style.bold)
/** Makes the string faint */
export const faint = (str: string) => wrap(str, style.faint)
/** Makes the string italic */
export const italic = (str: string) => wrap(str, style.italic)
/** Makes the string underlined */
export const underline = (str: string) => wrap(str, style.underline)
/** Makes the string blink */
export const blinking = (str: string) => wrap(str, style.blinking)
/** Inverts the string's colors */
export const inverse = (str: string) => wrap(str, style.inverse)
/** Hides the string */
export const hidden = (str: string) => wrap(str, style.hidden)
/** Strikethrough a string */
export const strikethrough = (str: string) => wrap(str, style.strikethrough)
/** Add padding around text */
export const pad = (str: string, n: number = 1) => ' '.repeat(n) + str + ' '.repeat(n)

//  CURSOR MANIPULATION
//  ===================

/** ANSI Cursor Manipulation */
export const cursor = {
    /** Moves the cursor back to home position (0, 0) */
    toHome: `${ESC}[H`,
    /** Moves the cursor back to given row and column */
    toPos: (row: number = 0, column: number = 0) => `${ESC}[${row};${column}H`,
    /** Moves the cursor up by n number of lines */
    up: (n: number = 1) => `${ESC}[${n}A`,
    /** Moves the cursor down by n number of lines */
    down: (n: number = 1) => `${ESC}[${n}B`,
    /** Moves the cursor right by n number of lines */
    right: (n: number = 1) => `${ESC}[${n}C`,
    /** Moves the cursor left by n number of lines */
    left: (n: number = 1) => `${ESC}[${n}D`,
    /** Moves the cursor to the nth next line */
    toNextLine: (n: number = 1) => `${ESC}[${n}E`,
    /** Moves the cursor to the nth prev line */
    toPrevLine: (n: number = 1) => `${ESC}[${n}F`,
    /** Moves the cursor to a given column position */
    toColumn: (n: number = 0) => `${ESC}[${n}G`,
    /** Returns the current cursor position */
    requestPosition: `${ESC}[6n`,
    /** Makes the cursor visible */
    show: `${ESC}[?25h`,
    /** Makes the cursor invisible */
    hide: `${ESC}[?25l`,
    //  The following commands have not been standardized and may have different functionality across different terminal applications. DEC Sequences are recommended.
    /** Saves the current cursor position */
    save: (mode: 'DEC' | 'SOC' = 'DEC') => mode === 'DEC' ? `${ESC}7` : `${ESC}[s`,
    /** Restores the current cursor position */
    restore: (mode: 'DEC' | 'SOC') => mode === 'DEC' ? `${ESC}8` : `${ESC}[u`
}

//  CLEAR
//  =====

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

//  MISCELLANEOUS
//  =============

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

//  ============
//  ANSI BUILDER
//  ============

/**
 * ANSI template string builder
 * 
 * example: console.log(ansi`This ${compose(bold, red, italic)} is ${inverse} the ${pad('BEST!')} `)
 */
export const ansi = (templateStr: TemplateStringsArray, ...rest: (string | ((str: string) => string))[]) => {
    return templateStr.reduce((acc, curr, i) => {

        //  If the preceding parameter is a function, execute it on the current template string
        if (typeof rest[i - 1] === 'function') {
            const res = (rest[i - 1] as (s: string) => string)(curr)
            acc += res
        }

        //  If the template parameter is a string then return normally
        if (typeof rest[i] === 'string') {
            acc += rest[i] || ''
        }

        return acc
    })
}

//  ========
//  RENDERER
//  ========

export class Renderer {

    private setup = () => { }
    private draw = () => { }

    constructor({ setup, draw }: { setup: () => void, draw: () => void }) {
        isTTY()

        process.stdout.write(cursor.hide)
        process.stdout.write(clear.entireScreen)

        this.setup = setup
        this.draw = draw

        process.on('SIGINT', this.stop)
        process.stdin.on('data', this.stop)
        process.stdout.on('resize', this.stop)
    }

    private _nextFrame = () => {
        this.draw()
        setImmediate(this._nextFrame)
    }

    run = () => {
        this.setup()
        setImmediate(this._nextFrame)
    }

    stop = () => {
        process.stdout.write(clear.entireScreen)
        process.stdout.write(cursor.show)
        process.exit(1)
    }

}