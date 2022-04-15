import { useEffect, useState } from "react";

import Attribution from "./components/Attribution";
import desktopDivider from "./assets/images/pattern-divider-desktop.svg";
import mobileDivider from "./assets/images/pattern-divider-mobile.svg";
import buttonImg from "./assets/images/icon-dice.svg";

// API
const baseUrl = "https://api.adviceslip.com/advice";

const App = () => {
  const [width, setWidth] = useState(window.visualViewport.width);
  const [quote, setQuote] = useState({});

  const getWidth = () => {
    const newWidth = window.visualViewport.width;
    setWidth(newWidth);
  };

  const fetchQuote = () => {
    fetch(baseUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((data) => setQuote(data.slip));
  };

  useEffect(() => {
    window.addEventListener("resize", getWidth);

    fetchQuote();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="advice-header">Advice #{quote.id}</h1>
        <p className="advice-quote">"{quote.advice}"</p>
        {width >= 600 ? (
          <img className="advice-divider" src={desktopDivider} alt="" />
        ) : (
          <img className="advice-divider" src={mobileDivider} alt="" />
        )}

        <button
          type="button"
          className="advice-button"
          onClick={() => fetchQuote()}
        >
          <img src={buttonImg} alt="" />
        </button>
      </div>
      <Attribution />
    </>
  );
};

export default App;
