"use strict";

function change() {
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

function drawBalls() {

    function random(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    class Ball {

        constructor(x, y, velocityX, velocityY, color, radius) {
            this.x = x;
            this.y = y;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.color = color;
            this.radius = radius;
        }

        draw(drawboardContext) {
            drawboardContext.beginPath();
            drawboardContext.fillStyle = this.color;
            drawboardContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            drawboardContext.fill();
            return drawboardContext;
        }

    }

    let drawboard = document.getElementById('drawboard');

    let drawboardContext = drawboard.getContext('2d');

    let testBall = new Ball(50, 100, 4, 4, 'white', 10);
    testBall.draw(drawboardContext);

}
