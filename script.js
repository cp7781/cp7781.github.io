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
        }

        get rgba() {
            return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})`;
        }

        set red(red) {
            if (red < 0) {
                red = 0;
            } else if (red > 255) {
                red = 255;
            }
            this._red = red;
        }

        get red() {
            return this._red;
        }

        set green(green) {
            if (green < 0) {
                green = 0;
            } else if (green > 255) {
                green = 255;
            }
            this._green = green;
        }

        get green() {
            return this._green;
        }

        set blue(blue) {
            if (blue < 0) {
                blue = 0;
            } else if (blue > 255) {
                blue = 255;
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
            this.x = 10;
            this.y = 10;
            this.velocityX = 1;
            this.velocityY = 1;
            this.color = new Color(255, 255, 255, 1);
        }

        static generateRandomCircle(drawboard) {

            const smallestSideLength = drawboard.width > drawboard.height ? drawboard.height : drawboard.width;
            const minimumRadius = Math.floor(smallestSideLength * .004);
            const maximumRadius = Math.floor(smallestSideLength * .036);

            const radius = generateRandomInteger(minimumRadius, maximumRadius);
            const x = generateRandomInteger(radius, drawboard.width - radius);
            const y = generateRandomInteger(radius, drawboard.height - radius);
            const velocityX = generateRandomInteger(1, 3);
            const velocityY = generateRandomInteger(1, 3);
            const color = new Color(
                generateRandomInteger(173, 255),
                generateRandomInteger(173, 255),
                generateRandomInteger(173, 255),
                .68
            );

            const circle = new Circle(drawboard);
            circle.radius = radius;
            circle.x = x;
            circle.y = y;
            circle.velocityX = velocityX;
            circle.velocityY = velocityY;
            circle.color = color;

            return circle;

        }

        move() {
            if ((this.x + this.radius) >= this.drawboard.width) {
                this.velocityX *= -1;
            }
            if ((this.x - this.radius) <= 0) {
                this.velocityX *= -1;
            }
            if ((this.y + this.radius) >= this.drawboard.height) {
                this.velocityY *= -1;
            }
            if ((this.y - this.radius) <= 0) {
                this.velocityY *= -1;
            }
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        draw() {
            const drawboardContext = drawboard.getContext('2d');
            const gradient = drawboardContext.createRadialGradient(
                this.x - this.radius * .32,
                this.y - this.radius * .32,
                this.radius,
                this.x - this.radius,
                this.y - this.radius,
                this.radius
            );
            gradient.addColorStop(0, new Color(this.color.red, this.color.green, this.color.blue, .32).rgba);
            gradient.addColorStop(1, this.color.rgba);
            drawboardContext.fillStyle = gradient;
            drawboardContext.beginPath();
            drawboardContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            drawboardContext.fill();
        }

        animate() {
            this.color = adjustColor(this.color, 173, 255);
            this.move();
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
            this.drawboardContext = drawboard.getContext('2d');
            this.backgroundColor = new Color(
                generateRandomInteger(32, 96),
                generateRandomInteger(32, 96),
                generateRandomInteger(32, 96),
                1
            );
            this.circles = new Array();
            for (let index = 0; index < 9; index++) {
                this.circles.push(Circle.generateRandomCircle(drawboard));
            }
            this.fpsCounter = new FPSCounter(drawboard);
            this.stopped = false;
            this.timeStamp = performance.now();
        }

        execute(timeStamp) {

            const backgroundGradient = this.drawboardContext.createLinearGradient(0, 0, this.drawboard.width, this.drawboard.height);
            backgroundGradient.addColorStop(0, 'darkslategray');
            this.backgroundColor = adjustColor(this.backgroundColor, 32, 96);
            backgroundGradient.addColorStop(1, this.backgroundColor.rgba);
            this.drawboardContext.fillStyle = backgroundGradient;
            this.drawboardContext.fillRect(0, 0, this.drawboard.width, this.drawboard.height);

            this.fpsCounter.draw(timeStamp);

            this.circles.forEach(circle => circle.animate());
            if (!this.stopped) {
                requestAnimationFrame((timeStamp) => this.execute(timeStamp));
            }

        }

    }

    class FPSCounter {

        constructor(drawboard) {
            this.drawboard = drawboard;
            this.drawboardContext = drawboard.getContext('2d');
            this.counter = new Array();
            this.lastTimeStamp = performance.now();

            const font = `'Source Sans Pro'`;
            if (drawboard.width > drawboard.height) {
                this.x = Math.round(drawboard.height * .01);
                this.y = drawboard.height - this.x;
                this.font = Math.round(drawboard.height * .015) + 'px ' + font;
            } else {
                this.x = Math.round(drawboard.width * .01);
                this.y = drawboard.height - this.x;
                this.font = Math.round(drawboard.width * .015) + 'px ' + font;
            }

        }

        draw(timeStamp) {
            const timeDifference = timeStamp - this.lastTimeStamp;
            if (timeDifference > 0) {
                this.counter.push({
                    timeStamp: timeStamp,
                    fps: Math.round(1000 / timeDifference)
                })
            }
            this.lastTimeStamp = timeStamp;
            this.counter = this.counter.filter(count => timeStamp - count.timeStamp < 1000);
            let averageFPS = 0;
            this.counter.forEach(count => averageFPS += count.fps);
            averageFPS = Math.round(averageFPS / this.counter.length);
            this.drawboardContext.fillStyle = 'slategray';
            this.drawboardContext.font = this.font;
            this.drawboardContext.fillText(averageFPS + ' fps', this.x, this.y);
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
