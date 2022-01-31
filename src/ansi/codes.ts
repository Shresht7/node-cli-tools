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

//  Escape Code
export const ESC = EscapeCode.Unicode

//  Reset Code
export const RESET = `${ESC}[0m`

//  Miscellaneous
export const OSC = '\u001B]'
export const BEL = '\u0007'

//  --------------------
//  WRAP HELPER FUNCTION
//  --------------------

/**
 * Wrap ANSICode around string
 * @param str text to wrap string around
 * @param tuple ansiCode tuple to wrap
 */
export const wrap = (str: string, tuple: [number, number]) => `${ESC}[${tuple[0]}m${str}${ESC}[${tuple[1]}m`
