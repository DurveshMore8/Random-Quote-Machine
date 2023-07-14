/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FaTwitter, FaTumblr } from "react-icons/fa";

function App() {
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentColor, setCurrentColor] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setQuotes(res.data.quotes);
      });
  }, []);

  useEffect(() => {
    if (quotes.length != 0) {
      getRandomQuote();
    }
  }, [quotes]);

  useEffect(() => {
    document.body.style.backgroundColor = currentColor;
  }, [currentColor]);

  useEffect(() => {
    const tweetQuoteURL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      `"${currentQuote}" ${currentAuthor}`
    )}`;
    const tweetQuoteElement = document.getElementById("tweet-quote");
    tweetQuoteElement.setAttribute("href", tweetQuoteURL);

    const tumblrQuoteURL = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
      currentAuthor
    )}&content=${encodeURIComponent(
      currentQuote
    )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    const tumblrQuoteElement = document.getElementById("tumblr-quote");
    tumblrQuoteElement.setAttribute("href", tumblrQuoteURL);
  }, [currentQuote, currentAuthor]);

  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);
    setCurrentColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div style={{ backgroundColor: currentColor, color: currentColor }}>
      <div id="quote" className="quote">
        <div id="quote-box" className="quote-box">
          <div id="quote-text" className="quote-text">
            <i className="fa fa-quote-left"></i>
            <span id="text">{currentQuote}</span>
          </div>
          <div id="quote-author" className="quote-author">
            <p id="author">{currentAuthor}</p>
          </div>
          <div id="buttons" className="buttons">
            <div id="post-quote" className="post-quote">
              <div className="button" style={{ backgroundColor: currentColor }}>
                <a
                  className="button"
                  id="tweet-quote"
                  title="Tweet this quote!"
                  target="_top"
                  style={{ backgroundColor: currentColor }}
                >
                  <FaTwitter />
                </a>
              </div>
              <div className="button" style={{ backgroundColor: currentColor }}>
                <a
                  className="button"
                  id="tumblr-quote"
                  title="Post this quote on Tumblr!"
                  target="_blank"
                  style={{ backgroundColor: currentColor }}
                >
                  <FaTumblr />
                </a>
              </div>
            </div>
            <div
              id="new-quote"
              className="new-quote button"
              style={{ backgroundColor: currentColor }}
            >
              <a className="next-button" id="next" onClick={getRandomQuote}>
                <span>New Quote</span>
              </a>
            </div>
          </div>
        </div>
        <span className="credits">by Durvesh More</span>
      </div>
    </div>
  );
}

export default App;
