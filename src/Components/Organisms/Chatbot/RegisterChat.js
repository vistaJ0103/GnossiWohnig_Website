import { useState } from "react";
import styled from "styled-components";

import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { createChatBotMessage } from "react-chatbot-kit";
import {
  ParticipateOptions,
  ParticipantsPartOptions,
  ParticipantsOnlyOneOptions,
} from "./ChatbotWidgets/ParticipateOptions";
import { FoodOptions } from "./ChatbotWidgets/FoodOptions";
import { getDocument } from "../../firebaseProvider";
import "./RegisterChat.css";
import { AllergiesOptions } from "./ChatbotWidgets/AllergiesOptions";
import { BreakfastOptions } from "./ChatbotWidgets/BreakfastOptions";
import { RedirectToWebsite } from "./ChatbotWidgets/RedirectToWebsite";
import { RescanOptions } from "./ChatbotWidgets/RescanOptions";
import { GuestAvatar, NeliNikAvatar } from "./Avatars";
import useVH from "react-viewport-height";

const ChatHeader = styled.div`
  background-color: #f1f1f1;
  color: #000000;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  font-family: ${(props) => props.theme.typography.fontFamiliyTitle};
`;

const RegisterChat = ({ names }) => {
  const vh = useVH();
  const [userData, setUserData] = useState();

  if (!userData) {
    getDocument("guestList", names).then((res) => setUserData(res));
  }

  const getChatConfig = () => {
    const articleCap =
      userData.peopleNames.length > 1 ? "Möchtet ihr" : "Möchtest du";
    const articleSmall =
      userData.peopleNames.length > 1 ? "möchtet ihr" : "möchtest du";

    return {
      botName: "Weddingbot",
      customStyles: {
        botMessageBox: {
          backgroundColor: "#d6c5ab",
        },
        chatButton: {
          backgroundColor: "#d6c5ab",
        },
      },
      customComponents: {
        header: () => <ChatHeader>NeliNik Hochzeit 6.8.22</ChatHeader>,
        botAvatar: (props) => <NeliNikAvatar {...props} />,
        userAvatar: (props) => <GuestAvatar {...props} />,
      },
      initialMessages:
        userData.registered === undefined
          ? [
              createChatBotMessage("Hallo " + userData.title),
              createChatBotMessage(
                articleCap + " an unserer Hochzeit teilnehmen?",
                {
                  withAvatar: false,
                  widget: "participateOptions",
                  delay: 1000,
                }
              ),
            ]
          : [
              createChatBotMessage("Hallo " + userData.title),
              createChatBotMessage("Was " + articleSmall + " machen?", {
                withAvatar: false,
                widget: "rescanOptions",
                delay: 1000,
              }),
            ],

      /*
      state: {
        progress: 0,
      },
      */

      widgets: [
        {
          widgetName: "participateOptions",
          widgetFunc: (props) => <ParticipateOptions {...props} />,
          props: userData,
        },
        {
          widgetName: "participantsOnlyOneOptions",
          widgetFunc: (props) => <ParticipantsOnlyOneOptions {...props} />,
          props: userData,
        },
        {
          widgetName: "participantsPartOptions",
          widgetFunc: (props) => <ParticipantsPartOptions {...props} />,
          props: userData,
        },
        {
          widgetName: "foodOptions",
          widgetFunc: (props) => <FoodOptions {...props} />,
          props: userData,
        },
        {
          widgetName: "allgergiesOptions",
          widgetFunc: (props) => <AllergiesOptions {...props} />,
          props: userData,
        },
        {
          widgetName: "breakfastOptions",
          widgetFunc: (props) => <BreakfastOptions {...props} />,
          props: userData,
        },
        {
          widgetName: "redirectToWebsite",
          widgetFunc: (props) => <RedirectToWebsite {...props} />,
        },
        {
          widgetName: "rescanOptions",
          widgetFunc: (props) => <RescanOptions {...props} />,
          props: userData,
        },
        {
          /*
          // defines the name you will use to reference to this widget in "createChatBotMessage".
          widgetName: "singleFlight",
          // Function that will be called internally to resolve the widget
          widgetFunc: (props) => <SingleFlight {...props} />,
          // Any props you want the widget to receive on render
          props: {},
          // Any piece of state defined in the state object that you want to pass down to this widget
          mapStateToProps: ["selectedFlightId", "selectedFlight"],
          */
        },
      ],
    };
  };

  return userData ? (
    <div style={{ height: `${100 * vh}px` }}>
      <Chatbot
        config={getChatConfig()}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        runInitialMessagesWithHistory
      />
    </div>
  ) : (
    <div></div>
  );
};

export default RegisterChat;
