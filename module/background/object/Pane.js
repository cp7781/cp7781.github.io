import { Color } from './Color.js'
import { Randomizer } from './Randomizer.js'

export class Pane {

    constructor(canvas) {

        this._canvas = canvas

        this._color = new Color(
            Randomizer.generateInteger(0, 128),
            Randomizer.generateInteger(0, 128),
            Randomizer.generateInteger(0, 128),
            1
        )
        this._color._limit = {
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

        this._speed = .1 // value change per millisecond

        this._lastTimestamp = performance.now()

    }

    paint(timestamp) {

        const timeDifference = timestamp - this._lastTimestamp
        this._lastTimestamp = timestamp

        if (timeDifference > 0) {
            const value = (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1) * this._speed * timeDifference
            switch (Randomizer.generateInteger(0, 2)) {
                case 0:
                    this._color.red += value
                    break
                case 1:
                    this._color.green += value
                    break
                case 2:
                    this._color.blue += value
                    break
            }
        }

        const context = this._canvas.getContext('2d')
        const gradient = context.createLinearGradient(0, 0, this._canvas.width, this._canvas.height)
        gradient.addColorStop(0, 'darkslategray')
        gradient.addColorStop(1, this._color.rgba)
        context.fillStyle = gradient
        context.fillRect(0, 0, this._canvas.width, this._canvas.height)

    }

}