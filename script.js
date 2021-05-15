import changeMessage from './modules/changeMessage.mjs'
import drawCircles from './modules/drawCircles.mjs'
import testPhysics from './modules/testPhysics.mjs'

window.addEventListener('load', event => {
    changeMessage()
    drawCircles()
    testPhysics()
})
