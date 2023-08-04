import { updateDocument, getDocument } from "../../../firebaseProvider";

let progress = 0;

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  location = window.location.toString();
  regLocation = this.location.indexOf("register");

  //Achtung: Muss auf die URL angepasst werden!!!!!!!!!!!!!!!!!!!
  //doc = this.location.substring(this.regLocation + 9);
  //Localhost
  doc = this.location.substring(this.regLocation + 31);

  // Anmeldung
  handleParticipantsPosOnlyOne = () => {
    let messages = [
      this.createChatbotMessage("Das ist super."),
      this.createChatbotMessage(
        "Damit wir das Buffet euren Bedürfnissen entsprechend gestalten können, würden wir gerne deine Präferenzen wissen.",
        {
          withAvatar: false,
          widget: "foodOptions",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 1.1;
    getDocument("guestList", this.doc).then((res) => {
      updateDocument("guestList", this.doc, { registered: res.peopleNames });
    });
  };

  handleParticipantsPosMultiplePeople = () => {
    let messages = [
      this.createChatbotMessage("Das ist super."),
      this.createChatbotMessage(
        "Damit wir das Buffet euren Bedürfnissen entsprechend gestalten können, würden wir gerne eure Präferenzen wissen.",
        {
          withAvatar: false,
          widget: "foodOptions",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 1.1;
    getDocument("guestList", this.doc).then((res) => {
      updateDocument("guestList", this.doc, { registered: res.peopleNames });
    });
  };

  handleParticipantsOnlyOne = () => {
    const message = this.createChatbotMessage(
      "Das ist schade, wer von euch kann nicht kommen?",
      {
        widget: "participantsOnlyOneOptions",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
    progress = 1.2;
  };

  handleParticipantsPart = () => {
    const message = this.createChatbotMessage(
      "Das ist schade, wer von euch kann nicht kommen?",
      {
        widget: "participantsPartOptions",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
    progress = 1.3;
  };

  handleParticipantsSelected = (selectedOptions) => {
    let regPersons = [];
    for (const [key, value] of Object.entries(selectedOptions)) {
      if (!value) {
        regPersons.push(key);
      }
    }

    let messages = [
      this.createChatbotMessage("Danke für die Info."),
      this.createChatbotMessage(
        regPersons.length > 1
          ? "Damit wir das Buffet euren Bedürfnissen entsprechend gestalten können, würden wir gerne eure Präferenzen wissen."
          : "Damit wir das Buffet euren Bedürfnissen entsprechend gestalten können, würden wir gerne deine Präferenzen wissen.",
        {
          withAvatar: false,
          widget: "foodOptions",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 1.4;
    updateDocument("guestList", this.doc, { registered: regPersons });
  };

  handleParticipantsBeg = () => {
    const message = this.createChatbotMessage(
      "Super, wie heisst deine Begleitung?"
    );
    this.updateChatbotState(message);
    progress = 1.5;
  };

  handleParticipantsNeg = () => {
    const message = this.createChatbotMessage(
      "Das ist schade, die Anmeldung ist somit beendet.",
      {
        widget: "redirectToWebsite",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
    progress = 1.6;

    updateDocument("guestList", this.doc, { registered: null });
  };

  // Food
  handleFoodOnePerson = (selectedOptions) => {
    const message = this.createChatbotMessage(
      "Hast du irgendwelche Allergien?",
      {
        widget: "allgergiesOptions",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
    progress = 2.1;

    updateDocument("guestList", this.doc, { food: selectedOptions });
  };

  handleFoodMultiplePeople = (selectedOptions) => {
    const message = this.createChatbotMessage(
      "Habt ihr irgendwelche Allergien?",
      {
        widget: "allgergiesOptions",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
    progress = 2.2;

    updateDocument("guestList", this.doc, { food: selectedOptions });
  };

  // Allergies
  handleNoAllergiesOnePerson = () => {
    const messages = [
      this.createChatbotMessage(
        "Wie du gesehen hast findet das Fest in Zweisimmen statt. Damit du ausgelassen mit uns feiern kannst empfehlen wir dir in der Nähe zu übernachten. Alle Übernachtungsmöglichkeiten findest du nach dieser Anmeldung auf der Homepage, auf welche du weitergeleitet wirst."
      ),
      this.createChatbotMessage(
        "Wirst du am Sonntag mit uns morgen Frühstücken?",
        {
          withAvatar: false,
          widget: "breakfastOptions",
          delay: 1000,
        }
      ),
    ];

    this.updateChatbotState(messages);
    progress = 3.1;
  };

  handleNoAllergiesMultiplePeople = () => {
    const messages = [
      this.createChatbotMessage(
        "Wie ihr gesehen habt findet das Fest in Zweisimmen statt. Damit ihr ausgelassen mit uns feiern könnt empfehlen wir euch in der Nähe zu übernachten. Alle Übernachtungsmöglichkeiten findet ihr nach dieser Anmeldung auf der Homepage, auf welche ihr weitergeleitet werdet."
      ),
      this.createChatbotMessage(
        "Werdet ihr am Sonntag morgen mit uns Frühstücken?",
        {
          withAvatar: false,
          widget: "breakfastOptions",
          delay: 1000,
        }
      ),
    ];

    this.updateChatbotState(messages);
    progress = 3.2;
  };

  handleAllergiesOnePerson = () => {
    const message = this.createChatbotMessage("Welche?");
    this.updateChatbotState(message);
    progress = 3.3;
  };

  handleAllergiesMultiplePeople = () => {
    const message = this.createChatbotMessage("Welche?");
    this.updateChatbotState(message);
    progress = 3.4;
  };

  // Breakfast
  handleBreakfastPosOnlyOne = () => {
    const messages = [
      this.createChatbotMessage("Super, wir freuen uns auf dich!"),
      this.createChatbotMessage(
        "Für Änderungen kannst du jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.1;

    updateDocument("guestList", this.doc, { breakfast: 1 });
  };

  handleBreakfastPosMultiplePeople = () => {
    const messages = [
      this.createChatbotMessage("Super, wir freuen uns auf euch!"),
      this.createChatbotMessage(
        "Für Änderungen könnt ihr jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.2;

    getDocument("guestList", this.doc).then((res) => {
      updateDocument("guestList", this.doc, {
        breakfast: res.registered.length,
      });
    });
  };

  handleBreakfastUnclearOnlyOne = () => {
    const messages = [
      this.createChatbotMessage("Ok, gib Bescheid sobald du es weisst."),
      this.createChatbotMessage("Wir freuen uns auf dich!", {
        withAvatar: false,
      }),
      this.createChatbotMessage(
        "Für Änderungen kannst du jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.3;

    updateDocument("guestList", this.doc, { breakfast: "unclear" });
  };

  handleBreakfastUnclearMultiplePeople = () => {
    const messages = [
      this.createChatbotMessage("Ok, gib Bescheid sobald ihr es wisst."),
      this.createChatbotMessage("Wir freuen uns auf euch!", {
        withAvatar: false,
      }),
      this.createChatbotMessage(
        "Für Änderungen könnt ihr jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.4;

    updateDocument("guestList", this.doc, { breakfast: "unclear" });
  };

  handleBreakfastOnlyOne = () => {
    const messages = [
      this.createChatbotMessage("Danke für die Info."),
      this.createChatbotMessage("Wir freuen uns auf euch!", {
        withAvatar: false,
      }),
      this.createChatbotMessage(
        "Für Änderungen kannst du jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.5;

    updateDocument("guestList", this.doc, { breakfast: 1 });
  };

  handleBreakfastPart = () => {
    const message = this.createChatbotMessage(
      "Wie viele von euch werden mit uns Frühstücken?"
    );
    this.updateChatbotState(message);
    progress = 4.6;
  };

  handleBreakfastNegOnlyOne = () => {
    const messages = [
      this.createChatbotMessage("Danke für die Info."),
      this.createChatbotMessage("Wir freuen uns auf dich!", {
        withAvatar: false,
      }),
      this.createChatbotMessage(
        "Für Änderungen kannst du jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.7;

    updateDocument("guestList", this.doc, { breakfast: 0 });
  };

  handleBreakfastNegMultiplePeople = () => {
    const messages = [
      this.createChatbotMessage("Danke für die Info."),
      this.createChatbotMessage("Wir freuen uns auf euch!", {
        withAvatar: false,
      }),
      this.createChatbotMessage(
        "Für Änderungen könnt ihr jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
        {
          withAvatar: false,
          widget: "redirectToWebsite",
          delay: 1000,
        }
      ),
    ];
    this.updateChatbotState(messages);
    progress = 4.8;

    updateDocument("guestList", this.doc, { breakfast: 0 });
  };

  // Restart
  handleRestartOnePerson = () => {
    const message = this.createChatbotMessage(
      "Möchtest du an unserer Hochzeit teilnehmen?",
      {
        withAvatar: false,
        widget: "participateOptions",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
  };

  handleRestartMultiplePeople = () => {
    const message = this.createChatbotMessage(
      "Möchtet ihr an unserer Hochzeit teilnehmen?",
      {
        withAvatar: false,
        widget: "participateOptions",
        delay: 1000,
      }
    );
    this.updateChatbotState(message);
  };

  // Input
  handleInput = (inputMessage) => {
    if (progress === 1.5) {
      let messages = [
        this.createChatbotMessage("Danke für die Info."),
        this.createChatbotMessage(
          "Damit wir das Buffet euren Bedürfnissen entsprechend gestalten können, würden wir gerne eure Präferenzen wissen.",
          {
            withAvatar: false,
            widget: "foodOptions",
            delay: 1000,
          }
        ),
      ];
      this.updateChatbotState(messages);
      getDocument("guestList", this.doc).then((res) => {
        updateDocument("guestList", this.doc, {
          registered: [res.peopleNames[0], inputMessage],
        });
      });
    } else if (progress === 1.6) {
      const message = this.createChatbotMessage("Danke für deine Nachricht");
      this.updateChatbotState(message);
    } else if (progress === 3.3) {
      const messages = [
        this.createChatbotMessage("Danke für die Info."),
        this.createChatbotMessage(
          "Wie du gesehen hast findet das Fest in Zweisimmen statt. Damit du ausgelassen mit uns feiern kannst empfehlen wir dir in der Nähe zu übernachten. Alle Übernachtungsmöglichkeiten findest du nach dieser Anmeldung auf der Homepage, auf welche du weitergeleitet wirst.",
          {
            withAvatar: false,
          }
        ),
        this.createChatbotMessage(
          "Wirst du am Sonntag morgen mit uns Frühstücken?",
          {
            withAvatar: false,
            widget: "breakfastOptions",
            delay: 1000,
          }
        ),
      ];
      this.updateChatbotState(messages);
      updateDocument("guestList", this.doc, {
        allergies: inputMessage,
      });
    } else if (progress === 3.4) {
      const messages = [
        this.createChatbotMessage("Danke für die Info."),
        this.createChatbotMessage(
          "Wie ihr gesehen habt findet das Fest in Zweisimmen statt. Damit ihr ausgelassen mit uns feiern könnt empfehlen wir euch in der Nähe zu übernachten. Alle Übernachtungsmöglichkeiten findet ihr nach dieser Anmeldung auf der Homepage, auf welche ihr weitergeleitet werdet.",
          {
            withAvatar: false,
          }
        ),
        this.createChatbotMessage(
          "Werdet ihr am Sonntag morgen mit uns Frühstücken?",
          {
            withAvatar: false,
            widget: "breakfastOptions",
            delay: 1000,
          }
        ),
      ];

      this.updateChatbotState(messages);

      updateDocument("guestList", this.doc, {
        allergies: inputMessage,
      });
    } else if (progress === 4.6) {
      const messages = [
        this.createChatbotMessage("Danke für die Info."),
        this.createChatbotMessage("Wir freuen uns auf euch!", {
          withAvatar: false,
        }),
        this.createChatbotMessage(
          "Für Änderungen könnt ihr jederzeit den QR-Code nochmal scannen und die Anmeldung wiederholen.",
          {
            withAvatar: false,
            widget: "redirectToWebsite",
            delay: 1000,
          }
        ),
      ];
      this.updateChatbotState(messages);
      updateDocument("guestList", this.doc, { breakfast: inputMessage });
      progress = 4.9;
    } else if (
      progress === 4.1 ||
      progress === 4.3 ||
      progress === 4.5 ||
      progress === 4.7
    ) {
      const message = this.createChatbotMessage(
        "Die Anmeldung ist beendet. Melde dich direkt bei uns wenn du noch Fragen / Bemerkungen hast."
      );
      this.updateChatbotState(message);
    } else if (
      progress === 4.2 ||
      progress === 4.4 ||
      progress === 4.8 ||
      progress === 4.9
    ) {
      const message = this.createChatbotMessage(
        "Die Anmeldung ist beendet. Meldet euch direkt bei uns wenn ihr noch Fragen / Bemerkungen habt."
      );
      this.updateChatbotState(message);
    } else {
      const message = this.createChatbotMessage(
        "Bitte wähle oben eine Option aus."
      );
      this.updateChatbotState(message);
    }
  };

  updateChatbotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
}

export default ActionProvider;
