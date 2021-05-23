import { Color } from './Color.js'
import { Randomizer } from './Randomizer.js'

export class Pane {

    constructor(canvas) {

        this.canvas = canvas

        this.color = new Color(
            Randomizer.generateInteger(0, 128),
            Randomizer.generateInteger(0, 128),
            Randomizer.generateInteger(0, 128),
            1
        )
        this.color.limit = {
            red: {
                minimum: 0,
                maximum: 173
            },
            green: {
                minimum: 0,
                maximum: 173
            },
            blue: {
                minimum: 0,
                maximum: 173
            }
        }

        this.speed = .1 // value change per millisecond

        this.lastTimestamp = performance.now()

    }

    draw(timestamp) {

        const timeDifference = timestamp - this.lastTimestamp
        this.lastTimestamp = timestamp

        if (timeDifference > 0) {
            const value = (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1) * this.speed * timeDifference
            switch (Randomizer.generateInteger(0, 2)) {
                case 0:
                    this.color.red += value
                    break
                case 1:
                    this.color.green += value
                    break
                case 2:
                    this.color.blue += value
                    break
            }
        }

        const context = this.canvas.getContext('2d')
        const gradient = context.createLinearGradient(0, 0, this.canvas.width, this.canvas.height)
        gradient.addColorStop(0, 'darkslategray')
        gradient.addColorStop(1, this.color.rgba)
        context.fillStyle = gradient
        context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    }

}