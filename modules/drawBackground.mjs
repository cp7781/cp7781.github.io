export default function () {

    class Color {

        constructor(red, green, blue, alpha) {
            this._red = red
            this._green = green
            this._blue = blue
            this._alpha = alpha
            this.limit = {
                red: {
                    minimum: 0,
                    maximum: 255
                },
                green: {
                    minimum: 0,
                    maximum: 255
                },
                blue: {
                    minimum: 0,
                    maximum: 255
                }
            }
        }

        get rgba() {
            return `rgba(${Math.round(this._red)}, ${Math.round(this._green)}, ${Math.round(this._blue)}, ${this._alpha})`
        }

        set red(red) {
            if (red < this.limit.red.minimum) {
                red = this.limit.red.minimum
            } else if (red > this.limit.red.maximum) {
                red = this.limit.red.maximum
            }
            this._red = red
        }

        get red() {
            return this._red
        }

        set green(green) {
            if (green < this.limit.green.minimum) {
                green = this.limit.green.minimum
            } else if (green > this.limit.green.maximum) {
                green = this.limit.green.maximum
            }
            this._green = green
        }

        get green() {
            return this._green
        }

        set blue(blue) {
            if (blue < this.limit.blue.minimum) {
                blue = this.limit.blue.minimum
            } else if (blue > this.limit.blue.maximum) {
                blue = this.limit.blue.maximum
            }
            this._blue = blue
        }

        get blue() {
            return this._blue
        }

        set alpha(alpha) {
            if (alpha < 0) {
                alpha = 0
            } else if (alpha > 1) {
                alpha = 1
            }
            this._alpha = alpha
        }

        get alpha() {
            return this._alpha
        }

    }

    class Circle {

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
            circle.radius = generateRandomInteger(minimumRadius, maximumRadius)
            circle.coordinate.x = generateRandomInteger(circle.radius, canvas.width - circle.radius)
            circle.coordinate.y = generateRandomInteger(circle.radius, canvas.height - circle.radius)
            circle.speed.x = Math.random() * smallestSideLength * .00032 * (generateRandomInteger(0, 1) > 0 ? -1 : 1)
            circle.speed.y = Math.random() * smallestSideLength * .00032 * (generateRandomInteger(0, 1) > 0 ? -1 : 1)
            circle.color = new Color(
                generateRandomInteger(82, 255),
                generateRandomInteger(82, 255),
                generateRandomInteger(82, 255),
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
            switch (generateRandomInteger(0, 2)) {
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

                const colorChangeValue = (generateRandomInteger(0, 1) > 0 ? -1 : 1) * this.colorChangeSpeed * timeDifference
                switch (generateRandomInteger(0, 2)) {
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

    function generateRandomInteger(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    }

    class Animation {

        constructor(canvas) {
            this.drawboard = canvas
            this.change()
            this.fpsCounter = new FPSCounter(canvas)
            this.fps = false
        }

        change() {
            this.background = new Background(this.drawboard)
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
            this.background.draw(timestamp)
            this.circles.forEach(circle => circle.draw(timestamp))
            if (this.fps) {
                this.fpsCounter.draw(timestamp)
            }
            requestAnimationFrame(timestamp => this.execute(timestamp))
        }

        set fps(fps) {
            this._fps = fps
        }

        get fps() {
            return this._fps
        }

    }

    class Background {

        constructor(canvas) {

            this.canvas = canvas

            this.color = new Color(
                generateRandomInteger(0, 128),
                generateRandomInteger(0, 128),
                generateRandomInteger(0, 128),
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
                const value = (generateRandomInteger(0, 1) > 0 ? -1 : 1) * this.speed * timeDifference
                switch (generateRandomInteger(0, 2)) {
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

    class FPSCounter {

        constructor(canvas) {
            this.canvas = canvas
            this.counter = new Array()
            this.lastTimestamp = performance.now()
        }

        draw(timestamp) {

            const timeDifference = timestamp - this.lastTimestamp
            if (timeDifference > 0) {
                this.counter.push({
                    timestamp: timestamp,
                    fps: 1000 / timeDifference
                })
            }
            this.lastTimestamp = timestamp

            this.counter = this.counter.filter(count => timestamp - count.timestamp < 1000)
            let averageFPS = 0
            this.counter.forEach(count => averageFPS += count.fps)
            averageFPS = Math.round(averageFPS / this.counter.length)

            const coordinate = {
                x: 0,
                y: 0
            }
            let font = `'Source Sans Pro'`
            if (this.canvas.width > this.canvas.height) {
                coordinate.x = this.canvas.height * .01
                coordinate.y = this.canvas.height - coordinate.x * 1.3
                font = `${this.canvas.height * .015}px ${font}`
            } else {
                coordinate.x = this.canvas.width * .01
                coordinate.y = this.canvas.height - coordinate.x * 1.3
                font = `${this.canvas.width * .015}px ${font}`
            }

            const context = this.canvas.getContext('2d')
            context.fillStyle = 'seashell'
            context.font = font
            context.fillText(`${averageFPS} fps`, coordinate.x, coordinate.y)

        }

    }

    {

        const canvas = document.querySelector('#background')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const animation = new Animation(canvas)
        animation.execute()

        window.addEventListener('resize', event => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            animation.change()
        })

        window.addEventListener('keydown', event => {
            switch (event.key) {
                case 'c':
                    animation.change()
                    break
                case 'f':
                    animation.fps = !animation.fps
                    break
                case 'v':
                    if (document.fullscreenElement) {
                        document.exitFullscreen().catch(error => { console.error(error) })
                    } else {
                        canvas.requestFullscreen().catch(error => { console.error(error) })
                    }
                    break
            }
        })

        window.addEventListener('click', event => {
            const position = {
                x: event.x / window.innerWidth,
                y: event.y / window.innerHeight
            }
            if (position.x < .32 && position.y > .68) {
                animation.fps = !animation.fps
            } else if (position.x > .68 && position.y < .32) {
                animation.change()
            }
        })
        document.querySelector('#symbol').addEventListener('click', event => {
            animation.fps = !animation.fps
            event.stopPropagation()
        })

    }

}
