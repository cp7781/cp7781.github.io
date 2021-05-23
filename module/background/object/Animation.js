import { FramesPerSecond } from '../../FramesPerSecond.js'
import { Circle } from './Circle.js'
import { Pane } from './Pane.js'

export class Animation {

    constructor(canvas) {
        this.drawboard = canvas
        this.change()
        this._framesPerSecond = new FramesPerSecond();
    }

    change() {
        this.pane = new Pane(this.drawboard)
        this.circles = new Array()
        for (let index = 0; index < 9; index++) {
            this.circles.push(Circle.generateRandomCircle(this.drawboard))
        }
        this.circles.sort((circle1, circle2) => {
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
        this.pane.draw(timestamp)
        this.circles.forEach(circle => circle.draw(timestamp))
        requestAnimationFrame(timestamp => this.execute(timestamp))
    }

    get framesPerSecond() {
        return this._framesPerSecond.average
    }

}