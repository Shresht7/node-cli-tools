/** Check whether Node.js is running with a text-terminal context attached */
export const isTTY = () => { if (!process.stdout.isTTY) { throw Error('Not running with a text-terminal context attached') } }
