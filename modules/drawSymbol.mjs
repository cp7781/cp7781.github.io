export default function () {

    class Symbol {

        constructor(canvas) {
            this.canvas = canvas
        }

        draw() {
            const context = this.canvas.getContext('2d')
            context.translate(320, 32)
            context.rotate((Math.PI / 180) * 32)
            context.fillStyle = 'seashell'
            for (let x = 1; x <= 3; x++) {
                for (let y = 1; y <= 3; y++) {
                    switch (x + y) {
                        case 3:
                            context.fillRect(
                                x * 50 + (x - 1) * 100 - 20,
                                y * 50 + (y - 1) * 100 - 20,
                                140,
                                140
                            )
                            break
                        case 4:
                            break
                        case 5:
                            context.fillRect(
                                x * 50 + (x - 1) * 100 + 20,
                                y * 50 + (y - 1) * 100 + 20,
                                60,
                                60
                            )
                            break
                        default:
                            context.fillRect(
                                x * 50 + (x - 1) * 100,
                                y * 50 + (y - 1) * 100,
                                100,
                                100
                            )
                            break
                    }
                }
            }
        }

    }

    function draw(canvas) {

        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)

        const symbol = new Symbol(canvas)
        symbol.draw()

    }

    {

        const canvas = document.querySelector('#symbol')
        canvas.width = canvas.height = 1000
        draw(canvas)

    }

}
