import React, { PropTypes } from 'react'
import Period from 'period-of-time'
import Push from 'push.js'
import Button from './Button'

// TODO use config
const TIME_BY_PERIOD_NAME = {
  'WORK': Period.convert(25, 'minute', 'millisecond'),
  'SHORT': Period.convert(5, 'minute', 'millisecond'),
  'LONG': Period.convert(20, 'minute', 'millisecond')
}

const PERIOD_NAMES = Object.keys(TIME_BY_PERIOD_NAME)
const WORK_PERIOD_BEFORE_BREAK = 4

const TomatoTimer = React.createClass({

  propTypes: {

    audio: PropTypes.shape({
      'WORK': PropTypes.shape({
        'source': PropTypes.string.isRequired,
        'type': PropTypes.string.isRequired
      }).isRequired,
      'SHORT': PropTypes.shape({
        'source': PropTypes.string.isRequired,
        'type': PropTypes.string.isRequired
      }).isRequired,
      'LONG': PropTypes.shape({
        'source': PropTypes.string.isRequired,
        'type': PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,

    sentence: PropTypes.shape({
      'WORK': PropTypes.string.isRequired,
      'SHORT': PropTypes.string.isRequired,
      'LONG': PropTypes.string.isRequired,
    }),

  },

  getInitialState() {
    return {
      period: PERIOD_NAMES[0],
      remainingTime: TIME_BY_PERIOD_NAME[PERIOD_NAMES[0]],
      remainingWorkPeriod: WORK_PERIOD_BEFORE_BREAK,
      numberWorkPeriodDone: 0,
      isTicking: false,
      lastTickAt: null,
      interval: null,
      initialDocumentTitle: '',
      documentTitle: ''
    }
  },

  playAlarm(period) {
    let audio = this.refs[`audio-${period}`]
    if (audio) {
      audio.play()
    }
  },

  componentDidMount() {
    if (!Push.Permission.has()) {
      this.requestNotifPermission()
    }
    this.setState({
      initialDocumentTitle: document.title,
      documentTitle: document.title
    }, () => this.updateDocumentTitle())
  },

  requestNotifPermission() {
    Push.Permission.request(this.requestNotifPermissionGranted)
  },

  requestNotifPermissionGranted () {
    // force to render to update the Permission status
    this.forceUpdate()
  },

  start () {
    this.setState({
      interval: setInterval(this.tick, 100),
      lastTickAt: Date.now(),
      isTicking: true
    })
  },

  pause () {
    clearInterval(this.state.interval)
    this.setState({
      interval: null,
      isTicking: false
    }, () => {
      this.updateDocumentTitle()
    })
  },

  reset() {
    this.pause()
    this.setState({
      remainingTime: TIME_BY_PERIOD_NAME[this.state.period]
    }, () => {
      this.updateDocumentTitle()
    })
  },

  updateDocumentTitle() {
    let { initialDocumentTitle, documentTitle, period, remainingTime } = this.state
    let newDocumentTitle = `(${Period.format(remainingTime, '${mm}:${ss}')}) ${initialDocumentTitle}`
    if (newDocumentTitle != documentTitle) {
      document.title = newDocumentTitle
      this.setState({
        documentTitle: newDocumentTitle
      });
    }
  },

  tick() {
    let { sentence } = this.props
    let { period } = this.state
    let now = Date.now()
    let elapsedMillisec = now - this.state.lastTickAt
    let remainingTime = this.state.remainingTime - elapsedMillisec

    let remainingWorkPeriod = this.state.remainingWorkPeriod
    let numberWorkPeriodDone = this.state.numberWorkPeriodDone
    let newPeriod = period

    if (remainingTime <= 0) {
      let notificationTitle = ''
      let notificationBody = ''
      switch (period) {
        case 'WORK':
          numberWorkPeriodDone++
          remainingWorkPeriod--
          if (remainingWorkPeriod == 0) {
            remainingWorkPeriod = WORK_PERIOD_BEFORE_BREAK
            newPeriod = 'LONG'
            notificationBody = sentence['LONG']
          } else {
            newPeriod = 'SHORT'
            notificationBody = sentence['SHORT']
          }
          notificationTitle = 'Work period is done!'
          break
        case 'SHORT':
          notificationTitle = 'Short break is done!'
          notificationBody = sentence['WORK']
          newPeriod = 'WORK'
          break
        case 'LONG':
          notificationTitle = 'Long break is done!'
          notificationBody = sentence['WORK']
          newPeriod = 'WORK'
          break
      }
      // new remaining time
      remainingTime = TIME_BY_PERIOD_NAME[newPeriod]
      // notification
      Push.create(notificationTitle, {
        body: notificationBody,
        // icon: {
        //   x16: 'images/icon-x16.png',
          // x32: 'images/icon-x32.png'
        // },
        timeout: 8000
      });
      // play alarm
      this.playAlarm(period)
      // pause the timer
      this.pause()
    }

    this.setState({
      remainingTime,
      lastTickAt: now,
      remainingWorkPeriod,
      numberWorkPeriodDone,
      period: newPeriod
    }, () => this.updateDocumentTitle())
  },

  getCurrentAction () {
    return this.state.isTicking ? 'pause' : 'start'
  },

  onRequestNotifPermissionClick (e) {
    e.preventDefault()
    this.requestNotifPermission();
  },

  renderNotifPermissionStatus () {
    let status = null
    if (Push.Permission.get() !== Push.Permission.GRANTED) {
      status = (
        <div className="notifPermissionStatus">
          Warning! Push notification are disabled! <a href="#" onClick={this.onRequestNotifPermissionClick}>Activate</a>
        </div>
      )
    }
    return status
  },

  render () {
    let { audio } = this.props
    let { remainingWorkPeriod, numberWorkPeriodDone, remainingTime } = this.state
    let action = this.getCurrentAction()
    
    return (
      <div className="TomatoTimer">
        {this.renderNotifPermissionStatus()}
        <div className="periods">
          {PERIOD_NAMES.map((period) => {
            return (
              <Button
                key={`button-${period}`}
                selected={period == this.state.period}
                content={period}
                onClick={() => {
                  this.pause()
                  this.setState({
                    period,
                    remainingTime: TIME_BY_PERIOD_NAME[period]
                  })
                }}
              />
            )
          })}
        </div>
        <div className="time">
          <div>{Period.format(remainingTime, '${mm}:${ss}')}</div>
        </div>
        <div style={{display: 'inline-block'}}>
          <Button
            onClick={this[action]}
            content={action}
          />
          <Button
            onClick={this.reset}
            content="Reset"
          />
        </div>
        {PERIOD_NAMES.map((period) => {
          return (
            <audio ref={`audio-${period}`} key={`audio-${period}`}>
              Your browser does not support the <code>audio</code> element.
              <source key={audio[period].source} src={audio[period].source} type={audio[period].type}/>
            </audio>
          )
        })}
      </div>
    )
  }
})

export default TomatoTimer
