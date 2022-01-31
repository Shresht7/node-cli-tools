//  ================
//  HELPER FUNCTIONS
//  ================

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
