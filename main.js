document.getElementById('time-in').addEventListener('change', function(){
  whatTimeDoIClockOut()
})

document.getElementById('work-hours').addEventListener('change', function(){
  whatTimeDoIClockOut()
})


const whatTimeDoIClockOut = () => {
  const timeIn = document.getElementById('time-in').value
  const workHours = parseFloat(document.getElementById('work-hours').value)

  const {hours, minutes} = splitTime(timeIn)
  const timeOut = addWorkHours(hours, minutes, workHours)

  document.getElementById('timeout').innerHTML = timeOut
  document.getElementById('twelve-hour-timeout').innerHTML = format12Hours(timeOut)
}

const splitTime = (time) => {
  const clock = time.split(':')
  return {hours: clock[0], minutes: clock[1]}
}

const addWorkHours = (hours, minutes, workHours) => {
  if(!isDecimal(workHours)) {
    return `${parseInt(hours) + parseInt(workHours)}:${formatMinutes(parseInt(minutes))}`
  }
  const modulo = workHours % 1
  hours = parseInt(hours) + parseInt(workHours)
  minutes = parseInt(minutes) + (60 * modulo) 
  hours = parseInt(hours) + parseInt(minutes / 60)
  minutes = parseInt(minutes) >= 60 ? parseInt(minutes) - 60 : parseInt(minutes) 
  return `${hours}:${formatMinutes(minutes)}`
}

const isDecimal = (num) => {
  return num % 1 !== 0;
}

const formatMinutes = (minutes) => {
  return minutes < 10 ? `0${minutes}` : minutes
}

const format12Hours = (time) => {
  let {hours, minutes} = splitTime(time)
  let ampm = hours >= 12 ? 'pm': 'am'
  hours = hours > 12 ? hours - 12 : hours
  hours = hours == 0 ? 12 : hours

  return `${hours}:${minutes} ${ampm}`
}