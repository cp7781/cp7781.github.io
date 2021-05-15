import Matter from 'https://cdn.skypack.dev/pin/matter-js@v0.17.1-x9Mw93jy1LkhmwjK6AQI/mode=imports,min/optimized/matter-js.js'

export default function () {

    const engine = Matter.Engine.create()
    engine.world.gravity.x = 0
    engine.world.gravity.y = 0

    const width = 600
    const height = 300
    const borderThickness = 100

    const render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false
        }
    })

    const bodies = new Array()

    const circle1 = Matter.Bodies.circle(width / 2 + 80, 100, 40)
    Matter.Body.set(circle1, {
        velocity: {
            x: .1,
            y: .1
        },
        restitution: 1,
        slop: 0,
        frictionStatic: 0,
        friction: 0,
        frictionAir: 0
    })
    bodies.push(circle1)
    const circle2 = Matter.Bodies.circle(width / 2 + 160, 10, 10)
    Matter.Body.set(circle2, {
        velocity: {
            x: -1,
            y: 1
        },
        restitution: 1,
        slop: 0,
        frictionStatic: 0,
        friction: 0,
        frictionAir: 0
    })
    bodies.push(circle2)

    const topBorder = Matter.Bodies.rectangle(
        width / 2,
        -.5 * borderThickness,
        width,
        borderThickness,
        { isStatic: true }
    )
    bodies.push(topBorder)
    const rightBorder = Matter.Bodies.rectangle(
        width + .5 * borderThickness,
        height / 2,
        borderThickness,
        height,
        { isStatic: true }
    )
    bodies.push(rightBorder)
    const bottomBorder = Matter.Bodies.rectangle(
        width / 2,
        height + .5 * borderThickness,
        width,
        borderThickness,
        { isStatic: true }
    )
    bodies.push(bottomBorder)
    const leftBorder = Matter.Bodies.rectangle(
        -.5 * borderThickness,
        height / 2,
        borderThickness,
        height,
        { isStatic: true }
    )
    bodies.push(leftBorder)

    Matter.Composite.add(engine.world, bodies)

    Matter.Runner.run(engine)
    Matter.Render.run(render)

}
