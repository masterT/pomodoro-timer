import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import { render } from 'react-dom'
import PomodoroTimer from './TomatoTimer'
require('./stylesheets/main.scss')

window.addEventListener('load', () => {
  render(
    <PomodoroTimer
      sentence={{ // when the period will start
        'WORK': 'Go back to work',
        'SHORT': 'Take a short break',
        'LONG': 'Take a long break'
      }}
      audio={{
        'WORK': {source: 'sounds/break.mp3', type: 'audio/mpeg'},
        'SHORT': {source: 'sounds/work.mp3', type: 'audio/mpeg'},
        'LONG': {source: 'sounds/work.mp3', type: 'audio/mpeg'}
      }}
    />,
    document.getElementById('container')
  )
})
