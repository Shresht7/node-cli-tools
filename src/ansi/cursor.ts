//  Library
import { ESC } from './codes'

//  ===================
//  CURSOR MANIPULATION
//  ===================

/** ANSI Cursor Manipulation */
const cursor = {
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

//  -----------------
export default cursor
//  -----------------