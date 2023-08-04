import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Pages/Home";
import Chatbot from "./Pages/Chatbot";
import DBDownload from "./Pages/DBDownload";
import DBUpload from "./Pages/DBUpload";
import Contact from "./Pages/Contact";
import ScrollToTop from "./Utils/scrollToTop";
import "./App.css";

const theme = {
  colors: {
    primary: "#3aa832",
    secundary: "#f1f1f1",
    navFontColor: "#000000",
    navDropdownFontColor: "#000000",
    navChevronColor: "#000000",
    navDropdownBGColor: "#f9f9f9",
    burgerFontColor: "#000000",
    burgerDropdownFontColor: "#000000",
    burgerChevronColor: "##000000",
    burgerBGColor: "#f9f9f9",
    burgerDropdownBGColor: "#ededed",
    lngFontColor: "##000000",
    lngDropdownColor: "#000000",
    lngChevronColor: "#000000",
    lngDropdownBGColor: "#f9f9f9",
    inputBorderColor: "#c9c9c9",
    grey: "#787878",
    middlegrey: "#cccccc",
    lightgrey: "#eeeeee",
    white: "#ffffff",
    red: "#f22e2e",
  },
  typography: {
    fontFamiliy: "Helvetica Neue",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.typography.fontFamiliy};
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route path="/chatbot/:name" component={Chatbot} />
          <Route path="/dbdownload" component={DBDownload} />
          <Route path="/dbupload" component={DBUpload} />
          <Route path="/contact" component={Contact} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
