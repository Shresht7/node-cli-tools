//  Library
import { wrap, ESC, RESET } from './codes'

//  ==========
//  ANSI COLOR
//  ==========

export type ANSIColor =
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
export const ansiColor = (clr: ANSIColor) => {
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
