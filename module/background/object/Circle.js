import { Color } from './Color.js'
import { Randomizer } from './Randomizer.js'

export class Circle {

    constructor(canvas) {
        this.canvas = canvas
        this.radius = 10
        this.coordinate = {
            x: 10,
            y: 10
        }
        this.lastTimestamp = performance.now()
        this.speed = {
            x: 1,
            y: 1
        }
        this.color = new Color(255, 255, 255, 1)
        this.colorChangeSpeed = .1 // value change per millisecond
        this.lastTimestamp = performance.now()
    }

    static generateRandomCircle(canvas) {

        const smallestSideLength = canvas.width > canvas.height ? canvas.height : canvas.width
        const minimumRadius = Math.floor(smallestSideLength * .004)
        const maximumRadius = Math.floor(smallestSideLength * .036)

        const circle = new Circle(canvas)
        circle.radius = Randomizer.generateInteger(minimumRadius, maximumRadius)
        circle.coordinate.x = Randomizer.generateInteger(circle.radius, canvas.width - circle.radius)
        circle.coordinate.y = Randomizer.generateInteger(circle.radius, canvas.height - circle.radius)
        circle.speed.x = Math.random() * smallestSideLength * .00032 * (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1)
        circle.speed.y = Math.random() * smallestSideLength * .00032 * (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1)
        circle.color = new Color(
            Randomizer.generateInteger(82, 255),
            Randomizer.generateInteger(82, 255),
            Randomizer.generateInteger(82, 255),
            .68
        )
        circle.color.limit = {
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
                circle.color.limit.red = {
                    minimum: 173,
                    maximum: 255
                }
                break
            case 1:
                circle.color.limit.green = {
                    minimum: 173,
                    maximum: 255
                }
                break
            case 2:
                circle.color.limit.blue = {
                    minimum: 173,
                    maximum: 255
                }
                break
        }

        return circle

    }

    draw(timestamp) {

        let timeDifference = timestamp - this.lastTimestamp
        this.lastTimestamp = timestamp

        if (timeDifference > 0) {

            this.coordinate.x += this.speed.x * timeDifference
            this.coordinate.y += this.speed.y * timeDifference

            const colorChangeValue = (Randomizer.generateInteger(0, 1) > 0 ? -1 : 1) * this.colorChangeSpeed * timeDifference
            switch (Randomizer.generateInteger(0, 2)) {
                case 0:
                    this.color.red += colorChangeValue
                    break
                case 1:
                    this.color.green += colorChangeValue
                    break
                case 2:
                    this.color.blue += colorChangeValue
                    break
            }

        }

        if ((this.coordinate.x - this.radius) <= 0) {
            this.speed.x *= -1
            this.coordinate.x = this.radius
        }
        if ((this.coordinate.y - this.radius) <= 0) {
            this.speed.y *= -1
            this.coordinate.y = this.radius
        }
        if ((this.coordinate.x + this.radius) >= this.canvas.width) {
            this.speed.x *= -1
            this.coordinate.x = this.canvas.width - this.radius
        }
        if ((this.coordinate.y + this.radius) >= this.canvas.height) {
            this.speed.y *= -1
            this.coordinate.y = this.canvas.height - this.radius
        }

        {
            const context = this.canvas.getContext('2d')
            const gradient = context.createRadialGradient(
                this.coordinate.x - this.radius * .32,
                this.coordinate.y - this.radius * .32,
                this.radius,
                this.coordinate.x - this.radius,
                this.coordinate.y - this.radius,
                this.radius
            )
            gradient.addColorStop(0, new Color(
                this.color.red * .68,
                this.color.green * .68,
                this.color.blue * .68,
                .68
            ).rgba)
            gradient.addColorStop(1, this.color.rgba)
            context.fillStyle = gradient
            context.beginPath()
            context.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, 2 * Math.PI)
            context.fill()
        }

    }

}
