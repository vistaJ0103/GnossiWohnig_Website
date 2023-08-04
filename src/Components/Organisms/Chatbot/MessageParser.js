// MessageParser starter code in MessageParser.js
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    this.actionProvider.handleInput(message);
    /*
    if (message.includes("test")) {
      this.actionProvider.handleHello();
    }
    */
  }
}

export default MessageParser;
