import { useState,useEffect, createRef } from 'react'
import './App.css'
import ringTone from './assets/vendarroRing.wav'
function App() {
  const [active, setActive] = useState(false)
  const [timeMark, setTimeMark] = useState(Date.now())
  const [time, setTime] = useState(Date.now())
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const lootInterval = 120000; //2minutes
  const testlootInterval = 7000; //7s
  const [mobbingTime, setMobbingTime] = useState(100000) //100s
  const [boolTonePlayed, setBoolTonePlayed] = useState(false)
  function startTimer()
  {
    setActive(true)
    setTimeMark(Date.now())
  }
  function handleInput(event)
  {
    
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
          setBoolTonePlayed(false)
        }
        if(time - timeMark > mobbingTime)
        {
          if(!boolTonePlayed)
          {
            document.getElementById("ringTonePlayer").play()
            setBoolTonePlayed(true)
          }
        }
        setTime(Date.now())
      }, .5 * SECOND)
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
      <div>
        <input className="secondInput" onChange={(event) => setMobbingTime(event.target.value*SECOND)}value={mobbingTime/1000} placeholder="Seconds"></input><span>s</span>
      </div>
      <div>{timeDisplay}</div>
      <audio 
        style={{display:"none"}}
        id="ringTonePlayer"
        controls
        src={ringTone}>
      </audio>
      <button onClick={startTimer}>{active? "Reset Timer" : "Start Timer"}</button>
    </div>
  )
}

export default App
