import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { globalStore } from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fonts: {
          heading: "Plus Jakarta Sans",
          body: "Plus Jakarta Sans",
        },
      },
    },
  },
  colors: {
    brand: {
      50: "#e8eef9",
      100: "#c6d4f0",
      200: "#a1b9e6",
      300: "#7b9edc",
      400: "#5b86d4",
      500: "#3b6ecb", // Base color
      600: "#335cb9",
      700: "#2a4aa8",
      800: "#213896",
      900: "#192985",
    },
    secondary: {
      50: "#f0f3fa",
      100: "#d4daf1",
      200: "#b8c1e8",
      300: "#9aa7df",
      400: "#808fe0",
      500: "#6676d2",
      600: "#4d60b9",
      700: "#3c4c9f",
      800: "#2b397f",
      900: "#1d2862",
    },
    background: "#f5f7fa",
  },
});

root.render(
  <BrowserRouter>
    <Provider store={globalStore}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
