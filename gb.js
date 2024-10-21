class GameBoyEmulatorExtension {
  constructor() {
    this.gb = null;
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
          func: 'loadRom',
        },
        {
          opcode: 'startEmulation',
          blockType: Scratch.BlockType.COMMAND,
          text: 'start emulation',
          func: 'startEmulation',
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

  // Function to load the ROM
  loadRom(args) {
    const romUrl = args.ROM;

    fetch(romUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.gb = new jsGB();
        this.gb.loadROM(buffer);
      })
      .catch(err => console.error('Error loading ROM:', err));
  }

  // Function to start the emulator
  startEmulation() {
    if (this.gb) {
      const targetDiv = document.querySelector('.gandi_stage_stage_1fD7k.ccw-stage-wrapper');
      
      // Create and append a canvas element if it doesn't exist
      if (!targetDiv.querySelector('canvas')) {
        const canvas = document.createElement('canvas');
        canvas.width = 160; // Game Boy resolution width
        canvas.height = 144; // Game Boy resolution height
        targetDiv.appendChild(canvas);
      }

      const canvas = targetDiv.querySelector('canvas');
      const context = canvas.getContext('2d');

      this.gb.setCanvasContext(context);
      this.gb.start();
    }
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
