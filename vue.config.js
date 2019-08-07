const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? '/pomodoro-timer/' : '/'
}
