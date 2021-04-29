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

    class Circle {
        constructor(radius, x, y, velocityX, velocityY) {
            this.radius = radius;
            this.x = x;
            this.y = y;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
        }
    }

    function drawCircle(circle, drawboardContext) {
        drawboardContext.beginPath();
        drawboardContext.fillStyle = 'rgba(255, 255, 255, .68)';
        drawboardContext.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        drawboardContext.fill();
    }

    function moveCircle(circle, drawboardWidth, drawboardHeight) {
        if ((circle.x + circle.radius) >= drawboardWidth) {
            circle.velocityX *= -1;
        }
        if ((circle.x - circle.radius) <= 0) {
            circle.velocityX *= -1;
        }
        if ((circle.y + circle.radius) >= drawboardHeight) {
            circle.velocityY *= -1;
        }
        if ((circle.y - circle.radius) <= 0) {
            circle.velocityY *= -1;
        }
        circle.x += circle.velocityX;
        circle.y += circle.velocityY;
    }

    function generateRandomInteger(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    function generateRandomCircle(drawboardWidth, drawboardHeight) {

        const smallestSideLength = drawboardWidth > drawboardHeight ? drawboardHeight : drawboardWidth;
        const minimumRadius = Math.floor(smallestSideLength * .004);
        const maximumRadius = Math.floor(smallestSideLength * .036);

        const radius = generateRandomInteger(minimumRadius, maximumRadius);
        const x = generateRandomInteger(radius, drawboardWidth - radius);
        const y = generateRandomInteger(radius, drawboardHeight - radius);
        const velocityX = generateRandomInteger(1, 3);
        const velocityY = generateRandomInteger(1, 3);

        return new Circle(radius, x, y, velocityX, velocityY);

    }

    {

        const drawboard = document.getElementById('drawboard');
        const drawboardContext = drawboard.getContext('2d');
        drawboard.width = window.innerWidth;
        drawboard.height = window.innerHeight;

        const circles = new Array();
        for (let index = 0; index < 9; index++) {
            circles.push(generateRandomCircle(drawboard.width, drawboard.height));
        }

        let animationStopped = false;

        function animateCircles() {
            drawboardContext.fillStyle = 'rgb(47, 79, 79)';
            drawboardContext.fillRect(0, 0, drawboard.width, drawboard.height);
            circles.forEach(circle => {
                moveCircle(circle, drawboard.width, drawboard.height);
                drawCircle(circle, drawboardContext);
            });
            if (!animationStopped) {
                requestAnimationFrame(animateCircles);
            }
        }
        animateCircles();

        window.onresize = () => {
            animationStopped = true;
            drawCircles();
        };

    }

}
