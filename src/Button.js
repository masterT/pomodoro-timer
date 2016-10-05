import React, { PropTypes } from 'react'

const Button = React.createClass({

  propTypes: {
    selected: PropTypes.bool,
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  },

  getDefaultProps () {
    return {
      selected: false
    }
  },

  render () {
    let { selected, content, onClick } = this.props
    return (
        <div
          className={`Button ${selected ? 'selected' : ''}`}
          onClick={onClick}
          >
          <div className="top">{content}</div>
          <div className="side"/>
        </div>
    )
  }
})

export default Button
