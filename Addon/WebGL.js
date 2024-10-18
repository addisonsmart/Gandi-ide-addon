class WebGLThreeJSExampleExtension {
    constructor() {
        this.cubes = []; // Store Three.js meshes
        this.cubeBodies = []; // Store Cannon.js bodies
        this.spheres = []; // Ensure spheres array is initialized
        this.isThreeLoaded = false; // Example of other properties
        this.isCannonLoaded = false;
        this.physicsEnabled = false;
        this.animationSpeed = 0.01; // Example default value
    }

    getInfo() {
        return {
            id: 'webGLThreeJSExtension',
            name: 'WebGL and Three.js Extension',
            color1: '#4D7EB4',
            menuIconURI: 'image',
            blockIconURI: 'image',
            docsURI: 'https://ccw.site',
            blocks: [
                {
                    opcode: 'initWebGL',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'initialize WebGL',
                    func: 'initWebGL',
                },
                {
                    opcode: 'createCube',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'create a cube at x: [X], y: [Y], z: [Z]',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                    func: 'createCube',
                },
                {
                    opcode: 'createSphere',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'create a sphere at x: [X], y: [Y], z: [Z]',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                    func: 'createSphere',
                },
                {
                    opcode: 'setCameraPosition',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set camera position to x: [X], y: [Y], z: [Z]',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                    func: 'setCameraPosition',
                },
                {
                    opcode: 'setLightPosition',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set light position to x: [X], y: [Y], z: [Z]',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        Z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                    func: 'setLightPosition',
                },
                {
                    opcode: 'addPhysics',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'add physics to the scene',
                    func: 'addPhysics',
                },
                {
                    opcode: 'togglePhysics',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'toggle physics',
                    func: 'togglePhysics',
                },
                {
                    opcode: 'resetScene',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'reset the scene',
                    func: 'resetScene',
                },
                {
                    opcode: 'setAnimationSpeed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set animation speed to [SPEED]',
                    arguments: {
                        SPEED: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0.01,
                        },
                    },
                    func: 'setAnimationSpeed',
                },
                {
                    opcode: 'animateCube',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'animate cube rotation',
                    func: 'animateCube',
                },
                {
                    opcode: 'reportPosition',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'get camera position',
                    func: 'getCameraPosition',
                },
                {
                    opcode: 'exportScene',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'export the scene',
                    func: 'exportScene',
                },
                {
                    opcode: 'importScene',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'import scene from [DATA]',
                    arguments: {
                        DATA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '{}',
                        },
                    },
                    func: 'importScene',
                },
                {
                    opcode: 'scaleObject',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'scale object to x: [X], y: [Y], z: [Z]',
                    arguments: {
                        X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                    },
                    func: 'scaleObject',
                },
                {
                    opcode: 'setColor',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set color of object [INDEX] to [COLOR]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#ff0000' },
                    },
                    func: 'setColor',
                },
                {
                    opcode: 'rotateObject',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'rotate object [INDEX] by x: [X], y: [Y], z: [Z]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    },
                    func: 'rotateObject',
                },
                {
                    opcode: 'setLightProperties',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set light color to [COLOR] and intensity to [INTENSITY]',
                    arguments: {
                        COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#ffffff' },
                        INTENSITY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                    },
                    func: 'setLightProperties',
                },
                {
                    opcode: 'onCollision',
                    blockType: Scratch.BlockType.HAT,
                    text: 'when object [OBJECT1] collides with [OBJECT2]',
                    arguments: {
                        OBJECT1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        OBJECT2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                    },
                    func: 'onCollision',
                },
                {
                    opcode: 'moveObject',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'move object [INDEX] to x: [X], y: [Y], z: [Z]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    },
                    func: 'moveObject',
                },
                {
                    opcode: 'deleteObject',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'delete object [INDEX]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    },
                    func: 'deleteObject',
                },
                {
                    opcode: 'setVisibility',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set visibility of object [INDEX] to [VISIBLE]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        VISIBLE: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: true },
                    },
                    func: 'setVisibility',
                },
                {
                    opcode: 'isVisible',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'is object [INDEX] visible?',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                    },
                    func: 'isVisible',
                },
                {
                    opcode: 'changeMaterial',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'change material of object [INDEX] to [MATERIAL]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        MATERIAL: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'materialMenu',
                            defaultValue: 'basic',
                        },
                    },
                    func: 'changeMaterial',
                },
            ],
            menus: {
                materialMenu: {
                    acceptReporters: true,
                    items: ['basic', 'standard', 'phong', 'lambert'],
                },
            },
            translation_map: {
                en: { 'webGLThreeJSExtension.name': 'WebGL and Three.js Extension' },
            },
            targetTypes: ['webGLTarget'],
        };
    }

    moveObject(args) {
        const { INDEX, X, Y, Z } = args;
        const object = this.cubes[INDEX];
        if (object) {
            object.position.set(X, Y, Z);
            console.log(`Object moved to (${X}, ${Y}, ${Z}) at index ${INDEX}`);
        }
    }

    deleteObject(args) {
        const { INDEX } = args;
        const object = this.cubes[INDEX];
        if (object) {
            this.scene.remove(object);
            this.cubes.splice(INDEX, 1); // Remove from array
            console.log(`Object at index ${INDEX} deleted.`);
        }
    }

    setVisibility(args) {
        const { INDEX, VISIBLE } = args;
        const object = this.cubes[INDEX];
        if (object) {
            object.visible = VISIBLE;
            console.log(`Object visibility set to ${VISIBLE} at index ${INDEX}`);
        }
    }

    isVisible(args) {
        const { INDEX } = args;
        const object = this.cubes[INDEX];
        if (object) {
            return object.visible;
        }
        return false;
    }

    changeMaterial(args) {
        const { INDEX, MATERIAL } = args;

        // Check if the index is valid
        if (INDEX < 0 || INDEX >= this.cubes.length) {
            console.error(`Invalid index: ${INDEX}.`);
            return;
        }

        const object = this.cubes[INDEX]; // Three.js mesh
        const body = this.cubeBodies[INDEX]; // Cannon.js body

        // Check if the mesh and body exist
        if (!object || !body) {
            console.error(`Mesh or body is undefined for cube: {mesh: ${object}, body: ${body}}`);
            return;
        }

        console.log(`Cubes array: `, this.cubes); // Debug: log the cubes array

        if (object && object.material) {
            let newMaterial;
            // Create a new material based on the specified type
            switch (MATERIAL) {
                case 'basic':
                    newMaterial = new THREE.MeshBasicMaterial({ color: object.material.color });
                    break;
                case 'standard':
                    newMaterial = new THREE.MeshStandardMaterial({ color: object.material.color });
                    break;
                case 'phong':
                    newMaterial = new THREE.MeshPhongMaterial({ color: object.material.color });
                    break;
                case 'lambert':
                    newMaterial = new THREE.MeshLambertMaterial({ color: object.material.color });
                    break;
                default:
                    console.error(`Unknown material type: ${MATERIAL}. Defaulting to 'basic'.`);
                    newMaterial = new THREE.MeshBasicMaterial({ color: object.material.color });
                    break;
            }
            // Assign the new material to the object's mesh
            object.material = newMaterial;
            console.log(`Object material changed to ${MATERIAL} at index ${INDEX}`);
        } else {
            console.error(`Object at index ${INDEX} does not exist or does not have a material.`);
        }
    }

    scaleObject(args) {
        const { X, Y, Z } = args;
        const object = this.cubes[0]; // Example: first cube
        if (object) {
            object.scale.set(X, Y, Z);
            console.log(`Object scaled to (${X}, ${Y}, ${Z})`);
        }
    }

    setColor(args) {
        const { id, color } = args;

        // Find the cube or sphere by ID
        const cube = this.cubes.find(c => c.id === id);
        const sphere = this.spheres.find(s => s.id === id);

        if (cube) {
            // Set the color of the cube
            cube.mesh.material.color.set(color);
            console.log(`Cube color set to ${color}.`);
        } else if (sphere) {
            // Set the color of the sphere
            sphere.mesh.material.color.set(color);
            console.log(`Sphere color set to ${color}.`);
        } else {
            console.error(`No shape found with ID: ${id}`);
        }
    }

    rotateObject(args) {
        const { INDEX, X, Y, Z } = args;
        const object = this.cubes[INDEX];
        if (object) {
            object.rotation.x += X;
            object.rotation.y += Y;
            object.rotation.z += Z;
            console.log(`Rotated object by (${X}, ${Y}, ${Z}) at index ${INDEX}`);
        }
    }

    setLightProperties(args) {
        const { COLOR, INTENSITY } = args;
        if (this.pointLight) {
            this.pointLight.color.set(COLOR);
            this.pointLight.intensity = INTENSITY;
            console.log(`Light color set to ${COLOR} and intensity set to ${INTENSITY}`);
        }
    }

    onCollision(args) {
        const { OBJECT1, OBJECT2 } = args;
        // This function would run when OBJECT1 collides with OBJECT2
        console.log(`Collision detected between object ${OBJECT1} and object ${OBJECT2}`);
    }

    loadOrbitControls(callback) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/controls/OrbitControls.js';
        script.onload = () => {
            console.log('OrbitControls loaded.');
            callback();
        };
        script.onerror = () => {
            console.error('Failed to load OrbitControls.');
        };
        document.head.appendChild(script);
    }

    loadThreeJS(callback) {
        if (this.isThreeLoaded) {
            callback();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
            this.isThreeLoaded = true;
            console.log('Three.js library loaded.');
            callback();
        };
        script.onerror = () => {
            console.error('Failed to load Three.js library.');
        };
        document.head.appendChild(script);
    }

    loadCannonJS(callback) {
        if (this.isCannonLoaded) {
            callback();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js';
        script.onload = () => {
            this.isCannonLoaded = true;
            console.log('Cannon.js library loaded.');
            callback();
        };
        script.onerror = () => {
            console.error('Failed to load Cannon.js library.');
        };
        document.head.appendChild(script);
    }

    initWebGL() {
        this.loadThreeJS(() => {
            this.loadCannonJS(() => {
                this.loadOrbitControls(() => {
                    const targetDiv = document.querySelector('.gandi_stage_stage_1fD7k.ccw-stage-wrapper');
                    if (targetDiv) {
                        this.scene = new THREE.Scene();
                        this.camera = new THREE.PerspectiveCamera(75, 448 / 252, 0.1, 1000);
                        this.camera.position.set(0, 5, 10);
                        this.camera.lookAt(0, 0, 0);

                        this.renderer = new THREE.WebGLRenderer();
                        this.renderer.setSize(448, 252);
                        this.renderer.shadowMap.enabled = true; // Enable shadow maps
                        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows
                        targetDiv.insertBefore(this.renderer.domElement, targetDiv.firstChild);
                        console.log('Three.js initialized.');

                        this.physicsWorld = new CANNON.World();
                        this.physicsWorld.gravity.set(0, 0, -9.82);

                        this.addFloor();
                        this.addLighting();

                        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
                        this.controls.enableDamping = true;
                        this.controls.dampingFactor = 0.25;
                        this.controls.screenSpacePanning = false;
                        this.controls.maxPolarAngle = Math.PI / 2;

                        this.animate();
                    }
                });
            });
        });
    }

    addFloor() {
        // Create a large flat plane in Three.js for rendering
        const geometry = new THREE.PlaneGeometry(100, 100); // Large enough plane
        const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const floor = new THREE.Mesh(geometry, material);
        floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
        floor.position.y = -1; // Place it slightly below the origin
        this.scene.add(floor);
        floor.receiveShadow = true; // The floor will receive shadows

        // Create the corresponding Cannon.js physics plane
        const floorShape = new CANNON.Plane();
        const floorBody = new CANNON.Body({
            mass: 0, // Mass of 0 means it won't move (static body)
        });
        floorBody.addShape(floorShape);
        floorBody.position.set(0, -1, 0); // Position at the same Y-level
        this.physicsWorld.addBody(floorBody);

        console.log('Floor added to the scene.');
    }


    addLighting() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(5, 10, 7);
        this.directionalLight.castShadow = true; // Enable shadow casting
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 50;
        this.scene.add(this.directionalLight);

        this.pointLight = new THREE.PointLight(0xff0000, 1, 100);
        this.pointLight.position.set(2, 5, 2);
        this.pointLight.castShadow = true; // Enable shadow casting for point light
        this.scene.add(this.pointLight);
    }

    createCube(args) {
        const { X, Y, Z } = args;
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cubeMesh = new THREE.Mesh(geometry, material); // Create the mesh
        cubeMesh.position.set(X, Y, Z);
        cubeMesh.castShadow = true; // Enable shadow casting
        cubeMesh.receiveShadow = true; // Enable receiving shadows

        // Ensure you're pushing the mesh to the cubes array
        this.cubes.push(cubeMesh); // Push the mesh to the cubes array

        this.scene.add(cubeMesh); // Add to the scene

        // Create Cannon.js physics body
        const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
        const cubeBody = new CANNON.Body({ mass: 1 });
        cubeBody.position.set(X, Y, Z);
        cubeBody.addShape(shape);
        this.physicsWorld.addBody(cubeBody); // Add the body to the physics world

        // Optionally store the body in a separate array if needed
        this.cubeBodies.push(cubeBody); // Push the body to a new array
        console.log(`Cube created at (${X}, ${Y}, ${Z})`);
    }


    createSphere(args) {
        const { X, Y, Z } = args;
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
        const sphere = new THREE.Mesh(geometry, material); // Create the mesh
        sphere.position.set(X, Y, Z);
        sphere.castShadow = true; // Enable shadow casting
        sphere.receiveShadow = true; // Enable receiving shadows

        // Push the sphere mesh to the cubes array (if using same array for both)
        this.cubes.push(sphere); // Ensure you're pushing the mesh itself

        this.scene.add(sphere); // Add to the scene

        const shape = new CANNON.Sphere(0.5);
        const body = new CANNON.Body({ mass: 1 });
        body.position.set(X, Y, Z);
        body.addShape(shape);
        this.physicsWorld.addBody(body);
        console.log(`Sphere created at (${X}, ${Y}, ${Z})`);
    }

    setCameraPosition(args) {
        const { X, Y, Z } = args;
        this.camera.position.set(X, Y, Z);
        console.log(`Camera position set to (${X}, ${Y}, ${Z}).`);
    }

    setLightPosition(args) {
        const { X, Y, Z } = args;
        this.pointLight.position.set(X, Y, Z);
        console.log(`Light position set to (${X}, ${Y}, ${Z}).`);
    }

    // Sync positions and rotations between physics bodies and Three.js meshes
    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.physicsEnabled) {
            this.physicsWorld.step(1 / 60); // Advance the physics world by one step (60 FPS)
        }

        // Ensure you are accessing the correct properties
        this.cubes.forEach(({ mesh, body }) => {
            if (mesh && body) { // Check if both mesh and body exist
                mesh.position.copy(body.position);
                mesh.quaternion.copy(body.quaternion); // Sync rotation too
            } else {
                console.error("Mesh or body is undefined for cube:", { mesh, body });
            }
        });

        this.spheres.forEach(({ mesh, body }) => {
            if (mesh && body) { // Check if both mesh and body exist
                mesh.position.copy(body.position);
                mesh.quaternion.copy(body.quaternion);
            } else {
                console.error("Mesh or body is undefined for sphere:", { mesh, body });
            }
        });

        this.controls.update(); // Update camera controls
        this.renderer.render(this.scene, this.camera); // Render the scene
    }

    togglePhysics() {
        this.physicsEnabled = !this.physicsEnabled;
        console.log(`Physics enabled: ${this.physicsEnabled}`);
    }

    resetScene() {
        this.scene.clear(); // Clear the scene
        this.cubes = []; // Reset cubes
        this.spheres = []; // Reset spheres
        this.physicsWorld.bodies.forEach(body => this.physicsWorld.removeBody(body)); // Remove bodies from physics world
        console.log('Scene reset.');
        this.addFloor(); // Re-add the floor
        this.addLighting(); // Re-add lighting
    }

    setAnimationSpeed(args) {
        const { SPEED } = args;
        this.animationSpeed = SPEED;
        console.log(`Animation speed set to ${SPEED}.`);
    }

    animateCube() {
        this.cubes.forEach(cube => {
            cube.rotation.x += this.animationSpeed;
            cube.rotation.y += this.animationSpeed;
        });
        console.log('Cubes animated.');
    }

    getCameraPosition() {
        return JSON.stringify(this.camera.position.toArray());
    }

    exportScene() {
        const positions = this.cubes.map(cube => ({
            type: 'cube',
            position: cube.position.toArray(),
        })).concat(this.spheres.map(sphere => ({
            type: 'sphere',
            position: sphere.position.toArray(),
        })));
        return JSON.stringify(positions);
    }

    importScene(args) {
        const data = JSON.parse(args.DATA);
        this.resetScene();
        data.forEach(item => {
            if (item.type === 'cube') {
                this.createCube({ X: item.position[0], Y: item.position[1], Z: item.position[2] });
            } else if (item.type === 'sphere') {
                this.createSphere({ X: item.position[0], Y: item.position[1], Z: item.position[2] });
            }
        });
        console.log('Scene imported.');
    }
}

Scratch.extensions.register(new WebGLThreeJSExampleExtension());