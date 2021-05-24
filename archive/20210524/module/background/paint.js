import { Animation } from './object/Animation.js'

export default function () {

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

    {

        const framesPerSecond = document.querySelector('#framesPerSecond')

        window.setInterval(() => framesPerSecond.innerHTML = `${animation.framesPerSecond} fps`, 1000)

        let framesPerSecondVisible = false
        document.querySelector('#symbol').addEventListener('click', event => {
            framesPerSecondVisible = !framesPerSecondVisible
            framesPerSecond.style.visibility = framesPerSecondVisible ? 'visible' : 'hidden'
            event.stopPropagation()
        })

    }

}
