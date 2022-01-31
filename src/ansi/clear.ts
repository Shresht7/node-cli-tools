//  Library
import { ESC } from './codes'

//  =====
//  CLEAR
//  =====

const clear = {
    screen: `${ESC}[J`,
    cursorAndBelow: `${ESC}[0J`,
    cursorAndAbove: `${ESC}[1J`,
    entireScreen: `${ESC}[2J`,
    line: `${ESC}[K`,
    lineFromCursor: `${ESC}[0K`,
    lineToCursor: `${ESC}[1K`,
    entireLine: `${ESC}[2K`,
}

//  ----------------
export default clear
//  ----------------