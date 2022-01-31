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
