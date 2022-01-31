//  Library
import { isTTY } from './nodeIsTTY'
import cursor from './cursor'
import clear from './clear'

//  ========
//  RENDERER
//  ========

export class Renderer {

    private fps: number = 1000 / 60

    private setup = () => { }
    private draw = () => { }

    constructor({ setup, draw, fps }: { setup: () => void, draw: () => void, fps: number }) {
        isTTY()

        process.stdout.write(cursor.hide)
        process.stdout.write(clear.entireScreen)

        this.fps = fps || (1000 / 60)

        this.setup = setup
        this.draw = draw

        process.on('SIGINT', this.stop)
        process.stdin.on('data', this.stop)
        process.stdout.on('resize', this.stop)
    }

    private _nextFrame = () => {
        this.draw()
        setImmediate(this._nextFrame)
    }

    run = () => {
        this.setup()
        setImmediate(this._nextFrame)
    }

    runInterval = () => {
        this.setup()
        setInterval(() => this.draw(), this.fps)
    }

    stop = () => {
        process.stdout.write(clear.entireScreen)
        process.stdout.write(cursor.show)
        process.exit(1)
    }

}