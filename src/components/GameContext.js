import React, {useState, createContext} from 'react'
import {items} from './data'


export const GameContext = createContext({})
export const GameProvider = ({children}) => {
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


  return (
    <GameContext.Provider 
    value={{
      numCookies,
      setNumCookies,
      purchasedItems,
      setPurchasedItems, 
      cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)}}>
      {children}
    </GameContext.Provider>
  )
}