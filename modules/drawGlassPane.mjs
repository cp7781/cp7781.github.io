export default function () {

    
    function resizeCanvas(canvas) {
        if (window.innerWidth > window.innerHeight) {
            canvas.width = canvas.height = .4 * window.innerHeight
        } else {
            canvas.width = canvas.height = .4 * window.innerWidth
        }
    }
    
    function draw(canvas) {
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(10, 10, 10, 0, 2 * Math.PI)
        context.fill()
    }
    
    {

        const canvas = document.querySelector('#glasspane')
        resizeCanvas(canvas)
        draw(canvas)
        
        window.addEventListener('resize', event => {
            resizeCanvas(canvas)
            draw(canvas)
        })

    }

}
