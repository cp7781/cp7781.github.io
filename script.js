import * as Message from './modules/changeMessage.mjs'
import * as Circles from './modules/drawCircles.mjs'

window.addEventListener('load', event => {
    Message.change()
    Circles.draw()
})
