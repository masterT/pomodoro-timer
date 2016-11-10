import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { render } from 'react-dom'
import PomodoroTimer from './TomatoTimer'
require('./stylesheets/main.scss')

const sentence = {
  'WORK': 'Go back to work',
  'SHORT': 'Take a short break',
  'LONG': 'Take a long break'
}

const audio = {
  'WORK': {source: 'sounds/break.mp3', type: 'audio/mpeg'},
  'SHORT': {source: 'sounds/work.mp3', type: 'audio/mpeg'},
  'LONG': {source: 'sounds/work.mp3', type: 'audio/mpeg'}
}

window.addEventListener('load', () => {
  render(
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div>
        this is a timer for the <a href="http://pomodorotechnique.com/">Pomodoro Technique</a>.
      </div>
      <PomodoroTimer
        sentence={sentence}
        audio={audio}
        />
    </div>,
    document.getElementById('container')
  )
})
