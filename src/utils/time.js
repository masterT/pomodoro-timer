import parseMilliseconds from 'parse-ms'

function padLeft (value, number, char) {
  let text = String(value)
  if (text.length < number) {
    let size = number - text.length
    while (size--) text = char + text
  }
  return text
}

export function formatTime (milliseconds) {
  const { minutes, seconds } = parseMilliseconds(milliseconds)
  return [minutes, seconds].map((value) => padLeft(value, 2, '0')).join(':')
}
