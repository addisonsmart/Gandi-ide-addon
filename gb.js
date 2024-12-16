class PhysicsRenderer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.shapes = [];
        this.physicsWorld = null;
        this.physicsBodies = [];
        this.clock = new THREE.Clock(); // For physics stepping
    }

    getInfo() {
        return {
            id: 'physicsRenderer',
            name: 'Physics Renderer',
            blocks: [
                {
                    opcode: 'initPhysicsRenderer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'initialize physics and renderer',
                    func: 'initPhysicsRenderer',
                },
                {
                    opcode: 'addPhysicsShape',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'add [SHAPE] at x: [X] y: [Y] z: [Z] with size w: [WIDTH] h: [HEIGHT] d: [DEPTH]',
                    arguments: {
                        SHAPE: { type: Scratch.ArgumentType.STRING, defaultValue: 'cube', menu: 'shapeMenu' },
                        X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        DEPTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                    },
                    func: 'addPhysicsShape',
                },
                {
                    opcode: 'stepPhysics',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'step physics',
                    func: 'stepPhysics',
                }
            ],
            menus: {
                shapeMenu: {
                    acceptReporters: true,
                    items: ['cube', 'sphere'],
                },
            },
        };
    }

    loadLibraries(callback) {
        const loadScript = (url, onLoad) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = onLoad;
            script.onerror = () => console.error(`Failed to load script: ${url}`);
            document.head.appendChild(script);
        };

        if (!window.THREE) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', () => {
                if (!window.CANNON) {
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js', callback);
                } else {
                    callback();
                }
            });
        } else if (!window.CANNON) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js', callback);
        } else {
            callback();
        }
    }

    initPhysicsRenderer() {
        this.loadLibraries(() => {
            const targetDiv = document.querySelector('.gandi_stage_stage_1fD7k.ccw-stage-wrapper');
            if (targetDiv) {
                // Initialize Three.js
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, 448 / 252, 0.1, 1000);
                this.camera.position.set(0, 5, 10);
                this.camera.lookAt(0, 0, 0);

                this.renderer = new THREE.WebGLRenderer();
                this.renderer.setSize(448, 252);
                targetDiv.insertBefore(this.renderer.domElement, targetDiv.firstChild);

                // Initialize Cannon.js
                this.physicsWorld = new CANNON.World();
                this.physicsWorld.gravity.set(0, -9.82, 0);

                // Start the render loop
                this.animate();
                console.log('Physics and rendering initialized.');
            } else {
                console.error('Target div not found.');
            }
        });
    }

    addPhysicsShape(args) {
        if (!this.scene || !this.physicsWorld) {
            console.warn('Physics or rendering not initialized.');
            return;
        }

        let geometry, bodyShape;
        if (args.SHAPE === 'cube') {
            geometry = new THREE.BoxGeometry(args.WIDTH, args.HEIGHT, args.DEPTH);
            bodyShape = new CANNON.Box(new CANNON.Vec3(args.WIDTH / 2, args.HEIGHT / 2, args.DEPTH / 2));
        } else if (args.SHAPE === 'sphere') {
            geometry = new THREE.SphereGeometry(args.WIDTH / 2, 32, 32);
            bodyShape = new CANNON.Sphere(args.WIDTH / 2);
        } else {
            console.warn(`Shape type "${args.SHAPE}" is not supported.`);
            return;
        }

        // Create Three.js mesh
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(args.X, args.Y, args.Z);
        this.scene.add(mesh);
        this.shapes.push(mesh);

        // Create Cannon.js body
        const body = new CANNON.Body({
            mass: 1, // Default mass
            position: new CANNON.Vec3(args.X, args.Y, args.Z),
            shape: bodyShape,
        });
        this.physicsWorld.addBody(body);
        this.physicsBodies.push(body);
    }

    stepPhysics() {
        if (!this.physicsWorld) {
            console.warn('Physics world not initialized.');
            return;
        }

        const deltaTime = this.clock.getDelta();
        this.physicsWorld.step(1 / 60, deltaTime, 3);

        // Sync Three.js meshes with Cannon.js bodies
        this.shapes.forEach((mesh, index) => {
            const body = this.physicsBodies[index];
            if (body) {
                mesh.position.copy(body.position);
                mesh.quaternion.copy(body.quaternion);
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.stepPhysics();
    }
}
