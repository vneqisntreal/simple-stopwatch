import React, { useState, useEffect, useRef } from 'react'

    function formatTime(time) {
      const hours = Math.floor(time / 3600000)
      const minutes = Math.floor((time % 3600000) / 60000)
      const seconds = Math.floor((time % 60000) / 1000)
      const milliseconds = Math.floor((time % 1000) / 10)

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }

    function App() {
      const [isRunning, setIsRunning] = useState(false)
      const [time, setTime] = useState(0)
      const [laps, setLaps] = useState([])
      const intervalRef = useRef(null)

      useEffect(() => {
        if (isRunning) {
          intervalRef.current = setInterval(() => {
            setTime(prev => prev + 10)
          }, 10)
        } else {
          clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
      }, [isRunning])

      const handleStartStop = () => {
        setIsRunning(!isRunning)
      }

      const handleLap = () => {
        setLaps(prev => [time, ...prev])
      }

      const handleReset = () => {
        setTime(0)
        setLaps([])
        setIsRunning(false)
      }

      return (
        <div className="stopwatch">
          <div className="time-card">
            <div className="time">
              {formatTime(time)}
            </div>
          </div>
          <div className="controls-card">
            <div className="controls">
              <button onClick={handleStartStop}>
                {isRunning ? 'Stop' : 'Start'}
              </button>
              <button onClick={handleLap} disabled={!isRunning}>
                Lap
              </button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
          <div className="laps">
            {laps.map((lap, index) => (
              <div key={index} className="lap-item">
                <span className="lap-number">Lap {laps.length - index}</span>
                <span className="lap-time">{formatTime(lap)}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default App
