import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { render } from 'react-dom'
import changeFavicon from './changeFavicon'
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
  // set favicon
  changeFavicon('./favicon.ico')
  // render the app
  render(
    <div className="App">
      <h1>Pomodoro <i>like</i> Timer</h1>
      <p>The <a href="http://pomodorotechnique.com/">Pomodoro Technique</a> is a time management method developed by <i>Francesco Cirillo</i> in the late 1980s.</p>
      <p>The technique uses a timer to break down work into intervals, separated by short breaks.</p>
      <PomodoroTimer
        sentence={sentence}
        audio={audio}
        />
      <footer>
        <div>Made with ❤ by <a href="http://simonthiboutot.com">Simon Thiboutôt</a></div>
        <div><a href="https://github.com/masterT/pomodoro-timer">Source code</a></div>
      </footer>
    </div>,
    document.getElementById('container')
  )
})
