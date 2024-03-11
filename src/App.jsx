import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CoinList from './components/Api'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CoinList/>
    </>
  )
}

export default App
