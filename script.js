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

        adjustColor() {

            function limit(value) {
                if (value < 173) {
                    return 173;
                } else if (value > 255) {
                    return 255
                } else {
                    return value;
                }
            }

            const value = generateRandomInteger(0, 1) > 0 ? 1 : -1;
            switch (generateRandomInteger(0, 3)) {
                case 0:
                    this.color.red = limit(this.color.red + value);
                    break;
                case 1:
                    this.color.green = limit(this.color.green + value);
                    break;
                case 2:
                    this.color.blue = limit(this.color.blue + value);
                    break;
            }

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
            drawboardContext.beginPath();
            drawboardContext.fillStyle = this.color.rgba;
            drawboardContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            drawboardContext.fill();
        }

        animate() {
            this.adjustColor();
            this.move();
            this.draw();
        }

    }

    function generateRandomInteger(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    class Animation {

        constructor(drawboard) {
            this.drawboard = drawboard;
            this.drawboardContext = drawboard.getContext('2d');
            this.backgroundGradient = this.drawboardContext.createLinearGradient(0, 0, 0, drawboard.height);
            this.backgroundGradient.addColorStop(0, 'lightslategray');
            this.backgroundGradient.addColorStop(1, 'darkslategray');
            this.circles = new Array();
            for (let index = 0; index < 9; index++) {
                this.circles.push(Circle.generateRandomCircle(drawboard));
            }
            this.fpsCounter = new FPSCounter(drawboard);
            this.stopped = false;
            this.timeStamp = performance.now();
        }

        execute(timeStamp) {
            
            this.drawboardContext.fillStyle = this.backgroundGradient;
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
        }

        draw(timeStamp) {
            if ((timeStamp - this.lastTimeStamp) > 0) {
                this.counter.push({
                    timeStamp: timeStamp,
                    fps: Math.round(1000 / (timeStamp - this.lastTimeStamp))
                })
            }
            this.lastTimeStamp = timeStamp;
            this.counter = this.counter.filter(count => timeStamp - count.timeStamp < 1000);
            let averageFPS = 0;
            this.counter.forEach(count => averageFPS += count.fps);
            averageFPS = Math.round(averageFPS / this.counter.length);
            this.drawboardContext.fillStyle = 'slategray';
            this.drawboardContext.font = ".32em sans-serif";
            this.drawboardContext.fillText(averageFPS + ' fps', 7, this.drawboard.height - 7);
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
