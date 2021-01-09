import React, {useState, createContext} from 'react'
import usePersistedState from '../hooks/use-persisted';
import {items} from './data'

const calculateCookiesPerSecond = (purchasedItems) => {
    
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

export const GameContext = createContext({})
export const GameProvider = ({children}) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, 'numCookies');
  const [purchasedItems, setPurchasedItems] = usePersistedState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  }, 'purchasedItems')
  console.log(purchasedItems)
 
  const handlePageClose = (ev) => {
    window.localStorage.setItem('logOutTime', JSON.stringify(Date.now()))
  }

  React.useEffect(() => {
    const pageLoadTime = Date.now()
    
    const pageCloseTime = JSON.parse(window.localStorage.getItem('logOutTime'))
  
    const timeSinceLogOut = Math.floor((pageLoadTime - pageCloseTime) / 1000)
    const extraNumCookies = calculateCookiesPerSecond(purchasedItems) * timeSinceLogOut
    setNumCookies(numCookies + extraNumCookies)
 
    window.addEventListener('unload', handlePageClose)

    return () => {
      window.removeEventListener('unload', handlePageClose)
    }
  }, [])


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