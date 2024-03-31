import React, { Suspense, lazy } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

const Header = lazy(() => import("./Header/Header"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Infos = lazy(() => import("./Pages/Infos/Infos"));
const Contact = lazy(() => import("./Pages/Contact"));
const PricacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./Pages/TermsOfService"));
const Footer = lazy(() => import("./Footer/Footer"));
const theme = {
  colors: {
    primary: "#4287a1",
    secundary: "#eff0f4",
    third: "#c6dbe3",
    navFontColor: "#d9dadb",
    navDropdownFontColor: "#ffffff",
    navChevronColor: "#ffffff",
    navDropdownBGColor: "#eff0f4",
    burgerFontColor: "#4287a1",
    burgerDropdownFontColor: "#ffffff",
    burgerChevronColor: "#ffffff",
    burgerBGColor: "#000000",
    burgerDropdownBGColor: "#ededed",
    lngFontColor: "#ffffff",
    lngLineFontColor: "#4287a1",
    lngDropdownColor: "#ffffff",
    lngChevronColor: "#ffffff",
    lngDropdownBGColor: "#f9f9f9",
    inputBorderColor: "#c9c9c9",
    grey: "#787878",
    darkgrey: "#424242",
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
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/infos" component={Infos} />
            <Route path="/privacypolicy" component={PricacyPolicy} />
            <Route path="/termsofservice" component={TermsOfService} />
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
