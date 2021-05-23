import { Color } from './Color.js'
import { Randomizer } from './Randomizer.js'

export class Bubble {

    constructor(canvas) {
        this._canvas = canvas
        this._radius = 10
        this._coordinate = {
            x: 10,
            y: 10
        }
        this._lastTimestamp = performance.now()
        this._speed = {
            x: 1,
            y: 1
        }
        this._color = new Color(255, 255, 255, 1)
        this._colorChangeSpeed = .1 // value change per millisecond
        this._lastTimestamp = performance.now()
    }

    static generateRandom(canvas) {

        const smallestSideLength = canvas.width > canvas.height ? canvas.height : canvas.width
        const minimumRadius = Math.floor(smallestSideLength * .004)
        const maximumRadius = Math.floor(smallestSideLength * .036)

        const bubble = new Bubble(canvas)
        bubble._radius = Randomizer.generateInteger(minimumRadius, maximumRadius)
        bubble._coordinate.x = Randomizer.generateInteger(bubble._radius, canvas.width - bubble._radius)
        bubble._coordinate.y = Randomizer.generateInteger(bubble._radius, canvas.height - bubble._radius)
        bubble._speed.x = Math.random() * smallestSideLength * .00032 * (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1)
        bubble._speed.y = Math.random() * smallestSideLength * .00032 * (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1)
        bubble._color = new Color(
            Randomizer.generateInteger(82, 255),
            Randomizer.generateInteger(82, 255),
            Randomizer.generateInteger(82, 255),
            .68
        )
        bubble._color._limit = {
            red: {
                minimum: 82,
                maximum: 173
            },
            green: {
                minimum: 82,
                maximum: 173
            },
            blue: {
                minimum: 82,
                maximum: 173
            }
        }
        switch (Randomizer.generateInteger(0, 2)) {
            case 0:
                bubble._color._limit.red = {
                    minimum: 173,
                    maximum: 255
                }
                break
            case 1:
                bubble._color._limit.green = {
                    minimum: 173,
                    maximum: 255
                }
                break
            case 2:
                bubble._color._limit.blue = {
                    minimum: 173,
                    maximum: 255
                }
                break
        }

        return bubble

    }

    paint(timestamp) {

        let timeDifference = timestamp - this._lastTimestamp
        this._lastTimestamp = timestamp

        if (timeDifference > 0) {

            this._coordinate.x += this._speed.x * timeDifference
            this._coordinate.y += this._speed.y * timeDifference

            const colorChangeValue = (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1) * this._colorChangeSpeed * timeDifference
            switch (Randomizer.generateInteger(0, 2)) {
                case 0:
                    this._color.red += colorChangeValue
                    break
                case 1:
                    this._color.green += colorChangeValue
                    break
                case 2:
                    this._color.blue += colorChangeValue
                    break
            }

        }

        if ((this._coordinate.x - this._radius) <= 0) {
            this._speed.x *= -1
            this._coordinate.x = this._radius
        }
        if ((this._coordinate.y - this._radius) <= 0) {
            this._speed.y *= -1
            this._coordinate.y = this._radius
        }
        if ((this._coordinate.x + this._radius) >= this._canvas.width) {
            this._speed.x *= -1
            this._coordinate.x = this._canvas.width - this._radius
        }
        if ((this._coordinate.y + this._radius) >= this._canvas.height) {
            this._speed.y *= -1
            this._coordinate.y = this._canvas.height - this._radius
        }

        {
            const context = this._canvas.getContext('2d')
            const gradient = context.createRadialGradient(
                this._coordinate.x - this._radius * .32,
                this._coordinate.y - this._radius * .32,
                this._radius,
                this._coordinate.x - this._radius,
                this._coordinate.y - this._radius,
                this._radius
            )
            gradient.addColorStop(0, new Color(
                this._color.red * .68,
                this._color.green * .68,
                this._color.blue * .68,
                .68
            ).rgba)
            gradient.addColorStop(1, this._color.rgba)
            context.fillStyle = gradient
            context.beginPath()
            context.arc(this._coordinate.x, this._coordinate.y, this._radius, 0, 2 * Math.PI)
            context.fill()
        }

    }

}
