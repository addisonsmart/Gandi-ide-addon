class GameBoyEmulatorExtension {
  constructor() {
    this.gb = null;
    this.isJsGBLoaded = false;
  }

  getInfo() {
    return {
      id: 'gameBoyEmulator',
      name: 'Game Boy Emulator',
      color1: '#6CBB5A',
      blockIconURI: 'data:image/png;base64,...', // Add an icon if needed
      blocks: [
        {
          opcode: 'loadRom',
          blockType: Scratch.BlockType.COMMAND,
          text: 'load GameBoy ROM [ROM]',
          arguments: {
            ROM: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'path/to/rom.gb',
            },
          },
          func: 'loadROM',
        },
        {
          opcode: 'startEmulation',
          blockType: Scratch.BlockType.COMMAND,
          text: 'start emulation',
          func: 'startGame',
        },
        {
          opcode: 'pressButton',
          blockType: Scratch.BlockType.COMMAND,
          text: 'press [BUTTON] button',
          arguments: {
            BUTTON: {
              type: Scratch.ArgumentType.STRING,
              menu: 'buttonsMenu',
              defaultValue: 'A',
            },
          },
          func: 'pressButton',
        },
      ],
      menus: {
        buttonsMenu: ['A', 'B', 'Start', 'Select', 'Up', 'Down', 'Left', 'Right'],
      },
    };
  }

  loadjsGB(callback) {
    if (this.isJsGBLoaded) {
        callback();
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/plavelo/jsGB/feature/es2015/js/gb.js';  // Example link
    script.onload = () => {
        this.isJsGBLoaded = true;
        console.log('jsGB library loaded.');
        callback();
    };
    script.onerror = () => {
        console.error('Failed to load jsGB library.');
    };
    document.head.appendChild(script);
}


  loadROM(url, callback) {
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const rom = new Uint8Array(buffer);
            callback(rom);
        })
        .catch(error => {
            console.error('Failed to load ROM:', error);
        });
}

startGame() {
    this.loadjsGB(() => {
        this.loadROM('https://addisonsmart.github.io/Gandi-ide-addon/lozla.gb', (rom) => {
            const emulator = new gb(rom);  // Assuming 'gb' is the jsGB class constructor
            emulator.start();  // Starts the emulator
            console.log('Game started.');
        });
    });
}

  // Function to simulate button presses
  pressButton(args) {
    if (this.gb) {
      switch (args.BUTTON) {
        case 'A':
          this.gb.pressButton('A');
          break;
        case 'B':
          this.gb.pressButton('B');
          break;
        case 'Start':
          this.gb.pressButton('START');
          break;
        case 'Select':
          this.gb.pressButton('SELECT');
          break;
        case 'Up':
          this.gb.pressButton('UP');
          break;
        case 'Down':
          this.gb.pressButton('DOWN');
          break;
        case 'Left':
          this.gb.pressButton('LEFT');
          break;
        case 'Right':
          this.gb.pressButton('RIGHT');
          break;
      }
    }
  }
}

Scratch.extensions.register(new GameBoyEmulatorExtension());
