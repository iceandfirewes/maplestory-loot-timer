import { useState,useEffect, createRef } from 'react'
import ringTone from './assets/vendarroRing.wav'
import mesoBag from './assets/mesoBag.png'
function App() {
  const [active, setActive] = useState(false)
  const [timeMark, setTimeMark] = useState(0)
  const [time, setTime] = useState(0)
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const lootInterval = 120000; //2minutes
  const testlootInterval = 7000; //7s
  const [mobbingTime, setMobbingTime] = useState(100000) //100s
  const [boolTonePlayed, setBoolTonePlayed] = useState(false)
  function startTimer()
  {
    setActive(true)
    setTimeMark(Date.now() + 5*SECOND)
    setTime(Date.now())
    setBoolTonePlayed(false)
  }
  useEffect(() => {
    if(active)
    {
      const interval = setInterval(() => {
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
   var timeValue
   //for the 5s countdown so it doesnt display a -1
    if(value < 0 && label == "minutes")
    {      
      timeValue = "0".padStart(2,"0")
    }
    //for the 5s countdown so it doesnt display -6 then -5 immediately
    else if(value < 0 && label == "seconds")
    {      
      timeValue = `${Math.floor(value)}`.padStart(2, "0")
    }
    //add a 0 if is needed
    else
    {
      timeValue = `${Math.floor(value)}`.padStart(2, "0")
    }
    return <>{timeValue}{index === 0 && ":"}</>
  })
  return (
    <div className="App">
      <p className='info'>Meso bag expire every 2 minutes. Thus, you would want to loot everything before that.<br/>
        Please set your mobbing time. for example, 1m40s. When that time has elapsed, a ring tone will sound, 
        you should loot at this time.
        You should set the mobbing time so that when you finish looting, the timer is close to 2m.</p>
      <div>
        Mobbing Time:<input className="secondInput" onChange={(event) => setMobbingTime(event.target.value*SECOND)}value={mobbingTime/1000} placeholder="Seconds"></input><span>s</span>
      </div>
      <h1 className='timeDisplay'>{timeDisplay}</h1>
      <audio 
        style={{display:"none"}}
        id="ringTonePlayer"
        controls
        src={ringTone}>
      </audio>
      {boolTonePlayed && <img src={mesoBag} style={{width:"10em"}}/>}
      <button className="startButton" onClick={startTimer}>
        <span class="front">{active? "Reset Timer" : "Start Timer"}</span>
      </button>
    </div>
  )
}

export default App
