import React, {useState, createContext} from 'react'
import usePersistedState from '../hooks/use-persisted';
import {items} from './data'


export const GameContext = createContext({})
export const GameProvider = ({children}) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, 'numCookies');
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