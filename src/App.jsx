import { useState,useEffect } from 'react'
import './App.css'
function App() {
  const [active, setActive] = useState(true)
  const [timeMark, setTimeMark] = useState(Date.now())
  const [time, setTime] = useState(Date.now())
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  function updateTime(){
    setTime(Date.now())
  }
  useEffect(() => {
    if(active)
    {
      const interval = setInterval(() => updateTime(), 1000)
      return () => clearInterval(interval);
    } 
  },[])
  /**entries take an object with {a:"b", c:"d"} and then turn it into an array
   * [["a","a"],["c", "d"]]. from then, we can map as normal but since each element
   * is a array. we need to do .map([label, value], index) for [label, value] being the element
   * and index being the index
   * */
  const timeDisplay = Object.entries({
    minutes: (time - timeMark) / MINUTE % 60,
    seconds: (time - timeMark) / SECOND % 60
  }).map(([label,value],index) => {
    return <>
    <span>{`${Math.floor(value)}`.padStart(2, "0")}</span>
    {index === 0 && <span>:</span>}
    </>
  })




  return (
    <div className="App">
      {timeDisplay}
    </div>
  )
}

export default App
