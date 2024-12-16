class ExampleExtension {
  getInfo() {
    return {
      id: 'cannonThreeExtension',
      name: 'Cannon & Three.js',
      color1: '#4D7EB4',
      menuIconURI:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DE' +
        'UIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
      blockIconURI:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEtklEQVRoge2ZW4hWVRTHf984Kk1jlj2kI2H2UIwRacVot7EiSLtQBFlPRWUvSQTdsJCCyogy6CWSiMoeqrGioKDJLmpWYxcjxyZSJ4hRuznihZnQRj09rP/unO+b852z9/edT3qYPxz2OXuv9V9rX87Za68DYxhDQ1AqmO9sYAEwDzgDaAMmq20/8BuwDegBuoEfC7Y/CuOAl4HdwAfAyRmy44E7gF4gCrw2A7eLoxpagC758jZwXEhHbqww+FIVuYuBvoTcHuBN4DagA5ghR1p036G2Lsk6vT7goio2llf4cndIR96X0tPAQeCIOpfE/cCI5AaAxUBzgI1m4E7pRuK6t0LmioT9JyT3TYANfpHS6SKPgMPAc8DMBGkErAAmhpBXYCLwbILvcezdekydiICngON1P0TAuz0opTY9P0g8+u76B5uForBYnBE2AxFwFFsVJWACNphHyX6nyrBJRFcm6s4BPiLuyJL6fR+FJQn+dcCFibY5qt8RQuiWzocV9d2qf71WTz3wRhXbq1T/YgjZNOy7HwGPqO4SPR8ATqrH0xxMkY1INgHuwpbUIeDMUMKbpRwBn2BT7b5kjcYK2foUeJcClvMiYG+CaASbrUZjOvZiO7vD2Ke6LpxCvG6/rpcsAN/K5jvAqXnCTR6EfwK/6n5t7X4FY53KrXh8qXw6AvbpBfgipe1qYKeMLfTk89HbUGG7EGzDpnl2StsO4rU8EMCZp3eu2rb6kPnOiAvF93jKF4FBlScWSepinpaUtoXY6A5gZxFf5Om1yObBIE9z4JbAsYa3XZ+ldVp9vhSCun3oAP7ARuXLAL2vdCXPJ83A56oP4YmA34HzA/TK0IntqBEWJrQG6G6R3irsKDAdeE11vQE8rcQhyhDVT5FVMYP4TLKS8CTFfOJBSF7DxIGgL5qwiDcC/sJjl3coYUFiBKzBEhG1YA7wHjYgg9jIpu1DPhiX8OljPAf2Bins5dgEiL5oA/Zhvl3vo7BZwvc10Kla8QDm2/d5gudJcB922P+/oZV4VsqWaeU+cq3K1diL6TAN+A74rEEOpmEtFsonl/cQ8Jbur8tSXoP1NpnDmgn0E395phblaQamJuz1U74hLlJ9dxaBi3Lb9TwZ+JnyT+hlhbqcjssrbP5EHLi2kxIVVy6tKSpd5PkMdtjvA15V3axCXU7HWSpfke124lzBbpVZ+ej/ZuQmLDo9gmUuZgG3qu35Ql1OxwuydYtsH5IvC+Rb7jnlYUbvxg+pbTbhMVet6JEtdzpcmuLX0iyCJmAZ1tte4B7iXXQCNjLDhCWrQzEe+Fu2XGq0JF965dsy/A+FqfiB8pFqBFxqdFOIUmivHPkFgXohmKcyd/dOIrQj7v24NENmPbAdeBSYC5yga67qthOnetIwX2XIuSUYLv+7K0PG97dbNeyiPO9bONqId/j1GXLO0ZXYAeuAri2qy+uIyzH3E/+fKQwlLM6KgI3ApAzZPEfz2ifJhkueF4prRLyf/Fir3o4gG+63xlWePnphtUiXe8gW0RGAJyXX5SHrjZ0i7fSQLaojnQSkYX2TCiOE7+bVuEMTfYfx+Pnpu49sDDS+IaMtLaOfhZ5A+TGMoUj8CyaTiB/WbnspAAAAAElFTkSuQmCC',
      docsURI: 'https://ccw.site',
      blocks: [
        {
          opcode: 'initPhysics',
          blockType: Scratch.BlockType.COMMAND,
          text: 'initialize physics and rendering',
          func: 'initPhysics',
        },
        {
          opcode: 'addBall',
          blockType: Scratch.BlockType.COMMAND,
          text: 'add ball at x: [X] y: [Y] z: [Z]',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
          func: 'addBall',
        },
      ],
    };
  }

  constructor() {
    this.world = null;
    this.scene = null;
    this.renderer = null;
    this.bodies = [];
  }

  initPhysics() {
    const { World, Sphere, Vec3, Body } = CANNON;

    // Initialize physics world
    this.world = new World();
    this.world.gravity.set(0, -9.82, 0);

    // Ground plane
    const groundBody = new Body({ mass: 0 });
    groundBody.addShape(new CANNON.Plane());
    groundBody.position.set(0, 0, 0);
    this.world.addBody(groundBody);

    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000);
    camera.position.set(0, 5, 15);
    this.scene.add(camera);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    // WebGL renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 600);
    document.body.appendChild(this.renderer.domElement);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      this.world.step(1 / 60);
      this.renderer.render(this.scene, camera);
    };
    animate();
  }

  addBall(args) {
    const { X, Y, Z } = args;

    const { Sphere, Vec3, Body } = CANNON;
    const radius = 1;

    // Add physics body
    const ballBody = new Body({ mass: 1 });
    ballBody.addShape(new Sphere(radius));
    ballBody.position.set(X, Y, Z);
    this.world.addBody(ballBody);
    this.bodies.push(ballBody);

    // Add visual sphere
    const ballGeometry = new THREE.SphereGeometry(radius);
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.position.set(X, Y, Z);
    this.scene.add(ballMesh);
  }
}

// Register extension
Scratch.extensions.register(new ExampleExtension());
