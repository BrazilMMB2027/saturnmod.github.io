(function(Scratch) {
  'use strict';

  class ChatGPTExtension {
    constructor() {
      this.apiKey = '';
      this.model = 'gpt-4o-mini';
      this.lastResponse = '';
    }

    getInfo() {
      return {
        id: 'chatgptmod',
        name: 'ChatGPT',
        color1: '#10a37f', // OpenAI green
        color2: '#0e8c6d',
        blocks: [
          {
            opcode: 'setApiKey',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set OpenAI API Key to [KEY]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'sk-...'
              }
            }
          },
          {
            opcode: 'setModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set model to [MODEL]',
            arguments: {
              MODEL: {
                type: Scratch.ArgumentType.STRING,
                menu: 'modelMenu'
              }
            }
          },
          {
            opcode: 'askChatGPT',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send prompt [PROMPT] to ChatGPT',
            arguments: {
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, how are you?'
              }
            }
          },
          {
            opcode: 'getResponse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ChatGPT response'
          }
        ],
        menus: {
          modelMenu: {
            acceptReporters: true,
            items: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo']
          }
        }
      };
    }

    setApiKey(args) {
      this.apiKey = Scratch.Cast.toString(args.KEY);
    }

    setModel(args) {
      this.model = Scratch.Cast.toString(args.MODEL);
    }

    async askChatGPT(args) {
      const prompt = Scratch.Cast.toString(args.PROMPT);

      if (!this.apiKey) {
        this.lastResponse = 'Error: API Key is missing!';
        return;
      }

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: this.model,
            messages: [{ role: 'user', content: prompt }]
          })
        });

        const data = await response.json();

        if (data.choices && data.choices[0]) {
          this.lastResponse = data.choices[0].message.content;
        } else if (data.error) {
          this.lastResponse = `API Error: ${data.error.message}`;
        } else {
          this.lastResponse = 'Error: Unknown response format';
        }
      } catch (err) {
        this.lastResponse = `Network Error: ${err.message}`;
      }
    }

    getResponse() {
      return this.lastResponse;
    }
  }

  Scratch.extensions.register(new ChatGPTExtension());
})(Scratch);
