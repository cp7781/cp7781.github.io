function execute() {
    changeMessage();
    drawCircles();
}

function changeMessage() {
    const timeout = 79;
    const message = document.getElementById('message');
    const text = message.textContent;
    const length = text.length;
    let index = 0;
    window.setInterval(() => {
        ++index;
        index %= length;
        message.innerHTML = text.substring(0, index) + text[index].toUpperCase() + text.substring(index + 1, length);
    }, timeout);
};

function drawCircles() {

    class Color {

        constructor(red, green, blue, alpha) {
            this._red = red;
            this._green = green;
            this._blue = blue;
            this._alpha = alpha;
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
            return `rgba(${Math.round(this._red)}, ${Math.round(this._green)}, ${Math.round(this._blue)}, ${this._alpha})`;
        }

        set red(red) {
            if (red < this.limit.red.minimum) {
                red = this.limit.red.minimum;
            } else if (red > this.limit.red.maximum) {
                red = this.limit.red.maximum;
            }
            this._red = red;
        }

        get red() {
            return this._red;
        }

        set green(green) {
            if (green < this.limit.green.minimum) {
                green = this.limit.green.minimum;
            } else if (green > this.limit.green.maximum) {
                green = this.limit.green.maximum;
            }
            this._green = green;
        }

        get green() {
            return this._green;
        }

        set blue(blue) {
            if (blue < this.limit.blue.minimum) {
                blue = this.limit.blue.minimum;
            } else if (blue > this.limit.blue.maximum) {
                blue = this.limit.blue.maximum;
            }
            this._blue = blue;
        }

        get blue() {
            return this._blue;
        }

        set alpha(alpha) {
            if (alpha < 0) {
                alpha = 0;
            } else if (alpha > 1) {
                alpha = 1;
            }
            this._alpha = alpha;
        }

        get alpha() {
            return this._alpha;
        }

    }

    class Circle {

        constructor(drawboard) {
            this.drawboard = drawboard;
            this.radius = 10;
            this.coordinate = {
                x: 10,
                y: 10
            }
            this.lastTimestamp = performance.now();
            this.speed = {
                x: 1,
                y: 1
            }
            this.color = new Color(255, 255, 255, 1);
        }

        static generateRandomCircle(drawboard) {

            const smallestSideLength = drawboard.width > drawboard.height ? drawboard.height : drawboard.width;
            const minimumRadius = Math.floor(smallestSideLength * .004);
            const maximumRadius = Math.floor(smallestSideLength * .036);

            const circle = new Circle(drawboard);
            circle.radius = generateRandomInteger(minimumRadius, maximumRadius);
            circle.coordinate.x = generateRandomInteger(circle.radius, drawboard.width - circle.radius);
            circle.coordinate.y = generateRandomInteger(circle.radius, drawboard.height - circle.radius);
            circle.speed.x = Math.random() * smallestSideLength * .00032 * (generateRandomInteger(0, 1) > 0 ? -1 : 1);
            circle.speed.y = Math.random() * smallestSideLength * .00032 * (generateRandomInteger(0, 1) > 0 ? -1 : 1);
            circle.color = new Color(
                generateRandomInteger(173, 255),
                generateRandomInteger(173, 255),
                generateRandomInteger(173, 255),
                .68
            );

            return circle;

        }

        move(timestamp) {
            let timeDifference = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;
            if (timeDifference > 0) {
                this.coordinate.x += this.speed.x * timeDifference;
                this.coordinate.y += this.speed.y * timeDifference;
            }
            if ((this.coordinate.x - this.radius) <= 0) {
                this.speed.x *= -1;
                this.coordinate.x = this.radius;
            }
            if ((this.coordinate.y - this.radius) <= 0) {
                this.speed.y *= -1;
                this.coordinate.y = this.radius;
            }
            if ((this.coordinate.x + this.radius) >= this.drawboard.width) {
                this.speed.x *= -1;
                this.coordinate.x = this.drawboard.width - this.radius;
            }
            if ((this.coordinate.y + this.radius) >= this.drawboard.height) {
                this.speed.y *= -1;
                this.coordinate.y = this.drawboard.height - this.radius;
            }
        }

        draw() {
            const x = Math.round(this.coordinate.x);
            const y = Math.round(this.coordinate.y);
            const drawboardContext = drawboard.getContext('2d');
            const gradient = drawboardContext.createRadialGradient(
                x - this.radius * .32,
                y - this.radius * .32,
                this.radius,
                x - this.radius,
                y - this.radius,
                this.radius
            );
            gradient.addColorStop(0, new Color(this.color.red, this.color.green, this.color.blue, .32).rgba);
            gradient.addColorStop(1, this.color.rgba);
            drawboardContext.fillStyle = gradient;
            drawboardContext.beginPath();
            drawboardContext.arc(x, y, this.radius, 0, 2 * Math.PI);
            drawboardContext.fill();
        }

        animate(timestamp) {
            this.color = adjustColor(this.color, 173, 255);
            this.move(timestamp);
            this.draw();
        }

    }

    function adjustColor(color, minimumValue, maximumValue) {

        function limit(value, minimum, maximum) {
            if (value < minimum) {
                return minimum;
            } else if (value > maximum) {
                return maximum;
            } else {
                return value;
            }
        }

        const value = generateRandomInteger(0, 1) > 0 ? 1 : -1;
        switch (generateRandomInteger(0, 3)) {
            case 0:
                color.red = limit(
                    color.red + value,
                    minimumValue,
                    maximumValue
                );
                break;
            case 1:
                color.green = limit(
                    color.green + value,
                    minimumValue,
                    maximumValue
                );
                break;
            case 2:
                color.blue = limit(
                    color.blue + value,
                    minimumValue,
                    maximumValue
                );
                break;
        }

        return color;

    }

    function generateRandomInteger(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    class Animation {

        constructor(drawboard) {

            this.drawboard = drawboard;

            this.background = new Background(drawboard);

            this.circles = new Array();
            for (let index = 0; index < 9; index++) {
                this.circles.push(Circle.generateRandomCircle(drawboard));
            }

            this.fpsCounter = new FPSCounter(drawboard);

            this.stopped = false;

        }

        execute(timestamp) {

            this.background.draw(timestamp);

            this.fpsCounter.draw(timestamp);

            this.circles.forEach(circle => circle.animate(timestamp));
            if (!this.stopped) {
                requestAnimationFrame((timestamp) => this.execute(timestamp));
            }

        }

    }

    class Background {

        constructor(drawboard) {

            this.drawboard = drawboard;

            this.color = new Color(
                generateRandomInteger(0, 47),
                generateRandomInteger(0, 79),
                generateRandomInteger(0, 79),
                1
            );
            this.color.limit = {
                red: {
                    minimum: 0,
                    maximum: 45
                },
                green: {
                    minimum: 0,
                    maximum: 79
                },
                blue: {
                    minimum: 0,
                    maximum: 79
                }
            }

            this.speed = .001; // value change per millisecond

            this.lastTimestamp = performance.now();

        }

        draw(timestamp) {

            const timeDifference = timestamp - this.lastTimestamp;
            if (timeDifference > 0) {
                const value = (generateRandomInteger(0, 1) > 0 ? -1 : 1) * this.speed * timeDifference;
                switch (generateRandomInteger(0, 2)) {
                    case 0:
                        this.color.red += value;
                        break;
                    case 1:
                        this.color.green += value;
                        break;
                    case 2:
                        this.color.blue += value;
                        break;
                }
            }
            this.lastTimestamp = timestamp;

            const drawboardContext = drawboard.getContext('2d');
            const backgroundGradient = drawboardContext.createLinearGradient(0, 0, this.drawboard.width, this.drawboard.height);
            backgroundGradient.addColorStop(0, 'darkslategray');
            this.color = adjustColor(this.color, 32, 96);
            backgroundGradient.addColorStop(1, this.color.rgba);
            drawboardContext.fillStyle = backgroundGradient;
            drawboardContext.fillRect(0, 0, this.drawboard.width, this.drawboard.height);

        }

    }

    class FPSCounter {

        constructor(drawboard) {
            this.drawboard = drawboard;
            this.counter = new Array();
            this.lastTimestamp = performance.now();
            this.coordinate = {
                x: 0,
                y: 0
            };

            const font = `'Source Sans Pro'`;
            if (drawboard.width > drawboard.height) {
                this.coordinate.x = Math.round(drawboard.height * .01);
                this.coordinate.y = drawboard.height - this.coordinate.x;
                this.font = Math.round(drawboard.height * .015) + 'px ' + font;
            } else {
                this.coordinate.x = Math.round(drawboard.width * .01);
                this.coordinate.y = drawboard.height - this.coordinate.x;
                this.font = Math.round(drawboard.width * .015) + 'px ' + font;
            }

        }

        draw(timestamp) {

            const timeDifference = timestamp - this.lastTimestamp;
            if (timeDifference > 0) {
                this.counter.push({
                    timestamp: timestamp,
                    fps: Math.round(1000 / timeDifference)
                })
            }
            this.lastTimestamp = timestamp;

            this.counter = this.counter.filter(count => timestamp - count.timestamp < 1000);
            let averageFPS = 0;
            this.counter.forEach(count => averageFPS += count.fps);
            averageFPS = Math.round(averageFPS / this.counter.length);

            const drawboardContext = drawboard.getContext('2d');
            drawboardContext.fillStyle = 'slategray';
            drawboardContext.font = this.font;
            drawboardContext.fillText(averageFPS + ' fps', this.coordinate.x, this.coordinate.y);

        }

    }

    {

        const drawboard = document.getElementById('drawboard');
        drawboard.width = window.innerWidth;
        drawboard.height = window.innerHeight;

        const animation = new Animation(drawboard);
        animation.execute();

        window.onresize = () => {
            animation.stopped = true;
            drawCircles();
        };

    }

}
