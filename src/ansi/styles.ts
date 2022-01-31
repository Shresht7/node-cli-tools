//  Library
import { wrap } from './codes'

//  ==========
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
    bold: [1, 22],  //  21 doesn't work for some reason, 22 does the trick though
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
