//  ====
//  ANSI
//  ====

const ansi = (string: TemplateStringsArray, ...rest: string[]) => {
    const result = string.reduce((acc, curr, i) => `${acc}${curr}${rest?.[i]}`)
    return result
}

console.log(ansi`Hello from ${'the'} otter ${'side'}`)

export default ansi