import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import {items} from './data'
import useInterval from '../hooks/use-interval.hook'

function App(props) {
  const [numCookies, setNumCookies] = useState(1000);

  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  })

  const calculateCookiesPerSecond = (purchasedItems) => {
    
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;
  
      return acc + value * numOwned;
    }, 0);
  };

  useInterval(() => {
    window.localStorage.setItem('cookies', numCookies)
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home numCookies={numCookies} setNumCookies={setNumCookies} purchasedItems={purchasedItems} setPurchasedItems={setPurchasedItems}/>
        </Route>
        <Route path="/game">
          <Game 
          numCookies={numCookies} 
          setNumCookies={setNumCookies} 
          purchasedItems={purchasedItems} 
          setPurchasedItems={setPurchasedItems} numOfGeneratedCookies = {calculateCookiesPerSecond(purchasedItems)}/>
        </Route>
      </Router>
    </>
  );
}

export default App;
