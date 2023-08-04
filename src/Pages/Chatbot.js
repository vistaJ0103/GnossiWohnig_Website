import styled from "styled-components";
import RegisterChat from "../Components/Chatbot/RegisterChat";

const ChatbotContainer = styled.div`
  position: fixed;
  left: 0px;
`;

const Chatbot = (props) => {
  return (
    <ChatbotContainer>
      <RegisterChat names={props.match.params.name} />
    </ChatbotContainer>
  );
};

export default Chatbot;
