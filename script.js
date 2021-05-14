import * as Message from './modules/changeMessage.mjs'
import * as Circles from './modules/drawCircles.mjs'
import * as Test from './modules/test.mjs'

window.addEventListener('load', event => {
    Message.change()
    Circles.draw()
    Test.test()
})
