import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Pages/Home/Home";
import Infos from "./Pages/Infos";
import Contact from "./Pages/Contact";
import ScrollToTop from "./Utils/scrollToTop";
import "./App.css";

const theme = {
  colors: {
    primary: "#488BAE",
    secundary: "#eff0f4",
    navFontColor: "#d9dadb",
    navDropdownFontColor: "#ffffff",
    navChevronColor: "#ffffff",
    navDropdownBGColor: "#f9f9f9",
    burgerFontColor: "#ffffff",
    burgerDropdownFontColor: "#ffffff",
    burgerChevronColor: "#ffffff",
    burgerBGColor: "#f9f9f9",
    burgerDropdownBGColor: "#ededed",
    lngFontColor: "#ffffff",
    lngDropdownColor: "#ffffff",
    lngChevronColor: "#ffffff",
    lngDropdownBGColor: "#f9f9f9",
    inputBorderColor: "#c9c9c9",
    grey: "#787878",
    middlegrey: "#cccccc",
    lightgrey: "#eff0f4",
    white: "#ffffff",
    red: "#f22e2e",
    black: "#353535",
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
          <Route path="/contact" component={Contact} />
          <Route path="/infos" component={Infos} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
