import { useState,useEffect } from 'react'
import './App.css'
function App() {
  const [active, setActive] = useState(false)
  const [timeMark, setTimeMark] = useState(Date.now())
  const [time, setTime] = useState(Date.now())
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const lootInterval = 120000;
  const testlootInterval = 7000;
  const [mobbingTime, setMobbingTime] = useState(100)
  function startTimer()
  {
    setActive(true)
    setTimeMark(Date.now())
  }
  function handleInput(event)
  {
    
    setMobbingTime(event.target.value)
    console.log(mobbingTime)
  }
  useEffect(() => {
    if(active)
    {
      const interval = setInterval(() => {
        console.log(time -timeMark)
        if(time - timeMark > lootInterval)
        //if(time - timeMark > testlootInterval)
        {
          setTimeMark(Date.now())
        }
        setTime(Date.now())
      }, 1000)
      return () => clearInterval(interval);
    }
  /**for some reason, setting this to active and time make the timer
   * work. so ??
   */
  },[active,time])
  /**entries take an object with {a:"b", c:"d"} and then turn it into an array
   * [["a","a"],["c", "d"]]. from then, we can map as normal but since each element
   * is a array. we need to do .map([label, value], index) for [label, value] being the element
   * and index being the index
   * */
  const timeDisplay = Object.entries({
    minutes: (time - timeMark) / MINUTE % 60,
    seconds: (time - timeMark) / SECOND % 60
  }).map(([label,value],index) => {
    /**code so that the minutes and second cant be -1 because when
     * timeMark and time get update at roughly the same time, the milisecond 
     * when rounded down would result in a -1:-1 being displayed. this is to
     * prevent that
    */
   var timeValue
    if(value < 0)
    {      
      timeValue = <span>{"0".padStart(2,"0")}</span>
    }
    else
    {
      timeValue = <span>{`${Math.floor(value)}`.padStart(2, "0")}</span>
    }
    return <>{timeValue}{index === 0 && <span>:</span>}</>
  })
  return (
    <div className="App">
      <h4>Meso bag expire every 2 minutes. Thus, you would want to loot everything before that.</h4>
      <h4>Please set your mobbing time. for example, 1m40s.</h4>
      <h4>when that time has elapese, a ring tone will sound, you should loot at this time.</h4>
      <input onChange={(event) => handleInput(event)}value={mobbingTime} placeholder="Seconds"></input>
      <div>{timeDisplay}</div>
      <button onClick={startTimer}>{active? "Reset Timer" : "Start Timer"}</button>
    </div>
  )
}

export default App
