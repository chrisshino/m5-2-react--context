import React, {useState, useEffect} from 'react'

const usePersistedState = (defaultValue, name) => {
  const [persistedState, setPersistedState ] = useState(() => {
    const localStorageData = window.localStorage.getItem(name)
    return localStorageData ? JSON.parse(localStorageData) : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(persistedState))
  }, [persistedState])

  return [ persistedState, setPersistedState ]
}

export default usePersistedState