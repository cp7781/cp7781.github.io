import Matter from 'https://cdn.skypack.dev/pin/matter-js@v0.17.1-x9Mw93jy1LkhmwjK6AQI/mode=imports,min/optimized/matter-js.js'

export default function () {

    const engine = Matter.Engine.create();

    const render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 600,
            height: 300,
            wireframes: false
        }
    });

    const boxA = Matter.Bodies.rectangle(400, 200, 40, 40);
    const ballA = Matter.Bodies.circle(380, 100, 40);
    const ballB = Matter.Bodies.circle(460, 10, 10);
    const ground = Matter.Bodies.rectangle(300, 290, 400, 10, { isStatic: true });

    Matter.World.add(engine.world, [boxA, ballA, ballB, ground]);

    Matter.Runner.run(engine);
    Matter.Render.run(render);

}
