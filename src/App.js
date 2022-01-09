import { makeStyles } from "@material-ui/core";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinPage from "./Pages/coinPage";
import HomePage from "./Pages/homepage.jsx";
import Header from "./Components/header.jsx";
import { createContext, useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

export const CryptoContext = createContext();

function App() {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const classes = useStyles();

  // Switch has been repalced by Routes in React-Router-Dom v6

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <BrowserRouter>
      <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/coins/:id" exact element={<CoinPage />} />
          </Routes>
        </div>
      </CryptoContext.Provider>
    </BrowserRouter>
  );
}

export default App;
