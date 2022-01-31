//  Library
import { OSC, BEL, ESC } from './codes'

//  =============
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