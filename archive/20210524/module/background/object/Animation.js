import { FramesPerSecond } from '../../FramesPerSecond.js'
import { Bubble } from './Bubble.js'
import { Pane } from './Pane.js'

export class Animation {

    constructor(canvas) {
        this._canvas = canvas
        this.change()
        this._framesPerSecond = new FramesPerSecond();
    }

    change() {
        this._pane = new Pane(this._canvas)
        this._bubbles = new Array()
        for (let index = 0; index < 9; index++) {
            this._bubbles.push(Bubble.generateRandom(this._canvas))
        }
        this._bubbles.sort((circle1, circle2) => {
            if (circle1.radius > circle2.radius) {
                return -1
            } else if (circle1.radius < circle2.radius) {
                return 1
            } else {
                return 0
            }
        })
    }

    execute(timestamp) {
        this._framesPerSecond.countFrame(timestamp)
        this._pane.paint(timestamp)
        this._bubbles.forEach(circle => circle.paint(timestamp))
        requestAnimationFrame(timestamp => this.execute(timestamp))
    }

    get framesPerSecond() {
        return this._framesPerSecond.average
    }

}