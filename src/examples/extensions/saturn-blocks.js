(function(Scratch) {
  'use strict';

  class SaturnModBlocks {
    getInfo() {
      return {
        id: 'saturnmod',
        name: 'Saturn Mod',
        color1: '#5b2c6f',
        blocks: [
          {
            opcode: 'reverseText',
            blockType: Scratch.BlockType.REPORTER,
            text: 'reverse [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'saturn'
              }
            }
          }
        ]
      };
    }

    reverseText(args) {
      const text = Scratch.Cast.toString(args.TEXT);
      return text.split('').reverse().join('');
    }
  }

  Scratch.extensions.register(new SaturnModBlocks());
})(Scratch);
